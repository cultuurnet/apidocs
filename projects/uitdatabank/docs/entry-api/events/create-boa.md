# Creating BOA activities (Buitenschoolse Opvang en Activiteiten)

> ⚠️ **Warning:** IN DEVELOPMENT! The BOA endpoints are still in development and subject to change. Do not rely on them in production integrations yet.

The BOA decree aims to create a comprehensive and integrated offering of out-of-school care and leisure activities for school-aged children in Flanders. Local governments act as the central directors, coordinating with partners across education, youth work, sports, and culture.
To properly capture this specific offering in UiTdatabank, several new features and fields have been added to the Entry API. This guide provides an overview of the best practices and the technical endpoints required to submit BOA data correctly.

For more general information about Publiq's role in the BOA decree, visit [publiq.be/boa](https://publiq.be/boa).

## Best Practices: Optimizing your reach
To ensure parents and children easily find the right activities, data quality is crucial. When publishing BOA-related events, we highly recommend sending the following information:

| Type | Endpoint | Description | Calendar type | BOA specific |
|---|---|---|---|---|
| Target audience | `PUT /events/{eventId}/childrenOnly` | Always explicitly indicate if an activity is meant for [children only](/docs/uitdatabank/entry-api/reference/operations/update-a-event-children-only) (without parents). This helps our publication channels distinguish BOA activities from general family events. | all | ✅ |
| Age range | `PUT /events/{eventId}/typicalAgeRange` or `PUT /events/{eventId}/birthdateRange` | Always communicate the age group your activity is intended for. You can pass a generic age range (`typicalAgeRange`), or the specific birth date range (`birthdateRange`). | all | ✅ |
| Pricing | `PUT /events/{eventId}/priceInfo` | Be transparent about pricing: always send prices per logical "bookable unit" (e.g., per hour, per day, or per week) so the cost is clear to parents. | all | ❌ |
| Capacity per timeslot | `PUT /events/{eventId}/calendar` or `PATCH /events/{eventId}/subEvents` | For holiday playground programmes, childcare, camps, and courses, always include the maximum and remaining [capacity per subEvent](./booking-availability.md). Essential for parents and crucial for local BOA-coordinators monitoring local capacity. | single, multiple | ✅ |
| FAQ | `PUT /events/{eventId}/faq` | Use the [FAQ fields](/docs/uitdatabank/event-faqs) to structure practical information. The ideal place to answer questions about accessibility, required care needs, meals, and what children need to bring. | all | ✅ |
| Full schedule | `PUT /events/{eventId}/calendar` | Parents plan full days. Explicitly pass before- and after-school care hours ([`childcare`](../shared/calendar-info.md#childcare-times-events-only)), [adjusted opening hours](../shared/calendar-info.md#adjusted-opening-hours-periodicpermanent), and [specific holiday closures](../shared/calendar-info.md#adjusted-closed-days-periodicpermanent). | single, multiple, periodic, permanent | ✅ |
| Overnight stays | `PATCH /events/{eventId}/subEvents` | For camps, clearly specify if the activity includes an [overnight stay](../shared/calendar-info.md#overnight-events-only-singlemultiple) (`overnight`). | single, multiple | ✅ |
| Departure places | `PUT /events/{eventId}/departurePlaces` | If guided transport is provided from a school or another care location to the activity, [link these locations](/docs/uitdatabank/entry-api/reference/operations/update-a-event-departure-places). | all (requires `childrenOnly: true`) | ✅ |

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
