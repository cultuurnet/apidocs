# Deleting an organizer

In some exceptional cases, you may want to delete your organizer from UiTdatabank. For example, if it has been entered more than once.

However, you **should not** delete your organizer for any of the following reason:

* It has no current events, UiTinVlaanderen and other online calendars focus on events and will not show your organizer. 

Note that when you delete an organizer, it is not actually deleted but its `workflowStatus` property will be set to `DELETED`. This will hide it from the autocomplete in the [UiTdatabank web application](https://uitdatabank.be). You can learn more about the `workflowStatus` property in the guide [workflowStatus](../shared/workflow-status.md).

Keep in mind that deleting an organizer is an irreversible action. If you deleted an organizer by accident, the best recourse is to create a new one with the same info.

## Required permissions

Only users with the permissions `Organisaties beheren` can delete an organizer.

## Method

Unlike events or place, there is only one way to delete an organizer.

### DELETE endpoint

Using the [`DELETE /organizers/{organizerId}`](/reference/entry.json/paths/~organizers~1{organizerId}/delete) endpoint you can soft-delete the event at the given URL. 

The organizer's `workflowStatus` property will automatically be updated to `DELETED`.
