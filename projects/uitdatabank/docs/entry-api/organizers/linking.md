# Linking an organizers

While organizers aren't mandatory for creating events or places, they can provide useful information for your visitors.
There are various ways to link an organizer to your event or place.
1. you can immediately provide an organizer when creating a new event
2. it can also be done later when you make changes to the event later
3. It can be done via the granular endpoint

## Permissions

Anyone can link any organizer if they have the permission to [update the event](../events/update.md) or [update the place](../places/update.md) they want to link to the organizer. This does not mean that people who work at the organizer get permission to edit your event or place.

## Overview

First you need to [find](./finding-and-reusing-organizers.md) or [create](create.md) the organizer you wish to link to your event or place.

Then you should have a link to the organizer, in the form of an `@id` property (inspired by JSON-LD).

Example for an Organizer VIERNULVIER (id `ac1adc43-410b-48bd-b79a-ca417788652f` on the test environment):

```json
{
  "@id": "https://io-test.uitdatabank.be/organizers/ac1adc43-410b-48bd-b79a-ca417788652f",
  "@type": "Organizer"
}
```


You can link an organizer to your event or place via the organizer endpoints
- [`PUT /events/{eventId}/organizer`](/reference/entry.json/paths/~1events~1{eventId}~1organizer~1{organizerId}/put)
- [`PUT /places/{placeId}/organizer`](/reference/entry.json/paths/~1places~1{placeId}~1organizer~1{organizerId}/put)

<!-- 
  @todo
  - Explain who can link which organizers to events/places (= anyone can link any organizer to their own events/places) 
  - Explain that the linked organizer does NOT give permission to people that work at that organisation to make edits to the event
  - Explain how to link
  - Link to guides about finding organizers & creating organizers for info how to get an organizer URI
 -->
