# Updating a place

While you can immediately provide all possible properties when [creating a new place](./create.md), it can be useful to make changes to the place later. For example, when someone made changes to it in your own application to fix a typo, or to add some more info that was missing before.

A place can be updated in two ways:

1. By [updating multiple properties at once](#updating-multiple-properties-at-once) via the [`PUT /places/{placeId}`](/reference/entry.json/paths/~1places~1{placeId}/put) endpoint.
2. By [updating a single property](#updating-a-single-property) via the more granular endpoints provided specifically for this purpose.

These two methods will be explained in more detail below, including recommendations when to use which one.

## Permissions

Regardless of whether you update the place in its entirety, or use a specific endpoint to update just one property, you can only update an place if one of the following checks applies to you:

* You are the `creator` of the place. This means that if you use a [user access token](https://docs.publiq.be/docs/authentication/methods/user-access-token), the user has to be the initial creator of the place. If you use a [client access token](https://docs.publiq.be/docs/authentication/methods/client-access-token), the place must have previously been created with a client access token for the same client.
* The user that your [user access token](https://docs.publiq.be/docs/authentication/methods/user-access-token) belongs to was [added as a contributor](../shared/contributors.md) on the place.
* The user or client that your access token belongs to has been given extra permissions to make changes to all places or a subset of places in UiTdatabank. For example, to make edits to places in a specific postal code. [Contact us](https://docs.publiq.be/#contact-us) for more info if you believe that your client or user(s) qualify for such extra permissions. Note that this solution is not possible when you have a very large and/or dynamic list of users that require this permission (when using user access tokens).

## Updating multiple properties at once

When you need to update multiple properties on a place, you can update a place in its entirety via the [`PUT /places/{placeId}`](/reference/entry.json/paths/~1places~1{placeId}/put) endpoint.

This endpoint accepts a complete [place model](../../../models/place-with-read-example.json) in the same format as the [`POST /events`](/reference/entry.json/paths/~1places/post) endpoint, but instead of creating a new place it updates the place at the given URL to the new place data included in the update request.

When updating a place in its entirety, it is important to keep the following points in mind:

* Any updates made to the place in UiTdatabank (for example, via the UI) will be reverted if you do not [fetch the place details](/reference/entry.json/paths/~1places~1{placeId}/get) first and apply your updates to this data, but instead create the place data only based on data in your own application. **We recommend to always fetch the place details first so your local copy of the place data is up-to-date and any changes made in UiTdatabank are not reverted by accident.**
* You can remove one or more optional properties from the place by omitting them from the place data in your update request, or by explicitly setting them to `null`. Note that when setting them to `null`, they will be removed completely from the place.
* Any existing (optional) properties on the place that are not included in the update request will be removed from the place. If such an optional property has a default value, it will be reverted to that value instead (for example, the [`status.type`](./status.md) property will be reset to `Available` if not included in the update request).
* As an exception to the points above, extra [labels](../shared/labels.md) added to the place via the UiTdatabank UI will be kept on the place even when not included in the update request. To remove such labels when needed, use the [`DELETE /places/{placeId}/labels/{labelName}`](/reference/entry.json/paths/~1places~1{placeId}~1labels~1{labelName}/delete) endpoint.
* While you may include read-only properties like `creator`, `created` and `modified` in your update request, they will be ignored by Entry API. Read-only properties are indicated by a grey `read-only` flag on the right side of their name in [the place model](../../../models/place-with-read-example.json).

<!-- theme: success -->

> It is recommended to update a place in its entirety when you need to edit multiple properties at once. For example, when a user has saved the edit form with multiple fields of a place in your own application.
>
> Additionally, you can update a place in its entirety when you want to make sure the data in UiTdatabank is up-to-date, but you do not know for sure which fields might be out of sync. For example, when you periodically sync the place data of your application to UiTdatabank.
>
> Lastly, updating a place in its entirety is an easy generic way to implement place updates when your application needs to support updates to various properties, regardless of whether they're updated at the same time or individually.

## Updating a single property

While you can update a place in its entirety to update a single property, you can also update individual properties via endpoints provided specifically for this purpose.

Some examples include:

* [`PUT /places/{placeId}/calendar`](/reference/entry.json/paths/~1places~1{placeId}~1calendar/put) to update the [calendar info](../shared/calendar-info.md)
* [`PUT /places/{placeId}/contact-point`](/reference/entry.json/paths/~1places~1{placeId}~1contact-point/put) to add or update the [contact info](../shared/booking-and-contact-info.md)
* [`PUT /places/{placeId}/description/{language}`](/reference/entry.json/paths/~1places~1{placeId}~1description~1{language}/put) to add or update a [description](../shared/description.md) in a specific language
* ...

You can find all possible endpoints to update a single place property in the "Places" group under the ["API reference"](../../../reference/entry.json) menu item.

<!-- theme: success -->

> It is recommended to use these property-specific endpoints when you only need to support updates to one or a few properties, and/or when you have a create or edit form in your application that auto-saves changes to fields like in the [UiTdatabank web application](https://www.uitdatabank.be).
