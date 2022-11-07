# Errors

This page contains an overview of all possible error types inside the `https://api.publiq.be/probs/uitdatabank/` namespace that can be returned by UiTdatabank APIs.

> For more info about error handling on our APIs in general, see the dedicated [Errors](https://publiq.stoplight.io/docs/errors) space.

## calendar-type-not-supported

*   **Complete type:** `https://api.publiq.be/probs/uitdatabank/calendar-type-not-supported`
*   **Title**: `Calendar type not supported`
*   **Status**: `400`

The request you are trying to perform is not supported on the calendar type of the given [event](/models/event-calendarType.json) or [place](/models/place-calendarType.json). For example, you cannot add or update subEvents to offers that use calendar type `periodic` or `permanent`.

Usually the `detail` of the error will contain more information about the specific operation that is not supported and on which calendar types.

Try using an event or place id with a calendar type that is supported by the operation that you are trying to perform.

## incompatible-audience-type

*   **Complete type:** `https://api.publiq.be/probs/uitdatabank/incompatible-audience-type`
*   **Title**: `Incompatible audience type`
*   **Status**: `400`

The provided audience type is incompatible. Check the `detail` of the error for more information.

Most likely this is caused by updating the audience of an event that only supports `education` as audience type.

## resource-id-already-in-use

*   **Complete type:** `https://api.publiq.be/probs/uitdatabank/resource-id-already-in-use`
*   **Title**: `Resource id already in use`
*   **Status**: `400`

The given id to create a new resource is already in use by an existing resource of another type.

Try creating the new resource with another unique resource id.

## duplicate-url

*   **Complete type:** `https://api.publiq.be/probs/uitdatabank/duplicate-url`
*   **Title**: `Duplicate URL`
*   **Status**: `400`

To avoid having duplicate organizers in UiTdatabank, every organizer needs to have a unique URL as website. This uniqueness is enforced on the URL of the organizer's website because it is the most likely part of the organizer's data that is unique. Some organizers actually have the same name or are located on the same address, so we cannot enforce uniqueness on those properties.

To check if an existing organizer already exists for a specific URL, use the `GET /organizers` endpoint with the `website` query parameter.

This error type may also be used by other resources in the future if necessary.

## label-not-allowed

*   **Complete type:** `https://api.publiq.be/probs/uitdatabank/label-not-allowed`
*   **Title**: `Label not allowed`
*   **Status**: `403`

Some labels are reserved and can only be used by users or API clients with sufficient permissions.

To fix this issue, do not include the label mentioned in the `label` property in the error response in your request when you retry.

Example error response:

```json
{
  "type": "https://api.publiq.be/probs/uitdatabank/label-not-allowed",
  "title": "Label not allowed",
  "status": 403,
  "detail": "The label \"reserved_label_example\" is reserved and you do not have sufficient permissions to use it.",
  "label": "reserved_label_example"
}
```

## invalid-workflow-status-transition

*   **Complete type:** `https://api.publiq.be/probs/uitdatabank/invalid-workflow-status-transition`
*   **Title**: `Invalid workflowStatus transition`
*   **Status**: `400`

The `workflowStatus` of an event can only transition from `DRAFT` to `READY_FOR_VALIDATION`, from `READY_FOR_VALIDATION` to either `APPROVED` or `REJECTED`, or from any workflowStatus to `DELETED`. Other transitions are not possible, for example back from `REJECTED` to `READY_FOR_VALIDATION`.

## attendance-mode-not-supported

*   **Complete type:** `https://api.publiq.be/probs/uitdatabank/attendance-mode-not-supported`
*   **Title**: `Attendance mode not supported`
*   **Status**: `400`

The action you are trying to perform on an event cannot be done because its `attendanceMode` does not support this action.

For example, you cannot update the location of an event with attendanceMode `online` to a physical location. Or you cannot set the location of an event with attendanceMode `mixed` or `offline` to the nil location (`https://io.uitdatabank.be/places/00000000-0000-0000-0000-000000000000`).

## event-has-uitpas-ticket-sales

*   **Complete type:** `https://api.publiq.be/probs/uitdatabank/event-has-uitpas-ticket-sales`
*   **Title**: `Event has UiTPAS ticket sales`
*   **Status**: `400`

The action you are trying to perform on an event cannot be done because the event has UiTPAS ticket sales. When an event has UiTPAS ticket sales its organizer, UiTPAS card system(s) and UiTPAS distribution key(s) cannot be updated because it would invalidate the existing ticket sales in UiTPAS.

## image-must-be-linked-to-resource

*   **Complete type:** `https://api.publiq.be/probs/uitdatabank/image-must-be-linked-to-resource`
*   **Title**: `Image must be linked to resource`
*   **Status**: `400`

When handling a image on an event / place / organizer, for example when making it the main image or when updating its `description` and/or `copyrightHolder`, the image id must be one of the images that are already linked to the event / place / organizer. Add the image first, so you can then perform the action on it.
