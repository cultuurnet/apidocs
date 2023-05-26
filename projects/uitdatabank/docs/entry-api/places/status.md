# Marking a place as temporarily or permanently closed

When [creating](./create.md) or (usually) when [updating](./update.md) a place, you can mark it as temporarily or permanently closed to indicate to visitors that the place is (currently) not open for visits.

In this guide you will learn how to mark your places a temporarily or permanently closed.

Before getting started, we recommend that you have read the following guides:

* [Creating a new place](./create.md) to learn about the basic structure of places
* [Updating an place](./update.md) to update the status of a place after creating it earlier
* [Calendar info](../shared/calendar-info.md) for more info about the various calendar types and their properties

## Permissions

Anyone who [creates a new place](./create.md) can mark it as temporarily or permanently closed. For [updates to an existing place](./update.md), the usual permission checks apply.

## The status property

Every place automatically gets a `status` property after it is created.

By default, it looks like this:

```json
{
  "status": {
    "type": "Available"
  }
}
```

The nested `type` property can either have one of the following values:

* `Available`: the place is ‘open’ and can be visited during opening hours
* `Unavailable`: the place still exists (physically), but is permanently closed)
* `TemporarilyUnavailable`: the place is temporarily closed (due to renovations for example)

The possible `type` values are intentionally worded in a generic way so that they match those of [the `status` property on events](../events/status.md), which makes it easier to query both events and places at the same time on their status property [using Search API](../../search-api/introduction.md).

## Marking a place as temporarily closed

To mark a place as temporarily or permanently closed, update the (top-level) `status.type` property and set it to `temporarilyUnavailable`

Optionally, you can include a `reason` property to explain why the place is closed. The `reason` property must be an object with language codes like `name`.

For example:

```json
{
  "calendarType": "periodic",
  "startDate": "2023-01-19T17:30:00+01:00",
  "endDate": "2024-08-31T23:00:00+01:00",
  "openingHours": ["..."],
  "status": {
    "type": "TemporarilyUnavailable",
    "reason": {
      "nl": "Tijdelijk gesloten wegens verbouwingswerken"
    }
  }
}
```

## Marking a place as permanently closed

Marking a place as permanently closed works exactly the same as marking it as temporarily closed, but instead of setting the `status.type` of the place to `TemporarilyUnavailable`, you should set it to `Unavailable`.
