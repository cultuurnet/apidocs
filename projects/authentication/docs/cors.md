# CORS

<!-- theme: success -->

> Our APIs generally allow CORS requests from **any origin**.

If you encounter CORS issues after all, double check what headers you are trying to include in your requests. Some APIs may only allow headers that they actually use like `authorization` for tokens, `content-type` and `accept` for content negotiation, etc. Try to keep the headers in your request to the ones that are actually required / useful.

If this doesn't solve the issue [contact our support](https://docs.publiq.be/#contact-us) for more help. The API you are using might need to be updated to allow requests from any origin, or there might be a bug in the CORS logic on that specific API. Remember to include a copy of the complete request you are trying to send (for example as `HAR` or `curl`), and ideally also include the complete `OPTIONS` request if the browser is doing a preflight request.

## What is CORS?

[Cross-Origin Resource Sharing (CORS)](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) makes it possible to send HTTP requests that would otherwise be disallowed by a browser's [Same Origin Policy](https://developer.mozilla.org/en-US/docs/Web/Security/Same-origin_policy).

For example when you make a request from a **frontend** application to an external API endpoint, you might see the following error in your browser's console:

```
Cross-Origin Request Blocked: The Same Origin Policy disallows reading the remote resource at ...
```

This policy is built into modern browsers to for example prevent [CSRF](https://owasp.org/www-community/attacks/csrf) attacks due to the browser making an authenticated request to another domain using cookies, without the consent or the knowledge of the user.

Additionally the Same Origin Policy prevents attacks at websites hosted on an intranet by limiting the requests that a website can make to another website through a browser.

Because publiq's APIs do not work with cookies and are publicly hosted, there is no need for a strict Same Origin Policy in our case. Therefore our APIs generally allow CORS requests from any origin (unless noted otherwise).
