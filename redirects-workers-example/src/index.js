/*
  Using Cloudflare workers to implement a migration, where the redirects are performed by the Cloudflare Worker opposed to being done by the origin server.
  The external redirect file can be found at: https://raw.githubusercontent.com/croud-web-experience/public/master/cloudflare-workers-redirects-file/redirects.json
*/

// First listen to the fetch event, which will be handled by the Worker
addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

// Handle the inbound request
const handleRequest = async (request) => {

  // Get the redirects from the (public) GitHub file. As there are two promises, I wrapped them into a single async method
  const redirectsObj = await(await fetch('https://raw.githubusercontent.com/croud-web-experience/public/master/cloudflare-workers-redirects-file/redirects.json')).json();

  // Store the request URL as an URL object
  const url = new URL(request.url);

  // Check if the path is within the redirects object
  if(redirectsObj.hasOwnProperty(url.pathname)){

    // Redirect has been found, store the data in a variable for ease of use in this example
    const redirDestination = redirectsObj[url.pathname].to;
      
    // define the URL. If the string does not start with 'http', add the HTTPS scheme and current domain; we can hard-code the current domain

    const redirUrl = redirDestination.substring(0,4) === 'http' ? redirDestination :  'https://'  +url.host + redirDestination;
    // Return the response with the redirecting URL and status
    return Response.redirect(redirUrl, 301);
  }

  /* Disabled for now, as there are no resources
    // Return a normal response, grabbing the original request
    return fetch(request);
  */
  return new Response(
    `
      <h1>Welcome!</h1><p>To view a redirect, please append the URL with <code>/old-domain-{x}</code>. <code>{x}</code> can be any number between 1 and 2,500.</p>
      <p>Example link: <a href="/old-domain-321">/old-domain-321</a></p>
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