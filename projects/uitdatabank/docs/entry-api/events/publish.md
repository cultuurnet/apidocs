# Publishing an event

When [creating a new event](./create.md), it is by default stored in a `DRAFT` state in [UiTdatabank](https://www.uitdatabank.be). 

For example, when [fetching the details of your event](/reference/entry.json/paths/~1events~1{eventId}/get) after creating it, it will have the following property:

```json
{
  "workflowStatus": "DRAFT"
}
```

Draft events are not visible on [UiTinVlaanderen](https://www.uitinvlaanderen.be) or other online calendars, so that users have control over the publication date of their events. Additionally, some regions have a content moderation team that needs to explicitly approve events before they become visible on their own online calendars.

In this guide, you will learn about the possible workflow statuses and how to transition your event from one status to the other.

## Workflow overview

An event always has exactly one workflow status with one of the following values.

### DRAFT

The default initial state of an event. As long as an event has this workflow status, it is not visible on UiTinVlaanderen, other online calendars, or the search page on [UiTdatabank](https://www.uitdatabank.be).

The creator of the event can view it in their UiTdatabank dashboard (if it was created using a [user access token](https://docs.publiq.be/docs/authentication/methods/user-access-token)), and publish it once ready. [Contributors](../shared/contributors.md) added to the event can also view it in their dashboard and publish it when ready. When publishing the event, an optional publication date can be set so that the event only becomes visible at a specific moment in the future.

An API client can also publish it by transitioning it to the `READY_FOR_VALIDATION` status, given that it has the necessary permission to [update the event](./update.md). Like users, API clients can also specify an optional publication date so the event only becomes visible at a specific later moment. The different ways of publishing an event as an API integrator are [described in more detail below](#publishing-an-event-as-an-api-integrator).

### READY_FOR_VALIDATION

When an event is published by a user or API client, it is put in the `READY_FOR_VALIDATION` status.

[UiTinVlaanderen](https://www.uitinvlaanderen.be) and many other online calendars will already display the event, but not all. [UiTdatabank](https://www.uitdatabank.be) will also show the event on its search page.

Depending on the region that your event is taking place in, it will be added to a list of events for a local content moderation team to review before it transitions to the `APPROVED` state and becomes visible on that region's local online calendars. If the content moderation team thinks the event does not comply with the [UiTdatabank content guidelines](https://helpdesk.publiq.be/hc/nl/articles/360008702459-Welke-activiteiten-mag-ik-invoeren-in-UiTdatabank-) (links to Dutch content), it will be moved to the `REJECTED` status instead.

In some regions there is no local content moderation team and the event will remain in the `READY_FOR_VALIDATION` state forever. However, in the online calendars of those regions (and overarching calendars like UiTinVlaanderen) all events in the `READY_FOR_VALIDATION` status are displayed by default so this is essentially the same as the `APPROVED` status in those cases.

### APPROVED

Once an event gains the `APPROVED` workflow status, it is visible on all online calendars.

Note that you cannot put your event in the `APPROVED` status yourself. In general, only a content moderation team can do this.

One exception are API integrations of some specific trusted partners, in which case the events created by those integrations are automatically transitioned from `READY_FOR_VALIDATION` to `APPROVED`. If you believe that you qualify for such an automatic transition, please [contact us](https://docs.publiq.be/#contact-us). (Note that you will still need to explicitly transition the event to the `READY_FOR_VALIDATION` status before it will move to `APPROVED`.)

### REJECTED

Events with the `REJECTED` status are hidden from UiTinVlaanderen and other online calendars, and from the UiTdatabank search page. It is essentially the same status as `DRAFT`, except that an event in the `REJECTED` status cannot move back to the `READY_FOR_VALIDATION` status.

If you believe that your event was rejected by mistake, or you can fix any issues with it, then you may create a new event instead.

### DELETED

Events with the `DELETED` status are hidden from UiTinVlaanderen and other online calendars, and from the UiTdatabank search page.

An event with any workflow status can move to the `DELETED` status when it is [deleted](./delete.md) by its creator, one of its contributors, or an administrator of UiTdatabank.

Keep in mind that deleting an event is an irreversible action. If you deleted an event by accident, the best recourse is to create a new one with the same info.

> Note that you must not delete an event just because its end date has been reached. UiTinVlaanderen and other online calendars will automatically hide the event once its end date (`availableTo` property) has been reached. 
>
> In the case of most events, this is the same as the end date of the event. Only in the case of events with the type *"lessenreeks"* is it the start date of the event, because you can usually no longer register to participate in such an event after it has started.

## Publishing an event as an API integrator

### Immediately when creating an event

When you [create a new event](./create.md), it will automatically get the workflow status `DRAFT`. However, you may also set the optional `workflowStatus` property to `READY_FOR_VALIDATION` when creating the event so that it immediately becomes visible on most online calendars.

**We recommend this approach for most API integrations**, except when your users expect their events to only become visible on online calendars after they have explicitly published them (either in your application or in UiTdatabank itself).

For example:
```json
{
  "workflowStatus": "READY_FOR_VALIDATION",
  "mainLanguage": "nl",
  "name": {
    "nl": "Voorbeeld @ Het Depot"
  },
  "location": {
    "@id": "https://io-test.uitdatabank.be/place/787d7420-c06f-4935-b3c5-5cd5a1276796"
  },
  "terms": [
    {
      "id": "0.50.4.0.0"
    }
  ],
  "calendarType": "single",
  "subEvent": [
    {
      "startDate": "2025-01-18T17:30:00+01:00",
      "endDate": "2025-01-18T23:00:00+01:00"
    }
  ]
}
```

You may also include the optional `availableFrom` property and set it to a future ISO-8601 datetime, so that the event will only become visible on UiTinVlaanderen and other online calendars after that moment. For example:

```json
{
  "workflowStatus": "READY_FOR_VALIDATION",
  "availableFrom": "2024-11-01T00:00:00+01:00",
  "name": {
    "nl": "Voorbeeld @ Het Depot"
  },
  "location": {
    "@id": "https://io-test.uitdatabank.be/place/787d7420-c06f-4935-b3c5-5cd5a1276796"
  },
  "terms": [
    {
      "id": "0.50.4.0.0"
    }
  ],
  "calendarType": "single",
  "subEvent": [
    {
      "startDate": "2025-01-18T17:30:00+01:00",
      "endDate": "2025-01-18T23:00:00+01:00"
    }
  ]
}
```

### At a later moment when updating an event

When [updating an event](./update.md) in its entirety, you can set the `workflowStatus` and/or the `availableFrom` properties just like when creating an event.

Alternatively, you can use the [`PUT /events/{eventId}/workflow-status`](/reference/entry.json/paths/~1events~1{eventId}~1workflow-status/put) endpoint to update the `workflowStatus` and optionally the related `availableFrom` property.

### When "importing" events (deprecated)

In the past, events were typically created by API integrators by "importing" them via the [`POST /imports/events`](/reference/entry.json/paths/~1imports~1events/post) endpoint.

If you use this endpoint, your event will automatically get the workflow status `READY_FOR_VALIDATION` instead of `DRAFT`, for backward compatibility with existing integrations.

Note however that this endpoint is deprecated, and it is recommended to use [`POST /events`](/reference/entry.json/paths/~1events/post) instead. Both endpoints work the same except that you should set the `workflowStatus` property explicitly to `READY_FOR_VALIDATION` when you want to immediately publish your newly created events using the latter.
