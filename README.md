# Spike public repo

Contains code which is published to npm public registry. This code is also hosted in a public github repo.

## Setup

```sh
sudo mkdir -p /spike/v8
cd /spike/v8
git clone https://github.com/spikedata/spike-public.git pub
cd pub
yarn install # install all sub-package deps, de-dups into ./node_modules, sets up symlinks to internal pkgs
./scripts/workspace/build-all.sh # will build in correct sequence
```
