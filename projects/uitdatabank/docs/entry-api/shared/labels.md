# Labels

Labels are a way to enrich your event, place or organizer. They can be used to [create search api queries](../../search-api/filters/labels.md) to fetch events for your
agenda. They can be public or private & visible or hidden.

## Scope

Labels can be added on:

* ✅ [Events](../events/introduction.md)
* ✅ [Places](../places/introduction.md)
* ✅ [Organizers](../organizers/introduction.md)

## Format

* The label must be longer than 1 character.
* The label must be shorter than 255 characters.
* The label cannot contain semicolons

## Visible/hidden Labels

Labels can be visible or hidden. Visible labels will be shown on public agenda's, hidden labels will not.

## Public/private Labels

Some labels are private, which means only users or clients with specific permissions can add them to events, places or organizers.
If you do not have the required permission, you will get a validation error when you try to add it to your event, place or organizer.
Public labels can be added by anyone.

## Adding a label

When creating or updating an event/place/organizer, you can include a `labels` property (for visible labels) and/or a `hiddenLabels` property (for hidden labels). Both can include 1 or more labels.
For example:

```json
{
  "mainLanguage": "nl",
  "name": {
    "nl": "Mijn voorbeeld activiteit"
  },
  "...": "...",
  "labels": [
    "this-will-be-shown",
    "this-also"
  ],
  "hiddenLabels": [
    "this-is-not-shown"
  ]
}
```

Alternatively, you can set a label using one of these endpoints:

* For events: [`PUT /events/{eventId}/labels/{labelName}`](/reference/entry.json/paths/~1events~1{eventId}~1labels~1{labelName}/put)
* For places: [`PUT /places/{placeId}/labels/{labelName}`](/reference/entry.json/paths/~1places~1{placeId}~1labels~1{labelName}/put)
* For organizers: [`PUT /organizers/{organizerId}/labels/{labelName}`](/reference/entry.json/paths/~1organizers~1{organizerId}~1labels~1{labelName}/put)

## Removing a label

To remove a label **when updating an event/place/organizer in its entirety**, you can simply leave out the specific `label`.

<!-- theme: danger -->
>
> Exception: some existing labels or hiddenLabels may be kept on the event even if they are not included in the update request. For example if they were added via the UiTdatabank UI, or if the client or user making the request does not have sufficient permission to remove some specific labels.

Alternatively, you can delete a label using one of these endpoints:

* For events: [`DELETE /events/{eventId}/labels/{labelName}`](/reference/entry.json/paths/~1events~1{eventId}~1labels~1{labelName}/delete)
* For places: [`DELETE /places/{placeId}/labels/{labelName}`](/reference/entry.json/paths/~1places~1{placeId}~1labels~1{labelName}/delete)
* For organizers: [`DELETE /organizers/{organizerId}/labels/{labelName}`](/reference/entry.json/paths/~1organizers~1{organizerId}~1labels~1{labelName}/delete)
