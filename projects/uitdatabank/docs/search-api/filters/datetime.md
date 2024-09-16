# Filtering on time

The Search API allows you to filter results using calendar information or metadata, such as creation and modification timestamps. This guide provides a comprehensive overview of the available filtering options.

## Filtering on availabilty date

You can filter results from Search API based on the date(range) that the items are available, using the following parameters:

**URL-parameters**
* `availableFrom`: returns only results that should (still) be visible on online calendars after the given date-time. Defaults to the current date-time of the request.
* `availableTo`: returns only results that should be visible on online calendars up until the given date-time. Defaults to the current date-time of the request.

> The default values can be disabled by setting the value to `*` or by using the [disableDefaultFilters](/default-filters.md) query parameter. 

**Advanced query fields**
* `availableRange`: returns results that should be visible on online calendars in a given time range.

**Applicable on endpoints**

`/events` `/places` `/offers`

**Possible values**

Any dateFrom and dateTo date in ISO-8601.

**Examples**

Get all events available between January 1st, 2025 and March 31, 2025:

```
GET /events/?q=availableRange:[2025-01-01T00\:00\:00%2B01\:00 TO 2025-03-31T23\:59\:59%2B01\:00]&availableFrom=*&availableTo=*
```

## Filtering on calendarType

Every event and place in UiTdatabank has one of the following four calendarTypes:
* `single`: the event occurs on a single date, indicated by a single startDate and endDate.
* `multiple`: the event occurs on multiple dates, and has multiple subEvent entries with each a different startDate and endDate.
* `periodic`: the event or place runs for a specific period as indicated by its startDate and endDate, and can optionally have openingHours.
* `permanent`: the event or place is permanent and has no startDate or endDate, but it can optionally have openingHours.

With the `calendarType` field you can look for results that match a certain calendarType.

`calendarType` is available as both an URL parameter and as an advanced query field:
* URL parameter: `calendarType`
* Advanced query parameter: `calendarType`

**Applicable on endpoints**

`/events` `/places` `/offers`

**Possible values**

* events: `single` `multiple` `periodic` `permanent`
* places: `periodic` `permanent`

**Examples**

Retrieve all permanent events and places using the advanced query parameter:

```
GET /offers/?q=calendarType:permanent
```

Or alternatively, you can use the URL parameter which will give the exact same results:

```
GET /offers/?calendarType=permanent
```

## Filtering on creation date

UiTdatabank keeps track of the creation dates of each document. This metadata for the creation date can be queried with the following parameters:

**URL-parameters**
* `createdFrom`: returns only results that are created after the given date-time. 
* `createdTo`: returns only results that created up until the given date-time. 

**Advanced query fields**
* `created`: returns results that are created in a gived date range.

**Applicable on endpoints**

`/events` `/places` `/offers` 

**Possible values**

Any ISO-8601 datetime, e.g. `2023-04-01T12:08:01+01:00`

> Note that the + sign must be encoded for URLs (as %2B). Otherwise, it will be interpreted as whitespace and the given date time will be considered invalid.

**Example**

Get all events and places that are created since the start of 2022:

```
GET /offers/?q=created:[2022-01-01T00\:00\:00%2B01\:00 TO *]
```

Get all places created before 2024:

```
GET /places/?createdTo=2024-01-01T00\:00\:00%2B01\:00
```

## Filtering on date

You can filter on the date that an event is happening or place is open for visits.

**URL-parameters**
* `dateFrom`: returns only results that are happening / openafter the given date-time. 
* `dateTo`: returns only results that are happening / open up until the given date-time. 

**Advanced query fields**
* `dateRange`: returns results that are happening / open in a gived date range.

>  By default, the search API will only return results that are currently available. In order to also retrieve results that are not available (yet), you'll need to disable the default filters for availability. You can reset this default as described in the [default filters guide](https://docs.publiq.be/docs/uitdatabank/search-api/filters/default-filters).

**Applicable on endpoints**

`/events` `/places` `/offers` 

**Possible values**

Any ISO-8601 datetime, e.g. `2023-04-01T12:08:01+01:00`

> Note that the + sign must be encoded for URLs (as `%2B`). Otherwise, it will be interpreted as whitespace and the given date time will be considered invalid.

**Examples**

Retrieve all events that took place in the year 2023:

```
GET /events/?q=dateRange:[2023-01-01T00\:00\:00%2B01\:00 TO 2023-12-31T23\:59\:59%2B01\:00]&availableTo=*&availableFrom=*
```

Retrieve all events that take place in the summer of 2025:

``` 
GET /events/?dateFrom=2025-07-01T00:00:00+02:00&dateTo=2025-08-31T23:59:59+02:00&availableTo=*&availableFrom=*
```

Since any overlap is a match with range queries, you can explicitely exclude anything that falls outside of your range using advanced queries. The query below will look for events that take place in the summer of 2025 but don't start before or finish after the summer months (July, August):

```
GET /events/?q=dateRange:[2025-07-01T00\:00\:00%2B02\:00 TO 2025-08-31T23\:59\:59%2B02\:00] NOT dateRange:[* TO 2025-06-30T23\:59\:59%2B02\:00] NOT dateRange:[2025-09-01T00\:00\:00%2B02\:0 TO *]&availableTo=*&availableFrom=*
```


## Filtering on modified date

UiTdatabank keeps track of the modified dates of each document. This metadata can be queried with the following parameters:

**URL-parameters**
* `modifiedFrom`: returns only results that are created after the given date-time. 
* `modifiedTo`: returns only results that created up until the given date-time. 

**Advanced query fields**
* `modified`: returns results that are created in a gived date range.

**Applicable on endpoints**

`/events` `/places` `/offers` 

**Possible values**

Any ISO-8601 datetime, e.g. `2023-04-01T12:08:01+01:00`

> Note that the + sign must be encoded for URLs (as %2B). Otherwise, it will be interpreted as whitespace and the given date time will be considered invalid.

**Example**

Get all places that are modified since the start of 2022:

```
GET /places/?q=modified:[2022-01-01T00\:00\:00%2B01\:00 TO *]
```

Get all events modified in a given period:

```
GET /events/?q=modified:[2024-09-03T18:31:00+02:00 TO 2024-09-10T09:21:00+02:00]
```

## Filtering on local time

With the "local time" parameters it is possible to filter out events that are happening on a specific part of the day, regardless of the day or date of the event.

Typically, this field is used to filter out events that are happening:
* in the morning
* in the afternoon
* in the evening
* at night

However, these parts of the day are not pre-defined. Using an integer between 0 and 2359 you can define the timeRange yourself.

**URL-parameters**
* `localTimeFrom`: returns only results that are created after the given date-time. 
* `localTimeTo`: returns only results that created up until the given date-time. 

**Advanced query fields**
* `localTimeRange`: returns results that are created in a gived date range.

**Applicable on endpoints**

`/events` `/places` `/offers` 

**Possible values**

Any ISO-8601 datetime, e.g. `2023-04-01T12:08:01+01:00`

> Note that the + sign must be encoded for URLs (as %2B). Otherwise, it will be interpreted as whitespace and the given date time will be considered invalid.

**Examples**

Get all events that take place in the morning:

```
GET /events/?q=localTimeRange:[0600 TO 1159]
```

Get all events that take place in the afternoon:

```
GET /events/?q=localTimeRange:[1200 TO 1659]
```

Get all events that take place in the evening:
```
GET /events/?q=localTimeRange:[1700 TO 2359]
```

Get all events that take place at night:
```
GET /events/?q=localTimeRange:[0000 TO 0559]
```

Get all events happening after 18:00
```
GET /events/localTimeFrom=1800
```

Since any overlap is a match with range queries, you can explicitely exclude anything that falls outside of your range using advanced queries. The query below will search for events happening in the morning, but that won't start earlier:

```
GET /events/?q=localTimeRange:[0600 TO 1159] NOT localTimeRange:[0000 TO 0559]
```
