# Sharing ticket/reservation availability

Places in UiTdatabank always have their `bookingAvailability.type` set to `Available`. Unlike events, a place can never be fully sold out or permanently unavailable — it is a venue, not an activity with a fixed number of tickets.

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
