# Authentication

The Geo API needs an access token from publiq's authorization server on every request:

* A [client access token](https://docs.publiq.be/docs/authentication/methods/client-access-token) when you call the API from a backend. This is the usual case.
* A [user access token](https://docs.publiq.be/docs/authentication/methods/user-access-token) when your application already lets users log in with UiTiD.

Never put a client secret in a browser or a native app. Call the Geo API from your own backend instead.

## Requesting credentials

You can get free test credentials in publiq platform, our self-service portal:

[![Add your integration](https://raw.githubusercontent.com/cultuurnet/apidocs/main/assets/add-your-integration.svg)](https://platform.publiq.be)

After registering your integration you immediately get a client id and client secret for the test environment. Your client needs access to the Geo API: ask the helpdesk if your requests are answered with `403`.

## Requesting a client access token

Exchange your client id and client secret for a token:

```http
POST /realms/uitid/protocol/openid-connect/token HTTP/1.1
Host: account-test.uitid.be
Content-Type: application/x-www-form-urlencoded

grant_type=client_credentials&client_id=YOUR_CLIENT_ID&client_secret=YOUR_CLIENT_SECRET
```

Cache the token and reuse it until it expires (see `expires_in` in the response), then request a new one. Use `account.uitid.be` for production.

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
