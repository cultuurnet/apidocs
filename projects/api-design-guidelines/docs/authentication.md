# Authentication

<!-- theme: info -->

> APIs should support one or more of the authentication methods described in the [authentication docs](https://docs.publiq.be/docs/authentication/introduction). **Read those first** to see how they should work from an integrator's perspective, and **how to pick the right authentication mechanism(s) for your API**.
>
> This page gives some more info how those authentication mechanisms should be implemented on the API.

## Client identification guidelines

* Read [how client identification must work from an integrator's perspective](https://publiq.stoplight.io/docs/authentication/ZG9jOjExODE5NDY5-client-identification).

When using client identification, APIs should support both the `x-client-id` header and `clientId` URL query parameter. If both are provided, preference should be given to the header.

The client id should be validated by fetching the client from the Keycloak management API.

You should also validate that the client has a metadata property indicating that it has access to your API.

For example a client can have the following metadata:

```json
{
  "client_id": "AaiyAPdpYdesoKnqjj8HJqRn4T5titww",
  "client_metadata": {
    "publiq-apis": "ups sapi entry"
  },
  ...
}
```

The above example indicates that the client has access to UiTdatabank's Search API, the UiTPAS API, and UiTdatabank's Entry API.

> We use very short names for the APIs in the client metadata, because the `publiq-apis` property is limited to 255 characters. We also cannot use multiple properties because the metadata is limited to 10 properties.

## Token guidelines

* Read [how client access tokens must work from an integrator's perspective](https://publiq.stoplight.io/docs/authentication/ZG9jOjExODE5NDY4-client-access-token).
* Read [how user access tokens must work from an integrator's perspective](https://publiq.stoplight.io/docs/authentication/ZG9jOjExODE5NTM5-user-access-token).

When using tokens, endpoints should support both client and user access tokens wherever possible.

Examples of acceptable exceptions include endpoints like `/user` that provide info on the current user, based on a user access token.

To validate a token, check that:

* The signature can be verified with the public key of our Auth0 tenant
* The `nbf` claim is in the past
* The `exp` claim is **not** in the past
* The `aud` claim is equal to `https://api.publiq.be`
* The `iss` claim is equal to either (depending on what environment your API is running on):
  * `https://account.uitid.be/`
  * `https://account-test.uitid.be/`
  * `https://account-acc.uitid.be/`
* The `https://publiq.be/publiq-apis` claim is present and contains a value representing your api

The value of the `https://publiq.be/publiq-apis` claim is the same as the one in the client metadata of the client that requested the token. For example:

```json
{
  "sub": "auth0|...",
  "aud": "https://api.publiq.be",
  "https://publiq.be/publiq-apis": "ups sapi",
  ...
}
```

The example above indicates that the token is usable on the UiTPAS API and UiTdatabank's Search API. Note that the claim can be missing, in which case it is considered to be empty.

**If the token has an invalid signature, is not usable yet, is expired, or has an invalid `aud` or `iss` claim** you must return a **[401 error (see authentication docs)](https://docs.publiq.be/docs/authentication/errors#unauthorized)**

**If the token is not usable on your API**, you must return a **[403 error (see authentication docs)](https://docs.publiq.be/docs/authentication/errors#forbidden)**. (The difference with the other checks being that the token is valid on *some* of our APIs, but forbidden on your specific API.)

## Permissions

User/client permissions to perform actions inside your API should be managed inside the API itself.

If the specific client or user cannot perform a requested action, you must return a [403 error (see authentication docs)](https://docs.publiq.be/docs/authentication/errors#forbidden).

## Scopes

<!-- theme: danger -->

> Do not use scopes for determining API access as we did in the past on some APIs. While this was [suggested by Auth0](https://community.auth0.com/t/access-tokens-with-multiple-audiences/9911), this approach is not suited for our APIs because we want to control which client has access to which API ourselves. This decision should not be made by our end-users.

In OAuth2, scopes indicate what resources can be accessed using a specific token.

While it can be tempting to use scopes for permissions or to determine what APIs can be accessed with a token, it should not be done.

The reason for this is that first-party API clients will always get whatever scopes they request, so we cannot control which APIs a first-party API client can access or what permissions they will get.

Third-party clients on the other hand can also request whatever scopes they like, and it will be **up to the end-user** to grant them or not.

<!-- focus: false -->

![An example screenshot of the screen that the user will see after logging in for the first time through a client that requests scopes.](https://images.ctfassets.net/cdy7uua7fh8z/1te4FYRbu0aFcdohdXY2Rv/116bed5515eb2114c39374fb0a258912/consent-screen.png)

So for third-party API clients we would also not be able to control who can access what, since it will be up to the end-users to grant this access.

Instead, verify if a token has access to your API using the `https://publiq.be/publiq-apis` claim as documented in the [Token Guidelines](#token-guidelines) above. More specific permissions like what actions the token can actually perform or what resources they can access should be managed inside your API itself.
