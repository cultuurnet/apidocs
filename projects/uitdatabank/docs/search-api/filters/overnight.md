# Filtering on overnight

## hasOvernight

Use the `hasOvernight` URL parameter to filter events based on whether they provide an overnight stay.

**Applicable on endpoints**

`/events` `/offers`

**Possible values**

`true` `false`

**Behavior**

* `true`: only returns events that have at least one sub-event with `overnight: true`
* `false`: only returns events that have no sub-event with `overnight: true`
* Omitting the parameter returns all events regardless of their overnight value

An event is considered to have an overnight stay if **at least one** of its sub-events is marked as `overnight: true`. An event where only some sub-events have `overnight: true` still matches `hasOvernight=true` unless combined with a date filter (see below).

Events with a `periodic` or `permanent` calendarType have no explicit sub-events and are always indexed as `overnight: false`. They will never match `hasOvernight=true`.

**Examples**

Retrieve all events that provide an overnight stay:

```http
GET /events/?hasOvernight=true
```

Retrieve all events that do not provide overnight an stay:

```http
GET /events/?hasOvernight=false
```

Combining with a date filter to find events with an overnight stay in a given period:

```http
GET /events/?hasOvernight=true&dateFrom=2026-07-01T00:00:00+02:00&dateTo=2026-08-31T23:59:59+02:00
```

## Combining with a date filter

When combined with `dateFrom`/`dateTo`, `hasOvernight` is evaluated against the sub-events that fall within the requested date range — not against the event as a whole. An event with overnight sub-events outside the searched period will not match `hasOvernight=true` for that period.

For example: an event with two weeks of sub-events where only week 2 has overnight sub-events will not match `hasOvernight=true` when searching exclusively within week 1.

When `hasOvernight` is combined with a date filter (`dateFrom`/`dateTo` URL parameters), the overnight filter is scoped to the matching period: the API checks whether `overnight` is enabled/disabled on the sub-events or opening hours that fall within that date range, not on the event as a whole.

Retrieve all events in May 2025 that provide an overnight stay during that specific period:

```http
GET /events/?hasOvernight=true&dateFrom=2025-05-01T00:00:00%2B02:00&dateTo=2025-05-31T23:59:59%2B02:00
```

<!-- theme: warning -->

> While you can also filter on `overnight` and/or `dateRange` in advanced queries, this specific logic of checking whether the event has an overnight stay during the specified date range does NOT work in advanced queries (`q` URL parameter) due to how they are parsed differently.
