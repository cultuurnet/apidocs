# Client access token

## Overview

Client access tokens are used to secure API endpoints that require more robust authentication than [client identification](./client-identification.md) between two *backend* systems.

Before accessing an API endpoint like this, a client needs to obtain a client access token using its credentials (the client id and secret) from publiq's authorization server.

## Requirements

-   A client id
-   A client secret
-   Your API requests are always made from a **backend** system

See [requesting client credentials](./requesting-credentials.md) how to obtain a set of client credentials.

## Flow

1.  The client makes a request to the authorization server with its id and secret.

2.  The authorization server validates the request and, if successful, sends a response with an access token.

3.  The client can now use the access token to call the API by using the obtained access token as a `Bearer` token in the `Authorization` header.

<!-- theme: warning -->

> ##### Security warnings
>
> *   ✅ **Always** request a client access token from a **backend** application
> *   ❌ **Never** use or expose your client access token from a **frontend** application
>
> If you use or store your client secret or client access token in a frontend application they can be **stolen** and **abused** and your client will get blocked!
>
> If you need to do API calls from a frontend application, use [client identification](./client-identification.md) or a [user access token](./user-access-token.md) depending on which methods the API endpoint accepts.

> ##### OAuth2
>
> Client access tokens are requested using the standardized [OAuth 2.0 Client Credentials Grant](https://oauth.net/2/grant-types/client-credentials/). If you are familiar with this flow, you can skip most of the example flow below. Do check the info about the required `audience` property though.

## Example

To obtain a client access token, send a `POST` request to the `/oauth/token` endpoint of the authentication server with a JSON body like this:

```http
POST /oauth/token HTTP/1.1
Host: https://account-test.uitid.be
Content-Type: application/json

{
  "client_id": "YOUR_CLIENT_ID",
  "client_secret": "YOUR_CLIENT_SECRET",
  "audience": "https://api.publiq.be",
  "grant_type": "client_credentials"
}
```

The `client_id` and `client_secret` properties have to contain your client id and secret respectively. They basically act as a username and password to authenticate your client.

The `audience` property must always be set to `https://api.publiq.be`.

Lastly the `grant_type` determines which authentication flow should be used. In this case it has to be `client_credentials` to get a client access token.

After sending your request you will get a response with a JSON body like this:

```http
HTTP/1.1 200 OK

{
 "access_token": "YOUR_ACCESS_TOKEN",
 "expires_in": 86400,
 "token_type": "Bearer"
}
```

You can then include the returned access token as a [Bearer token](https://swagger.io/docs/specification/authentication/bearer-authentication/) in the `Authorization` header of your requests. 🎉

```http
GET /example HTTP/1.1
Host: https://api-test.uitpas.be
Authorization: Bearer YOUR_ACCESS_TOKEN
```

<!-- theme: success -->

> ##### Caching tokens
>
> Make sure to **cache and reuse** the obtained client access token for as long as possible. Do not request a new access token for each API request you make.
>
> There are two ways to check if your cached token is still valid:
>
> 1.  Cache the `expires_in` property included in the token response, and the time that you requested the token. Using these two parameters, you can calculate the expiration time of the token and request a new one when it is expired. Note that if you follow this approach, you should account for clock skew between your server and the APIs' servers, so it's best to already request a new token a couple of minutes before the cached one will expire.
> 2.  Keep using the same cached token until you get a `401` response from an API endpoint, at which point you can request a new token and perform the failed request again with the new token. Note that you will need to set a maximum number of retries if you follow this approach, to prevent an infinite loop if there happens to be an issue that prevents you from getting a valid token.

<!-- theme: warning -->

> ##### Parsing tokens
>
> **Never** parse a client access token as a JWT, for example to check its expiration time. It is not guaranteed that a client access token will always be a JWT. The claims inside the token can also change, so you should not rely on them.

<!-- theme: info -->

> ##### Auth0
>
> publiq currently uses [Auth0](https://auth0.com/) as the implementation of its authentication and authorization service. For more in-depth information about client access tokens, please refer to the [Auth0 documentation](https://auth0.com/docs/flows#client-credentials-flow).

## Domains

The authorization server is available on two domains, one for production and one for testing.

*   Production: https://account.uitid.be
*   Testing: https://account-test.uitid.be

You will need to use the domain of the same environment as the environment of the API you're integrating with.

For example: To communicate with the test environment of UiTdatabank of UiTPAS, you will need a token from the test environment of the authorization server.

Your client id and secret will also vary per environment.

## Try it out!

You can use the request form below to request a client access token using your client id and secret for the **test environment**. You can then use the `access_token` from the response body to authorize other example requests to the test environment in the documentation.

Make sure to set replace `YOUR_CLIENT_ID` and `YOUR_CLIENT_SECRET` with your own **client id** and **secret**!

```json http
{
  url: 'https://account-test.uitid.be/oauth/token',
  method: "POST",
  body: {
    "client_id": "YOUR_CLIENT_ID",
    "client_secret": "YOUR_CLIENT_SECRET",
    "audience": "https://api.publiq.be",
    "grant_type":"client_credentials"    
  }
}
```

<!-- theme: warning -->

> If you get a "network error" using the form above, most likely your client id is not correct. Please double check that you are using your client id for the test environment. Alternatively copy the request sample as a curl request from the form above and check the response from the authorization server by sending the request from a command-line interface or another tool.
