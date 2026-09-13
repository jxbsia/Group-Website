#!/bin/bash
# Cloud environment setup script: join the tailnet and expose the H200.
#
# Paste this into the "Setup script" field of a Claude Code cloud environment
# (claude.ai/code -> environment settings). It runs as root on Ubuntu 24.04
# before Claude Code launches.
#
# Requires, on the same environment:
#   Network access = Custom, with the Tailscale hosts allowlisted
#     (see docs/h200-tailscale-environment.md)
#   Environment variables:
#     TS_AUTHKEY   ephemeral, pre-authorized, tagged auth key  (required)
#     TS_HOSTNAME  tailnet name for the session  (optional)
#     H200_HOST    tailnet name of the workstation  (optional, default: h200)
#     H200_USER    login on the workstation  (optional, default: root)
#
# Contract for setup scripts: must exit 0 or the session fails to start, and
# must finish inside ~5 minutes. Every failure path below is therefore soft.

set -uo pipefail

SOCKS_PORT=1055
STATE_DIR=/var/lib/tailscale
LOG=/var/log/tailscale-setup.log

log() { echo "[tailscale-setup] $*" | tee -a "$LOG"; }

if [ -z "${TS_AUTHKEY:-}" ]; then
  log "TS_AUTHKEY is not set; skipping tailnet join."
  log "Add it to the environment's Environment variables to enable the H200."
  exit 0
fi

# 1. Install. Needs tailscale.com + pkgs.tailscale.com on the allowlist.
if ! command -v tailscaled >/dev/null 2>&1; then
  log "Installing Tailscale..."
  if ! curl -fsSL --max-time 120 https://tailscale.com/install.sh | sh >>"$LOG" 2>&1; then
    log "ERROR: install failed. Most likely the environment's network access"
    log "level does not allow tailscale.com. Session continues without the H200."
    exit 0
  fi
fi

# 2. Start the daemon in userspace mode.
#
# Userspace networking avoids depending on TUN and NET_ADMIN in the sandbox.
# The cost is that tailnet addresses are not routable by ordinary processes --
# they reach the tailnet through the SOCKS5 proxy this opens on localhost.
mkdir -p "$STATE_DIR"
if ! pgrep -x tailscaled >/dev/null 2>&1; then
  log "Starting tailscaled (userspace networking, SOCKS5 on :$SOCKS_PORT)..."
  tailscaled \
    --tun=userspace-networking \
    --socks5-server=localhost:$SOCKS_PORT \
    --outbound-http-proxy-listen=localhost:$SOCKS_PORT \
    --state="$STATE_DIR/tailscaled.state" \
    >>"$LOG" 2>&1 &
  for _ in $(seq 1 30); do
    tailscale status >/dev/null 2>&1 && break
    sleep 1
  done
fi

# 3. Join the tailnet. --ssh is deliberately omitted: the session is an SSH
# client here, not a target, and it should not be reachable from the tailnet.
log "Joining tailnet as ${TS_HOSTNAME:-claude-cloud-session}..."
if ! tailscale up \
      --authkey="$TS_AUTHKEY" \
      --hostname="${TS_HOSTNAME:-claude-cloud-session}" \
      --accept-dns=false \
      --accept-routes \
      --timeout=90s >>"$LOG" 2>&1; then
  log "ERROR: 'tailscale up' failed. Check the auth key and the allowlist."
  log "Diagnose in-session with: tailscale status; tail $LOG"
  exit 0
fi

log "Connected. Tailnet state:"
tailscale status 2>&1 | tee -a "$LOG" | head -20

# 4. Make the proxy the default for ordinary tools, so curl/git/python reach
#    tailnet services without per-command flags. 100.64.0.0/10 is already in
#    no_proxy, so this does not disturb the agent proxy's own routing.
cat >/etc/profile.d/tailscale-proxy.sh <<PROFILE
export ALL_PROXY=socks5h://localhost:$SOCKS_PORT
export H200_HOST=${H200_HOST:-h200}
export H200_USER=${H200_USER:-root}
PROFILE
chmod 0644 /etc/profile.d/tailscale-proxy.sh

# 5. Convenience wrapper. Tailscale SSH means no private key has to live in
#    this sandbox -- the workstation authorizes the session via tailnet ACLs.
cat >/usr/local/bin/h200 <<WRAPPER
#!/bin/bash
# Run a command on the H200 over Tailscale SSH:  h200 nvidia-smi
exec tailscale ssh "\${H200_USER:-${H200_USER:-root}}@\${H200_HOST:-${H200_HOST:-h200}}" "\$@"
WRAPPER
chmod 0755 /usr/local/bin/h200

# 6. Report reachability without failing the session if the box is asleep.
if tailscale ping --c=1 --timeout=5s "${H200_HOST:-h200}" >>"$LOG" 2>&1; then
  log "H200 (${H200_HOST:-h200}) is reachable. Try: h200 nvidia-smi"
else
  log "WARNING: ${H200_HOST:-h200} did not answer. It may be offline, named"
  log "differently, or blocked by tailnet ACLs. Check: tailscale status"
fi

exit 0
