# Filtering by day of week

With the `dayOfWeek` parameter you can filter events and places based on the weekday(s) they occur on. This works both for results with a recurring weekly schedule ([`periodic` or `permanent` calendarType](../../entry-api/shared/calendar-info.md#periodicpermanent)), which declare the weekdays they're open through the `dayOfWeek` property on their `openingHours`, and for `multiple` events, whose weekdays are derived from the `startDate`/`endDate` of their individual `subEvent`s.

## Using the dayOfWeek parameter

**Applicable on endpoints**

`/events` `/offers` `/places`

**Possible values**

`monday`, `tuesday`, `wednesday`, `thursday`, `friday`, `saturday`, `sunday`

**Syntax**

You can pass multiple weekdays as comma-separated values on the `dayOfWeek` parameter, combined with `OR`: `?dayOfWeek=friday,saturday,sunday`

## How results are matched

Whether a result can match `dayOfWeek` depends on its `calendarType`:

* **`periodic`/`permanent`** (events and places): matched based on the `dayOfWeek` values in `openingHours`. `openingHoursClosedDays` are ignored, so an event or place scheduled "every Wednesday" still matches `dayOfWeek=wednesday` even if a handful of individual Wednesdays are marked as closed.
* **`multiple`** (events only): the weekday(s) are computed per `subEvent` from its `startDate`/`endDate`. A single-day `subEvent` contributes one weekday; a multi-day `subEvent` (e.g. Friday through Sunday) contributes every weekday it spans. The weekdays of all `subEvent`s are combined into the set of weekdays the event can match on.
* **`single`** (events only): Will never be returned, not a recurring activity

For both cases, a weekday only counts if it occurs often enough in the result's schedule, currently a minimum of 4 occurrences. A `periodic` event or place that runs for only two or three occurrences of a given weekday will not match `dayOfWeek` for that weekday, even though it's still returned by other filters.

**Examples**

Retrieve all events open on Wednesday:

```http
GET /events/?dayOfWeek=wednesday
```

Retrieve all events or places open on Friday, Saturday or Sunday:

```http
GET /offers/?dayOfWeek=friday,saturday,sunday
```

An invalid weekday value (e.g. `?dayOfWeek=someday`) is rejected with an error response.
