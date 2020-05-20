#!/bin/bash
set -e # Exit immediately if a command exits with a non-zero status
FULLSCRIPTPATH=$(readlink --canonicalize $0) # full path, in case ./script.sh used
BASEDIR=$(dirname $FULLSCRIPTPATH)
echo BASEDIR=${BASEDIR}
cd $BASEDIR
cp ../../node_modules/@spike/api/build/umd/spike-api.umd.* $BASEDIR/src/ux/cdn