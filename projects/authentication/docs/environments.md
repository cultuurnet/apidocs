# Authorization server URLs

The authorization servers that can be used to request [tokens](./methods.md) are available on two domains, one for the test environment and one for the production environment of our APIs.

*   Test: `https://account-test.uitid.be`
*   Production: `https://account.uitid.be`

When you [request your client credentials](./requesting-credentials.md), you will initially recieve credentials that only work with the test environment. Using those credentials you can build and test your integration. When your integration is ready, we will activate your client on the production environment and you will recieve a second set of credentials for the production environment.

## Differences between environments

### Credentials

Your client id and secret will be different for the test environment and the production environment, and you will need to use the id and secret that correspond with the environment you're integrating with.

### Token validity

You can only use tokens from the test environment on test APIs, and tokens from the production environment on production APIs.

For example: To communicate with the test environment of the UiTdatabank or UiTPAS APIs, you will need a token from the test environment of the authorization server.

### Data (user accounts)

The test environment will not contain the same data as the production environment. This means that a user account may exist on the test environment but not on the production environment, and vice versa. This can easily be fixed by registering a new account with the same email address on the environment where it is missing.

### Functional / technical

In general, there are no functional or technical differences between the test and production environment.

It is possible that new functionality is being deployed, in which case the test environment may already have this new functionality while the production environment does not for a short period of time.
