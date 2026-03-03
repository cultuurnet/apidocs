# Schema Documentation

## Terminology
We normally talk about **properties** in this context instead of fields.

## File Organization & Naming Conventions

### Naming Patterns
- **Single property component files:** `common-` prefix (e.g., `common-capacity.json`)
- **Place-related files:** `place-` prefix (e.g., `place-bookingAvailability.json`)
- **Event-related files:** `event-` prefix (e.g., `event-bookingAvailability.json`)
- **Subevent files:** `event-subEvent-` prefix (e.g., `event-subEvent-bookingAvailability.json`)
- **Composition/Component files:** `[domain]-[fieldname].json` (e.g., `bookingAvailability-type.json`)
## Schema Composition Pattern

### Using `$ref` for Reusable Properties
To eliminate property definition duplication, use `$ref` to reference reusable component files.

**Component file structure** (e.g., `bookingAvailability-capacity.json`):
```json
{
  "type": "integer",
  "minimum": 0,
  "description": "Total number of seats or tickets."
}
```

**Consuming file structure** (e.g., `event-bookingAvailability.json`):
```json
{
  "title": "event.bookingAvailability",
  "type": "object",
  "properties": {
    "capacity": {
      "$ref": "./bookingAvailability-capacity.json"
    }
  },
  "required": ["type"]
}
```

## Validation Patterns

### Simple Requirement
Use `required` array for straightforward requirements:
```json
"required": ["type"]
```

### Flexible Requirements (Either/Or)
Use `anyOf` with `required` constraints when at least one property must be present:
```json
"anyOf": [
  { "required": ["type"] },
  { "required": ["remainingCapacity"] }
]
```
This means: **at least one of these properties must be present**. Multiple properties can be sent together.

## Example: Booking Availability Schemas

### Event (type required)
- File: `event-bookingAvailability.json`
- Properties: `type`, `capacity`
- Validation: `type` is required

### Subevent (flexible requirement)
- File: `event-subEvent-bookingAvailability.json`
- Properties: `type`, `capacity`, `remainingCapacity`
- Validation: Either `type` OR `remainingCapacity` required (or both)
- Pattern: Uses `anyOf` with required constraints

### Place (type required)
- File: `place-bookingAvailability.json`
- Properties: `type`
- Validation: `type` is required

## Files to Check
Check these files for examples:
- projects/uitdatabank/models/event-bookingAvailability.json
- projects/uitdatabank/models/event-subEvent-bookingAvailability.json
- projects/uitdatabank/models/place-bookingAvailability.json
- projects/uitdatabank/models/event-subEvent-patch.json
- projects/uitdatabank/models/event-subEvent.json
