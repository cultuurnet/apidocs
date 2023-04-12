# Linking an organizer

While organizers aren't mandatory for creating events or places, they can provide useful information for your visitors.
There are various ways to link an organizer to your event or place.
1. By the [granular endpoint](#granular-endpoint).
2. By adding the link to the organizer as a property in the [JSON body](#json-body) during a create or complete update. 

## Permissions

Anyone can link any organizer if they have the permission to [update the event](../events/update.md) or [update the place](../places/update.md) they want to link to the organizer. This does not mean that people who work at the organizer get permission to edit your event or place.

## Overview

First you need to [find](./finding-and-reusing-organizers.md) or [create](./create.md) the organizer you wish to link to your event or place.

Now you should have a link to the organizer, in the form of an `@id` property (inspired by JSON-LD).

Example for an Organizer VIERNULVIER (id `ac1adc43-410b-48bd-b79a-ca417788652f` on the test environment):

```json
{
  "@id": "https://io-test.uitdatabank.be/organizers/ac1adc43-410b-48bd-b79a-ca417788652f",
  "@type": "Organizer"
}
```

## Granular endpoint

You can link an organizer to your event or place via the organizer endpoints.

## JSON body

You can link an organizer to your event of by adding the property in the JSON body during a create or complete update.

```json
{
  "mainLanguage": "nl",
  "name": {
    "nl": "Voorbeeld @ VIERNULVIER"
  },
  "location": {
    "@id": "https://io-test.uitdatabank.be/place/d8debf97-9b09-4c1d-8ac0-c3e32650a001"
  },
  "organizer": {
    "@id": "https://io-test.uitdatabank.be/organizers/ac1adc43-410b-48bd-b79a-ca417788652f",
  },
  "terms": [
    {
      "id": "0.50.4.0.0"
    }
  ],
  "calendarType": "single",
  "subEvent": [
    {
      "startDate": "2023-02-18T17:30:00+01:00",
      "endDate": "2023-02-18T23:00:00+01:00"
    }
  ]
}
```
