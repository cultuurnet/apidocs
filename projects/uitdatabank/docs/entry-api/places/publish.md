# Publishing a place

When [creating a new place](./create.md), it is by default stored in a `DRAFT` state in [UiTdatabank](https://www.uitdatabank.be).

For example, when [fetching the details of your place](/reference/entry.json/paths/~1places~1{placeId}/get) after creating it, it will have the following property:

```json
{
  "workflowStatus": "DRAFT"
}
```

Draft places are not visible on [UiTinVlaanderen](https://www.uitinvlaanderen.be) or other online calendars, so that users have control over the publication date of their places.

In this guide, you will learn about the possible workflow statuses and how to transition your place from one status to the other.

## Workflow overview

A place always has exactly one workflow status with one of the following values.

### DRAFT

The default initial state of a place. As long as a place has this workflow status, it is not visible on UiTinVlaanderen, other online calendars, or the search page on [UiTdatabank](https://www.uitdatabank.be).

The creator of the place can view it in their UiTdatabank dashboard (if it was created using a [user access token](https://docs.publiq.be/docs/authentication/methods/user-access-token)), and publish it once ready. [Contributors](../shared/contributors.md) added to the place can also view it in their dashboard and publish it when ready. When publishing the place, an optional publication date can be set so that the place only becomes visible at a specific moment in the future.

An API client can also publish it by transitioning it to the `READY_FOR_VALIDATION` status, given that it has the necessary permission to [update the place](./update.md). Like users, API clients can also specify an optional publication date so the place only becomes visible at a specific later moment. The different ways of publishing a place as an API integrator are [described in more detail below](#publishing-a-place-as-an-api-integrator).

### READY\_FOR\_VALIDATION

When a place is published by a user or API client, it is put in the `READY_FOR_VALIDATION` status.

[UiTinVlaanderen](https://www.uitinvlaanderen.be) will already display the place and most of the (few) other online calendars that publish places.
[UiTdatabank](https://www.uitdatabank.be) will also show the place on its search page.

Depending on the region that your place is located in, it will be added to a list of places for a local content moderation team to review before it transitions to the `APPROVED` state and becomes visible on that region's local online calendars. If the content moderation team thinks the place does not comply with the [UiTdatabank content guidelines](https://helpdesk.publiq.be/hc/nl/articles/360008702459-Welke-activiteiten-mag-ik-invoeren-in-UiTdatabank-) (links to Dutch content), it will be moved to the `REJECTED` status instead.

In some regions there is no local content moderation team and the place will remain in the `READY_FOR_VALIDATION` state forever. However, on UiTinVlaanderen all places in the `READY_FOR_VALIDATION` status are displayed by default so this is essentially the same as the `APPROVED` status in those cases.

### APPROVED

Once a place gains the `APPROVED` workflow status, it is visible on all online calendars (*if* places are published in the agenda).

Note that you cannot put your place in the `APPROVED` status yourself. In general, only a content moderation team can do this.

One exception are API integrations of some specific trusted partners, in which case the places created by those integrations are automatically transitioned from `READY_FOR_VALIDATION` to `APPROVED`. If you believe that you qualify for such an automatic transition, please [contact us](https://docs.publiq.be/#contact-us). (Note that you will still need to explicitly transition the place to the `READY_FOR_VALIDATION` status before it will move to `APPROVED`.)

### REJECTED

Places with the `REJECTED` status are hidden from UiTinVlaanderen and other online calendars, and from the UiTdatabank search page. It is essentially the same status as `DRAFT`, except that a place in the `REJECTED` status cannot move back to the `READY_FOR_VALIDATION` status.

If you believe that your place was rejected by mistake, or you can fix any issues with it, then you may create a new place instead.

### DELETED

Places with the `DELETED` status are hidden from UiTinVlaanderen and other online calendars, and from the UiTdatabank search page.

A place with any workflow status can move to the `DELETED` status when it is [deleted](./delete.md) by its creator, one of its contributors, or an administrator of UiTdatabank.

Keep in mind that deleting a place is an irreversible action. If you deleted an place by accident, the best recourse is to create a new one with the same info.

> Note that you must not delete a place just because its end date has been reached (in the case of a place with calendarType `periodic`). UiTinVlaanderen and other online calendars will automatically hide the places once its end date (`availableTo` property) has been reached. Permanent places will be published forever, unless they are deleted.

<!-- theme: warning -->

> It is only possible to delete a place when it is not linked to one or more events. If your place is linked to one or more events you must first link the events to another place. Since the place you created can be used by other creators it is possible thatyou cannot move all the events from the place to another place due to permission restrictions. In that case, please contact us on `technical-support@publiq.be`.

## Publishing a place as an API integrator

### Immediately when creating a place

When you [create a new place](./create.md), it will automatically get the workflow status `DRAFT`. However, you may also set the optional `workflowStatus` property to `READY_FOR_VALIDATION` when creating the place so that it immediately becomes visible on most online calendars.

**We recommend this approach for most API integrations**, except when your users expect their place to only become visible on online calendars after they have explicitly published them (either in your application or in UiTdatabank itself).

For example:

```json
{
   "workflowStatus": "READY_FOR_VALIDATION",
   "mainLanguage":"nl",
   "name":{
      "nl":"Basiliek van Koekelberg"
   },
   "address":{
      "nl":{
         "addressCountry":"BE",
         "addressLocality":"Ganshoren",
         "postalCode":"1083",
         "streetAddress":"Basiliekvoorplein 1"
      }
   },
   "terms":[
      {
         "id":"0.8.0.0.0"
      }
   ],
   "calendarType":"permanent"
}
```

You may also include the optional `availableFrom` property and set it to a future ISO-8601 datetime, so that the place will only become visible on UiTinVlaanderen and other online calendars after that moment. For example:

```json
{
   "workflowStatus": "READY_FOR_VALIDATION",
   "availableFrom": "2024-11-01T00:00:00+01:00",
   "mainLanguage":"nl",
   "name":{
      "nl":"Basiliek van Koekelberg"
   },
   "address":{
      "nl":{
         "addressCountry":"BE",
         "addressLocality":"Ganshoren",
         "postalCode":"1083",
         "streetAddress":"Basiliekvoorplein 1"
      }
   },
   "terms":[
      {
         "id":"0.8.0.0.0"
      }
   ],
   "calendarType":"permanent"
}
```

### At a later moment when updating a place

When [updating a place](./update.md) in its entirety, you can set the `workflowStatus` and/or the `availableFrom` properties just like when creating a place.

Alternatively, you can use the [`PUT /places/{placeId}/workflow-status`](/reference/entry.json/paths/~1places~1{placeId}~1workflow-status/put) endpoint to update the `workflowStatus` and optionally the related `availableFrom` property.

### When "importing" places (deprecated)

In the past, places were typically created by API integrators by "importing" them via the [`POST /imports/places`](/reference/entry.json/paths/~1imports~1places/post) endpoint.

If you use this endpoint, your place will automatically get the workflow status `READY_FOR_VALIDATION` instead of `DRAFT`, for backward compatibility with existing integrations.

Note however that this endpoint is deprecated, and it is recommended to use [`POST /places`](/reference/entry.json/paths/~1places/post) instead. Both endpoints work the same except that you should set the `workflowStatus` property explicitly to `READY_FOR_VALIDATION` when you want to immediately publish your newly created places using the latter.
