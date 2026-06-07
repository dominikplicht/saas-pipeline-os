#!/usr/bin/env bash
#
# Instantiate the blueprint for a new product.
#
# Run this ONCE in a fresh copy of the blueprint repo (created via GitHub's
# "Use this template"). It clears product-instance state, empties the task graph,
# sets product metadata, and leaves the factory itself (workflows, policies,
# specs) untouched.
#
# Usage: scripts/factory/new-product.sh "My Product Name"

set -euo pipefail

NAME="${1:-}"
if [[ -z "$NAME" ]]; then
  echo "Usage: $0 \"Product Name\"" >&2
  exit 1
fi

root="$(cd "$(dirname "$0")/../.." && pwd)"
cd "$root"

# Create an npm-safe package slug from the product name.
SLUG="$(printf '%s' "$NAME" \
  | tr '[:upper:]' '[:lower:]' \
  | sed -E 's/[^a-z0-9]+/-/g; s/^-+//; s/-+$//; s/-+/-/g')"

if [[ -z "$SLUG" ]]; then
  echo "Could not derive a package name from: $NAME" >&2
  exit 1
fi

echo "Instantiating blueprint for: $NAME"
echo "Package slug: $SLUG"

# 1. Clear product-instance run records while keeping directory placeholders.
if [[ -d .factory/runs ]]; then
  find .factory/runs -mindepth 1 ! -name '.gitkeep' -exec rm -rf {} +
fi

# 2. Clear product-instance ready tasks while keeping directory placeholders.
if [[ -d .factory/tasks/ready ]]; then
  find .factory/tasks/ready -type f -name '*.yaml' -delete
  find .factory/tasks/ready -mindepth 1 -type d -exec rm -rf {} +
fi

# 3. Empty the task graph.
cat > .factory/tasks/task-graph.yaml <<YAML
version: 0.1

source:
  product: ${NAME}
  generated_at: null

tasks: []

edges: []
YAML

# 4. Set the product name in the app metadata file.
if [[ -f src/lib/site.ts ]]; then
  tmp="$(mktemp)"
  sed "s/name: \".*\"/name: \"${NAME}\"/" src/lib/site.ts > "$tmp" && mv "$tmp" src/lib/site.ts
fi

# 5. Set package metadata for the instantiated product.
if command -v npm >/dev/null 2>&1 && [[ -f package.json ]]; then
  npm pkg set name="$SLUG" >/dev/null
elif [[ -f package.json ]]; then
  tmp="$(mktemp)"
  sed "s/\"name\": \"[^\"]*\"/\"name\": \"${SLUG}\"/" package.json > "$tmp" && mv "$tmp" package.json
fi

# 6. Keep package-lock metadata in sync when npm is available.
if command -v npm >/dev/null 2>&1 && [[ -f package-lock.json ]]; then
  npm install --package-lock-only --ignore-scripts >/dev/null
fi

echo "Done."
echo "Next steps:"
echo "  1. Fill .factory/product/product-intent.md (or paste your vision to Claude)."
echo "  2. Ask Claude to generate the PRD + task graph and start building."
echo "  See docs/factory/USING-THE-BLUEPRINT.md"
