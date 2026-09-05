#!/usr/bin/env bash
# Builds both apps as static bundles and assembles the deployable site.
#
#   dist/compare.html   the shell (origins resolve to /master and /pr off localhost)
#   dist/master/        master as installed today
#   dist/pr/            the same components with PR #11766 applied
set -euo pipefail

root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
dist="$root/dist"

rm -rf "$dist"
mkdir -p "$dist"

for side in master pr; do
  echo "building $side"
  npm --prefix "$root/apps/$side" run build -- --base="/$side/" --outDir "$dist/$side" --emptyOutDir
done

cp "$root/compare.html" "$root/index.html" "$dist/"
echo "built -> $dist"
