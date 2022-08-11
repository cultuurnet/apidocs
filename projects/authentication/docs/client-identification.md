# Client identification

Some APIs only expose public information and need to be accessible directly from a browser, like UiTdatabank's Search API or the UiTPAS advantages search.

These APIs only require you to specify the client id of your integration for customization and technical support purposes. For example your client id can have a custom default query in Search API 3 to always filter out search results that are irrelevant to your integration.

You can specify your client id in requests to these APIs in two ways.

## Requirements

-  A client id. See [requesting client credentials](./requesting-credentials.md) how to obtain one.

## Via header

You can specify your client id as an `x-client-id` HTTP header. For example on Search API 3:

```http
GET /events/ HTTP/1.1
Host: https://search-test.uitdatabank.be
X-Client-Id: YrgBoha6aRSrfIcsFt8PISe4u0EoM45k
```

Using a header can be helpful to only have to set it once depending on the programming language and/or HTTP library you are using. It also reduces the URL size.

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

## Via query parameter

Alternatively you can specify a `clientId` URL query parameter instead of an HTTP header. For example on Search API 3:

```http
GET /events/?clientId=YrgBoha6aRSrfIcsFt8PISe4u0EoM45k HTTP/1.1
Host: https://search-test.uitdatabank.be
```

Using a query parameter can be helpful for link sharing or when doing quick manual tests.

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

## When to use which method

When using client identification from a **frontend application** it is advisable to use the `clientId` query parameter because using the `x-client-id` header requires [CORS](./cors.md), while using an extra query parameter doesn't.

If you are using client identification on requests from a **backend application**, you can choose whatever method you like best. Using the `x-client-id` header might be easier in some HTTP libraries because you can usually define some global headers that you want to send for every request, but this depends on the programming language and HTTP library.
