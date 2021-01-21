/*
  Using Cloudflare Workers to remove trailing slash on any URL. This PoC will provide a 200-OK status code for requests without a trailing slash.
*/

// First listen to the fetch event, which will be handled by the Worker
addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

// Handle the inbound request
const handleRequest = async (request) => {

  // Store the request URL as an URL object
  const url = new URL(request.url);

  // Check if last character of the path is trailing slash. QSP/extensions/etc should not be impacted. And statement to include pathname not being exactly '/'.

  // The exclusion can be taken out of the conditional statement, but I wanted to avoid nesting too much.

  if((url.pathname.slice(-1)=== '/') && (url.pathname!=='/')){
    url.pathname = url.pathname.slice(0, -1);
    return Response.redirect(url, 308);
  }
 
  // Create a nice response for people to see that something worked.
  return new Response(
    `
      <h1>Trailing slash remover</h1>
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