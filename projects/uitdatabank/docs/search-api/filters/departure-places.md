# Filtering on departure places

## departurePlaces

Use the `departurePlaces[]` URL parameter or the `departurePlaces` advanced query field to find events that depart from one or more specific places.

**Applicable on endpoints**

`/events`

**Possible values**

Any UUID of a place in UiTdatabank.

**Examples**

Filter events that depart from a specific place:

```http
GET /events/?departurePlaces[]=a0368d10-ded0-4925-b94a-2835f73e255e
```

Repeating the parameter applies AND logic — only events with **all** given departure places are returned:

```http
GET /events/?departurePlaces[]=a0368d10-ded0-4925-b94a-2835f73e255e&departurePlaces[]=f3c8a2d1-7b4e-49f6-b2c8-5e3b1d9f7a4c
```

For OR logic, use the `q` parameter with the `departurePlaces` field instead. See [Advanced queries](../advanced/advanced-queries.md#departureplaces).

When searching with `embed=true`, events with departure places include a `departurePlaces` property — an array of full place URLs:

```json
{
  "departurePlaces": [
    "https://io.uitdatabank.be/places/a0368d10-ded0-4925-b94a-2835f73e255e"
  ]
}
```

The property is absent on events that have no departure places set.
