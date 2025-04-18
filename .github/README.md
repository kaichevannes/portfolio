## Project setup
1. Install Docker Desktop (enable WSL connection if on Windows)
2. Install k3d: `curl -s https://raw.githubusercontent.com/k3d-io/k3d/main/install.sh | bash`
3. Install Tilt: `curl -fsSL https://raw.githubusercontent.com/tilt-dev/tilt/master/scripts/install.sh | bash`
4. Start k3d cluster: `k3d cluster create portfolio-cluster -p "80:80@server:0"`
5. Deploy: `kubectl -k cluster_config/overlays/development`
6. Access web app at: `http://localhost`

## Bootstrap cluster
1. Install ansible
2. Create a [Github Personal Access Token](https://github.com/settings/personal-access-tokens)
- `Administration` -> `Access: Read-only`
- `Contents` -> `Access: Read and write`
- `Metadata` -> `Access: Read only`
3. Set environment variables
- `export ANSIBLE_PRIVATE_KEY_FILE=/path/to/server-ssh-key` (or add yourself to the machines vm accepted keys file)
- `export GITHUB_TOKEN=yourtoken`
- `export PORKBUN_API_KEY=porkbunapikey`
- `export PORKBUN_SECRET_API_KEY=porkbunsecretkey`
3. `cd cluster/ansible_bootstrap`
4. `ansible-playbook -i inventory.ini bootstrap.yml`

**Note: to access an ssh key from WSL, copy into .ssh and then chmod 600**

## Troubleshooting
- `flux reconcile source git portfolio`
