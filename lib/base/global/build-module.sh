#!/bin/bash
set -e
FULLSCRIPTPATH=$(readlink --canonicalize $0) # full path, in case ./script.sh used
BASEDIR=$(dirname $FULLSCRIPTPATH)
cd $BASEDIR

YELLOW='\033[1;33m'
CYAN='\033[0;36m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# transpile
printf "${YELLOW}transpile${NC}\n"
tsc -p tsconfig.module.json

# transform import paths
printf "${YELLOW}transform import paths${NC}\n"
find ./build/module -iname \*.js -exec sh -c 'mv "$1" "${1%.js}.mjs"' _ {} \;
shopt -s globstar
./node_modules/.bin/jscodeshift ./build/module/**/*.mjs -t ./codemod/fix-mjs-import-paths.js > /dev/null
