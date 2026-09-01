# Filtering on recurring day of week

Some events and places in UiTdatabank recur on a fixed day of the week: a market every Wednesday, a guided tour every Saturday and Sunday. With the `recurringOnDayOfWeek` parameter you can find them by day of week, and with `recurringOnLocalTimeFrom` and `recurringOnLocalTimeTo` you can narrow that down to the hours they recur at.

Note the word "recurring": only results that take place on a given day of week often enough to be considered recurring are returned. A result has to occur on a day of week on **at least four distinct days** before it is matched on it. An event that happens on one single date is never matched, and neither is a short run of two or three weeks. To search for events on a specific date, use the [date filters](datetime.md#filtering-on-date) instead.

## Using the recurringOnDayOfWeek parameter

`recurringOnDayOfWeek` is available as both an URL parameter and as an advanced query field:
* URL parameter: `recurringOnDayOfWeek`
* Advanced query field: `recurringOnDayOfWeek`

**Applicable on endpoints**

`/events` `/places` `/offers`

**Possible values**

`monday` `tuesday` `wednesday` `thursday` `friday` `saturday` `sunday`

Values are case-insensitive, so `wednesday` and `Wednesday` are the same. Any other value is rejected with a `404` status code, as described in the [errors guide](../../errors.md).

Multiple values are comma-separated and combined as an OR: results that recur on at least one of the given days of week are returned. The array syntax `recurringOnDayOfWeek[]=friday` is not supported and returns a `404`.

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

## How the days of week are determined

Which days of week a result recurs on depends on its [calendarType](datetime.md#filtering-on-calendartype):

* `periodic` and `permanent`: the days of week are taken from the days the result is effectively open within its calendar, based on `openingHours[].dayOfWeek`. A day inside an `openingHoursClosedDays` period does not count, and an `openingHoursAdjustedDays` period counts only if the adjusted hours still leave that day open. Places always have one of these two calendarTypes, so they are always matched on their opening hours.
* `multiple`: the day of week of each sub-event is derived from its `startDate` and `endDate`. A sub-event that spans several days, for example Friday until Sunday, counts for every day of week in that range. All sub-events combined determine the days of week the event matches on.
* `single`: never matched, since an event on a single date does not recur.

Days are counted, not time slots. A day of week that is open twice on the same date, for example a morning and an afternoon slot, counts once for that date.

For a `permanent` result there is no end date to count within, so the days of week are determined over a window running from six months in the past to twelve months in the future.

## Filtering on the hours as well

A parent looking for a Wednesday afternoon activity needs the day of week and the hours to hold on the same recurring slot. Combining `recurringOnDayOfWeek` with the regular [localTimeFrom and localTimeTo](datetime.md#filtering-on-local-time) filters does not express that, because those look at the hours of the result as a whole: a museum open Wednesday morning and Saturday afternoon would answer a search for Wednesday afternoon, since it is open on Wednesday and it is open in the afternoon, just never at the same time.

`recurringOnLocalTimeFrom` and `recurringOnLocalTimeTo` do hold both at once, because the hours are kept per recurring day of week.

**Applicable on endpoints**

`/events` `/places` `/offers`

**Possible values**

A time of day as an `HHMM` integer, so `0900` for nine in the morning and `1730` for half past five in the afternoon.

**Rules**

* Both parameters have to be used together. Sending only one of them returns a `404`.
* Both require `recurringOnDayOfWeek`. The hours are kept per day of week, so there is nothing to search without one, and sending them on their own returns a `404`.
* `recurringOnLocalTimeFrom` has to be equal to or smaller than `recurringOnLocalTimeTo`.

One time frame applies to all the selected days of week, and the days stay combined as an OR. A result is returned when it recurs within those hours on **at least one** of them.

**Examples**

Retrieve all events that recur on Wednesday afternoons:

```http
GET /events/?recurringOnDayOfWeek=wednesday&recurringOnLocalTimeFrom=1300&recurringOnLocalTimeTo=1700
```

Retrieve all events that recur on a Wednesday or a Saturday afternoon, so events that recur on only one of both days in the afternoon are included too:

```http
GET /events/?recurringOnDayOfWeek=wednesday,saturday&recurringOnLocalTimeFrom=1300&recurringOnLocalTimeTo=1700
```

## How the recurring hours are determined

The hours are counted the same way as the days of week, and against the same threshold. Per day of week, an hour is a recurring hour when the result is open at that hour on **at least four distinct days**.

The hours a result actually runs are used, not the hours rounded to a full or half hour. A place open from 08:30 to 09:17 is matched on 09:00 and is not matched on 09:20.

Two slots on the same day of week stay two slots. A result open on Wednesday from 10:00 to 12:00 and from 14:00 to 18:00 is not matched on 13:00, even though that falls between its first and its last hour.

Hours that shift between occurrences only keep what they have in common. An event that runs on six Wednesdays, three times from 10:00 to 12:00 and three times from 10:00 to 13:00, is matched on 11:00 but not on 12:15, because the last hour only happens three times.

[Childcare](childcare.md) counts as part of the hours. An event open on Wednesday from 14:00 to 17:00 with childcare from 12:00 is matched from 12:00 on, because a child can be there from then.

A day of week can recur without having recurring hours. An event on six Wednesdays, three in the morning and three in the evening, recurs on Wednesday, but neither the morning nor the evening reaches four occurrences, so it is not matched on any hour.

**The end of a range is exclusive.** An activity that ends at 12:00 does not occupy 12:00 any more, so it is not returned by a search starting at 12:00. A swimming lesson from 10:00 to 11:00 is not an answer to "what recurs between 11:00 and 16:00".

## Combining days of week in advanced queries

The URL parameters always combine multiple days of week as an OR. With the `q` parameter you can use [advanced queries](../advanced/advanced-queries.md#recurringondayofweek) to combine them differently.

Retrieve all events that recur on both Saturday and Sunday, so events that recur on only one of both weekend days are excluded:

```http
GET /events/?q=recurringOnDayOfWeek:(saturday AND sunday)
```

The hours are available per day of week as [recurringOnLocalTimeRange](../advanced/advanced-queries.md#recurringonlocaltimerange), which lets you ask for different hours on different days. Retrieve all events that recur on Wednesday afternoons **and** on Saturday mornings:

```http
GET /events/?q=recurringOnLocalTimeRange.wednesday:[1300 TO 1700] AND recurringOnLocalTimeRange.saturday:[0900 TO 1200]
```

Mind the bounds when you write the range yourself: in an advanced query both ends are inclusive, so `[1000 TO 1100]` still matches an activity that ends at 11:00, where `recurringOnLocalTimeTo=1100` does not.
