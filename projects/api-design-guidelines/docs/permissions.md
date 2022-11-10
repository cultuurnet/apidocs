# Permissions

Permissions are often very fine-grained and contextual. For example to edit an event in UiTdatabank, you need to be the creator of that specific event or have a role with a permission to edit events that match a specific query. In UiTPAS you can only perform administrative actions related to the organizer(s) that your user is linked to.

Since we cannot capture these contextual parameters in Auth0 scopes, permissions should always be managed and evaluated inside every API itself.

This has the added benefit that administrators of a specific product can more easily manage these permissions inside the admin UI of that product, instead of having all permissions inside Auth0.

* ❌ Don't use scopes in Auth0 for permissions
* ✅ Link permissions and/or roles to user ids inside your own API
