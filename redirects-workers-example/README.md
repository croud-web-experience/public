# 👷 Cloudflare worker for redirects

* [`/src/index.js`](https://github.com/croud-web-experience/public/blob/master/redirects-workers-example/src/index.js) is the entrypoint.
* [`redirects.json`](https://raw.githubusercontent.com/croud-web-experience/public/master/cloudflare-workers-redirects-file/redirects.json) is the redirect file

## Example/testing
Requests to https://redirects-workers-example.croud-testing.workers.dev/ will expose the Worker.

### Redirects
Redirects will be triggered when appending the domain with `/old-domain-{x}`; with `{x}` being a number between 1 and 2,500.

#### Example request


## Technology
### Language
Written in JavaScript

### Deployment
Wrangler

## Documentation
* Cloudflare Workers: https://developers.cloudflare.com/workers/
* Cloudflare Workers Examples: https://developers.cloudflare.com/workers/examples
