# How to handle 401 and 403 API errors

This page contains an overview of all possible error types related to authentication and authorization that can be returned by publiq's APIs.

This does not include errors that may occur on the authorization server when letting a user login and/or when requesting tokens (which are both handled by Auth0).

> For more info about error handling on our APIs in general, see the dedicated [Errors](https://publiq.stoplight.io/docs/errors) space.

## unauthorized

* **Complete type:** `https://api.publiq.be/probs/auth/unauthorized`
* **Title**: `Unauthorized`
* **Status**: `401`

Your API request is missing the required credentials to authenticate.

Possible causes:

* You forgot to include your client id (for endpoints that require client identification)
* You forgot to include a token (for endpoints that require tokens)
* Your token has expired
* Your token is malformed and cannot be parsed
* You are using the wrong authentication method (client identification while it should be a token or the other way around)

## forbidden

* **Complete type:** `https://api.publiq.be/probs/auth/forbidden`
* **Title**: `Forbidden`
* **Status**: `403`

Your API request was successfully authenticated but you do not have permission to perform this particular request.

Possible causes:

* Your client has no access to this API.
* You are trying to perform an action on a specific resource inside the API to which you don't have access. Check the specific API endpoint's documentation for more info about possibly required permissions.
