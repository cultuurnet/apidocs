# Age

It is possible to filter the results from Search API based on the age group the event or place is targetted towards.

## Age filters vs. birthdate range filters

There are two ways to filter on the audience an event or place is targeted towards:

* **Age filters** match on a **fixed age or age range** (in years), regardless of the current date. They are applicable on `/offers`, `/events` and `/places`.
* **Birthdate range filters** match on a **range of birth dates**. They are applicable on `/offers` and `/events`, and each bound can be used on its own or together with the other. Only events can match: a `birthdateRange` is an event-only field, and places are never returned for it.

<!-- theme: info -->

> `typicalAgeRange` and `birthdateRange` describe the same audience in two different ways, so a filter on either one also returns events that only specify the other.

<!-- theme: warning -->

> An event that is suitable for all ages suits every birth date, so it matches every birthdate range filter. Since `allAges` defaults to `*`, those events are returned next to the ones aimed at a specific audience. Add `allAges=false` when you only want events that target a specific audience. An age range of `0-` counts as all ages here, just like `-`.

**When to use which**

* Use the **age filters** when you want events and/or places suitable for a fixed age or age range, for example "events for 6 to 12 year olds".
* Use the birthdate range parameters (`birthdateRangeFrom`, `birthdateRangeTo`) when you want events targeted at people born within a specific date range, for example when matching against a known audience of birth dates (e.g. a list of registered children). It also returns events that describe their audience with an overlapping age range.
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

An event matches when its own `birthdateRange` overlaps the requested range, or when it only specifies a `typicalAgeRange` that covers the same audience.

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

### birthdateRange

With the `birthdateRange` advanced query parameter you can filter on the birth dates of the audience. The `birthdateRangeFrom` and `birthdateRangeTo` URL parameters express a single range, so use this `q` parameter when you want to match several birth date ranges at once.

**Applicable on endpoints**

`/offers` `/events`

**Examples**

Retrieve all events targeted at people born in 2020:

```http
GET /events/?q=birthdateRange:[2020-01-01 TO 2020-12-31]
```

Retrieve all events targeted at people born in 2020 or in 2022:

```http
GET /events/?q=birthdateRange:([2020-01-01 TO 2020-12-31] OR [2022-01-01 TO 2022-12-31])
```

## Converted ranges in the results

Because a `typicalAgeRange` and a `birthdateRange` describe the same audience, Search API derives the one an event does not have from the one it does. That is why an event is found by both the age and the birthdate filters, no matter which of the two the editor entered.

The derived value is returned under a separate name, so you can tell it apart from a value the editor entered:

* `typicalAgeRangeConverted` is returned when the event was entered with a birthdate range. It holds the matching age range, for example `6-7`.
* `birthdateRangeConverted` is returned when the event was entered with an age range. It holds the matching birthdate range as a `from` and `to` pair. An unbounded range, such as for an all ages event, has no pair and is left out.

An event has one of the two, never both, so it carries one entered value and one derived one. Events that were entered with both before this rule can still carry both until either range is updated again, and for those no converted value is added.

Converting between an age and a birth date needs a date to count from, and that is the start date of the event. The derived value therefore stays the same over time. An event with a `permanent` calendar has no start date, so its derived value is counted from the moment it was indexed and can shift as time passes.

These fields are returned on events only, and only when the full result is requested with `embed=true`. They do not exist in Entry API.

An event entered with a birthdate range looks like this, without a `typicalAgeRange` of its own:

```json
{
  "typicalAgeRangeConverted": "6-7",
  "birthdateRange": {
    "from": "2010-01-01",
    "to": "2010-12-31"
  }
}
```

And an event entered with an age range like this:

```json
{
  "typicalAgeRange": "6-7",
  "birthdateRangeConverted": {
    "from": "2009-04-23",
    "to": "2011-04-22"
  }
}
```
