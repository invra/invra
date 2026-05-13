Building the website
====================

How to build the website, outlines basically everything not implied

Dependencies
------------

* Cargo (rustup w/wasm32-unknown-unknown)
* cloudflare `worker-build`
* cloudflare `wrangler`


Pre-build artifacts
-------------------

What this means is certain files which need to be there before building/deploying

* .env

has to provide:

* `LFM_USERNAME`

target of Last.fm data.

* `LFM_AVCESS_TOKEN`

target given from `Create API account <https://www.last.fm/api/account/create>`_.
