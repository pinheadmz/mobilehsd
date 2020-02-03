## Run a Handshake SPV node in a web browser

This is an experimental fork of https://github.com/pinheadmz/mobilebcoin

See that repo's README for more details.

hsd is compiled with this command:

```
cd <hsd repo root directory>
bpkg --browser --umd --plugin [ uglify-es --toplevel ] --name HSD --output <path to this repo>/hsd.js lib/hsd.js
```

### Installation & usage

```
git clone
cd mobilehsd
npm install
node server.js
```

A local websocket proxy server is now running on your local machine, which will serve the web interface as well as connect the browser to the open Internet via TCP.

Then you can open a web browser to `http://localhost:8080`

### DISCLAIMER

This is experimental. Browsers are bad places for crypto.

Also - this SPV node connects initially to the [HNScan](https://hnscan.com/status) node, which serves BIP37 light clients.
This peer is hard-coded because, again, this is just a proof-of-concept for testing.
