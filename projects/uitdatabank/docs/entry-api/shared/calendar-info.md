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

## Read more

* The [event model](../../../models/event-with-read-example.json) and [place model](../../../models/place-with-read-example.json) for detailed schemas of the `subEvent`, `startDate`, `endDate`, and `openingHours` properties (among others)
* [Cancelling or postponing an event](../events/status.md) to learn more about the `status` property on events
* [Marking a place as temporarily or permanently closed](../places/status.md) to learn more about the `status` property on places
* [Sharing ticket/reservation availability](../events/booking-availability.md) to learn more about the `bookingAvailability` property on events
