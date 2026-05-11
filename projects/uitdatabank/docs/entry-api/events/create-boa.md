# Creating BOA activities (Buitenschoolse Opvang en Activiteiten)

The BOA decree aims to create a comprehensive and integrated offering of out-of-school care and leisure activities for school-aged children in Flanders. Local governments act as the central directors, coordinating with partners across education, youth work, sports, and culture.
To properly capture this specific offering in UiTdatabank, several features and fields have been added to the API. This guide provides an overview of all BOA-specific data models and endpoints.

For more general information about publiq's role in the BOA decree, visit [publiq.be/boa](https://publiq.be/boa).

> This guide covers all BOA-specific fields, how they apply per calendar type, and what endpoints to use.

| Field | Calendar type | Notes |
|---|---|---|
| [`overnight`](../shared/calendar-info.md#overnight-events-only-singlemultiple) | single, multiple | Only for term `0.57.0.0.0`; hidden in response when `false` |
| [`faq`](/docs/uitdatabank/event-faqs) | all | Up to 30 items; dedicated `PUT /events/{eventId}/faqs` endpoint |
| [`openingHoursClosedDays`](../shared/calendar-info.md#adjusted-closed-days-events-only-periodicpermanent) | periodic, permanent | Date ranges with optional localized description |
| [`openingHoursAdjustedDays`](../shared/calendar-info.md#adjusted-opening-hours-events-only-periodicpermanent) | periodic, permanent | Date ranges with custom schedule |
| [`audience.audienceType: childrenOnly`](#audiencetype) | all | Unlocks `departurePlaces` |
| [`bookingInfo` on subEvents](../shared/booking-and-contact-info.md#bookinginfo) | single, multiple | Per-date booking contacts |
| [`bookingAvailability` capacity/remainingCapacity](./booking-availability.md) | single, multiple | See also [booking availability guide](./booking-availability.md) |
| [`childcare`](../shared/calendar-info.md#childcare-times-events-only) | single/multiple (subEvent), periodic (openingHours) | Different placement per calendar type |
| [`departurePlaces`](#departureplaces) | all (requires `childrenOnly`) | Dedicated `PUT /events/{eventId}/departurePlaces` endpoint |

## audienceType

To indicate that an event is only for children, you must include an extra property `audienceType` and set the value to `childrenOnly`.

```json
{
  "audience": {
    "audienceType": "childrenOnly"
  }
}
```

## departurePlaces

This optional property contains a list of URIs referencing schools or other locations from which transport is arranged to bring children to the event. This can be a walk, a bus, or a bicycle taxi that takes children from a school or childcare location to the event's location.

Departure places can only be set on events where `audienceType` is `childrenOnly`. Each URI must reference an existing place in UiTdatabank. A maximum of 20 departure places can be added to an event.

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

### Related guides

* [Creating a new event](./create.md)
* [Updating an event](./update.md)
* [Calendar info](../shared/calendar-info.md)
