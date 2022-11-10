# Pagination

API endpoints that return large lists of data should use pagination to limit responses to acceptable sizes and prevent memory issues on the API's server.

To make pagination logic easy to re-use for integrators across our APIs, we have agreed on a common approach to implement across our APIs.

At the time of writing, there is no official RFC for pagination on APIs, so we have agreed on a custom internal standard based on Search API v3's existing pagination logic.

## Parameters

Endpoints that support pagination must support the following two (optional) query parameters:

* `start`: An integer, `>= 0`, indicating the result number from where to start including results (inclusive). Must default to `0` if not provided in the requested URL. If needed you are free to choose an upper limit that your API supports.
* `limit`: An integer, `>= 0`, indicating the amount of results to include on the page. Should default to a sensible number depending on the data you're returning if not provided. If needed you are free to choose an upper limit that your API supports.

Example:

```
/?start=10&limit=20
```

The above example skips the first 10 results (0-9) and includes 20 results on the page.

## Body

The response body must contain at least these two properties:

* `totalItems`: An integer, `>= 0`, with the total number of results across all pages combined.
* `member`: An array of objects, containing the results of the current page. The model of the results themselves is not predefined and can differ from API to API and endpoint to endpoint.

These properties are based on an older verion of the [Hydra Pagination](https://www.w3.org/community/hydra/wiki/Pagination) draft. We don't necessarily want to follow this standard anymore, but need to keep using these names to maintain backward compatibility on existing APIs.

Empty example:

```json
{
  "totalItems": 0,
  "member": []
}
```

Example with items:

```json
{
  "totalItems": 100,
  "member": [
    {...},
    {...},
    {...},
    {...},
    {...}
  ]
}
```
