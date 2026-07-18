# Filtering on overnight

## hasOvernight

Use the `hasOvernight` URL parameter to filter events based on whether they involve an overnight stay.

**Applicable on endpoints**

`/events`

**Possible values**

`true` `false`

**Behavior**

* `true`: only returns events that have at least one sub-event with `overnight: true`
* `false`: only returns events that have no sub-event with `overnight: true`
* Omitting the parameter returns all events regardless of their overnight value

An event is considered to have overnight if **at least one** of its sub-events is marked as overnight. An event where only some sub-events are overnight still matches `hasOvernight=true`.

Events with a `periodic` or `permanent` calendarType have no explicit sub-events and are always indexed as `overnight: false`. They will never match `hasOvernight=true`.

`hasOvernight` does not affect the date range of an event. An overnight event's matched date window is still determined by the actual `startDate` and `endDate` of its sub-events.

**Examples**

Retrieve all events that involve an overnight stay:

```http
GET /events/?hasOvernight=true
```

Retrieve all events that do not involve an overnight stay:

```http
GET /events/?hasOvernight=false
```

Combining with a date filter to find overnight events in a given period:

```http
GET /events/?hasOvernight=true&dateFrom=2026-07-01T00:00:00+02:00&dateTo=2026-08-31T23:59:59+02:00
```

**Interaction with date filters**

When combined with `dateFrom`/`dateTo`, `hasOvernight` is evaluated against the sub-events that fall within the requested date range — not against the event as a whole. An event with overnight sub-events outside the searched period will not match `hasOvernight=true` for that period.

For example: an event with two weeks of sub-events where only week 2 has overnight sub-events will not match `hasOvernight=true` when searching exclusively within week 1.
