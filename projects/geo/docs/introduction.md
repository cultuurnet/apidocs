# Introduction

The Geo API answers two questions for the applications built on publiq's platform:

* **Where is this?** Turn an address, a venue or a point of interest into coordinates with [`GET /coordinates`](/reference/geo-api.json/paths/~1coordinates/get).
* **How do I get there?** Calculate a route between two points, with distance, duration, its shape and the area it covers, with [`GET /routes`](/reference/geo-api.json/paths/~1routes/get).

Typical uses are a "near me" or "along my route" search for events in UiTdatabank, showing a venue on a map, or validating the address of a new place.

## About the API

The Geo API follows the [REST](https://en.wikipedia.org/wiki/Representational_state_transfer) principles shared by all publiq APIs: predictable resource-oriented URLs, JSON responses, standard HTTP methods and status codes, and [problem+json errors](./errors.md).

It is a read-only API. Both resources are `GET` requests with query parameters, which makes them safe to retry and cache.

Behind the scenes the API combines several sources, for example the places in UiTdatabank, OpenStreetMap and a routing engine. You never talk to those sources directly, and the response format does not change when a source is added or replaced.

## In this documentation

* [Authentication](./authentication.md): work in progress
* [Terminology](./terminology.md): coordinates, locations, routes and bounds
* [Errors](./errors.md): the error types specific to the Geo API
* [Finding coordinates](./finding-coordinates.md): how to get good matches
* [Calculating routes](./calculating-routes.md): routes from text or coordinates, and finding events along a route
* The [API reference](/reference/geo-api.json) with every parameter and property

## Environments

| Environment | Base URL                     |
| ----------- | ---------------------------- |
| Testing     | `https://geo-test.publiq.be` |
| Production  | `https://geo.publiq.be`      |

Use the testing environment while you build, and switch to production when you go live. The testing environment may be connected to the test environments of the sources behind the API, so results can differ from production.
