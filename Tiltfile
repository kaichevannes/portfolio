k8s_yaml(kustomize('cluster/manifest/overlays/development'))

docker_build(
  'myregistry.localhost:5000/kaichevannes/portfolio',
  '.',
  dockerfile='Dockerfile.dev',
  live_update=[
    sync('./src/', '/app/src/'),
    run(
      'bun install --frozen-lockfile',
      trigger=['./package-lock.json']
    )
  ]
)
