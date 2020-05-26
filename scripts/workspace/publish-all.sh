#!/bin/bash
set -e # Exit immediately if a command exits with a non-zero status

usage() {
  echo "usage: $0 {update}"
  echo "update: --major --minor --patch"
};

if [ -z "$1" ]
then
  usage
  exit -1
fi

BUMP=$1 # options: --major --minor --patch
MONOREPO_ROOT=/spike/v8/pub # HACK
PUBLISHTXT=$MONOREPO_ROOT/scripts/publish.txt # note: not packages.txt


RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
DARKGRAY='\033[0;90m'
NC='\033[0m' # No Color

# pending commits?
cd $MONOREPO_ROOT
numUncommitted=`git status -sb | wc -l`
if ((numUncommitted > 1))
then
  git status -sb
  printf "${RED}ERROR: there are uncommited changes - commit these first before proceeding${NC}\n"
  exit -1
else
  printf "${CYAN}no pending changes, safe to proceed${NC}\n"
fi

# libs
PACKAGES=`grep -v ^\# "$PUBLISHTXT" | tr -s '\n' ' '`

runlog() {
  ARGS=$@ # so we can expand $@ with spaces between then in the printf line below
  printf "${DARKGRAY}${ARGS[*]}${NC}\n"
  # echo -e "${DARKGRAY}$@${NC}"
  eval $@
}

# pre-publish - clean and fix and check everything builds + tests pass
printf "${GREEN}------------------------------------------\npre-publish al ...\n------------------------------------------\n${NC}"
for i in $PACKAGES
do
  DIR=${MONOREPO_ROOT}/${i}
  if [ ! -d "$DIR" ]; then
    printf "${RED}------------------------------------------\n${DIR}${NC} : missing\n"
    continue
  fi
  runlog cd $DIR
  printf "${GREEN}------------------------------------------\n${DIR} : pre-publish\n------------------------------------------\n${NC}"

  yarn run pre-publish
  # build, test, coverage-check
done

# all pre-publish scripts succeded, so bump versions and publish
printf "${GREEN}------------------------------------------\nall pre-publish succeeded, next: bump, publish and push\n------------------------------------------\n${NC}"
for i in $PACKAGES
do
  DIR=${MONOREPO_ROOT}/${i}
  if [ ! -d "$DIR" ]; then
    printf "${RED}------------------------------------------\n${DIR}${NC} : missing\n"
    continue
  fi
  runlog cd $DIR
  printf "${GREEN}------------------------------------------\n${DIR} : version & publish\n------------------------------------------\n${NC}"

  # note: tagged monorepo
  runlog yarn version --no-git-tag-version $BUMP
  export NPM_REGISTRY_URL=registry.npmjs.org # fails with "401 Unauthorized - PUT https://registry.yarnpkg.com" otherwise?
  runlog npm publish --access public # not `yarn publish` - it will do a version bump
done
printf "${CYAN}version bump the monorepo${NC}\n"
runlog cd $MONOREPO_ROOT
runlog git commit -m "version bump" # commit version bumps in $PACKAGES/package.json
runlog yarn version $BUMP # package.json:version + git tag for monorepo
# TODO: use standard-version for changelog?
printf "${CYAN}push monorepo to git${NC}\n"
runlog git push --follow-tags origin master
