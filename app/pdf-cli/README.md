# Desktop pdf converter (aka @spike/pdf-cli)

This repo contains the source code for our [desktop pdf converter](https://app.spikedata.co.za/docs/solutions/statement-processing/desktop-converter/). The tool can be used directly without needing the source code. However we have made the source code publicly accessible in order to provide a useful demonstration of using the [pdf API](https://app.spikedata.co.za/docs/code/api/pdf/) in a more complete application than the [CLI app](https://app.spikedata.co.za/docs/code/samples/spike-sample-client/) sample.

## Documentation

See [desktop pdf converter](https://app.spikedata.co.za/docs/solutions/statement-processing/desktop-converter/)

## Demo

This video shows the desktop converter in action. NOTE: the link below opens in YouTube - make sure that you have YouTube > Setting > Quality = 1080p (or at least 720p) in order to see the text in the video.

[![How to use the desktop pdf converter](http://img.youtube.com/vi/IA85VADi-6g/0.jpg)](https://www.youtube.com/watch?v=IA85VADi-6g "How to use the desktop pdf converter")

## Source code

```bash
# clone source code and install package dependencies:
git clone https://github.com/spikedata/pub
cd pub
yarn install

# run
node ./app/pdf-cli/src/app --version
```
