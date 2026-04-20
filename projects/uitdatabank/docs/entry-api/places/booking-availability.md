# Sharing ticket/reservation availability

> Albeit possible in practice for a place to be sold out for a certain moment/day, we do not currently support this in our API. Places in UiTdatabank do not have granular time information and therefore do not allow to indicate a certain moment as fully booked or sold out. As a result, the top-level bookingAvailability for places is always `Available`.

However, you can optionally report the total capacity of a place using the `capacity` property:

| Property   | Type | Description |
|------------|---|---|
| `capacity` | integer ≥ 0 | Total number of seats or tickets at this place |

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

Use the [`PUT /places/{placeId}/booking-availability`](/reference/entry.json/paths/~1places~1{placeId}~1booking-availability/put) endpoint to update the `bookingAvailability` of a place:

```json
{
  "type": "Available",
  "capacity": 200
}
```

Omitting `capacity` leaves any previously set value unchanged. To clear a previously set capacity, send `null`.
