# Target audience

It is possible to filter the results from Search API based on the target audience of the event or place.

## Parameters

### minAge

With the `minAge` URL parameter you can find events and/or places which are only accessible to people of a certain age, or are targetted to people of certain minimum age. You can use the `minAge` parameter on its own, or combined it with other parameters like `maxAge` and/or `allAges`.

**Applicable on endpoints**

`/offers` `/events` `/places`

**Examples**

Retrieve all events that are targetted to adults

```http
GET /events/?minAge=18
```

### maxAge

With the `maxAge` URL parameter you can find events and/or places which are are targetted to people of certain maximum age. You can use the `maxAge` parameter on its own, or combined it with other parameters like `minAge` and/or `allAges`.

**Applicable on endpoints**

`/offers` `/events` `/places`

**Examples**

Retrieve all events that are targetted to minors

```http
GET /events/?maxAge=17
```

### allAges

With the `allAges` parameter you can filter out events and place that are (not) suitable for all ages. You can use the `allAges` parameter on its own, or combined it with other parameters like `minAge` and/or `maxAge`.

**Applicable on endpoints**

`/offers` `/events` `/places`

**Examples**

Retrieve all places that are suitable for all ages:

```http
GET /events/?allAges=true
```

Retrieve all places that are not suitable for all ages:

```http
GET /events/?allAges=false
```

Setting `allAges` to `*` returns both events and places that are suitable for all ages and those that are only suitable for a specific age range (default):

```http
GET /offers/?allAges=*
```

### typicalAgeRange

With the `typicalAgeRange` advanced query parameter you can filter out events and/or places that are targetted towards a certain age group. This `q` parameter allows more advanced queries than by using the `minAge` and/or `maxAge` URL parameter.

**Applicable on endpoints**

`/offers` `/events` `/places`

**Examples**

Retrieve all events that are suitable for the age group 6 - 12 years:

```http
GET /events/?q=typicalAgeRange:[6 TO 12]
```

<!-- theme: info -->

> Note that any overlap with the given query is a match. In the example above also events with a typicalAgeRange of 3-99 or 11-14 will be returned.

If you don't want partial matches to be returned you can exclude anything that falls out of the given age range as follows:

```http
GET /events/?q=typicalAgeRange:[6 TO 12] NOT typicalAgeRange:([0 TO 5] OR [13 TO *])
```

### hasOvernight

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
