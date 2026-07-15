export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const pathname = url.pathname;
    
    // Attempt to fetch the static asset from Cloudflare Workers Assets
    let response = await env.ASSETS.fetch(request);
    
    // SPA Routing Fallback:
    // If the asset does not exist (404) and is not a request for a static file (lacks an extension),
    // serve the root index.html to allow React Client-side Router to take over.
    if (response.status === 404 && !pathname.includes('.')) {
      const indexRequest = new Request(new URL('/index.html', request.url), request);
      response = await env.ASSETS.fetch(indexRequest);
    }
    
    // Inject Custom Security and Caching Headers
    const newHeaders = new Headers(response.headers);
    
    // Security Headers
    newHeaders.set('X-Content-Type-Options', 'nosniff');
    newHeaders.set('X-Frame-Options', 'DENY');
    newHeaders.set('X-XSS-Protection', '1; mode=block');
    newHeaders.set('Referrer-Policy', 'strict-origin-when-cross-origin');
    newHeaders.set('Content-Security-Policy', "default-src 'self' https: 'unsafe-inline' 'unsafe-eval'; img-src 'self' data: https:; font-src 'self' https: data:; connect-src 'self' https:;");
    
    // Caching Strategy:
    // Immutable caching for chunked build assets, short-term validation caching for routing indexes
    if (pathname.startsWith('/assets/')) {
      newHeaders.set('Cache-Control', 'public, max-age=31536000, immutable');
    } else {
      newHeaders.set('Cache-Control', 'public, max-age=3600, must-revalidate');
    }
    
    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: newHeaders
    });
  }
};
