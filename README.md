# Silta frontend project template

This is a basic repository template for deploying a node.js application with the Silta `frontend` chart.

The express application in index.js is just there as an example, feel free to replace it. The only requirements are:

- Your project's `package.json` should be in the repository root. 
- Your `package.json` includes a `build` command used to build the codebase after the installation of npm packages.
- Your `package.json` includes a `start` command used to start your application in the deployed environment.

## NVM (Node Version Manager)

It is recommended to use [NVM](https://github.com/nvm-sh/nvm) in order to switch on correct Node.js and npm versions with ease.

On Linux and MacOS use:
```shell
nvm use
```

On Windows use:
```shell
nvm use $($Get-Content .nvmrc)
```

## ArgoCD deployment

Projects created from this template can deploy with ArgoCD instead of Silta's CircleCI jobs.
The platform side lives in [wunderio/argocd-cluster-management](https://github.com/wunderio/argocd-cluster-management)
(`templates/argocd/README.md` there).

- `k8s/staging/`: the `main`/`master` branch deploys to the `staging` environment.
- `k8s/feature/`: pull requests from `feature/*`, `hotfix/*` and `epic/*` deploy to `pr-<N>`
  environments, removed when the pull request closes.
- `.github/workflows/build.yml` builds the images, pushes them to `registry.wdr.io/<repository>/` and
  commits the new tags to `k8s/<overlay>/values/frontend.yaml`. ArgoCD deploys that commit.

Add `k8s/develop/` or `k8s/production/` (copies of `k8s/staging/`) to deploy the `develop` or
`production` branch too. Every project needs `k8s/staging/apps.yaml` on `main`/`master`: the
staging environment creates the project's ArgoCD project.

**This template repository never deploys itself.** ArgoCD only picks up repositories named
`client-*` or `internal-*` that have the `silta-argocd` topic. The build workflow skips the
image and tag jobs when the repository is a template.

### Setting up a new project

1. Create the repository from this template with a `client-*` or `internal-*` name.
2. Replace the `PROJECT_NAME` placeholders with the repository name in lowercase. It is the
   Kubernetes namespace and the Harbor project name:

   ```bash
   name=$(basename "$(git rev-parse --show-toplevel)" | tr '[:upper:]' '[:lower:]')
   grep -rl PROJECT_NAME k8s | xargs sed -i "s/PROJECT_NAME/$name/g"
   ```

3. Remove the Silta deploy jobs from `.circleci/config.yml` so the project doesn't deploy twice.
4. Add the `silta-argocd` topic to the repository (repository page → About → Topics). New
   repositories don't inherit the template's topics.

The build workflow uses the organisation's `REGISTRY_USERNAME`, `REGISTRY_PASSWORD`,
`ARGOCD_APP_ID` and `ARGOCD_APP_PRIVATE_KEY` secrets. The tag commit is made with the
ArgoCD GitHub App so it passes branch protection.

### Secrets

Put Kubernetes Secrets in `k8s/<overlay>/secrets/<name>.sops.yaml`, encrypt them, and set
`secrets.enabled: true` in that overlay's `apps.yaml`. `.sops.yaml` encrypts them to the shared
tenant key, which only ArgoCD can decrypt:

```bash
sops --encrypt --in-place k8s/staging/secrets/app.sops.yaml
```

A file may hold only `apiVersion: v1`, `kind: Secret` objects in the project's namespace;
anything else fails the deployment. Never commit a decrypted file.

## Troubleshooting

### On Windows

- Linting probably won't work directly with command `npm run lint` do it via lint-staged with command `npx lint-staged`.
  Don't worry per-commit hooks will work fine.
- In your code editor use LF all the time, otherwise there will be prettier errors when linting.
- If having LF in your editor is not enough, try this command "git config --global core.autocrlf false".More info here https://stackoverflow.com/questions/25724969/sourcetree-line-ending-issue
