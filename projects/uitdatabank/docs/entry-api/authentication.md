# Authentication

## Requesting credentials

You can easily get free test credentials in publiq platform, our self-service portal:

[![Add your entry API integration](https://raw.githubusercontent.com/cultuurnet/apidocs/main/assets/add-your-integration.svg)](https://platform.publiq.be)

After registering your integration on publiq platform you'll immediately get client credentials that grant you access to our test environment.

## OAuth2 tokens (using a client id & secret)

When you have received your client credentials, you can authenticate your requests to the Entry API using either [client access tokens](https://docs.publiq.be/docs/authentication/methods/client-access-token) or [user access tokens](https://docs.publiq.be/docs/authentication/methods/user-access-token) which you can obtain via standardized OAuth2 flows using your client id and client secret.

User access tokens should be used if your end users individually log in via UiTiD and you want to make API requests in their name. Client access tokens, on the other hand, should be used when you don't want your end users to log in using UiTiD and instead want to send API requests in the name of your system.

Additionally, user access tokens can only be refreshed for a limited time (about two weeks) while client access tokens can be renewed infinitely.

Lastly, the flow to obtain a client access token is easier to implement than the flow to obtain a user access token as it only requires 1 HTTP request to exchange your client id and secret for a token.

For a more detailed comparison between the two, see the [overview between authentication methods](https://docs.publiq.be/docs/authentication/methods/overview).

<!-- theme: warning -->

> Note that if you decide to use client access tokens, the events, places and organizers you create will be owned by your client instead of a specific user. So when your end users log in on <https://www.uitdatabank.be> they will not see those entities in their dashboard and won't be able to edit them by default. However, you can make them visible and editable for your end users if needed by [making them a contributor](shared/contributors.md).

### Making a request to Entry API

Once you have obtained a user access token or client access token, you can authenticate your requests by including an `Authorization` header with a `Bearer` token. For example to create an event:

```http
POST /events HTTP/1.1
Host: https://io-test.uitdatabank.be
Authorization: Bearer YOUR_ACCESS_TOKEN

{ ... json data ... }
```

## JWT provider tokens (using an API key)

Alternatively, if you registered your integration with publiq before or in the beginning of 2023 you will have received an API key instead of a client id and secret.

With an API key, you can only request a user access token, and this can only be done by following a proprietary flow on the UiTdatabank JWT provider.

### JWT provider URLs

* Test environment: `https://jwt-test.uitdatabank.be`
* Production environment: `https://jwt.uitdatabank.be`

### Requesting a token

To get a user access token from the JWT provider, you need to **redirect** your end user to the `/connect` endpoint on the JWT provider with `destination` and `apiKey` query parameters. The end user is then prompted to log in using UiTiD v2.

For example:

```
https://jwt-test.uitdatabank.be/connect?apiKey=YOUR_API_KEY&destination=https://yourapplication.com
```

Note that you will need to use the corresponding API key for the chosen environment URL. For example, you need to use your API key for the test environment when using the test environment URL.

Afterward, the JWT provider will redirect the end user back to your application using the given `destination` query parameter. The URL that the user will be redirected to will also include a `jwt` query parameter, as well as a `refresh` query parameter.

You can use the value of the `jwt` query parameter as a token to authenticate requests to Entry API, and the value of the `refresh` parameter to renew expired tokens.

An example of the destination URL including the tokens:

```
https://yourapplication.com/?jwt=eyJ0eXAiOiJKV1QiLCJhbGciOi...&refresh=WHbB1RatZQqI8K3abzUu1_GM6e7umYt8qStutFRHdDGij
```

### Making a request to Entry API

Once you have obtained a token from the JWT provider, you can authenticate your requests by including an `Authorization` header with a `Bearer` token. Additionally, you must also include your API key as an `x-api-key` header. For example to create an event:

```http
POST /events HTTP/1.1
Host: https://io-test.uitdatabank.be
Authorization: Bearer YOUR_ACCESS_TOKEN
X-Api-Key: YOUR_API_KEY

{ ... json data ... }
```

### Refreshing an expired token

When you send requests to Entry API using a token previously obtained from the JWT provider and suddenly receive error responses with status 401, your token has expired.

You can renew your token using the previously obtained refresh token. To do so, send an HTTP request to the `/refresh` endpoint on the JWT provider including an `apiKey` query parameter and `refresh` query parameter.

For example:

```
GET /refresh?apiKey=YOUR_API_KEY&refresh=YOUR_REFRESH_TOKEN HTTP/1.1
Host: https://jwt-test.uitdatabank.be
```

The response will then include a new token as `text/plain`. You may then retry the failed request with this new access token.

## Long-lived tokens

In the distant past publiq provided partners with so-called "long-lived" tokens that could be used to authenticate requests to Entry API. As the name implies, these tokens are valid for a very long time and do not need to be refreshed.

While practical and easy to use, the long lifetime of these tokens also carries security risks. Because of this, it is no longer possible to request new long-lived tokens.

<!-- theme: warning -->

> If you are still using "long-lived" tokens in your integration, it is highly recommended to switch to OAuth2 **client access tokens** instead for the same behaviour and better security.

## Migrating from the JWT provider tokens or "long lived" tokens to OAuth2

Tokens from the JWT provider and so-called "long-lived" tokens will be supported for the foreseeable future on Entry API. However, if you already want to make your integration as future-proof as possible you can easily switch to OAuth2 tokens.

In the near future you will be able to request a client id and secret for your existing integration on our self-service portal.

When you receive your new client credentials, you can update your application to request either [client access tokens](https://docs.publiq.be/docs/authentication/methods/client-access-token) or [user access tokens](https://docs.publiq.be/docs/authentication/methods/user-access-token) from UiTiD v2 using OAuth2.

* If your application lets your end users login via UiTiD and you want to continue doing so, you should keep using **user access tokens**. Because the OAuth2 flows are standardized, you can use one of the SDKs mentioned in the documentation for [user access tokens](https://docs.publiq.be/docs/authentication/methods/user-access-token) to implement the new login flow.
* If instead you once requested a user token and refresh token for a specific email address, and you use that in the background of your application regardless of the logged in end user, we recommend to switch to **client access tokens**. Contrary to tokens from the JWT provider, user access tokens requested using OAuth2 cannot be refreshed infinitely, while client access tokens can be renewed automatically forever.
* If you used a so-called "long-lived" token, we recommend to use **client access tokens** because those can easily be renewed automatically forever.

<!-- theme: success -->

> When you request client credentials to replace your API key, your API key will still keep working, so you have all the time that you need to update your application.
