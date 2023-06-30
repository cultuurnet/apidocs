# Authentication

## Requesting credentials

See the [requesting client credentials](https://docs.publiq.be/docs/authentication/requesting-credentials) page in the general authentication documentation.

## Tokens

If you are also integrating with UiTdatabank's [Entry API](../entry-api/introduction.md) and/or [UiTPAS API](https://docs.publiq.be/docs/uitpas), you can re-use the [client access token](https://docs.publiq.be/docs/authentication/methods/client-access-token) or [user access token](https://docs.publiq.be/docs/authentication/methods/user-access-token) that you use to authenticate with those APIs.

For example:

```http
GET /events/ HTTP/1.1
Host: https://search-test.uitdatabank.be
Authorization: Bearer YOUR_ACCESS_TOKEN
```

(**Note**: This only works for tokens obtained using an Auth0 client, not for tokens obtained via the older proprietary "JWT provider" using an API key. If you are using an API key, see "API key" below.)

If you are only integrating with Search API, we recommend to use the simpler client identification instead as documented below.

## Client identification

When you have received your client credentials, you can authenticate on the Search API using client identification in the form of a `x-client-id` header or `clientId` URL query parameter as authentication.

For example as a header:

```http
GET /events/ HTTP/1.1
Host: https://search-test.uitdatabank.be
X-Client-Id: YrgBoha6aRSrfIcsFt8PISe4u0EoM45k
```

Or as a query parameter:

```
GET /events/?clientId=YrgBoha6aRSrfIcsFt8PISe4u0EoM45k HTTP/1.1
Host: https://search-test.uitdatabank.be
```

We recommend to use the `x-client-id` header in code because in most programming languages it is possible to define it once on the HTTP client library that you use and then re-use it for every request that you send to Search API.

The `clientId` query parameter is mostly useful for manual tests or sharing a link for debugging purposes, as a header cannot be included in the URL.

More info about client identification can be found [in the general authentication documentation](https://docs.publiq.be/docs/authentication/methods/client-identification).

**Try it out!**

```json http
{
  url: 'https://search-test.uitdatabank.be/events/',
  method: "GET",
  headers: {
    "x-client-id": "YOUR_TEST_ENV_CLIENT_ID"
  }
}
```

## API key

Alternatively, if you registered your integration with publiq before or in the beginning of 2023 you will have received an API key instead of a client id.

You can use your API key by adding an `x-api-key` header to your requests, for example:

```http
GET /events/ HTTP/1.1
Host: https://search-test.uitdatabank.be
X-Api-Key: 7716CC3D-38D3-4369-83C1-896C33337943
```

You can also include the API key as an `apiKey` query parameter instead, for example:

```http
GET /events/?apiKey=7716CC3D-38D3-4369-83C1-896C33337943 HTTP/1.1
Host: https://search-test.uitdatabank.be
```

**Try it out!**

```json http
{
  url: 'https://search-test.uitdatabank.be/events/',
  method: "GET",
  headers: {
    "x-api-key": "YOUR_TEST_ENV_API_KEY"
  }
}
```

## Migrating from API key to client identification

API key authentication will be supported for the foreseeable future on Search API. However, if you already want to make your integration as future-proof as possible you can easily switch from API key authentication to client identification.

In the near future you will be able to request a client id for your existing integration on our self-service portal.

When you receive your new client id, you can update your application to include the client id in your API requests as described above using an `x-client-id` header instead of an `x-api-key` header, or a `clientId` query parameter instead of an `apiKey` query parameter.

<!-- theme: success -->

> When you request a client id to replace your API key, your API key will still keep working, so you have all the time that you need to update your application.
