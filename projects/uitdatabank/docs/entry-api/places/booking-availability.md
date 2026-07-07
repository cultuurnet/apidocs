# Sharing ticket/reservation availability

> Albeit possible in practice for a place to be sold out for a certain moment/day, we do not currently support this in our API. Places in UiTdatabank do not have granular time information and therefore do not allow to indicate a certain moment as fully booked or sold out. As a result, the top-level bookingAvailability for places is always `Available`.

However, you can optionally report the total capacity of a place using the `capacity` property:

| Property   | Type | Description |
|------------|---|---|
| `capacity` | integer ≥ 0 | Total number of seats or tickets at this place |

Places always have calendarType `periodic` or `permanent` (see [calendar info](../shared/calendar-info.md)), and `capacity` can be set for both. Unlike events, a place has no `subEvent` dates, so `capacity` is reported once at the top level for the place as a whole. (For events, capacity works only for calendarType `single` or `multiple` — see the [event booking availability guide](../events/booking-availability.md).)

## Example

```json
{
  "bookingAvailability": {
    "type": "Available",
    "capacity": 200
  }
}
```

## Updating bookingAvailability

`bookingAvailability` (including `capacity`) is set as part of the place itself — either via [`PUT /places/{placeId}`](/reference/entry.json/paths/~1places~1{placeId}/put) when replacing the full place, or via [`PUT /places/{placeId}/calendar`](/reference/entry.json/paths/~1places~1{placeId}~1calendar/put) when updating the calendar information.
