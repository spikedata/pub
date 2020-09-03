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

## Link priv to pub

```sh
cd /spike/v8/pub/lib/core/api
yarn link
cd /spike/v8/pub/lib/base/global
yarn link
cd ../priv
yarn link @spike/api
yarn link @spike/global
# check symlinks:
# ls -l ~/.config/yarn/link/@spike/
```
