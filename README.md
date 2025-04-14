## Project setup
1. Install Docker Desktop (enable WSL connection if on Windows)
2. Install k3d: `curl -s https://raw.githubusercontent.com/k3d-io/k3d/main/install.sh | bash`
3. Install Tilt: `curl -fsSL https://raw.githubusercontent.com/tilt-dev/tilt/master/scripts/install.sh | bash`
4. Start k3d cluster: `k3d cluster create -p "80:80@loadbalancer"`
5. Deploy: `kubectl -Rf apply kubernetes/`
6. Access web app at: `http://localhost`

## Deploy
1. Put local `cat ~/.ssh/id_ed25519.pub` in the hosts `~/.ssh/authorized_keys` file
