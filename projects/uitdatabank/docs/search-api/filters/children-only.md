# Filtering by children only

Events in UiTdatabank can optionally be marked as intended for [children only](/docs/uitdatabank/entry-api/reference/operations/update-a-event-children-only), without parents or guardians present. With the `childrenOnly` parameter you can filter events based on whether or not they are targeted at children only.

## Using the childrenOnly parameter

**Applicable on endpoints**

`/events` `/offers`

**Possible values**

* `false`: (default) only return events that have `childrenOnly` set to `false` or not set at all.
* `true`: only return events that have `childrenOnly` set to `true`.
* `*`: returns all events, with `childrenOnly` set to `false` or `true` (see our page about [disabling default filters](../filters/default-filters.md))

When the parameter is omitted, only events that are NOT targeted towards "children only" are returned.

> Note that when using `childrenOnly=true` or `childrenOnly=*`, you will always find events set to `childrenOnly: true` that have been created by *your* client. Events created by other users and set to `childrenOnly: true` are only returned if your account has been granted access by publiq. If you have a use case that requires broader access to events targeted towards children only, please contact us via [publiq.be/boa](https://publiq.be/boa).

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

Retrieve all events that are targeted towards children only, AND other events

```http
GET /events/?childrenOnly=*
```

(See also [our page about disabling default filters](../filters/default-filters.md) for more info.)
