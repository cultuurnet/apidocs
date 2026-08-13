# Filtering on recurring day of week

Some events and places in UiTdatabank recur on a fixed weekday: a market every Wednesday, a guided tour every Saturday and Sunday. With the `recurringOnDayOfWeek` parameter you can find them by weekday.

Note the word "recurring": only events that take place on a given weekday often enough to be considered recurring are returned. An event that happens on one single date is never matched. To search for events on a specific date, use the [date filters](datetime.md#filtering-on-date) instead.

## Using the recurringOnDayOfWeek parameter

`recurringOnDayOfWeek` is available as both an URL parameter and as an advanced query field:
* URL parameter: `recurringOnDayOfWeek`
* Advanced query field: `recurringOnDayOfWeek`

**Applicable on endpoints**

`/events` `/places` `/offers`

**Possible values**

`monday` `tuesday` `wednesday` `thursday` `friday` `saturday` `sunday`

Any other value is rejected with a `400` status code, as described in the [errors guide](../../errors.md).

Multiple comma-separated values are combined as an OR: events that recur on at least one of the given weekdays are returned.

**Examples**

Retrieve all events that recur on Wednesdays:

```http
GET /events/?recurringOnDayOfWeek=wednesday
```

Retrieve all events that recur on a Friday, Saturday or Sunday:

```http
GET /events/?recurringOnDayOfWeek=friday,saturday,sunday
```

Retrieve all events in Ghent that recur on Saturdays:

```http
GET /events/?postalCode=9000&recurringOnDayOfWeek=saturday
```

## How the weekdays are determined

Which weekdays a result recurs on depends on its [calendarType](datetime.md#filtering-on-calendartype):

* `periodic` and `permanent`: the weekdays are taken from `openingHours[].dayOfWeek`. An event or place that is open every Wednesday matches `recurringOnDayOfWeek=wednesday`. Places always have one of these two calendarTypes, so they are always matched on their opening hours.
* `multiple`: the weekday of each sub-event is derived from its `startDate` and `endDate`. A sub-event that spans several days, for example Friday until Sunday, counts for every weekday in that range. All sub-events combined determine the weekdays the event matches on.
* `single`: never matched, since an event on a single date does not recur.

## Combining weekdays in advanced queries

The `recurringOnDayOfWeek` URL parameter always combines multiple weekdays as an OR. With the `q` parameter you can use [advanced queries](../advanced/advanced-queries.md#recurringondayofweek) to combine weekdays differently.

Retrieve all events that recur on both Saturday and Sunday, so events that recur on only one of both weekend days are excluded:

```http
GET /events/?q=recurringOnDayOfWeek:(saturday AND sunday)
```
