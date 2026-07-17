# Filtering by day of week

Events and places with a recurring weekly schedule ([`periodic` or `permanent` calendarType](../../entry-api/shared/calendar-info.md#periodicpermanent)) declare the weekdays they're open through the `dayOfWeek` property on their `openingHours`. With the `dayOfWeek` parameter you can filter results based on the weekday(s) they occur on.

## Using the dayOfWeek parameter

**Applicable on endpoints**

`/events` `/offers` `/places`

**Possible values**

`monday`, `tuesday`, `wednesday`, `thursday`, `friday`, `saturday`, `sunday`

Matching is case-insensitive: `wednesday`, `Wednesday` and `WEDNESDAY` are all treated the same.

**Syntax**

You can pass multiple weekdays using either syntax, both combined with `OR`:

* Comma-separated values on the `dayOfWeek` parameter: `?dayOfWeek=friday,saturday,sunday`
* The repeated array syntax: `?dayOfWeek[]=friday&dayOfWeek[]=saturday&dayOfWeek[]=sunday`

<!-- theme: warning -->

> Unlike most other `[]`-suffixed parameters in this API (which are `AND`-combined), `dayOfWeek[]` is `OR`-combined, just like the comma-separated syntax. This is because a result can only occur on one weekday at a time, so requiring it to match every given weekday at once would never return anything.

## How results are matched

Whether a result can match `dayOfWeek` depends on its `calendarType`:

* **`periodic`/`permanent`** (events and places): matched based on the `dayOfWeek` values in `openingHours`. `openingHoursClosedDays` are ignored, so an event or place scheduled "every Wednesday" still matches `dayOfWeek=wednesday` even if a handful of individual Wednesdays are marked as closed.
* **`multiple`** (events only): the weekday(s) are computed per `subEvent` from its `startDate`/`endDate`. A single-day `subEvent` contributes one weekday; a multi-day `subEvent` (e.g. Friday through Sunday) contributes every weekday it spans. The weekdays of all `subEvent`s are combined into the set of weekdays the event can match on.
* **`single`** (events only): out of scope. Single events are never matched by `dayOfWeek`, regardless of which weekday they fall on.

For both cases, a weekday only counts if it occurs often enough in the result's schedule — currently a minimum of 4 occurrences. A `periodic` event or place that runs for only two or three occurrences of a given weekday will not match `dayOfWeek` for that weekday, even though it's still returned by other filters.

**Examples**

Retrieve all events open on Wednesday:

```http
GET /events/?dayOfWeek=wednesday
```

Retrieve all events or places open on Friday, Saturday or Sunday:

```http
GET /offers/?dayOfWeek=friday,saturday,sunday
```

Retrieve all places open on Saturday, using the array syntax:

```http
GET /places/?dayOfWeek[]=saturday
```

An invalid weekday value (e.g. `?dayOfWeek=someday`) is rejected with an error response.
