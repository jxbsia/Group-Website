# Reaching the H200 workstation

Two different things get called "access the H200", and they need different
setups:

| | Where Claude runs | Tailscale | Use when |
|---|---|---|---|
| **[A. Remote Control](#a-run-claude-on-the-h200-recommended)** | On the H200 | Not used | You want Claude working on the GPUs, driven from your phone |
| **[B. Cloud session over Tailscale](#b-reach-the-h200-from-a-cloud-session)** | Anthropic cloud | Required | Sessions must keep running while the workstation is off |

Path A is simpler and gives the agent direct hardware access. Path B is the
one that actually uses Tailscale, and it needs an environment configured for
it before any session can join a tailnet.

---

## The constraint on cloud sessions

A cloud session can only reach a tailnet if its environment allows it. Under
the **Default** environment's **Trusted** network access level, every
Tailscale host is refused at the egress proxy:

```
controlplane.tailscale.com   CONNECT tunnel failed, 403
login.tailscale.com          CONNECT tunnel failed, 403
pkgs.tailscale.com           CONNECT tunnel failed, 403
```

This is an environment policy, not a bug, and a running session cannot work
around it from the inside — it cannot install Tailscale or reach the control
plane to join. Two further things make it a per-environment, ahead-of-time
decision rather than something to switch on mid-session:

- Environments are created and edited in the claude.ai web UI. A session can
  list environments but not create or modify one.
- A session copies its environment variables once, at startup. Adding
  `TS_AUTHKEY` later does not reach a session that is already running.

So Path B always means: configure the environment first, then start a **new**
session on it.

---

## A. Run Claude on the H200 (recommended)

Claude Code runs on the workstation; the phone is a client. Code execution and
filesystem access never leave the H200, and the workstation makes outbound
HTTPS requests only — it never opens an inbound port, so this path needs no
tailnet at all.

### Setup

#### 1. On the H200, once

```bash
cd /path/to/your/project     # a project directory, not $HOME
claude                       # accept the workspace trust dialog
/login                       # sign in through claude.ai
```

Workspace trust is never saved for the home directory, so start from a project
directory. Then confirm Remote Control is allowed to start:

```bash
claude remote-control        # answer "Enable Remote Control? (y/n)" with y
```

Both prompts are one-time and interactive, which is why they have to happen
before anything runs unattended. Ctrl+C once you have seen it start.

#### 2. Keep it running

A Remote Control server dies with its terminal, so it needs to outlive your SSH
connection. `scripts/h200-remote-control.sh` wraps it in tmux:

```bash
./scripts/h200-remote-control.sh /path/to/your/project
```

Detach with **Ctrl+B** then **D**. Re-running the script attaches to the
existing server rather than starting a second one.

`claude remote-control` is server mode: one process serving up to 32 concurrent
sessions, so you can start new work from the phone without touching the
workstation again. Useful knobs, settable as environment variables for the
script:

| Variable | Effect |
|---|---|
| `CLAUDE_RC_SPAWN=worktree` | Each phone-started session gets its own git worktree, so two sessions can't collide on the same files. Requires a git repo. |
| `CLAUDE_RC_NAME=h200` | Session title in the list. Defaults to the hostname. |
| `CLAUDE_TMUX_SESSION=...` | tmux session name, if you want more than one server. |

#### 3. On the phone

1. Install the Claude app for iOS or Android, and sign in with **the same
   account** used for `/login` on the H200.
2. Tap **Code**.
3. Pick the session from the list — Remote Control sessions show a computer
   icon with a green status dot when the workstation is online.

The QR shortcut: attach to the tmux session and press **spacebar** to display a
code that opens the session directly in the app.

#### 4. Push notifications

Run `/config` in the session and enable:

- **Push when Claude decides** — long-running work finished
- **Push when actions required** — a permission prompt or a question

Worth turning on for GPU work specifically: a training run that ends at 2am can
tell you so. You can also just ask, in a prompt, `notify me when the run
finishes`.

Notifications are skipped while you are focused on the workstation's terminal.

---

### Things worth knowing before relying on it

**The workstation has to stay awake.** If the `claude` process stops, the
session goes offline within seconds. If the machine sleeps, Claude Code
reconnects when it wakes. For an always-on box, disable suspend:

```bash
sudo systemctl mask sleep.target suspend.target hibernate.target hybrid-sleep.target
```

**Restarting the server keeps your sessions for about four hours.** Run
`claude remote-control` again in the same directory and it brings back the
sessions it was serving. After roughly four hours, you get a new session
instead.

**A long network outage ends server mode.** If the H200 is up but offline for
about 10 minutes, the server process exits and needs restarting. An ordinary
interactive session (`claude --remote-control`) retries indefinitely instead,
which is the better mode if the link is flaky.

**Permission modes from the phone are Manual, Accept edits, and Plan.** Bypass
permissions and Auto are not selectable from mobile. For unattended GPU jobs,
start the server with `--permission-mode acceptEdits` on the workstation —
decide deliberately, since it stops asking before it edits.

**A few commands are terminal-only**, notably `/plugin` and `/resume`.
`/model`, `/effort` and `/config` work from the phone but take their value as
an argument: `/model opus`, not a picker.

**Transcripts are stored on Anthropic servers** while Remote Control is
connected — that is what keeps the phone and the workstation in sync. Code
execution and file access stay local. Zero Data Retention organizations cannot
use Remote Control at all.

**Requirements that silently break it:** an `ANTHROPIC_BASE_URL` pointed
anywhere but `api.anthropic.com`, a third-party provider such as Bedrock or
Foundry, or any of `DISABLE_TELEMETRY`, `DO_NOT_TRACK`,
`CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC`, `DISABLE_GROWTHBOOK`. The launcher
script warns about each of these. Remote Control works on Pro, Max, Team and
Enterprise; on Team and Enterprise an Owner must enable it first.

---

## B. Reach the H200 from a cloud session

Here the agent runs on Anthropic's infrastructure and treats the workstation
as a remote GPU box over Tailscale SSH. This is the path that needs a tailnet.

### 1. Prepare the workstation

```bash
# On the H200
curl -fsSL https://tailscale.com/install.sh | sh
sudo tailscale up --ssh --hostname=h200
```

`--ssh` turns on Tailscale SSH, so authorization runs through tailnet ACLs
rather than key files. That matters here: no private key ever has to be stored
in a cloud sandbox.

Grant the session's tag access in your tailnet ACL policy:

```jsonc
{
  "tagOwners": { "tag:claude-cloud": ["autogroup:admin"] },
  "acls": [
    { "action": "accept", "src": ["tag:claude-cloud"], "dst": ["h200:22"] }
  ],
  "ssh": [
    {
      "action": "accept",
      "src":   ["tag:claude-cloud"],
      "dst":   ["h200"],
      "users": ["YOUR_LOGIN"]
    }
  ]
}
```

### 2. Mint an auth key

In the Tailscale admin console, create a key that is **ephemeral**,
**pre-authorized**, and tagged `tag:claude-cloud`.

Ephemeral matters: cloud session VMs are reclaimed after inactivity, and
ephemeral nodes remove themselves from the tailnet instead of accumulating a
row per dead session.

### 3. Create the environment

At claude.ai/code, create a new environment — leave **Default** alone:

- **Network access:** `Custom`, with *Also include default list of common
  package managers* checked, so npm and pip keep working.
- **Allowed domains:**

  ```text
  tailscale.com
  *.tailscale.com
  ```

  `*.tailscale.com` is intended to cover the control plane, the login
  endpoint, the DERP relays and the package host. Check it against Tailscale's
  current firewall-ports documentation — that page is itself blocked from
  cloud sessions, so this list could not be verified from one.

- **Environment variables:**

  ```text
  TS_AUTHKEY=tskey-auth-...
  H200_HOST=h200
  H200_USER=YOUR_LOGIN
  ```

- **Setup script:** paste the contents of
  [`scripts/cloud-env-tailscale-setup.sh`](../scripts/cloud-env-tailscale-setup.sh).

### 4. Start a new session on that environment

Existing sessions keep the network policy and variables they started with, so
the environment change only reaches sessions created after it. In a new one:

```bash
tailscale status               # confirm the tailnet join
h200 nvidia-smi                # wrapper the setup script installs
tail /var/log/tailscale-setup.log
```

### How the script connects

The setup script runs tailscaled in **userspace networking** mode, which
avoids depending on TUN and NET_ADMIN in the sandbox. The tradeoff is that
tailnet addresses are not routable by ordinary processes, so the script:

- opens a SOCKS5 proxy on `localhost:1055` and exports `ALL_PROXY`, so `curl`,
  `git` and friends reach tailnet services without per-command flags
- installs an `h200` wrapper over `tailscale ssh`, so running a command on the
  workstation is `h200 nvidia-smi`
- joins **without** `--ssh`, so the session is an SSH client only and is not
  itself reachable from the tailnet

Every failure path exits zero. A non-zero setup script stops the session from
starting at all, so a Tailscale problem degrades to "no H200" rather than "no
session".

### Security caveat, stated plainly

Environment variables are readable by anyone who uses the environment, and by
the agent itself. An ephemeral, ACL-scoped key limits the blast radius to
"join the tailnet as a node that may open port 22 on one host" — but it is
still a credential sitting in a sandbox. Path A needs no key at all.

---

## Tailscale for your own access

Independent of either path, `tailscale up --ssh` on the workstation means
`ssh YOUR_LOGIN@h200` works from your laptop anywhere, without exposing port
22 or holding a public IP. Useful for restarting the Remote Control server or
checking on a job, and worth setting up even if you go with Path A.

---

## Not available here: a self-hosted environment

Making the H200 a selectable entry in the environment picker, with a runner
claiming queued sessions, is the most literal reading of "an environment on my
H200". It is a Team and Enterprise public beta that an Owner must enable
first, so it is not an option on a personal Pro or Max plan.
