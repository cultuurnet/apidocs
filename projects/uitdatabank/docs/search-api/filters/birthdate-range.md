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

## The matchingBirthdateRanges response field

When a query includes `birthdateRangeFrom`/`birthdateRangeTo`, the response includes a top-level `matchingBirthdateRanges` array. It contains one entry for the queried range, listing the `@id` of every result in the resultset that matches it. This is useful for showing a parent which of their children's birthdates a given result is suitable for.

`matchingBirthdateRanges` is omitted from the response when the query does not include `birthdateRangeFrom`/`birthdateRangeTo`.

**Example**

Request:

```http
GET /events/?birthdateRangeFrom=2020-01-01&birthdateRangeTo=2022-12-31
```

Response:

```json
{
  "@context": "http://www.w3.org/ns/hydra/context.jsonld",
  "@type": "PagedCollection",
  "itemsPerPage": 30,
  "totalItems": 2,
  "member": [
    {
      "@id": "https://io.uitdatabank.be/events/d9a71b53-1756-4126-9926-a83f5dd84f45",
      "@type": "Event"
    },
    {
      "@id": "https://io.uitdatabank.be/events/557d0ddc-efc9-42b3-934b-9f88b0945ab1",
      "@type": "Event"
    }
  ],
  "matchingBirthdateRanges": [
    {
      "from": "2020-01-01",
      "to": "2022-12-31",
      "matches": [
        "https://io.uitdatabank.be/events/d9a71b53-1756-4126-9926-a83f5dd84f45",
        "https://io.uitdatabank.be/events/557d0ddc-efc9-42b3-934b-9f88b0945ab1"
      ]
    }
  ]
}
```
