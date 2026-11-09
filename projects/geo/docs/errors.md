# Errors

This page contains an overview of all error types inside the `https://api.publiq.be/probs/geo-api/` namespace that the Geo API can return.

> For more info about error handling on our APIs in general, see the dedicated [Errors](https://docs.publiq.be/docs/errors/d6a8ba3f3c186-introduction) space. The Geo API also returns the generic error types described there, for example `https://api.publiq.be/probs/url/not-found` when a query parameter is missing or invalid.

## location-not-found

* **Complete type:** `https://api.publiq.be/probs/geo-api/location-not-found`
* **Title**: `Location not found`
* **Status**: `404`

You asked for a route and gave the `origin`, the `destination` or a `via` point as text, but no location matched that text. The `detail` property tells you which parameter could not be resolved.

Check the spelling, add the municipality, or resolve the text yourself first with [`GET /coordinates`](/reference/geo-api.json/paths/~1coordinates/get) and let the user pick from the results.

Note that [`GET /coordinates`](/reference/geo-api.json/paths/~1coordinates/get) itself never returns this error: a query that matches nothing gives a `200` with an empty `member`.

## route-not-found

* **Complete type:** `https://api.publiq.be/probs/geo-api/route-not-found`
* **Title**: `Route not found`
* **Status**: `404`

All points were resolved, but no route exists between them for the requested `mode`. This happens when a point lies outside the area covered by the routing engine, on an island without a ferry, or when the only way between the points is not allowed for the mode (for example a highway for `bicycle`).

Try another `mode`, or check that the waypoints are where you expect them to be by resolving them with [`GET /coordinates`](/reference/geo-api.json/paths/~1coordinates/get).

## Other status codes

* `404` `https://api.publiq.be/probs/url/not-found`: a required query parameter is missing, has an invalid value, or two parameters cannot be combined (for example `alternatives` with `via`). The `detail` names the parameter.
* `502` `about:blank`, title `Bad Gateway`: one of the sources behind the Geo API did not answer. Retry after a short delay.
* `500` `about:blank`, title `Internal Server Error`: something went wrong on our side. Contact the helpdesk if it keeps happening.
