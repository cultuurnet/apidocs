# Labels

Labels are a way to enrich your event, place or organizer. They can be used to create search api queries to fetch events for your 
agenda. They can be public or private & visible or hidden.

## Scope

Contributors can be added on:

* ✅ [Events](../events/introduction.md)
* ✅ [Places](../places/introduction.md)
* ✅ [Organizers](../organizers/introduction.md)

## Format
- The label must be longer than 1 character.
- The label must be shorter than 255 characters.
- The label cannot contain semicolons

## Visible/hidden Labels

Labels can be visible or hidden. Visible labels will be shown on public agenda's, hidden labels will not.

## Private Labels

Some labels are private, which means only users with a role can add them to their event, place or organizer.
If you do not have the required permission, you will get a validation error, when you try to add it to your event, place or organizer.

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


<!--
  @todo
  - What are labels?
  - Visible and hidden labels
  - Adding a label to an event/place/organizer
  - Removing a label
  - Filtering by labels (refer to Search API guide)
-->
