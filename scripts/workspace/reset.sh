#!/bin/bash
cd /spike/v8/pub
find . -name "node_modules" -type d -not -path "*node_modules/*" -exec rm -rf {} \;
find . -name package-lock.json -exec rm {} \;
find . -name "build" -type d -not -path "*node_modules/*" -and -not -path "*build/*" -exec rm -rf {} \;
find . -name "dist" -type d -not -path "*node_modules/*" -and -not -path "*dist/*" -exec rm -rf {} \;
rm yarn.lock