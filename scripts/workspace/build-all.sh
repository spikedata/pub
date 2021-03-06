#!/bin/bash

PACKAGESTXT=$SPIKE_ROOT/pub/scripts/packages.txt

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# libs
PACKAGES=`grep -v ^\# "$PACKAGESTXT" | tr -s '\n' ' '`

for i in $PACKAGES
do
  DIR=${SPIKE_ROOT}/pub/${i}
  if [ ! -d "$DIR" ]; then
    printf "${RED}------------------------------------------\n${DIR}${NC} : missing\n"
    continue
  fi
  cd $DIR
  printf "${GREEN}------------------------------------------\n${DIR}\n------------------------------------------\n${NC}"
  yarn build
done
