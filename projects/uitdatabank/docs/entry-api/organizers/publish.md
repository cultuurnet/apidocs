# Publishing an organizer

Unlike events or places, a newly created organizer has by default the state `ACTIVE` in [UiTdatabank](https://www.uitdatabank.be).
No further action is required to publish the organizer.

For example, when [fetching the details of your organizer](/reference/entry.json/paths/~1organizers~1{organizerId}/get) after creating it, it will have the following property:

```json
{
  "workflowStatus": "ACTIVE"
}
```

In this guide, you will learn about the possible workflow statuses of an organizer.

## Workflow overview

An organizer always has exactly one workflow status with one of the following values.

### ACTIVE

The default initial state of an organizer. It will be visible on the search page on [UiTdatabank](https://www.uitdatabank.be).

The creator of the organizer can view it in their UiTdatabank dashboard (if it was created using a [user access token](https://docs.publiq.be/docs/authentication/methods/user-access-token)). [Contributors](../shared/contributors.md) added to the organizer can also view it in their dashboard.

### DELETED

Organizers with the `DELETED` status are hidden from the UiTdatabank search page.

An organizer will move to the `DELETED` status when it is [deleted](./delete.md) by someone who has the permission `Organisaties beheren`.

Keep in mind that deleting an organizer is an irreversible action. If you deleted an organizer by accident, the best recourse is to create a new one with the same info.
