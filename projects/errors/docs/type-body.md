# Body

This page contains an overview of all possible error types inside the `https://api.publiq.be/probs/body/` namespace that can be returned by publiq's APIs.

> APIs can also use their own types for errors. The types below are used in situations where an API has no specific type for an error related to the body included in a request.

## missing

*   **Type:** `https://api.publiq.be/probs/body/missing`
*   **Title**: `Body missing`
*   **Status**: `400`

The endpoint requires a body inside the request but none was included.

## invalid-syntax

*   **Type:** `https://api.publiq.be/probs/body/invalid-syntax`
*   **Title**: `Invalid body syntax`
*   **Status**: `400`

The body you included (typically JSON) has an invalid syntax and cannot be parsed by the API.

## invalid-data

*   **Type:** `https://api.publiq.be/probs/body/invalid-data`
*   **Title**: `Invalid body data`
*   **Status**: `400`

The body you included (typically JSON) has invalid or missing properties. The response should also either include a `detail` with more info about the validation error, or a [schemaErrors](./format.md#schemaErrors) property with a list of one or more schema validation problems.

## file-missing

*   **Type:** `https://api.publiq.be/probs/body/file-missing`
*   **Title**: `File missing`
*   **Status**: `400`

The server expected a file to be included in the request but did not find any. The `detail` property in the response should include more info like how to include the file correctly.

## file-invalid-type

*   **Type:** `https://api.publiq.be/probs/body/file-invalid-type`
*   **Title**: `Invalid file type`
*   **Status**: `400`

The included file has a type that is not accepted by the server. The `detail` property in the response should include more info like what file types are valid.

## file-invalid-size

*   **Type:** `https://api.publiq.be/probs/body/file-invalid-size`
*   **Title**: `Invalid file size`
*   **Status**: `400`

The included file has a size that is not accepted by the server. Typically it is too big. The `detail` property in the response should include more info like the maximum (and/or minimum) file size.
