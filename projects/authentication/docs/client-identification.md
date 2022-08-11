# Client identification

Some APIs only expose public information and need to be accessible directly from a browser, like UiTdatabank's Search API or the UiTPAS advantages search.

These APIs only require you to specify the client id of your integration for customization and technical support purposes.

## Requirements

-  A client id. See [requesting client credentials](./requesting-credentials.md) how to obtain one.

## Usage

You can include your client id in your requests to our APIs in two ways.

### Via header

You can specify your client id as an `x-client-id` HTTP header. For example on Search API 3:

```http
GET /events/ HTTP/1.1
Host: https://search-test.uitdatabank.be
X-Client-Id: YrgBoha6aRSrfIcsFt8PISe4u0EoM45k
```

Note that the name of the `x-client-id` header is case insensitive, like every header name.

> The `x-client-id` header is useful in code because a lot of HTTP libraries allow you to specify default headers to include in every request, so you do not need to repeat it in multiple places in your code.

#### Try it!

Fill in your client id in the form below and send your request to try it out!

```json http
{
  url: 'https://search-test.uitdatabank.be/events/',
  method: "GET",
  headers: {
    "x-client-id": "YOUR_TEST_ENV_CLIENT_ID"
  }
}
```

### Via query parameter

Alternatively you can specify a `clientId` URL query parameter instead of an HTTP header. For example on Search API 3:

```http
GET /events/?clientId=YrgBoha6aRSrfIcsFt8PISe4u0EoM45k HTTP/1.1
Host: https://search-test.uitdatabank.be
```

> The `?clientId=...` query parameter is mostly useful when doing manual requests, for example in a browser, because you just need to include the client id in the URL that you are requesting.

#### Try it!

Fill in your client id in the form below and send your request to try it out!

```json http
{
  url: 'https://search-test.uitdatabank.be/events/',
  method: "GET",
  query: {
    "clientId": "YOUR_TEST_ENV_CLIENT_ID"
  }
}
```
