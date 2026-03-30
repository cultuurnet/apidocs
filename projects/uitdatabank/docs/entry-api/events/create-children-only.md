# Creating an activity for children only

This guide explains how to create an activity in UiTdatabank that is specifically targeted at children.

Creating an activity for children only is very similar to [creating a regular new event](./create.md), so it is recommended to read that guide first.

## audienceType

To indicate that an activity is only for children, you must include an extra property `audienceType` and set the value to `childrenOnly`.

```json
{
  "audience": {
    "audienceType": "childrenOnly"
  }
}
```

## departurePlaces

This optional property contains a list of URIs referencing schools or other locations from which transport is arranged to bring children to the activity. This can be a walk, a bus, or a bicycle taxi that takes children from a school or childcare location to the activity's location.

Departure places can only be set on events where `audienceType` is `childrenOnly`. Each URI must reference an existing place in UiTdatabank.

To find the right place URI, read our guide about [finding and reusing existing places](../places/finding-and-reusing-places.md). If the place does not exist yet, you can [create a new place](../places/create.md).

You can also update departure places later using the dedicated [`PUT /events/{eventId}/departurePlaces`](/reference/entry.json/paths/~1events~1{eventId}~1departurePlaces/put) endpoint. Passing an empty array `[]` removes all departure places.

## Request body example

Example for an event for children only, with departure places:

```json
{
  "mainLanguage": "nl",
  "name": {
    "nl": "Acrobatie & Trampoline"
  },
  "location": {
    "@id": "https://io-test.uitdatabank.be/places/787d7420-c06f-4935-b3c5-5cd5a1276796"
  },
  "terms": [
    {
      "id": "0.52.0.0.0"
    }
  ],
  "calendarType": "single",
  "subEvent": [
    {
      "startDate": "2026-06-15T09:00:00+02:00",
      "endDate": "2026-06-15T12:00:00+02:00"
    }
  ],
  "audience": {
    "audienceType": "childrenOnly"
  },
  "departurePlaces": [
    "https://io-test.uitdatabank.be/places/5cf42d51-3a4f-46f0-a8af-1cf672be8c84",
    "https://io-test.uitdatabank.be/places/a1b2c3d4-e5f6-7890-abcd-ef1234567890"
  ]
}
```
