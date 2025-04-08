#!/bin/bash

if command -v apt >/dev/null 2>&1; then
  sudo apt update && sudo apt install -y pipx
  pipx ensurepath
  pipx install --include-deps ansible
elif command -v dnf >/dev/null 2>&1; then
  sudo dnf update && sudo dnf install -y ansible
else
  echo "package manager not configured"
  exit 1
fi

