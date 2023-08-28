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

When you need to update multiple properties on an organizer, you can update an organizer in its entirety via the [`PUT /organizers/{organizersId}`](/reference/entry.json/paths/~1organizers~1{organizerId}/put) endpoint.

This endpoint accepts a complete [organizer model](../../../models/organizer-with-read-example.json) in the same format as the [`POST /organizers`](/reference/entry.json/paths/~1organizers/post) endpoint, but instead of creating a new organizer it updates the organizer at the given URL to the new organizer data included in the update request.

When updating an organizer in its entirety, it is important to keep the following points in mind:

* Any updates made to the organizer in UiTdatabank (for example, via the UI) will be reverted if you do not [fetch the organizer details](/reference/entry.json/paths/~1organizers~1{organizerId}/get) first and apply your updates to this data, but instead create the organizer data only based on data in your own application. **We recommend to always fetch the organizer details first so your local copy of the organizer data is up-to-date and any changes made in UiTdatabank are not reverted by accident.**
* You can remove one or more optional properties from the organizer by omitting them from the organizer data in your update request, or by explicitly setting them to `null`. Note that when setting them to `null`, they will be removed completely from the organizer.
* Any existing (optional) properties on the organizer that are not included in the update request will be removed from the organizer.
* As an exception to the points above, extra [labels](../shared/labels.md) added to the organizer via the UiTdatabank UI will be kept on the organizer even when not included in the update request. To remove such labels when needed, use the [`DELETE /organizers/{organizerId}/labels/{labelName}`](/reference/entry.json/paths/~1organizers~1{organizerId}~1labels~1{labelName}/delete) endpoint.
* While you may include read-only properties like `creator`, `created` and `modified` in your update request, they will be ignored by Entry API. Read-only properties are indicated by a grey `read-only` flag on the right side of their name in [the organizer model](../../../models/organizer-with-read-example.json).

<!-- theme: success -->

> It is recommended to update an organizer in its entirety when you need to edit multiple properties at once. For example, when a user has saved the edit form with multiple fields of an organizer in your own application.
>
> Additionally, you can update an organizer in its entirety when you want to make sure the data in UiTdatabank is up-to-date, but you do not know for sure which fields might be out of sync. For example, when you periodically sync the organizer data of your application to UiTdatabank.
>
> Lastly, updating an organizer in its entirety is an easy generic way to implement organizer updates when your application needs to support updates to various properties, regardless of whether they're updated at the same time or individually.

## Updating a single property

While you can update an organizer in its entirety to update a single property, you can also update individual properties via endpoints provided specifically for this purpose.

Some examples include:

* [`PUT /organizers/{organizerId}/description/{language}`](/reference/entry.json/paths/~1organizers~1{organizerId}~1description~1{language}/put) to update the [description](../shared/description.md)
* [`PUT /organizers/{organizerId}/contact-point`](/reference/entry.json/paths/~1organizers~1{organizerId}~1contact-point/put) to add or update the [contact info](../shared/booking-and-contact-info.md)
* ...

You can find all possible endpoints to update a single organizer property in the "Organizers" group under the ["API reference"](../../../reference/entry.json) menu item.

<!-- theme: success -->

> It is recommended to use these property-specific endpoints when you only temp need to support updates to one or a few properties, and/or when you have a create or edit form in your application that auto-saves changes to fields like in the [UiTdatabank web application](https://www.uitdatabank.be).

<!-- 
  @todo
  - Explain that you can do complete update via PUT /organizers/{organizerId}, or partial updates using the other endpoints. 
  - Make sure to mention that any (optional) fields that you can update, you can also supply those when creating.
  - Make sure to mention how to delete (optional) fields when updating.
  - Permissions: Who can edit an organizer?
-->
