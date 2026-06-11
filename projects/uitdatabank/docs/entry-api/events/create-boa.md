# Creating BOA activities (Buitenschoolse Opvang en Activiteiten)

> ⚠️ **Warning:** IN DEVELOPMENT! The BOA endpoints are still in development and subject to change. Do not rely on them in production integrations yet.

The BOA decree aims to create a comprehensive and integrated offering of out-of-school care and leisure activities for school-aged children in Flanders. Local governments act as the central directors, coordinating with partners across education, youth work, sports, and culture.
To properly capture this specific offering in UiTdatabank, several features and fields have been added to the API. This guide provides an overview of all BOA-specific data models and endpoints.

For more general information about publiq's role in the BOA decree, visit [publiq.be/boa](https://publiq.be/boa).

> This guide covers all BOA-specific fields, how they apply per calendar type, and what endpoints to use.

| Field | Calendar type | Notes |
|---|---|---|
| [`overnight`](../shared/calendar-info.md#overnight-events-only-singlemultiple) | single, multiple | Only for term `0.57.0.0.0`; hidden in response when `false` |
| [`faq`](/docs/uitdatabank/event-faqs) | all | Up to 30 items; dedicated `PUT /events/{eventId}/faqs` endpoint |
| [`openingHoursClosedDays`](../shared/calendar-info.md#adjusted-closed-days-periodicpermanent) | periodic, permanent | Date ranges with optional localized description |
| [`openingHoursAdjustedDays`](../shared/calendar-info.md#adjusted-opening-hours-periodicpermanent) | periodic, permanent | Date ranges with custom schedule |
| [`childrenOnly`](#childrenonly) | all | Boolean flag; unlocks `departurePlaces` when `true` |
| [`bookingInfo` on subEvents](../shared/booking-and-contact-info.md#bookinginfo) | single, multiple | Per-date booking contacts |
| [`bookingAvailability` capacity/remainingCapacity](./booking-availability.md) | single, multiple | See also [booking availability guide](./booking-availability.md) |
| [`childcare`](../shared/calendar-info.md#childcare-times-events-only) | single/multiple (subEvent), periodic (openingHours) | Different placement per calendar type |
| [`departurePlaces`](#departureplaces) | all (requires `childrenOnly: true`) | Dedicated `PUT /events/{eventId}/departurePlaces` endpoint |

## childrenOnly

To indicate that an event is only for children (without parents or guardians), set the `childrenOnly` boolean property on the event to `true`. 

```json
{
  "childrenOnly": true
}
```

You can also update this flag later using the dedicated [`PUT /events/{eventId}/childrenOnly`](/reference/entry.json/paths/~1events~1{eventId}~1children-only/put) endpoint. If an update request does not include `childrenOnly`, the value is not changed.

## departurePlaces

This optional property contains a list of URIs referencing schools or other locations from which transport is arranged to bring children to the event. This can be a walk, a bus, or a bicycle taxi that takes children from a school or childcare location to the event's location.

Departure places can only be set on events where `childrenOnly` is `true`. Each URI must reference an existing place in UiTdatabank. A maximum of 20 departure places can be added to an event.

To find the right place URI, read our guide about [finding and reusing existing places](../places/finding-and-reusing-places.md). If the place does not exist yet, you can [create a new place](../places/create.md).

You can also update departure places later using the dedicated [`PUT /events/{eventId}/departurePlaces`](/reference/entry.json/paths/~1events~1{eventId}~1departurePlaces/put) endpoint. Passing an empty array `[]` removes all departure places.

## Request body example

Example for a BOA event (calendarType `single`) with `childrenOnly` set to `true`, using the term `0.57.0.0.0` ("Kamp of vakantie") which also enables `overnight`:

```json
{
  "mainLanguage": "nl",
  "name": {
    "nl": "Acrobatie & Trampoline kamp"
  },
  "location": {
    "@id": "https://io-test.uitdatabank.be/places/787d7420-c06f-4935-b3c5-5cd5a1276796"
  },
  "terms": [
    {
      "id": "0.57.0.0.0"
    }
  ],
  "calendarType": "single",
  "subEvent": [
    {
      "startDate": "2026-06-15T09:00:00+02:00",
      "endDate": "2026-06-15T12:00:00+02:00",
      "overnight": true,
      "childcare": {
        "start": "08:30",
        "end": "12:30"
      },
      "bookingAvailability": {
        "capacity": 30,
        "remainingCapacity": 12
      },
      "bookingInfo": {
        "url": "https://example.com/inschrijven",
        "urlLabel": {
          "nl": "Schrijf je in"
        },
        "email": "info@example.be"
      }
    }
  ],
  "childrenOnly": true,
  "faq": [
    {
      "nl": {
        "question": "Wat moet mijn kind meebrengen?",
        "answer": "Sportieve kledij en een lunchpakket."
      }
    }
  ],
  "departurePlaces": [
    "https://io-test.uitdatabank.be/places/5cf42d51-3a4f-46f0-a8af-1cf672be8c84",
    "https://io-test.uitdatabank.be/places/a1b2c3d4-e5f6-7890-abcd-ef1234567890"
  ]
}
```

Example for a BOA event (calendarType `periodic`) showing `openingHoursClosedDays`, `openingHoursAdjustedDays`, and `childcare` on opening hours:

```json
{
  "mainLanguage": "nl",
  "name": {
    "nl": "Naschoolse opvang De Beuk"
  },
  "location": {
    "@id": "https://io-test.uitdatabank.be/places/787d7420-c06f-4935-b3c5-5cd5a1276796"
  },
  "terms": [
    {
      "id": "0.52.0.0.0"
    }
  ],
  "calendarType": "periodic",
  "startDate": "2026-09-01T07:00:00+02:00",
  "endDate": "2027-06-30T18:00:00+02:00",
  "openingHours": [
    {
      "opens": "15:30",
      "closes": "18:00",
      "childcare": {
        "start": "15:00",
        "end": "18:30"
      },
      "dayOfWeek": [
        "monday",
        "tuesday",
        "wednesday",
        "thursday",
        "friday"
      ]
    }
  ],
  "openingHoursClosedDays": [
    {
      "startDate": "2026-11-09",
      "endDate": "2026-11-13",
      "description": {
        "nl": "Herfstvakantie"
      }
    },
    {
      "startDate": "2026-12-21",
      "endDate": "2027-01-02",
      "description": {
        "nl": "Kerstvakantie"
      }
    }
  ],
  "openingHoursAdjustedDays": [
    {
      "startDate": "2026-12-18",
      "endDate": "2026-12-20",
      "description": {
        "nl": "Verkorte week voor kerstvakantie"
      },
      "openingHours": [
        {
          "opens": "15:00",
          "closes": "17:00",
          "childcare": {
            "start": "14:30",
            "end": "17:30"
          },
          "dayOfWeek": [
            "monday",
            "tuesday",
            "thursday"
          ]
        }
      ]
    }
  ],
  "childrenOnly": true,
  "faq": [
    {
      "nl": {
        "question": "Hoe schrijf ik mijn kind in?",
        "answer": "Inschrijven kan via de schooldirectie of rechtstreeks bij de coördinator."
      }
    }
  ],
  "departurePlaces": [
    "https://io-test.uitdatabank.be/places/5cf42d51-3a4f-46f0-a8af-1cf672be8c84"
  ]
}
```

## Related guides

* [Creating a new event](./create.md)
* [Updating an event](./update.md)
* [Calendar info](../shared/calendar-info.md)
