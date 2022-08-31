# HTTPS

Every publiq API works over HTTPS (`https://...`).

If you request an API URL over HTTP (`http://...`), the API will usually return a [`301 Moved Permanently` redirect response](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/301) to the HTTPS equivalent of the URL. However HTTP clients usually change the method of the request to `GET` when following such redirects, or do not follow redirects at all.

To ensure a reliable experience, make sure to always use HTTPS URLs in your API requests.
