# Reaching the H200 workstation from Claude Code

Goal: make an NVIDIA H200 workstation usable as the compute behind a Claude
Code session, with Tailscale providing the connectivity.

Two things have to be decided before any of this works, and they are not the
same question:

1. **Where does the Claude Code agent process run?** On Anthropic's cloud, or
   on the H200 itself.
2. **What is Tailscale actually for?** Reaching the H200 from elsewhere, or
   just giving you a stable address for your own SSH access.

The answer to (1) determines everything else. The three viable
configurations are below.

---

## Constraint: cloud sessions cannot reach Tailscale by default

The **Default** environment uses the **Trusted** network access level, whose
allowlist covers package registries and GitHub but not Tailscale. Every
Tailscale host is refused at the egress proxy:

```
controlplane.tailscale.com   CONNECT tunnel failed, 403
login.tailscale.com          CONNECT tunnel failed, 403
pkgs.tailscale.com           CONNECT tunnel failed, 403
derp1.tailscale.com          CONNECT tunnel failed, 403
tailscale.com                CONNECT tunnel failed, 403
```

This is an environment policy decision, not a bug, and it is not something a
session can work around from the inside. It is lifted by creating an
environment with **Custom** network access (Option A), or made irrelevant by
running the agent on the H200 (Options B and C).

Note also that environments themselves are created in the claude.ai web UI.
A running session can list environments but cannot create one, so the
environment steps below are yours to perform.

---

## Option A — Cloud session that reaches into the H200

The agent runs on Anthropic's cloud and treats the H200 as a remote GPU box
over SSH. Works on Pro and Max.

**Good for:** this repository's own work, plus occasional GPU jobs.
**Poor for:** heavy interactive GPU work, since the checkout, the toolchain
and the GPU are on opposite ends of an SSH connection.

### 1. Prepare the workstation

```bash
# On the H200
curl -fsSL https://tailscale.com/install.sh | sh
sudo tailscale up --ssh --hostname=h200
```

`--ssh` enables Tailscale SSH, so authorization happens through tailnet ACLs
and no private key ever has to be stored in a cloud session.

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
**pre-authorized**, and tagged `tag:claude-cloud`. Ephemeral matters: cloud
session VMs are reclaimed after inactivity, and ephemeral nodes clean
themselves out of the tailnet instead of accumulating.

### 3. Create the environment

At claude.ai/code, create a new environment (leave **Default** alone):

- **Network access:** `Custom`, with *Also include default list of common
  package managers* checked, so npm and friends keep working.
- **Allowed domains:**

  ```text
  tailscale.com
  *.tailscale.com
  ```

  `*.tailscale.com` covers the control plane, the login endpoint, the DERP
  relays and the package host. Confirm against Tailscale's current
  firewall-ports documentation — that page is itself blocked from this
  session, so the list above could not be verified here.

- **Environment variables:**

  ```text
  TS_AUTHKEY=tskey-auth-...
  H200_HOST=h200
  H200_USER=YOUR_LOGIN
  ```

- **Setup script:** paste the contents of
  [`scripts/cloud-env-tailscale-setup.sh`](../scripts/cloud-env-tailscale-setup.sh).

### 4. Use it

Start a session on the new environment:

```bash
h200 nvidia-smi          # wrapper the setup script installs
tailscale status         # confirm the tailnet join
tail /var/log/tailscale-setup.log
```

### Security caveat, stated plainly

Environment variables are readable by anyone who uses the environment, and by
the agent itself. An ephemeral, ACL-scoped auth key limits the blast radius
to "join the tailnet as a node that may open port 22 on one host" — but it is
still a credential sitting in a sandbox. If that is not acceptable, use
Option B, which needs no key at all.

---

## Option B — Run Claude Code on the H200 (recommended)

Run the agent process on the workstation and drive it from your laptop, the
web, or your phone:

```bash
# On the H200
claude --remote-control
```

This is the documented path for running Claude Code on your own always-on
machine and driving it from other devices, and it is available on Pro and
Max.

Why this is usually the right answer for an H200:

- The agent gets the GPUs, the CUDA toolchain, the datasets and the local
  filesystem **directly** — no SSH hop, no proxy, no allowlist.
- No auth key is stored anywhere. The connection is outbound HTTPS from the
  workstation to Anthropic; nothing listens for inbound traffic.
- Tailscale becomes optional. It stays useful for *your* SSH access to the
  box from outside the house or campus, which is worth setting up on its own
  merits, but it is no longer load-bearing for Claude.

The tradeoff: this is not an "environment" in the claude.ai sense. It will not
appear in the environment picker, and sessions only run while the workstation
is up and the command is running.

---

## Option C — Self-hosted environment (the literal "environment on my H200")

A self-hosted environment makes the H200 a first-class destination in the
session-start environment picker: a runner process on the workstation claims
queued sessions and executes them locally.

This is the only option that literally satisfies "create an environment
that is my H200". Before planning around it, check the gating:

- **Public beta on Team and Enterprise plans only.** Not available on Pro or
  Max.
- **Off by default.** An organization Owner must turn on *Allow self-hosted
  environments* on the Cloud environments admin page.
- Zero Data Retention organizations cannot use it.

This account currently has a single environment, `Default`, of kind
`anthropic_cloud`, so no self-hosted environment exists yet.

If the plan permits it, the runner registers outbound to `api.anthropic.com`
and Anthropic never connects into your network — so here too, Tailscale is
for your own access rather than for Claude's.

Start at the self-hosted environments quickstart in the Claude Code docs.

---

## Choosing

| | Agent runs on | Plan | Tailscale needed | GPU access |
|---|---|---|---|---|
| **A** | Anthropic cloud | Pro/Max | Yes, load-bearing | Over SSH |
| **B** | The H200 | Pro/Max | Optional | Direct |
| **C** | The H200 | Team/Enterprise | Optional | Direct |

For GPU work on an H200, **Option B** gives the agent direct hardware access
for the least setup and the least credential exposure. Option A is worth the
extra machinery only if the sessions genuinely need to start in the cloud —
for example, so they keep running when the workstation sleeps.
