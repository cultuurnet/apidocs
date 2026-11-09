# Authentication

<!-- theme: info -->

> APIs should support one or more of the authentication methods described in the [authentication docs](https://docs.publiq.be/docs/authentication/introduction). **Read those first** to see how they should work from an integrator's perspective, and **how to pick the right authentication mechanism(s) for your API**.
>
> This page gives some more info how those authentication mechanisms should be implemented on the API.

Our authorization server is a [Keycloak](https://www.keycloak.org/) instance, available on the following domains (`{base}` in the rest of this page):

| Environment | Base URL |
|---|---|
| Production | `https://account.uitid.be` |
| Acceptance | `https://account-acc.uitid.be` |
| Test | `https://account-test.uitid.be` |

The full configuration of each environment can be found in its OpenID Connect discovery document at `{base}/realms/uitid/.well-known/openid-configuration`.

## Client identification guidelines

* Read [how client identification must work from an integrator's perspective](https://docs.publiq.be/docs/authentication/client-identification).

When using client identification, APIs should support both the `x-client-id` header and `clientId` URL query parameter. If both are provided, preference should be given to the header.

The client id should be validated by fetching the client from the Keycloak admin API. Cache the result for a short period, so the admin API is not called on every request.

You should also validate that the [API scope](#api-scopes) of your API (e.g. `publiq-api-sapi-scope`) is assigned to the client in Keycloak as a default client scope.

For example, the Keycloak admin API can return the following client scopes for a client:

```json
{
  "clientId": "AaiyAPdpYdesoKnqjj8HJqRn4T5titww",
  "defaultClientScopes": [
    "web-origins",
    "acr",
    "roles",
    "profile",
    "UiTIDMappers",
    "email",
    "publiq-api-sapi-scope",
    "publiq-api-entry-scope"
  ],
  ...
}
```

The above example indicates that the client has access to UiTdatabank's Search API and Entry API. Check `defaultClientScopes` for your API scope, and ignore all other scopes.

## Token guidelines

* Read [how client access tokens must work from an integrator's perspective](https://docs.publiq.be/docs/authentication/client-access-token).
* Read [how user access tokens must work from an integrator's perspective](https://docs.publiq.be/docs/authentication/user-access-token).

When using tokens, endpoints should support both client and user access tokens wherever possible.

Examples of acceptable exceptions include endpoints like `/user` that provide info on the current user, based on a user access token.

To validate a token, check that:

* The signature is valid (see [Validating the signature](#validating-the-signature))
* The `exp` claim is **not** in the past
* The `aud` claim is (or contains) `https://api.publiq.be`
* The `iss` claim is exactly one of (depending on what environment your API is running on):
  * `https://account.uitid.be/`
  * `https://account-acc.uitid.be/`
  * `https://account-test.uitid.be/`
* The `scope` claim contains the [API scope](#api-scopes) of your API

Allow a small clock skew (max. 60 seconds) when checking `exp`.

<!-- theme: warning -->

> The issuer is `https://account.uitid.be/` (with a trailing slash and **without** `/realms/uitid`) for backward compatibility. Many Keycloak-specific libraries assume `{base}/realms/uitid` as the issuer by default, so make sure to configure the expected issuer explicitly.

### API scopes

Every API has its own scope in Keycloak. A token can only be used on your API if its `scope` claim contains your API's scope:

| API | Scope |
|---|---|
| UiTdatabank Entry API | `publiq-api-entry-scope` |
| UiTdatabank Search API | `publiq-api-sapi-scope` |
| UiTPAS API | `publiq-api-ups-scope` |
| BOA | `publiq-api-boa-scope` |
| museumPASSmusées Partner API | `publiq-api-mpm-scope` |
| GEO API | `publiq-api-geo-scope` |

The `scope` claim is a space-separated string, so split it on spaces and check for an exact match of your scope. Do not use a substring check. For example:

```json
{
  "sub": "4b2f8c1e-6d3a-4f5b-9e7c-2a1d0b3c4e5f",
  "aud": "https://api.publiq.be",
  "azp": "AaiyAPdpYdesoKnqjj8HJqRn4T5titww",
  "scope": "openid publiq-api-entry-scope publiq-api-sapi-scope profile offline_access email",
  ...
}
```

The example above indicates that the token is usable on UiTdatabank's Entry API and Search API. Ignore any other scopes in the claim (like `openid`, `profile` or `email`) when checking API access. If the `scope` claim is missing, consider it empty.

<!-- theme: warning -->

> **Deprecated: `https://publiq.be/publiq-apis` claim**
>
> Previously, API access was checked with the custom `https://publiq.be/publiq-apis` claim (e.g. `"entry sapi"`). This claim is now derived from the API scopes above and will be **removed** from the tokens once all APIs have switched to checking the `scope` claim. Existing APIs must migrate to the `scope` claim; new APIs must not use the `publiq-apis` claim.

The `azp` claim contains the id of the client that requested the token. You can use it if your API needs to [apply permissions](#permissions) per client.

**If the token has an invalid signature, is expired, or has an invalid `aud` or `iss` claim** you must return a **[401 error (see authentication docs)](https://docs.publiq.be/docs/authentication/errors#unauthorized)**

**If the token is not usable on your API**, you must return a **[403 error (see authentication docs)](https://docs.publiq.be/docs/authentication/errors#forbidden)**. (The difference with the other checks being that the token is valid on *some* of our APIs, but forbidden on your specific API.)

### Validating the signature

Tokens are signed by the authorization server with an RSA key. The public keys are published as a [JSON Web Key Set (JWKS)](https://datatracker.ietf.org/doc/html/rfc7517):

| Environment | JWKS URL |
|---|---|
| Production | `https://account.uitid.be/realms/uitid/protocol/openid-connect/certs` |
| Acceptance | `https://account-acc.uitid.be/realms/uitid/protocol/openid-connect/certs` |
| Test | `https://account-test.uitid.be/realms/uitid/protocol/openid-connect/certs` |

Preferably discover this URL via the `jwks_uri` property of the discovery document (`{base}/realms/uitid/.well-known/openid-configuration`) instead of hardcoding it.

* Use a well-maintained JWT or OpenID Connect library. Do not implement signature verification yourself.
* Select the key whose `kid` matches the `kid` in the token header, and only use keys with `"use": "sig"`. The JWKS also contains keys meant for encryption (`"use": "enc"`).
* Only accept the algorithm of the matching signing key in the JWKS (currently `RS256`), and do not trust the `alg` in the token header. Never accept `none` or symmetric algorithms (`HS256`/`HS384`/`HS512`).
* Cache the JWKS (e.g. for a few hours). When a token has a `kid` that is not in your cached JWKS, refetch the JWKS once (rate-limited), because keys can be rotated.
* Validate tokens locally. Do not call the `userinfo` or `introspect` endpoint of the authorization server on every request.

## Permissions

User/client permissions to perform actions inside your API should be managed inside the API itself.

If the specific client or user cannot perform a requested action, you must return a [403 error (see authentication docs)](https://docs.publiq.be/docs/authentication/errors#forbidden).

## Scopes

In OAuth2, scopes indicate what resources can be accessed using a specific token.

Use scopes **only** to determine which APIs a token can access, using the [API scopes](#api-scopes) described above.

This is safe because in Keycloak, a client can only get scopes that are assigned to it, and we control which scopes are assigned to which client:

* **Default client scopes** are always included in the token.
* **Optional client scopes** are only included when the client explicitly requests them in the `scope` parameter of the authorization or token request.

A client cannot get a scope that is not assigned to it, even if it requests it.

Read how integrators request optional API scopes for [client access tokens](https://docs.publiq.be/docs/authentication/client-access-token#api-scopes) and [user access tokens](https://docs.publiq.be/docs/authentication/user-access-token#api-scopes).

<!-- theme: danger -->

> Do not use scopes for fine-grained permissions, like what actions a token can perform or what resources it can access. These permissions are contextual and should be [managed inside your API itself](#permissions).

<!-- theme: info -->

> When we still used Auth0, these guidelines said not to use scopes for API access. Auth0 could not prevent a client from requesting any scope it liked, so we used the custom `https://publiq.be/publiq-apis` claim instead. Keycloak does not have this limitation.
