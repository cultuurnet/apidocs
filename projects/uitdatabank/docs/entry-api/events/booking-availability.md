# Marking an event as sold out

When [creating](./create.md) or (usually) when [updating](./update.md) your event, you can mark it as sold out to indicate to interested attendees that there are no more tickets/seats/reservations available.

Sold out events automatically get an *"(Volzet of uitverkocht)"* label next to their calendar info in online calendars. For example, on UiTinVlaanderen:

<!-- focus: false -->

![Screenshot of a summary of the event "De dichters - group 2" on UiTinVlaanderen, as an example of the "(Volzet of uitverkocht)" label](../../../assets/images/event-sold-out.png)

In this guide you will learn how to mark your event, or specific dates of your event, as sold out via Entry API.

Before getting started, we recommend that you have read the following guides:

* [Creating a new event](./create.md) to learn about the basic structure of events
* [Updating an event](./update.md) to mark an event as sold out after creating it earlier
* [Calendar info](../shared/calendar-info.md) for more info about the various calendar types and their properties

## Permissions

Anyone who [creates a new event](./create.md) can mark it as sold out. For [updates to an existing event](./update.md), the usual permission checks apply.

## The bookingAvailability property

Every event automatically gets a `bookingAvailability` property after it is created.

By default, it looks like this:

```json
{
  "bookingAvailability": {
    "type": "Available"
  }
}
```

The nested `type` property can either be `Available` (tickets/reservations/seats available), or `Unavailable` (sold out).

**When the event has calendarType `single` or `multiple`**, the objects inside its `subEvent` property will also automatically get the same `bookingAvailability` property. 

For example on an event with multiple dates:

```json
{
  "bookingAvailability": {
    "type": "Available"
  },
  "calendarType": "multiple",
  "subEvent": [
    {
      "startDate": "2023-01-18T17:30:00+01:00",
      "endDate": "2023-01-18T23:00:00+01:00",
      "bookingAvailability": {
        "type": "Available"
      }
    },
    {
      "startDate": "2023-01-19T17:30:00+01:00",
      "endDate": "2023-01-19T23:00:00+01:00",
      "bookingAvailability": {
        "type": "Available"
      }
    }
  ]
}
```

To mark one of these dates as sold out, change its individual `bookingAvailability.type` to `Unavailable`. For example:

```json
{
  "calendarType": "multiple",
  "subEvent": [
    {
      "startDate": "2023-01-18T17:30:00+01:00",
      "endDate": "2023-01-18T23:00:00+01:00",
      "bookingAvailability": {
        "type": "Available"
      }
    },
    {
      "startDate": "2023-01-19T17:30:00+01:00",
      "endDate": "2023-01-19T23:00:00+01:00",
      "bookingAvailability": {
        "type": "Unavailable"
      }
    }
  ]
}
```

Note that you may omit the `bookingAvailability` property on the top level, as it will automatically be set based on the `bookingAvailability` of each `subEvent`. If you include it anyway, it will be ignored.

When at least one `subEvent` has its `bookingAvailability.type` set to `Available`, the top-level `bookingAvailability.type` will automatically be set to `Available` since there are still tickets/seats/reservations available for one or more dates. 

When all subEvents have their `bookingAvailability.type` set to `Unavailable`, the top-level `bookingAvailability.type` will also be set to `Unavailable` since this means that all tickets/seats/reservations for all dates are sold out.

**Events with calendarType `periodic` and `permanent`** span a larger period and have a schedule based on recurring `openingHours`. It is currently not possible to mark them as sold out because it is unlikely that they are completely sold out for their complete duration (especially for permanent events), and there is no way to mark a specific date or timeslot as sold out on events without a `subEvent` property at this moment.
