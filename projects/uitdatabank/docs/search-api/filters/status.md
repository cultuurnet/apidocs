# Status

All events and places created in UiTdatabank have a `status` property. The status indicates whether

* an event is still happening as plannend or not
* a place is still open for visits or not

> The status only indicates whether an event or place is proceeding as planned or is currently open. It does not provide information about the availability of tickets or spots, which is instead indicated by the `booking-availability`.

## Using the status parameter

You can use the `status` for filtering out items that are still available for visits or not. You can use the status filter as:

* an url parameter (e.g. `status=available`)
* an advanced query parameter (e.g. `status:avaialble`)

**Applicable on endpoints**

`/events` `/places` `/offers`

**Possible values**

Events:

* `available`: the event takes place as planned This is the default value when no status for the event or subEvent is included.
* `temporarilyUnavailable`: the event has been postponed to a later date yet to be determined.
* `unavailable`: the event has been cancelled.

Places:

* `available`: the place is 'open' and can be visited during opening hours. This is the default value when no status for the place is included.
* `temporarilyUnavailable`: the place is temporarily closed (due to renovations for example).
* `unavailable`: the place still exists (physically), but is permanently closed.

**Examples**

Search for all events that take places as planned (URL parameter):

```https
GET /events/?status=Available
```

Search for all places that are permanently closed (advanced query parameter):

```https
GET /places/?q=status:Unavailable
```

Search for all events that are available in a given date range (advanced query parameters):

```https
GET /events/?q=status:Unavailable AND dateRange:[2025-05-01T00\:00\:00%2B01\:00 TO 2025-06-31T23\:59\:59%2B01\:00]
```
