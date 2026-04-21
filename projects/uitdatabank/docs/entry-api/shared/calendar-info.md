# Calendar info

[Events](../events/introduction.md) and [places](../places/introduction.md) in UiTdatabank are required to have calendar info that indicate when they are scheduled to be happening/open.

By adding the right calendar info to your event/place, it has the best chance at being discovered by people that are looking for something to do or visit at a specific moment.

Additionally, by adding the right calendar info to your event/place it will automatically become hidden from online calendars once it's passed so that you do not have to delete it manually.

This guide explains the various types of calendar info, when to use which one, and their required/optional properties.

## Scope

The `calendarType` property and its related properties are usable when:

* ✅ [Creating](../events/create.md) or [updating](../events/update.md) an event
* ✅ [Creating](../places/create.md) or [updating](../places/update.md) a place
* ❌ [Creating](../organizers/create.md) or [updating](../organizers/update.md) an organizer

## calendarType

The `calendarType` property determines the kind of scheduling information your event/place has and which other properties are required.

UiTdatabank supports four calendar types:

* `single`: For **events** that happen exactly once, for example a concert on a single evening.
* `multiple`: For **events** that happen at multiple specific moments, for example a guided walk that is planned on exactly three separate days.
* `periodic`: For **events or places** that are scheduled to happen/be open on weekly recurring moments during a longer period. For example a pop-up gallery that is open on a weekly basis for six months, or a weekly "repair café".
* `permanent`: For **events or places** that are scheduled to happen/be open permanently, optionally with a weekly schedule. For example a park that is open for the public during the day. While events can technically have this calendar type, it is not recommended and typically not correct.

Events with calendarType `single` or `multiple` can conceptually be grouped together as events that only occur on one or more fixed moments, usually relatively close together.

Events and places with calendarType `periodic` or `permanent` are typically available for a longer period of time, usually with a recurring weekly schedule.

### single/multiple

When [creating](../events/create.md) or [updating](../events/update.md) an event with calendarType `single` or `multiple` you should only provide an extra `subEvent` property with one or more datetime ranges.

For example, for calendarType `single`:

```json
{
  "calendarType": "single",
  "subEvent": [
    {
      "startDate": "2023-01-12T10:00:00+01:00",
      "endDate": "2023-01-12T12:00:00+01:00",
      "status": {" ... "}, // Optional, see "Cancelling or postponing an event"
      "bookingAvailability": {" ... "} // Optional, see "Sharing ticket/reservation availability"
    }
  ]
}
```

And for calendarType `multiple`:

```json
{
  "calendarType": "multiple",
  "subEvent": [
    {
      "startDate": "2023-01-12T10:00:00+01:00",
      "endDate": "2023-01-12T12:00:00+01:00",
      "status": {" ... "}, // Optional, see "Cancelling or postponing an event"
      "bookingAvailability": {" ... "} // Optional, see "Sharing ticket/reservation availability"
    },
    {
      "startDate": "2023-01-13T10:00:00+01:00",
      "endDate": "2023-01-13T12:00:00+01:00",
      "status": {" ... "}, // Optional, see "Cancelling or postponing an event"
      "bookingAvailability": {" ... "} // Optional, see "Sharing ticket/reservation availability"
    }
  ]
}
```

Note that if you provide multiple `subEvent` objects when using calendarType `single`, the event will automatically be converted to calendarType `multiple` and vice-versa.

When [fetching the event's details](/reference/entry.json/paths/~1events~1{eventId}/get) later, the event will also have top-level `startDate`, `endDate`, `status` and `bookingAvailability` properties based on the data inside the `subEvent` objects.

For example, in case of calendarType `multiple`:

```json
{
  "calendarType": "multiple",
  "subEvent": [
    {
      "startDate": "2023-01-12T10:00:00+01:00",
      "endDate": "2023-01-12T12:00:00+01:00",
      "status": {" ... "}, // See "Cancelling or postponing an event"
      "bookingAvailability": {" ... "} // See "Sharing ticket/reservation availability"
    },
    {
      "startDate": "2023-01-13T10:00:00+01:00",
      "endDate": "2023-01-13T12:00:00+01:00",
      "status": {" ... "}, // See "Cancelling or postponing an event"
      "bookingAvailability": {" ... "} // See "Sharing ticket/reservation availability"
    }
  ],
  "startDate": "2023-01-12T10:00:00+01:00", // Earliest startDate
  "endDate": "2023-01-13T12:00:00+01:00", // Latest endDate
  "status": {" ... "}, // See "Cancelling or postponing an event"
  "bookingAvailability": {" ... "}, // See "Sharing ticket/reservation availability"
}
```

In case of calendarType `single`, the same logic is applied but in reality the `startDate`, `endDate`, `status` and `bookingAvailability` will be exactly the same on the top level as in the subEvent because there is only 1 subEvent to base them on.

### Childcare times (events only)

Events can optionally include a `childcare` object to indicate when childcare is provided. The object has two properties, `start` and `end`, both using `H:MM` or `HH:MM` format in 24-hour notation (as per ISO 8601).

**For single/multiple calendar types:**

Events with calendarType `single` or `multiple` can include a `childcare` object on each `subEvent`:

```json
{
  "calendarType": "single",
  "subEvent": [
    {
      "startDate": "2023-01-12T10:00:00+01:00",
      "endDate": "2023-01-12T12:00:00+01:00",
      "childcare": {
        "start": "09:30",
        "end": "12:30"
      }
    }
  ]
}
```

**For periodic/permanent calendar types:**

Events with calendarType `periodic` or `permanent` can include a `childcare` object on each `openingHours` item:

```json
{
  "calendarType": "periodic",
  "startDate": "2023-01-12T09:00:00+01:00",
  "endDate": "2023-06-12T17:00:00+01:00",
  "openingHours": [
    {
      "opens": "09:00",
      "closes": "17:00",
      "childcare": {
        "start": "08:00",
        "end": "18:00"
      },
      "dayOfWeek": [
        "monday",
        "tuesday",
        "wednesday",
        "thursday",
        "friday"
      ]
    }
  ]
}
```

**Overwriting or clearing childcare:**

Each property within `childcare` is independent: omitting a property clears any previously set value for it. When updating:

* **Omit `childcare`** entirely → existing childcare data is left unchanged.
* **Send `"childcare": {}`** (empty object) → clears both `start` and `end`.
* **Send `"childcare": { "start": "..." }`** → sets `start`, clears `end`.
* **Send `"childcare": { "end": "..." }`** → clears `start`, sets `end`.
* **Send `"childcare": { "start": "...", "end": "..." }`** → sets both.

**Validation rules:**

For single/multiple calendar types:
* `childcare.start` must be **earlier** than the time portion of `startDate`. For example, if `startDate` is `2023-01-12T10:00:00+01:00`, `childcare.start` must be before `10:00`.
* `childcare.end` must be **later** than the time portion of `endDate`. For example, if `endDate` is `2023-01-12T12:00:00+01:00`, `childcare.end` must be after `12:00`.
* These rules are also enforced when updating `opens` or `closes` on an existing item that already has childcare times set.

For periodic/permanent calendar types:
* `childcare.start` must be **earlier** than `opens`. For example, if `opens` is `09:00`, `childcare.start` must be before `09:00`.
* `childcare.end` must be **later** than `closes`. For example, if `closes` is `17:00`, `childcare.end` must be after `17:00`.
* These rules are also enforced when updating `opens` or `closes` on an existing item that already has childcare times set.

### Overnight (events only, single/multiple)

Events of type "Kamp of vakantie" (term id `0.57.0.0.0`) can optionally include an `overnight` boolean on each `subEvent` to indicate whether that occurrence involves an overnight stay.

The `overnight` property is accepted on subEvents in:

* `PUT /events/{eventId}/calendar`
* `PATCH /events/{eventId}/subEvents`

For example, when creating or replacing the calendar via `PUT /events/{eventId}/calendar`:

```json
{
  "terms": [
    {
      "id": "0.57.0.0.0",
      "label": "Kamp of vakantie",
      "domain": "eventtype"
    }
  ],
  "calendarType": "multiple",
  "subEvent": [
    {
      "startDate": "2026-07-01T09:00:00+02:00",
      "endDate": "2026-07-05T17:00:00+02:00",
      "overnight": true
    },
    {
      "startDate": "2026-07-08T09:00:00+02:00",
      "endDate": "2026-07-12T17:00:00+02:00"
    }
  ]
}
```

To update `overnight` on an individual subEvent without replacing the full calendar, use `PATCH /events/{eventId}/subEvents` and reference the subEvent by its `id`:

```json
[
  {
    "id": 0,
    "overnight": true
  }
]
```

**Validation rules:**

* `overnight` can only be set when the event has at least one term with id `0.57.0.0.0`. The match is done on the term `id`, not the `label`, because labels can be translated. Sending `overnight: true` on an event without this term returns a `400` error.
* `overnight` is optional and defaults to `false` when omitted.
* `overnight` is only valid for `calendarType: single` or `calendarType: multiple`. Sending it for `periodic` or `permanent` events (which have no subEvents) returns a `400` error.
* When the term `0.57.0.0.0` is removed from the event via `PUT` or `PATCH` on the `terms` property, `overnight` is automatically reset to `false` on all subEvents.

**API behavior:**

In the read model (GET), `overnight` is only included in the subEvent object when its value is `true`. When `false`, the property is omitted from the response entirely.

### periodic/permanent

When creating or updating an event or place with calendarType `periodic`, you must include `startDate` and `endDate` properties that define the period during which the event or place are scheduled. Additionally, you can include an optional `openingHours` property to indicate on which (recurring) weekdays the event or place is available.

For example, an event or place that is available for attendees/visitors from January 12th 2023 until June 12th 2023 on every Friday, Saturday and Sunday with varying opening hours per day:

```json
{
  "calendarType": "periodic",
  "startDate": "2023-01-12T09:00:00+01:00", // Start of the period
  "endDate": "2023-06-12T17:00:00+01:00", // End of the period
  "openingHours": [ // Optional, but recommended unless 24/7
    {
      "opens": "09:00",
      "closes": "12:00",
      "dayOfWeek": [
        "saturday",
        "sunday"
      ]
    },
    {
      "opens": "13:00",
      "closes": "17:00",
      "dayOfWeek": [
        "friday",
        "saturday",
        "sunday"
      ]
    }
  ] 
}
```

When creating or updating an event or place with calendarType `permanent` you do not need to include a `startDate` or `endDate` since it is supposed to be scheduled permanently, but you may also include the same optional `openingHours` property to define the moments that it is accessible (if not 24/7).

```json
{
  "calendarType": "permanent",
  "openingHours": [ // Optional, but recommended unless 24/7
    {
      "opens": "09:00",
      "closes": "12:00",
      "dayOfWeek": [
        "saturday",
        "sunday"
      ]
    },
    {
      "opens": "13:00",
      "closes": "17:00",
      "dayOfWeek": [
        "friday",
        "saturday",
        "sunday"
      ]
    }
  ]
}
```

## Adjusted closed days (events only, periodic/permanent)

Events with calendarType `periodic` or `permanent` can optionally include an `openingHoursClosedDays` array to mark specific date ranges as closed, overriding the default opening hours for those dates. This property is not available for places.

```json
{
  "calendarType": "periodic",
  "startDate": "2026-01-01T00:00:00+01:00",
  "endDate": "2026-12-31T23:59:59+01:00",
  "openingHoursClosedDays": [
    {
      "startDate": "2026-04-06",
      "endDate": "2026-04-06",
      "description": {
        "nl": "Paasmaandag",
        "fr": "Lundi de Pâques"
      }
    }
  ]
}
```

Each entry defines a date range during which the event is considered closed. The `description` property is optional and translatable.

**Validation rules:**

* For `periodic` events: all exception dates must fall within the main `startDate` and `endDate` of the event.
* `startDate` must be on or before `endDate`.

**Overwriting or clearing closed days:**

Each `openingHoursClosedDays` array is independent: omitting the property preserves existing data. When updating:

* **Omit `openingHoursClosedDays`** entirely → existing closed days are left unchanged.
* **Send `"openingHoursClosedDays": []`** (empty array) → clears all previously set closed days.
* **Send `"openingHoursClosedDays": [...]`** with values → replaces all closed days with the new list.

**API behavior:**

GET endpoints return `openingHoursClosedDays` sorted by `startDate`.

## Adjusted opening hours (events only, periodic/permanent)

Events with calendarType `periodic` or `permanent` can optionally include an `openingHoursAdjustedDays` array to define temporary custom opening hours that override the default schedule for specific date ranges. This property is not available for places.

```json
{
  "calendarType": "periodic",
  "startDate": "2026-01-01T00:00:00+01:00",
  "endDate": "2026-12-31T23:59:59+01:00",
  "openingHours": [
    {
      "opens": "09:00",
      "closes": "17:00",
      "dayOfWeek": [
        "monday",
        "tuesday",
        "wednesday",
        "thursday",
        "friday"
      ]
    }
  ],
  "openingHoursAdjustedDays": [
    {
      "startDate": "2026-12-21",
      "endDate": "2026-12-30",
      "description": {
        "nl": "Kerstvakantie",
        "fr": "fêtes de Noël"
      },
      "openingHours": [
        {
          "opens": "13:00",
          "closes": "15:00",
          "dayOfWeek": [
            "friday",
            "saturday",
            "sunday"
          ]
        }
      ]
    }
  ]
}
```

Each entry defines a date range during which the specified `openingHours` replace the default schedule. The `description` property is optional and translatable.

Like regular opening hours, each opening hours item in `openingHoursAdjustedDays` can optionally include `childcare` information to specify adjusted childcare availability times for that period:

```json
{
  "startDate": "2026-12-21T00:00:00+01:00",
  "endDate": "2026-12-30T23:00:00+01:00",
  "description": {
    "nl": "Kerstvakantie"
  },
  "openingHours": [
    {
      "opens": "13:00",
      "closes": "15:00",
      "childcare": {
        "start": "12:30",
        "end": "15:30"
      },
      "dayOfWeek": [
        "friday",
        "saturday",
        "sunday"
      ]
    }
  ]
}
```

**Validation rules:**

* For `periodic` events: all adjusted dates must fall within the main `startDate` and `endDate` of the event.
* `startDate` must be on or before `endDate`.
* No overlaps are allowed between entries in `openingHoursAdjustedDays`.
* Description has a maximum length of 1000 characters per language.
* Childcare validation rules apply to adjusted opening hours: `childcare.start` must be earlier than `opens`, and `childcare.end` must be later than `closes` on each opening hours item.

**Interaction with closed days:**

When `openingHoursClosedDays` and `openingHoursAdjustedDays` overlap, `openingHoursClosedDays` always take precedence. This means:
* If a date is marked as closed in `openingHoursClosedDays`, the event is closed for that entire date, regardless of what `openingHoursAdjustedDays` specifies.
* Use `openingHoursClosedDays` for holidays and closures.
* Use `openingHoursAdjustedDays` for periods with modified (but non-zero) opening hours.

**Overwriting or clearing adjusted hours:**

Each `openingHoursAdjustedDays` array is independent: omitting the property preserves existing data. When updating:

* **Omit `openingHoursAdjustedDays`** entirely → existing adjusted hours are left unchanged.
* **Send `"openingHoursAdjustedDays": []`** (empty array) → clears all previously set adjusted hours.
* **Send `"openingHoursAdjustedDays": [...]`** with values → replaces all adjusted hours with the new list.

**API behavior:**

GET endpoints return `openingHoursAdjustedDays` sorted by `startDate`.

## Read more

* The [event model](../../../models/event-with-read-example.json) and [place model](../../../models/place-with-read-example.json) for detailed schemas of the `subEvent`, `startDate`, `endDate`, and `openingHours` properties (among others)
* [Cancelling or postponing an event](../events/status.md) to learn more about the `status` property on events
* [Marking a place as temporarily or permanently closed](../places/status.md) to learn more about the `status` property on places
* [Sharing ticket/reservation availability](../events/booking-availability.md) to learn more about the `bookingAvailability` property on events
