# Childcare

Events in UiTdatabank can optionally provide [childcare times](../../entry-api/shared/calendar-info.md#childcare-times-events-only): a service offered before and/or after the activity itself. With the `hasChildcare` parameter you can filter events based on whether or not childcare is available.

## Using the hasChildcare parameter

**Applicable on endpoints**

`/events` `/offers`

**Possible values**

* `true`: only return events that have a `childcare` range configured on at least one sub-event (for `single`/`multiple` calendar types) or at least one opening hours entry (for `periodic`/`permanent` calendar types).
* `false`: only return events that have no `childcare` configured on any sub-event or opening hours entry.

When the parameter is omitted, all events are returned regardless of whether childcare is configured.

**Examples**

Retrieve all events that offer childcare:

```http
GET /events/?hasChildcare=true
```

Retrieve all events in Ghent that offer childcare:

```http
GET /events/?postalCode=9000&hasChildcare=true
```

Retrieve all events that do not offer childcare:

```http
GET /events/?hasChildcare=false
```

## Childcare hours extend the searchable period

A child can be present for the childcare hours as well as for the activity, so UiTdatabank treats the whole of it as the period an event is available. Date and local time filters match against that extended period.

Take an event that runs from 10:00 until 18:00 with childcare from 08:00 until 19:00:

```json
{
  "calendarType": "single",
  "startDate": "2026-08-17T10:00:00+02:00",
  "endDate": "2026-08-17T18:00:00+02:00",
  "subEvent": [
    {
      "startDate": "2026-08-17T10:00:00+02:00",
      "endDate": "2026-08-17T18:00:00+02:00",
      "childcare": { "start": "08:00", "end": "19:00" }
    }
  ]
}
```

A search for that morning returns the event, even though the activity has not started yet:

```http
GET /events/?dateFrom=2026-08-17T08:00:00%2B02:00&dateTo=2026-08-17T09:59:00%2B02:00
```

The same holds for [local time](datetime.md#filtering-on-local-time), where the event is available from `0800` until `1900` rather than from `1000` until `1800`:

```http
GET /events/?localTimeFrom=0800&localTimeTo=0959
```

Childcare has an optional `start` and an optional `end`, and only the one that is filled in moves the period. An event with a childcare `start` of 08:00 and no `end` is available from 08:00 until 18:00.

This applies to every calendarType. For `periodic` and `permanent` events the childcare range of an opening hours entry extends every day that entry is open, so opening hours running 09:00 to 17:00 with childcare from 08:00 until 18:00 make the event available from 08:00 until 18:00 on each of those days.

## Combining with a date filter

When `hasChildcare` is combined with a date filter (`dateFrom`/`dateTo` URL parameters), the childcare check is scoped to the matching period: the API checks whether childcare is configured on the sub-events or opening hours that fall within that date range, not on the event as a whole.

> The date filter itself matches against the extended period, so an event whose childcare hours fall in the range is returned even when the activity itself does not. See [Childcare hours extend the searchable period](#childcare-hours-extend-the-searchable-period) below.

Retrieve all events in May 2025 that offer childcare during that specific period:

```http
GET /events/?hasChildcare=true&dateFrom=2025-05-01T00:00:00%2B02:00&dateTo=2025-05-31T23:59:59%2B02:00
```

<!-- theme: warning -->

> While you can also filter on `childcare` and/or `dateRange` in advanced queries, this specific logic of checking whether the event has childcare during the specified date range does NOT work in advanced queries (`q` URL parameter) due to how they are parsed differently.
