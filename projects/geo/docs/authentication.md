# Authentication

Every request to the Geo API must identify the client that makes it.

The Geo API supports two of the publiq [authentication methods](https://docs.publiq.be/docs/authentication/methods/overview):

* [Client identification](https://docs.publiq.be/docs/authentication/methods/client-identification): send your client id in the `x-client-id` header (preferred) or in the `clientId` query parameter. This is the simplest method and the right one for frontend applications, where no client secret can be stored safely.
* [Client access tokens](https://docs.publiq.be/docs/authentication/methods/client-access-token): exchange your client id and secret for a token and send it in the `Authorization` header. Use this from a backend.

If both are present, the token is used.

Example with client identification:

```http
GET /coordinates?query=Sint-Pietersplein%201,%20Gent HTTP/1.1
Host: geo-test.publiq.be
x-client-id: your-client-id
```

## Getting credentials

See [requesting client credentials](https://docs.publiq.be/docs/authentication/requesting-credentials) to learn how to get a client id and secret with access to the Geo API. A client that exists but has no access to the Geo API receives a `403` error.

## Errors

* `401` `https://api.publiq.be/probs/auth/unauthorized`: the client id or token is missing, unknown, expired or invalid.
* `403` `https://api.publiq.be/probs/auth/forbidden`: the client is known but does not have access to the Geo API.

See the [authentication error docs](https://docs.publiq.be/docs/authentication/errors) for the details of both.
