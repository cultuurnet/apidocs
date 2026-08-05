# Age

It is possible to filter the results from Search API based on the age group the event or place is targetted towards.

## Age filters vs. birthdate range filters

There are two ways to filter on the audience an event or place is targeted towards:

* **Age filters** match on a **fixed age or age range** (in years), regardless of the current date. They are applicable on `/offers`, `/events` and `/places`.
* **Birthdate range filters** match on a **range of birth dates**. They are applicable on `/offers` and `/events`, and each bound can be used on its own or together with the other. Only events can match: a `birthdateRange` is an event-only field, and places are never returned for it.

<!-- theme: info -->

> An event's `typicalAgeRange` is combined with the current date to determine whether it matches a given `birthdateRange`. Because of this, the same query can return different results on different days.

**When to use which**

* Use the **age filters** when you want events and/or places suitable for a fixed age or age range, for example "events for 6 to 12 year olds".
* Use the birthdate range parameters (`birthdateRangeFrom`, `birthdateRangeTo`) when you want events targeted at people born within a specific date range, for example when matching against a known audience of birth dates (e.g. a list of registered children). Since this is date-aware, it also returns events whose `typicalAgeRange` currently overlaps with that birthdate range.
* Combining both is possible (they are independent parameters and will be applied together) but is only useful for events, since the birthdate range parameters are not supported for places.

## URL parameters

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

### birthdateRangeFrom

With the `birthdateRangeFrom` URL parameter you set the earliest birth date of the audience you are looking for. You can use it on its own to look for everyone born on or after that date, or combine it with `birthdateRangeTo` to set both ends of the range.

An event matches when its own `birthdateRange` overlaps the requested range. Events without a `birthdateRange` also match when their `typicalAgeRange`, converted to birth dates using the current date, overlaps the requested range. Events marked as `allAges` are excluded from that fallback, because their age range is unbounded and would otherwise match every birthdate query.

**Applicable on endpoints**

`/events` `/offers`

**Examples**

Retrieve all events targeted at people born between 1 January 2020 and 31 December 2020:

```http
GET /events/?birthdateRangeFrom=2020-01-01&birthdateRangeTo=2020-12-31
```

### birthdateRangeTo

With the `birthdateRangeTo` URL parameter you set the latest birth date of the audience you are looking for. You can use it on its own to look for everyone born on or before that date, or combine it with `birthdateRangeFrom` to set both ends of the range. Matching works exactly as described under [`birthdateRangeFrom`](#birthdaterangefrom).

**Applicable on endpoints**

`/events` `/offers`

**Examples**

Retrieve all events targeted at people born in the first half of 2020:

```http
GET /events/?birthdateRangeFrom=2020-01-01&birthdateRangeTo=2020-06-30
```

## Advanced queries

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

<!-- theme: info -->

> `birthdateRangeFrom` and `birthdateRangeTo` express a single range. To match several birth date ranges at once, use the `birthdateRange` field in [advanced queries](../advanced/advanced-queries.md), for example `q=birthdateRange:([2020-01-01 TO 2020-12-31] OR [2022-01-01 TO 2022-12-31])`.
