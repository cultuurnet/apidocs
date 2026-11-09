# Permissions

Permissions are often very fine-grained and contextual. For example to edit an event in UiTdatabank, you need to be the creator of that specific event or have a role with a permission to edit events that match a specific query. In UiTPAS you can only perform administrative actions related to the organizer(s) that your user is linked to.

Since we cannot capture these contextual parameters in OAuth2 scopes, permissions should always be managed and evaluated inside every API itself.

This has the added benefit that administrators of a specific product can more easily manage these permissions inside the admin UI of that product, instead of having all permissions inside the authorization server (Keycloak).

Note that scopes **are** used to determine whether a client can access your API at all (see [API scopes](./authentication.md#api-scopes)). Permissions determine what that client or user can do inside your API.

* ✅ Use the [API scope](./authentication.md#api-scopes) of your API to check if a token or client can access your API
* ❌ Don't use OAuth2 scopes for fine-grained permissions
* ✅ Link permissions and/or roles to user ids (`sub`) or client ids (`azp`) inside your own API
