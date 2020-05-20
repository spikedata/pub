#!/bin/bash

CYAN='\033[0;36m'
RED='\033[0;31m'
NC='\033[0m' # No Color

numUncommitted=`git status -sb | wc -l`

if ((numUncommitted > 1))
then
  printf "${RED}ERROR: there are uncommited changes - commit these first before proceeding${NC}\n"
  exit -1
else
  printf "${CYAN}no changes, safe to reset${NC}\n"
fi