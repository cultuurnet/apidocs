# Filtering by children only

Events in UiTdatabank can optionally be marked as intended for [children only](/docs/uitdatabank/entry-api/reference/operations/update-a-event-children-only), without parents or guardians present. With the `childrenOnly` parameter you can filter events based on whether or not they are targeted at children only.

## Using the childrenOnly parameter

**Applicable on endpoints**

`/events` `/offers`

**Possible values**

* `true`: only return events that have `childrenOnly` set to `true`.
* `false`: only return events that have `childrenOnly` set to `false` or not set at all.

When the parameter is omitted, all events are returned regardless of whether they are targeted at children only.

**Examples**

Retrieve all events that are targeted at children only:

```http
GET /events/?childrenOnly=true
```

Retrieve all events in Ghent that are targeted at children only:

```http
GET /events/?postalCode=9000&childrenOnly=true
```

Retrieve all events that are not targeted at children only:

```http
GET /events/?childrenOnly=false
```
