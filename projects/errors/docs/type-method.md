# Method

This page contains an overview of all possible error types inside the `https://api.publiq.be/probs/method/` namespace that can be returned by publiq's APIs.

> APIs can also use their own types for errors. The types below are used in situations where an API has no specific type for an error related to the requested HTTP method.

## not-allowed

* **Type:** `https://api.publiq.be/probs/method/not-allowed`
* **Title**: `Method not allowed`
* **Status**: `405`

The resource you requested exists, but the HTTP method you are trying to use is not supported. For example the resource may support `GET` but not `PUT`. The `detail` should contain the supported methods on the requested URL.
