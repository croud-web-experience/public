/*
  Using Cloudflare Workers to add trailing slash on any URL that does not have it. This PoC will provide a 200-OK status code for requests with a trailing slash.

  There will be an exclusion folder included, to simulate resources (JS, CSS, image files) being stored in a single folder. Any requests to this folder will be excluded from the rules.

*/

// First listen to the fetch event, which will be handled by the Worker
addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

// Handle the inbound request
const handleRequest = async (request) => {

  // Store the request URL as an URL object
  const url = new URL(request.url);

  // The folder exclusion can be added within the conditional statement; but I kept it on its own level for readability and to allow other rules to be added if wanted.
  if(!url.pathname.includes('/files/')){
    
    // Check if last character of the path has a trailing slash. QSP should not be impacted.
    if((url.pathname.slice(-1)!== '/')){
      url.pathname += '/';
      return Response.redirect(url, 308);
    }
  }

  // Create a nice response for people to see that something worked.
  return new Response(
    `
      <h1>Trailing slash adder</h1>
      <p>Your request to ${url.pathname} is now resolved.</p>
    `,
    {
      status:200,
      headers:{
        'content-type':'text/html',
        'x-robots-tag':'noindex'
      }
    }
  );
}