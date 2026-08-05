# Instantiation Steps — SaaS Pipeline OS

## 1. Create product repository

Create a new repository from:

```text
dominikplicht/development-factory-blueprint
```

Recommended repo name:

```text
saas-pipeline-os
```

## 2. Clone and instantiate

```bash
git clone git@github.com:dominikplicht/saas-pipeline-os.git
cd saas-pipeline-os
scripts/factory/new-product.sh "SaaS Pipeline OS"
```

## 3. Copy this pack

Copy the included files into the new repo, preserving paths.

## 4. Validate baseline

```bash
npm ci
npm run typecheck
npm run lint
npm run test
npm run build
```

## 5. Start task execution

Recommended order:

```text
SPOS-001
SPOS-002
SPOS-003
SPOS-004
```

## 6. GitHub operating model

```text
1 task = 1 branch = 1 pull request = 1 validation run = 1 run record
```

## 7. Vercel

Connect the new product repository to Vercel after the baseline builds successfully.

## 8. Human gate

Before adding backend, auth, AI API, Notion integration, or GitHub writes, validate that the static/local MVP workflow is useful for at least three real idea-processing runs.
