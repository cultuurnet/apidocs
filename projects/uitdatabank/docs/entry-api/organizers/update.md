# Updating an organizer

While you can immediately provide all possible properties when [creating a new organizer](./create.md), it can be useful to make changes to the organizer later. For example, when someone made changes to it in your own application to fix a typo, or to add some more info that was missing before.

A organizer can be updated in two ways:

1. By [updating multiple properties at once](#updating-multiple-properties-at-once) via the [`PUT /organizers/{organizerId}`](/reference/entry.json/paths/~1organizers~1{organizerId}/put) endpoint.
2. By [updating a single property](#updating-a-single-property) via the more granular endpoints provided specifically for this purpose.

These two methods will be explained in more detail below, including recommendations when to use which one.

## Permissions

Regardless of whether you update the organizer in its entirety, or use a specific endpoint to update just one property, you can only update an organizer if one of the following checks applies to you:

* You are the `creator` of the organizer. This means that if you use a [user access token](https://docs.publiq.be/docs/authentication/methods/user-access-token), the user has to be the initial creator of the organizer. If you use a [client access token](https://docs.publiq.be/docs/authentication/methods/client-access-token), the organizer must have previously been created with a client access token for the same client.
* The user that your [user access token](https://docs.publiq.be/docs/authentication/methods/user-access-token) belongs to was [added as a contributor](../shared/contributors.md) on the organizer.
* The user or client that your access token belongs to has been given extra permissions to make changes to all organizers or a subset of organizers in UiTdatabank. For example, to make edits to organizers in a specific postal code. [Contact us](https://docs.publiq.be/#contact-us) for more info if you believe that your client or user(s) qualify for such extra permissions. Note that this solution is not possible when you have a very large and/or dynamic list of users that require this permission (when using user access tokens).

## Updating multiple properties at once

When you need to update multiple properties on a place, you can update a place in its entirety via the [`PUT /organizers/{organizersId}`](/reference/entry.json/paths/~1organizers~1{organizerId}/put) endpoint.

This endpoint accepts a complete [organizer model](../../../models/organizer-with-read-example.json) in the same format as the [`POST /organizers`](/reference/entry.json/paths/~1organizers/post) endpoint, but instead of creating a new organizer it updates the organizer at the given URL to the new organizer data included in the update request.

When updating an organizer in its entirety, it is important to keep the following points in mind:

* Any updates made to the organizer in UiTdatabank (for example, via the UI) will be reverted if you do not [fetch the organizer details](/reference/entry.json/paths/~1organizers~1{organizerId}/get) first and apply your updates to this data, but instead create the place data only based on data in your own application. **We recommend to always fetch the organizer details first so your local copy of the organizer data is up-to-date and any changes made in UiTdatabank are not reverted by accident.**
* You can remove one or more optional properties from the place by omitting them from the organizer data in your update request, or by explicitly setting them to `null`. Note that when setting them to `null`, they will be removed completely from the organizer.
* Any existing (optional) properties on the organizer that are not included in the update request will be removed from the organizer. If such an optional property has a default value, it will be reverted to that value instead (for example, the [`status.type`](./status.md) property will be reset to `Available` if not included in the update request).
* As an exception to the points above, extra [labels](../shared/labels.md) added to the place via the UiTdatabank UI will be kept on the place even when not included in the update request. To remove such labels when needed, use the [`DELETE /organizers/{organizerId}/labels/{labelName}`](/reference/entry.json/paths/~1organizers~1{organizerId}~1labels~1{labelName}/delete) endpoint.
* While you may include read-only properties like `creator`, `created` and `modified` in your update request, they will be ignored by Entry API. Read-only properties are indicated by a grey `read-only` flag on the right side of their name in [the place model](../../../models/organizer-with-read-example.json).

<!-- 
  @todo
  - Explain that you can do complete update via PUT /organizers/{organizerId}, or partial updates using the other endpoints. 
  - Make sure to mention that any (optional) fields that you can update, you can also supply those when creating.
  - Make sure to mention how to delete (optional) fields when updating.
  - Permissions: Who can edit an organizer?
-->
