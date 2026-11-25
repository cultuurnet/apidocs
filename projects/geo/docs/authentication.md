# Authentication

The Geo API needs an access token from publiq's authorization server on every request: a [client access token](https://docs.publiq.be/docs/authentication/methods/client-access-token) from a backend (the usual case), or a [user access token](https://docs.publiq.be/docs/authentication/methods/user-access-token) when your application lets users log in with UiTiD. Never put a client secret in a browser or a native app.

The Geo API is internal for now: only clients with the `publiq-api-geo-scope` scope have access.

## Sending the token

Send the token in the `Authorization` header:

```http
GET /coordinates?query=Vooruit,%20Gent HTTP/1.1
Host: geo-api-test.publiq.be
Authorization: Bearer YOUR_ACCESS_TOKEN
```

## Errors

* `401` `https://api.publiq.be/probs/auth/unauthorized`: the token is missing, invalid or expired. Request a new token and try again.
* `403` `https://api.publiq.be/probs/auth/forbidden`: the token is valid, but your client has no access to the Geo API.

See the [authentication errors](https://docs.publiq.be/docs/authentication/errors) for more info.
