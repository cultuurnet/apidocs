# Birthdate Range

The `birtdateRange` is used to filter out results based on targeted birthdate range of the event.
If an event has a `typicalAgeRange` that falls within the birthdateRange, the event will also be included in the result set.

**Applicable on endpoints**

`/events`

**Examples**

Retrieve all the events where the birthdateRange falls within 1st of January 2020 to the 31st of December 2020 
or the `typicalAgeRange` falls within the birthdateRange at the moment the query is executed.

```http
GET /events/?birthdateRange=2020-01-01..2020-12-31
```
