# URL

This page contains an overview of all possible error types inside the `https://api.publiq.be/probs/url/` namespace that can be returned by publiq's APIs.

> APIs can also use their own types for errors. The types below are used in situations where an API has no specific type for an error related to a the requested URL.

## not-found

* **Type:** `https://api.publiq.be/probs/url/not-found`
* **Title**: `Not Found`
* **Status**: `404`

The URL you requested is not available. Possible causes include:

* The requested endpoint does not exist on the API
* An id or slug of a resource in the path does not exist or is invalid
* A required query parameter is missing
* A query parameter has an invalid value

The `detail` property in the JSON body should provide more info about what exactly caused the error.
