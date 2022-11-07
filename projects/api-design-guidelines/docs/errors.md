# Errors

<!-- theme: info -->

> APIs must support the errors described in the [errors docs](https://publiq.stoplight.io/docs/errors) and [authentication error docs](https://docs.publiq.be/docs/authentication/ZG9jOjMyMzA0Mw-errors) for integrators. Read those first to see how they should work from an integrator's perspective.
>
> This page gives more info when to use which error type, and when/how to create custom error types for your API.

## Error response content-type

Error responses must always include a `Content-Type` header with a `application/problem+json` value.

## Error response schema

As described in **more detail in the [errors documentation introduction](https://docs.publiq.be/docs/errors/ZG9jOjE-introduction)**, error responses must use a schema that conforms to the [RFC7807](https://datatracker.ietf.org/doc/html/rfc7807) standard.

Additionally, the following extensions are encouraged:

* `endUserMessage` for [custom domain errors](#for-custom-domain-errors)
* `schemaErrors` for [invalid request bodies](#for-invalid-request-bodies) (specifically for `https://api.publiq.be/probs/body/invalid-data`)

## When to use which error type

### For authentication/authorization errors

#### When using client identification

Always use `401` <https://api.publiq.be/probs/auth/unauthorized> when the client id is missing or the client id does not exist in Auth0.

Always use `403` <https://api.publiq.be/probs/auth/forbidden> when the client is not allowed to access your API ([Read how to determine this](./authentication.md)).

Always use `403` <https://api.publiq.be/probs/auth/forbidden> when the client sends a request that is not allowed by your API's [own internal permission system](./permissions.md).

Read more:

* About [client identification](https://docs.publiq.be/docs/authentication/ZG9jOjExODE5NDY5-client-identification)
* About [available authentication error types](https://docs.publiq.be/docs/authentication/ZG9jOjMyMzA0Mw-errors)

#### When using tokens

Always use `401` <https://api.publiq.be/probs/auth/unauthorized> when the token is missing, expired, has an invalid signature, ...

Always use `403` <https://api.publiq.be/probs/auth/forbidden> when the client that requested the token is not allowed to access your API ([Read how to determine this](./authentication.md)).

Always use `403` <https://api.publiq.be/probs/auth/forbidden> when the client sends a request that is not allowed by your API's [own internal permission system](./permissions.md) for the given token.

Read more:

* About [client access tokens](https://docs.publiq.be/docs/authentication/ZG9jOjExODE5NDY4-client-access-token)
* About [user access tokens](https://docs.publiq.be/docs/authentication/ZG9jOjExODE5NTM5-user-access-token)
* About [available authentication error types](https://docs.publiq.be/docs/authentication/ZG9jOjMyMzA0Mw-errors)

### For other incorrect headers

Always use specific errors like `406` <https://api.publiq.be/probs/header/not-acceptable> or `415` <https://api.publiq.be/probs/header/unsupported-media-type> for standardized headers like `Accept` and `Content-Type`.

If a standardized error code exists but is not documented as an error type yet, open an issue or create a pull request in [our apidocs github repository](https://github.com/cultuurnet/apidocs/blob/main/projects/errors/docs/type-header.md) to get it added.

Only use generic errors like `400` <https://api.publiq.be/probs/header/missing> and `400` <https://api.publiq.be/probs/header/invalid> if there are no more specific types available and an existing standardized error code cannot be added.

Read more:

* About [available header error types](https://docs.publiq.be/docs/errors/ZG9jOjEyNzc5NzA0-in-request-headers)

### For unsupported HTTP methods

Always use `405` <https://api.publiq.be/probs/method/not-allowed> when a request uses a HTTP method that is not supported for the requested URL. (For example when a `PUT` is requested, but only `GET` is supported.)

Read more:

* About [available method error types](https://docs.publiq.be/docs/errors/ZG9jOjQ1Nzc3MzE3-in-request-method)

### For invalid URLs

Every invalid URL should return a `404`, even if the error is in a query parameter or a specific path parameter.
The URL is the locator of a resource, so if a resource cannot be returned due to an error in the URL it means the resource is `Not Found` regardless of which part of the URL is incorrect.

For every `404` the type <https://api.publiq.be/probs/url/not-found> must be used. You can specify more info in the `detail` property, for example that a given query parameter is invalid, that a given id does not exist, and so on.

Read more:

* About [available URL error types](https://docs.publiq.be/docs/errors/ZG9jOjEyNzc5NzA1-in-request-url)

### For invalid request bodies

Always use `400` <https://api.publiq.be/probs/body/missing> when a body is required but missing in the request.

Always use `400` <https://api.publiq.be/probs/body/invalid-syntax> when a body is present but in an invalid syntax (for the given `content-type` in the request, or a default).

Always use `400` <https://api.publiq.be/probs/body/invalid-data> when a body is present but does not match with your expected schema. **Ideally the schemas in your OpenAPI file are used to validate this.**

When the given body does not match with your expected schema, it is encouraged to include a `schemaErrors` property in the error response to give more info about which errors occured when validating the body with the schema.

For example given the JSON body:

```json
{
  "uitpasNumbers": [
    "0900000905506",
    "129876542345678987633456434567", // invalid
    "0000100038306",
  ]
}
```

The error response can pinpoint the problematic property value like this:

```json
{
  "type": "https://api.publiq.be/probs/body/invalid-data",
  "title": "Invalid body data",
  "status": "400",
  "schemaErrors": [
    {
      "jsonPointer": "/uitpasNumbers/1",
      "error": "The string should match pattern: \d{13}"
    }
  ]
}
```

Note that the error message does not have to be intended for end-users. It is primarily meant as a pointer for developers to debug errors.

### For (custom) domain errors

Any error that is related to your application's domain logic should use an error type specific to your application so it is easily identifiable.

When creating your own error types, the following rules apply:

* The `type` should be a URI that starts with `https://api.publiq.be/probs` and is suffixed with the name of your API or product. For example `https://api.publiq.be/probs/uitdatabank` for UiTdatabank and `https://api.publiq.be/probs/uitpas` for UiTPAS.
* Everything after the name of your API/product can be structured however you like. You can group errors together using "subdirectories", or use a flat list.
* The slugs of your errors must always be in `kebab-case` (lowercase, and hyphens for spaces).
* An `errors.md` page should be added to your project's documentation (on Stoplight) to provide extra documentation per error type. A redirect will be set up so that your domain error types link to this page.

Domain errors should in most cases use the `400` response status, but other status codes may be more applicable in some scenarios like for example `403`. When picking a status code, make sure to read about its intended usage in the list of [client error codes](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status#client_error_responses). Sometimes the name of a certain code may look applicable, but it might not actually be intended for your specific use case and can be confusing for integrators or tools who follow the HTTP specifications.

It is encouraged to include an `endUserMessage` in domain errors.

Examples of domain errors:

* <https://api.publiq.be/probs/uitdatabank/calendar-type-not-supported>
* <https://api.publiq.be/probs/uitpas/invalid-uitpas-number>

Read more examples of [domain errors in UiTdatabank](https://docs.publiq.be/docs/uitdatabank/ZG9jOjMyMzA0Mw-errors).

### For internal server errors

Always use `500`, `Internal Server Error` (as title) and `about:blank` (as type) for internal server errors that can not be fixed by the API client by modifying its HTTP request. Avoid additional details that may expose implementation details to avoid security details leaking.

For example:

```json
{
  "type": "about:blank",
  "title": "Internal Server Error",
  "status": "500"
}
```

If the error occured when the API was acting as a **gateway or proxy to another HTTP server**, `502` (`Bad Gateway`) *may* be used instead. Note that this does not apply to a database or other non-HTTP dependency being down.

```json
{
  "type": "about:blank",
  "title": "Bad Gateway",
  "status": "502"
}
```
