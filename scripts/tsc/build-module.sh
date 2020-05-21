#!/bin/bash
set -e

usage() {
  echo "usage: $0 {pkg-dir}"
};

if [ -z "$1" ]
then
  usage
  exit -1
fi

FULLSCRIPTPATH=$(readlink --canonicalize $0) # full path, in case ./script.sh used
MONOREPOROOT=$(dirname $(dirname $(dirname $FULLSCRIPTPATH)))
PKGDIR=$1

YELLOW='\033[1;33m'
CYAN='\033[0;36m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# update path
PATH=$PATH:${MONOREPOROOT}/node_modules/.bin:${PKGDIR}/node_modules/.bin

# tsconfig
cd $PKGDIR
if [ -f tsconfig.module.json ]; then TC=tsconfig.module.json; else TC=${MONOREPOROOT}/tsconfig.module.json; fi

# transpile
printf "${YELLOW}transpile${NC}\n"
rm -rf ${PKGDIR}/build/module
tsc -p ${TC}

# transform import paths
printf "${YELLOW}transform import paths${NC}\n"
find ${PKGDIR}/build/module -iname \*.js -exec sh -c 'mv "$1" "${1%.js}.mjs"' _ {} \;
shopt -s globstar
jscodeshift ${PKGDIR}/build/module/**/*.mjs -t ${MONOREPOROOT}/codemod/fix-mjs-import-paths.js > /dev/null
