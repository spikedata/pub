#!/bin/bash
set -e
set -x
cd $SPIKE_ROOT/pub
find . -name "@spike" -type d -not -path "./node_modules/*" -print0 | xargs -0 rm -rf
