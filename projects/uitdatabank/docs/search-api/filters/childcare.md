# Filtering by childcare

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

## Combining with a date filter

When `hasChildcare` is combined with a date filter (`dateFrom`/`dateTo` URL parameters, or the `dateRange` advanced query field), the childcare check is scoped to the matching period: the API checks whether childcare is configured on the sub-events or opening hours that fall within that date range, not on the event as a whole.

> The date filter itself still matches against the actual start and end times of the activity — childcare hours never influence which events are considered to fall within a date range.

Retrieve all events in May 2025 that offer childcare during that period:

```http
GET /events/?hasChildcare=true&dateFrom=2025-05-01T00:00:00%2B02:00&dateTo=2025-05-31T23:59:59%2B02:00
```
