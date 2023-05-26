# Deleting a place

In some exceptional cases, you may want to delete your place from UiTdatabank. For example, if it the place you created already existed in UiTdatabank.

However, you **should not** delete your place for any of the following reasons:

* It is in the past. UiTinVlaanderen and other online calendars will hide it automatically once it has passed.
* It is temporarily or permanently closed. You should instead [mark it as temporarily or permanently closed in UiTdatabank](./status.md).

Note that when you delete a place, it is not actually deleted but its `workflowStatus` property will be set to `DELETED`. This will hide it from UiTinVlaanderen, other online calendars, and the UiTdatabank search page. You can learn more about the `workflowStatus` property in the guide about [publishing an place](./publish.md).

Keep in mind that deleting a place is an irreversible action. If you deleted a place by accident, the best recourse is to create a new one with the same info.

<!-- theme: warning -->

> It is only possible to delete a place when it is not linked to one or more events. If your place is linked to one or more events you must first link the events to another place. Since the place you created can be used by other creators it is possible thatyou cannot move all the events from the place to another place due to permission restrictions. In that case, please contact us on `technical-support@publiq.be`.

## Required permissions

The same permission checks as [updating a place](./update.md) are applicable.

## Methods

There are two ways to delete an place.

### 1. DELETE endpoint

Using the [`DELETE /places/{placeId}`](/reference/entry.json/paths/~1places~1{placeId}/delete) endpoint you can soft-delete the place at the given URL.

The place's `workflowStatus` property will automatically be updated to `DELETED`.

### 2. workflowStatus property

Using the [`PUT /place/{placeId}`](/reference/entry.json/paths/~1places~1{placeId}/put) endpoint you can update the place at the given URL and set its `workflowStatus` property to `DELETED` to soft-delete it.

Note that you will need to include the place's complete JSON data to update it via this endpoint, as explained in more detail in the guide about [updating a place](./update.md).
