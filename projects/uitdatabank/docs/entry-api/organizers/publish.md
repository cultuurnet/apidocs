# Publishing an organizer

Unlike events or places, a newly created has by default the state `ACTIVE` in [UiTdatabank](https://www.uitdatabank.be).
No further action is required to publish the organizer.

For example, when [fetching the details of your organizer](/reference/entry.json/paths/~1organizer~1{organizerId}/get) after creating it, it will have the following property:

```json
{
  "workflowStatus": "ACTIVE"
}
```

In this guide, you will learn about the possible workflow statuses and how to transition your event from one status to the other.

## Workflow overview

An organizer always has exactly one workflow status with one of the following values.

### ACTIVE

The default initial state of an organizer. As long as an event has this workflow status, it is not visible on UiTinVlaanderen, other online calendars, or the search page on [UiTdatabank](https://www.uitdatabank.be).

The creator of the event can view it in their UiTdatabank dashboard (if it was created using a [user access token](https://docs.publiq.be/docs/authentication/methods/user-access-token)). [Contributors](../shared/contributors.md) added to the event can also view it in their dashboard.

### READY\_FOR\_VALIDATION

When an event is published by a user or API client, it is put in the `READY_FOR_VALIDATION` status.

[UiTinVlaanderen](https://www.uitinvlaanderen.be) and many other online calendars will already display the event, but not all. [UiTdatabank](https://www.uitdatabank.be) will also show the event on its search page.

Depending on the region that your event is taking place in, it will be added to a list of events for a local content moderation team to review before it transitions to the `APPROVED` state and becomes visible on that region's local online calendars. If the content moderation team thinks the event does not comply with the [UiTdatabank content guidelines](https://helpdesk.publiq.be/hc/nl/articles/360008702459-Welke-activiteiten-mag-ik-invoeren-in-UiTdatabank-) (links to Dutch content), it will be moved to the `REJECTED` status instead.

In some regions there is no local content moderation team and the event will remain in the `READY_FOR_VALIDATION` state forever. However, in the online calendars of those regions (and overarching calendars like UiTinVlaanderen) all events in the `READY_FOR_VALIDATION` status are displayed by default so this is essentially the same as the `APPROVED` status in those cases.

### APPROVED

Once an event gains the `APPROVED` workflow status, it is visible on all online calendars.

Note that you cannot put your event in the `APPROVED` status yourself. In general, only a content moderation team can do this.

One exception are API integrations of some specific trusted partners, in which case the events created by those integrations are automatically transitioned from `READY_FOR_VALIDATION` to `APPROVED`. If you believe that you qualify for such an automatic transition, please [contact us](https://docs.publiq.be/#contact-us). (Note that you will still need to explicitly transition the event to the `READY_FOR_VALIDATION` status before it will move to `APPROVED`.)

### DELETED

Organizers with the `DELETED` status are hidden from the UiTdatabank search page.

An organizer will move to the `DELETED` status when it is [deleted](./delete.md) by someone who has the permission `Organisaties beheren`.

Keep in mind that deleting an organizer is an irreversible action. If you deleted an organizer by accident, the best recourse is to create a new one with the same info.
