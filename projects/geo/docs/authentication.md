# Authentication

The Geo API uses [client identification](https://docs.publiq.be/docs/authentication/methods/client-identification): every request carries the client id of your integration. There are no tokens and no client secret involved, so you can call the API straight from a browser.

## Requesting credentials

You can get free test credentials in publiq platform, our self-service portal:

[![Add your integration](https://raw.githubusercontent.com/cultuurnet/apidocs/main/assets/add-your-integration.svg)](https://platform.publiq.be)

After registering your integration you immediately get a client id for the test environment. Your client needs access to the Geo API: ask the helpdesk if your requests are answered with `403`.

## Client identification

Send your client id in the `x-client-id` header:

```http
GET /coordinates?query=Vooruit,%20Gent HTTP/1.1
Host: geo-api-test.publiq.be
x-client-id: YOUR_CLIENT_ID
```

Or, when you cannot send headers, as the `clientId` query parameter:

```http
GET /coordinates?query=Vooruit,%20Gent&clientId=YOUR_CLIENT_ID HTTP/1.1
Host: geo-api-test.publiq.be
```

When you send both, the header is used.

## Errors

* `401` `https://api.publiq.be/probs/auth/unauthorized`: the client id is missing, or no client with that id exists.
* `403` `https://api.publiq.be/probs/auth/forbidden`: the client exists, but has no access to the Geo API.

See the [authentication errors](https://docs.publiq.be/docs/authentication/errors) for more info.
