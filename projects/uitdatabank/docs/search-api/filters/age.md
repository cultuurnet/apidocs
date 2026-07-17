# Age

It is possible to filter the results from Search API based on the age group the event or place is targetted towards.

## Age filters vs. birthdate range filters

There are two ways to filter on the audience an event or place is targeted towards:

* The `minAge`, `maxAge`, `allAges` and `typicalAgeRange` parameters filter on a **fixed age or age range** (in years), regardless of the current date. They are applicable on `/offers`, `/events` and `/places`.
* The `birthdateRangeFrom` and `birthdateRangeTo` parameters filter on a **range of birth dates**. They are only applicable on events.

<!-- theme: info -->

> An event's `typicalAgeRange` is combined with the current date to determine whether it matches a given `birthdateRange`. Because of this, the same query can return different results on different days.

**When to use which**

* Use the age parameters (`minAge`, `maxAge`, `allAges`, `typicalAgeRange`) when you want events and/or places suitable for a fixed age or age range, for example "events for 6 to 12 year olds".
* Use the birthdate range parameters (`birthdateRangeFrom`, `birthdateRangeTo`) when you want events targeted at people born within a specific date range, for example when matching against a known audience of birth dates (e.g. a list of registered children). Since this is date-aware, it also returns events whose `typicalAgeRange` currently overlaps with that birthdate range.
* Combining both is possible (they are independent parameters and will be applied together) but is only useful for events since the birthdate range parameters is not supported for places.

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

### birthdateRangeFrom

With the `birthdateRangeFrom` URL parameter you can find events targeted at people born on or after the given date. Use it on its own, or combined with `birthdateRangeTo` to narrow the result set to a range. If an event's `typicalAgeRange`, combined with the current date, falls within the supplied range, the event will also be included.

**Applicable on endpoints**

`/events` `/offers`

**Examples**

Retrieve all events targeted at people born on or after 1 January 2020 (including events whose `typicalAgeRange`, combined with the current date, overlaps that range):

```http
GET /events/?birthdateRangeFrom=2020-01-01
```

### birthdateRangeTo

With the `birthdateRangeTo` URL parameter you can find events targeted at people born on or before the given date. Use it on its own, or combined with `birthdateRangeFrom` to narrow the result set to a range. If an event's `typicalAgeRange`, combined with the current date, falls within the supplied range, the event will also be included.

**Applicable on endpoints**

`/events` `/offers`

**Examples**

Retrieve all events targeted at people born between 1 January 2020 and 31 December 2020 (including events whose `typicalAgeRange`, combined with the current date, overlaps that range):

```http
GET /events/?birthdateRangeFrom=2020-01-01&birthdateRangeTo=2020-12-31
```
