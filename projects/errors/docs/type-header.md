# Header

This page contains an overview of all possible error types inside the `https://api.publiq.be/probs/header/` namespace that can be returned by publiq's APIs.

> APIs can also use their own types for errors. The types below are used in situations where an API has no specific type for an error related to a header.

## missing

* **Type:** `https://api.publiq.be/probs/header/missing`
* **Title**: `Header missing`
* **Status**: `400`

A required header is missing. More info on what header specifically can be found in the `detail` property of the response.

<!-- theme: warning -->

> **Note to API designers**
>
> APIs should only use this error type if a more specific type is not available. For example, `https://api.publiq.be/probs/auth/unauthorized` must be used if the `Authorization` header is missing.

## invalid

* **Type:** `https://api.publiq.be/probs/header/invalid`
* **Title**: `Header invalid`
* **Status**: `400`

The value of a given header is invalid. More info on what header specifically can be found in the `detail` property of the response.

<!-- theme: warning -->

> **Note to API designers**
>
> APIs should only use this error type if a more specific type is not available. For example, `https://api.publiq.be/probs/auth/unauthorized` must be used if the `Authorization` header is invalid.

## not-acceptable

* **Type:** `https://api.publiq.be/probs/header/not-acceptable`
* **Title**: `Not Acceptable`
* **Status**: `406`

This error is returned if the request to the API included an `Accept` header with a content-type that the API does not support, and the API is unwilling or unable to return a default content-type instead.

For example, you might be sending a request with `Accept: application/xml` while the API does not support XML and does not want to return a default format like JSON instead. In this case the API will return this error.

To fix this error, do not use an `Accept` header in your requests or set it to a content-type that the API supports (most often `application/json` and/or `application/json+ld`).

For more info, see https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/406

## unsupported-media-type

* **Type:** `https://api.publiq.be/probs/header/unsupported-media-type`
* **Title**: `Unsupported Media Type`
* **Status**: `415`

This error is returned if the request to the API included a `Content-Type` header with a value that the API does not support.

For example, you might be sending a request with `Content-Type: application/xml` while the API does not support XML.

To fix this error, use a `Content-Type` (and a request body in that format) that is supported by the API.

For more info, see https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/415
