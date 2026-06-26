# Birthdate Range

The `birthdateRangeFrom` and `birthdateRangeTo` URL parameters narrow the result set to events targeted at people born within the given range.
If an event has a `typicalAgeRange` that (combined with the current date) falls within that range, the event will also be included.
If an event has a `typicalAgeRange` that (combined with the current date) falls within the supplied `birthdateRange`, that event will also be included.

**Applicable on endpoints**

`/events`

**Examples**

Retrieve all events targeted at people born between 1 January 2020 and 31 December 2020 (including events whose `typicalAgeRange`, combined with the current date, overlaps that range).
or the `typicalAgeRange` falls within the birthdateRange at the moment the query is executed.

```http
GET /events/?birthdateRangeFrom=2020-01-01&birthdateRangeTo=2020-12-31
```
