## Project setup
1. Install Docker Desktop (enable WSL connection if on Windows)
2. Install k3d: `curl -s https://raw.githubusercontent.com/k3d-io/k3d/main/install.sh | bash`
3. Install Tilt: `curl -fsSL https://raw.githubusercontent.com/tilt-dev/tilt/master/scripts/install.sh | bash`
4. Start k3d cluster: `k3d cluster create -p "80:80@loadbalancer"`
5. Deploy: `kubectl -k cluster_config/overlays/development`
6. Access web app at: `http://localhost`

## Bootstrap cluster
1. Install ansible
2. `ansible-playbook -i cluster_bootstrap/inventory.ini cluster_bootstrap/bootstrap.yml ~/path/to/sever-ssh-key.pem`

**Note: to access an ssh key from WSL, copy into .ssh and then chmod 600**
