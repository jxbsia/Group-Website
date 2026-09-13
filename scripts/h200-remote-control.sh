#!/usr/bin/env bash
#
# Keep a Claude Code Remote Control server alive on this workstation so it can
# be driven from the Claude mobile app.
#
# Run this ON the H200, not in a cloud session.
#
#   ./scripts/h200-remote-control.sh              # serve the current directory
#   ./scripts/h200-remote-control.sh ~/work/repo  # serve another project
#
# Re-running attaches to the existing server instead of starting a second one.
#
# FIRST RUN MUST BE INTERACTIVE. Before using this script, run these once by
# hand in the project directory so nothing blocks on a prompt inside tmux:
#
#   claude                  # accept the workspace trust dialog, then /login
#   claude remote-control   # answer "Enable Remote Control? (y/n)" with y
#
# Detach from tmux with Ctrl+B then D. The server keeps running after you
# close the SSH connection.

set -euo pipefail

SESSION_NAME="${CLAUDE_TMUX_SESSION:-claude-h200}"
PROJECT_DIR="$(cd "${1:-$PWD}" && pwd)"
SERVER_NAME="${CLAUDE_RC_NAME:-$(hostname -s)}"

# same-dir is the default; worktree gives each on-demand session its own git
# worktree, which avoids two phone-started sessions editing the same files.
SPAWN_MODE="${CLAUDE_RC_SPAWN:-same-dir}"

die() { echo "error: $*" >&2; exit 1; }

command -v claude >/dev/null 2>&1 || die "claude is not on PATH"
command -v tmux   >/dev/null 2>&1 || die "tmux is not installed (apt install tmux)"

if [ "$SPAWN_MODE" = "worktree" ] && \
   ! git -C "$PROJECT_DIR" rev-parse --git-dir >/dev/null 2>&1; then
  die "worktree spawn mode needs a git repository; $PROJECT_DIR is not one"
fi

# Remote Control needs feature-flag evaluation and the real Anthropic endpoint.
# These are the settings that silently disable it.
for var in DISABLE_TELEMETRY DO_NOT_TRACK CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC DISABLE_GROWTHBOOK; do
  if [ -n "${!var:-}" ]; then
    echo "warning: $var is set, which disables Remote Control. Unset it." >&2
  fi
done
if [ -n "${ANTHROPIC_BASE_URL:-}" ] && [[ "$ANTHROPIC_BASE_URL" != *"api.anthropic.com"* ]]; then
  echo "warning: ANTHROPIC_BASE_URL points away from api.anthropic.com;" >&2
  echo "         Remote Control will refuse to start. Unset it." >&2
fi

if tmux has-session -t "$SESSION_NAME" 2>/dev/null; then
  echo "Attaching to the running server in tmux session '$SESSION_NAME'."
  echo "Detach again with Ctrl+B then D."
  exec tmux attach-session -t "$SESSION_NAME"
fi

echo "Starting Remote Control server for $PROJECT_DIR"
echo "  tmux session : $SESSION_NAME"
echo "  spawn mode   : $SPAWN_MODE"

tmux new-session -d -s "$SESSION_NAME" -c "$PROJECT_DIR" \
  claude remote-control --name "$SERVER_NAME" --spawn "$SPAWN_MODE"

# Give the server a moment to fail loudly (bad login, ineligible account).
sleep 3
tmux has-session -t "$SESSION_NAME" 2>/dev/null || \
  die "the server exited immediately; run 'claude remote-control' by hand to see why"

cat <<'NEXT'

Server is up. To reach it from your phone:

  1. Open the Claude app and tap Code.
  2. Find the session in the list -- a computer icon with a green dot.

Or attach here and press spacebar for a QR code you can scan:

  tmux attach -t claude-h200

Turn on push notifications from the session with /config:
  "Push when Claude decides" and "Push when actions required".

NEXT
