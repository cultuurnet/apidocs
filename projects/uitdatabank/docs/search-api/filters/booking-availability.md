# Booking Availability

All events and places created in UiTdatabank have a `bookingAvailability` property. The bookingAvailability indicates whether there are still tickets or seats available for an event.

> The bookingAvailability only indicates whether there are still tickets or seats available for an event. It does not provide information about any cancellations or date changes, which are instead indicated by the [status](/status.md).

## Using the bookingAvailability parameter

**Applicable on endpoints**

`/events` `/places` `/offers`

**Possible values**

* `Available`: there are still tickets or seats left for the event, or the capacity for the event is unlimited.
* `Unavailable`: the event is sold out or fully booked.

**Examples**

Search for all events that still have available tickets or open spots (URL parameter):

```https
GET /events/?bookingAvailability=Available
```

Search for all events that are sold out or fully booked (advanced query parameter):

```https
GET /events/?q=status:Unavailable
```

Search for all events that are not sold out or fully booked, and happen as plannend (advanced query parameters):

```https
GET /events/?q=bookingAvailability:Available AND status:Available  
```
