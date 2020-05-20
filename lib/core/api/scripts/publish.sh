#!/bin/bash
set -e # Exit immediately if a command exits with a non-zero status

CYAN='\033[0;36m'
RED='\033[0;31m'
NC='\033[0m' # No Color

BASEDIR=$(dirname $0)
cd $BASEDIR/..

printf "${CYAN}npm run prepare-release${NC}\n"
npm run prepare-release

printf "${CYAN}git push --follow-tags origin master${NC}\n"
git push --follow-tags origin master

printf "${CYAN}npm publish --access public${NC}\n"
npm publish --access public

# don't need to update using compatible package in samples: i.e. "@spike/api": "^1.0.2"
# printf "${CYAN}update @spike/sample-simple/package.json to latest version${NC}\n"
# cd ../sample-simple
# npm install -S @spike/api@latest

# printf "${CYAN}update @spike/sample-web/package.json to latest version${NC}\n"
# cd ../sample-web
# npm install -S @spike/api@latest
