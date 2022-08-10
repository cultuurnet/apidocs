# Overview

Each publiq API supports one of three authentication methods, depending on the security that it requires.

## When to use which method

Which authentication method you need to use will in the first place be **determined by which API(s) or which specific endpoint(s) you want to access**.

There are 3 possible scenarios for an endpoint:

1.  The endpoint requires **no authentication** at all.
2.  The endpoint requires **[client identification](#client-identification)**. You will only need to include your client id in the request either as a header or a URL parameter, and you won't need a token.
3.  The endpoint requires a **[token](#tokens)**. If the endpoint supports both client access tokens and user access tokens you can pick whichever you prefer. See their respective documentation for more info.

The following table provides a summary of the supported authentication methods on our APIs. Note that APIs may have a few exceptions on specific endpoints. For example an API may support both client access tokens and user access tokens in general, but only user access tokens on an endpoint to get the current user information (as that would be impossible without a user access token).

APIs that require no authentication at all, like [UiTdatabank Taxonomy API v3](https://docs.publiq.be/docs/uitdatabank/9b63d9296d981-taxonomy-api), are not included in this table.


API | Client identification | Client access tokens | User access tokens
---------|----------|---------|---------
 UiTdatabank Search API v3 | ✅ | No | No
 [UiTdatabank Entry API v3](https://docs.publiq.be/docs/uitdatabank/5c4fcee8036e0-entry-api) | No | ✅ | ✅ 
 [UiTPAS API v4](https://docs.publiq.be/docs/uitpas) | No | ✅ | ✅
 [museumPASSmusées Partner API v1](https://docs.publiq.be/docs/museumpassmusees) | No | ✅ | No

You can always mix requests with different authentication methods if needed. For example you can use your client id to make a request to UiTdatabank's Search API using client identification, and you can use the same client id in combination with your client secret to request a token to make requests to UiTdatabank's Entry API.

Below you can find a short summary of how each authentication method works, with links to more detailed documentation.

## Client identification

API endpoints that require no real authentication but need to know what client is accessing it for customization and technical support reasons use [client identification](./client-identification.md).

Usually used by APIs that need to provide info to anonymous users in web browsers, for example UiTdatabank's Search API.

*   ✅ Suitable for frontend applications
*   ✅ Suitable for backend applications
*   ⏱ Does not expire
*   🔓 Offers no real security, so only used in APIs that expose public information

## Tokens

API endpoints that expose private information and/or allow write access require a token to authenticate.

Most API endpoints that require a token accept both **client** access tokens and **user** access tokens. Only some few exceptions require one or the other. For example an endpoint to request info on the current user will always require a user access token.

> If an endpoint accepts both client and user access tokens, you only need to provide one or the other, not both.

### Client access tokens

API endpoints that support the authentication of an API client with a client id and client secret use [client access tokens](./client-access-token.md).

*   ❌ Not suitable for frontend applications
*   ✅ Suitable for backend applications
*   ⏱ Expires, but can be renewed automatically
*   🔐 Secure, used by APIs that work with private information and/or write access

### User access tokens

API endpoints that support authentication as a user use [user access tokens](./user-access-token.md).

Usually used in situations where a user will log in through publiq's **UiTID** service and your application will then make requests in that user's name.

*   ✅ Suitable for frontend applications
*   ✅ Suitable for backend applications
*   ⏱ Expires and requires your user to log in again through UiTID
*   🔐 Secure, used by APIs that work with private information and/or write access

### Token expiration

Both *client access tokens* and *user access tokens* expire after a period of time. We reserve the ability to change this period of time whenever we see fit, so you should never hardcode this in your app somewhere.

Instead keep using your token until you get a `401` response from an API endpoint, which indicates that the token has expired. Or use the `expires_in` property that is included in the response with your token when you request one to determine the lifetime of the token.

To get a new client access token, you can simply request a new one using your client id and secret as described in [Client access tokens](./client-access-token.md).

To get a new user access token, you will need to let your user login again as described in [User access tokens](./user-access-token.md).
