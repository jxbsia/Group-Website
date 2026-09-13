# Using the H200 workstation from your phone

Goal: open Claude Code on a phone and have it working on the H200 — its
filesystem, its GPUs, its CUDA toolchain — rather than on a cloud VM.

The feature for this is **Remote Control**. Claude Code runs on the
workstation; the phone is a client. Code execution and filesystem access never
leave the H200.

**Tailscale is not required for this.** The workstation makes outbound HTTPS
requests only and never opens an inbound port, so there is nothing to reach
into and nothing to expose. Tailscale is still worth having for your own
`ssh` access to the box from outside the campus network — see
[the last section](#where-tailscale-still-helps) — but Claude does not use it.

---

## Setup

### 1. On the H200, once

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

### 2. Keep it running

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

### 3. On the phone

1. Install the Claude app for iOS or Android, and sign in with **the same
   account** used for `/login` on the H200.
2. Tap **Code**.
3. Pick the session from the list — Remote Control sessions show a computer
   icon with a green status dot when the workstation is online.

The QR shortcut: attach to the tmux session and press **spacebar** to display a
code that opens the session directly in the app.

### 4. Push notifications

Run `/config` in the session and enable:

- **Push when Claude decides** — long-running work finished
- **Push when actions required** — a permission prompt or a question

Worth turning on for GPU work specifically: a training run that ends at 2am can
tell you so. You can also just ask, in a prompt, `notify me when the run
finishes`.

Notifications are skipped while you are focused on the workstation's terminal.

---

## Things worth knowing before relying on it

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

## Where Tailscale still helps

Not for Claude, but for you:

```bash
# On the H200
curl -fsSL https://tailscale.com/install.sh | sh
sudo tailscale up --ssh --hostname=h200
```

With `--ssh`, authorization runs through tailnet ACLs instead of key files, so
`ssh you@h200` works from your laptop anywhere without exposing port 22 or
holding a public IP. That is genuinely useful for restarting the Remote Control
server, checking `nvidia-smi`, or babysitting a job — it is simply not part of
the path between your phone and Claude.

---

## What this is not

Two adjacent things, in case the requirements change:

- **A cloud session that reaches into the H200.** The agent would run on
  Anthropic's infrastructure and treat the workstation as a remote GPU box over
  SSH. This does need Tailscale, and it needs a new environment with **Custom**
  network access allowlisting `*.tailscale.com` plus an auth key in the
  environment's variables. The `Default` environment blocks every Tailscale
  host, so it cannot work as-is. Worth it only if sessions must keep running
  while the workstation is off. A working setup script for this path is in this
  branch's history, in commit `4593e88`.

- **A self-hosted environment.** This makes the H200 a selectable entry in the
  environment picker, with a runner process claiming queued sessions. It is the
  most literal reading of "an environment on my H200", but it is a Team and
  Enterprise public beta that an Owner must turn on, so it is not available on
  a personal Pro or Max plan.
