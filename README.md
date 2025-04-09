## Requirements
- Bun
- Ansible

## Project setup
```
bun install
bun run dev
```

## Deploy
1. Put local `cat ~/.ssh/id_ed25519.pub` in the hosts `~/.ssh/authorized_keys` file
2. Run `ansible-playbook -i inventory.ini site.yml` in the `/deploy` directory
