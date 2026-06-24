# Birthdate Range

The `birthdateRange` URL parameter narrows the result set to events targeted at people born within the given range.
If an event has a `typicalAgeRange` that (combined with the current date) falls within the supplied `birthdateRange`, that event will also be included.

**Applicable on endpoints**

`/events`

**Examples**

Retrieve all the events where the birthdateRange falls within 1st of January 2020 to the 31st of December 2020 
or the `typicalAgeRange` falls within the birthdateRange at the moment the query is executed.

```http
GET /events/?birthdateRange=2020-01-01 TO 2020-12-31
```
