# Deleting an event

In some exceptional cases, you may want to delete your event from UiTdatabank. For example, if it has been entered more than once.

However, you **should not** delete your event for any of the following reasons:

* It is in the past. UiTinVlaanderen and other online calendars will hide it automatically once it has passed.
* It is cancelled or postponed. You should instead [mark it as cancelled or postponed in UiTdatabank](./status.md).
* There are no more tickets/reservations available. You should instead [mark it as fully booked](./booking-availability.md).

Note that when you delete an event, it is not actually deleted but its `workflowStatus` property will be set to `DELETED`. This will hide it from UiTinVlaanderen, other online calendars, and the UiTdatabank search page. You can learn more about the `workflowStatus` property in the guide about [publishing an event](./publish.md).

Keep in mind that deleting an event is an irreversible action. If you deleted an event by accident, the best recourse is to create a new one with the same info.

## Required permissions

The same permission checks as [updating an event](./update.md) are applicable.

## Methods

There are two ways to delete an event.

### 1. DELETE endpoint

Using the [`DELETE /events/{eventId}`](/reference/entry.json/paths/~1events~1{eventId}/delete) endpoint you can soft-delete the event at the given URL. 

The event's `workflowStatus` property will automatically be updated to `DELETED`.

### 2. workflowStatus property

Using the [`PUT /events/{eventId}`](/reference/entry.json/paths/~1events~1{eventId}/put) endpoint you can update the event at the given URL and set its `workflowStatus` property to `DELETED` to soft-delete it.

Note that you will need to include the event's complete JSON data to update it via this endpoint, as explained in more detail in the guide about [updating an event](./update.md).
