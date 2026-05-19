# Filtering on departure places

## URL parameter

**Applicable on endpoints**

`/events`

**Possible values**

Any UUID of a place in UiTdatabank.

**Behavior with multiple values**

Passing multiple `departurePlaces[]` values applies AND logic: only events that have **all** specified departure places are returned. To filter on events that have **either** of two departure places (OR logic), use the `q` parameter instead. See [Advanced queries](../advanced/advanced-queries.md#departureplaces).

**Examples**

Filter events that depart from a specific place:

```
GET /events/?departurePlaces[]=a0368d10-ded0-4925-b94a-2835f73e255e
```

Filter events that have both of these departure places:

```
GET /events/?departurePlaces[]=a0368d10-ded0-4925-b94a-2835f73e255e&departurePlaces[]=c1234567-abcd-efgh-ijkl-9876543210ab
```

## Embedded results

When searching with `embed=true`, events that have departure places include a `departurePlaces` property — an array of full place URLs:

```json
{
  "departurePlaces": [
    "https://io.uitdatabank.be/places/a0368d10-ded0-4925-b94a-2835f73e255e"
  ]
}
```

The property is absent on events that have no departure places set.

## Advanced query field

See [`departurePlaces`](../advanced/advanced-queries.md#departureplaces) in the advanced queries guide for OR-based filtering.
