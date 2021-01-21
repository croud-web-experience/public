# 👷 Cloudflare Worker to remove trailing slash

* [`/src/index.js`](https://github.com/croud-web-experience/public/blob/master/cloudflare-workers-trailing-slash-example/src/index.js) is the entrypoint.

## Example/testing
Requests to https://workers-trailing-slash-hompepage-example.croud-testing.workers.dev will expose the Worker.

### Redirects
* Requests to URLs with trailing slash will result in 308-Permanent Redirect to the version without trailing slash
* Requests to URLs without trailing slash will result in 200-OK status code


#### Example requests
* *200-OK*: https://workers-trailing-slash-hompepage-example.croud-testing.workers.dev/
* *200-OK*: https://workers-trailing-slash-hompepage-example.croud-testing.workers.dev/hello-world
* *308-Perm. Redir.*: https://workers-trailing-slash-hompepage-example.croud-testing.workers.dev/foo-bar/

## Technology
### Language
Written in JavaScript

### Deployment
Wrangler

## Documentation
* Cloudflare Workers: https://developers.cloudflare.com/workers/
* Cloudflare Workers Examples: https://developers.cloudflare.com/workers/examples

## Written by
Kevin Ellen, Director of Web Experience - Croud