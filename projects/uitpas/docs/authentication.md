# Authentication

Every request to the UiTPAS API needs to be authenticated.

Most endpoints on the UiTPAS API support both [user access tokens](https://docs.publiq.be/docs/authentication/methods/user-access-token) and [client access tokens](https://docs.publiq.be/docs/authentication/methods/client-access-token), as explained in more detail in the [general authentication documentation](https://docs.publiq.be/docs/authentication/methods/overview).

Additionally, the [`GET /rewards`](https://docs.publiq.be/docs/uitpas/313b1d795bf8f-search-rewards) endpoint also accepts the more simple [client identification](https://docs.publiq.be/docs/authentication/methods/client-identification) method. This makes it possible to build a search functionality on UiTPAS rewards in frontend applications where no UiTiD user is logged in and no client secret can be stored safely. (For example native mobile applications.)

See [requesting client credentials](https://docs.publiq.be/docs/authentication/requesting-credentials) to learn more about how to get the credentials required to authenticate your requests to the UiTPAS API.
