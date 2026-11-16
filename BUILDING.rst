Building the website
====================

How to build the website, outlines basically everything not implied

Dependencies
------------

* Cargo (rustup w/wasm32-unknown-unknown)
* cloudflare `worker-build`
* cloudflare `wrangler`
* Node.js + npm (for the SvelteKit site in ``web/``)


Pre-build artifacts
-------------------

What this means is certain files which need to be there before building/deploying

* .env

has to provide:

* `LFM_USERNAME`

target of Last.fm data.

* `LFM_AVCESS_TOKEN`

target given from `Create API account <https://www.last.fm/api/account/create>`_.

* `DOB`

date of birth as ``DD-MM-YYYY``, used for the age on the home page. Inlined into the
site at build time (see ``web/src/env.ts``).

Layout
------

* ``proxy/`` - Rust worker, only handles ``/api/projects`` and ``/api/tracks``.
* ``web/`` - SvelteKit site, prerendered to static files in ``web/build``.

``wrangler.toml`` serves ``web/build`` as static assets and only routes ``/api/*`` to the worker.
``wrangler deploy`` builds both.

Development
-----------

Run the proxy with ``wrangler dev`` (port 8787), then in ``web/`` run ``npm run dev``.
The Vite dev server (port 8080) proxies ``/api`` to the worker.

Blog posts are markdown files in ``web/src/content``; the path becomes the URL under ``/blog``.
