# Schema Documentation

> **API Design Guidelines:** The authoritative source for API design principles (REST, HTTP methods, URIs, errors, pagination, sorting, dates, authentication) is in [`projects/api-design-guidelines/docs/`](projects/api-design-guidelines/docs/). The sections below summarize the conventions most relevant to working in this codebase.

## Table of Contents

1. [Terminology](#terminology)
2. [File Organization & Naming Conventions](#file-organization--naming-conventions)
3. [Schema Composition](#schema-composition)
   - [Using `$ref` for Reusable Properties](#using-ref-for-reusable-properties)
   - [Extending a `$ref` with Additional Metadata](#extending-a-ref-with-additional-metadata)
4. [Validation Patterns](#validation-patterns)
   - [Simple Requirement](#simple-requirement)
   - [Flexible Requirements — Either/Or (`anyOf`)](#flexible-requirements--eitheror-anyof)
   - [Mutually Exclusive Requirements (`oneOf`)](#mutually-exclusive-requirements-oneof)
5. [HTTP Methods](#http-methods)
6. [URI & URL Conventions](#uri--url-conventions)
7. [Date & Time Format](#date--time-format)
8. [Error Responses](#error-responses)
9. [Pagination](#pagination)
10. [Sorting](#sorting)
11. [Documentation File Conventions](#documentation-file-conventions)
12. [Keeping Examples Up to Date](#keeping-examples-up-to-date)
13. [Reference Examples](#reference-examples)

---

## Terminology
We normally talk about **properties** in this context instead of fields.

---

## File Organization & Naming Conventions

### Naming Patterns
- **Single property component files:** `common-` prefix (e.g., `common-capacity.json`)
- **Place-related files:** `place-` prefix (e.g., `place-bookingAvailability.json`)
- **Event-related files:** `event-` prefix (e.g., `event-bookingAvailability.json`)
- **Subevent files:** `event-subEvent-` prefix (e.g., `event-subEvent-bookingAvailability.json`)
- **Composition/Component files:** `[domain]-[fieldname].json` (e.g., `bookingAvailability-type.json`)

---

## Schema Composition

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

### Extending a `$ref` with Additional Metadata
Use `allOf` when you need to reference a shared component **and** add or override a `description` or `example` for the specific context:

```json
"capacity": {
  "allOf": [
    { "$ref": "./common-bookingAvailability-capacity.json" },
    {
      "description": "Total number of seats or tickets for this subEvent."
    }
  ]
}
```

Use this when the base component's description is too generic for the consuming schema's context.

---

## Validation Patterns

### Simple Requirement
Use `required` array for straightforward requirements:
```json
"required": ["type"]
```

### Flexible Requirements — Either/Or (`anyOf`)
Use `anyOf` with `required` constraints when at least one property must be present:
```json
"anyOf": [
  { "required": ["type"] },
  { "required": ["remainingCapacity"] }
]
```
This means: **at least one of these properties must be present**. Multiple properties can be sent together.

### Mutually Exclusive Requirements (`oneOf`)
Use `oneOf` with `required`/`not` constraints when exactly one of two properties must be present (but not both):

```json
"oneOf": [
  {
    "required": ["type"],
    "not": { "required": ["remainingCapacity"] }
  },
  {
    "required": ["remainingCapacity"],
    "not": { "required": ["type"] }
  }
]
```

Summary: `anyOf` = either or both allowed; `oneOf` = exactly one.

---

## HTTP Methods

### PUT vs PATCH
- **PUT**: Full replacement. Must be idempotent. Requires the complete representation of the resource.
  - Example: `event-subEvent-put.json` — replaces the entire list of subEvents
- **PATCH**: Partial update. Not necessarily idempotent. Only sends changed properties.
  - Example: `event-subEvent-patch.json` — updates specific subEvents by `id`, only sending changed properties

### Other Methods
- **POST**: Create new resources. Not idempotent (may create duplicates if retried).
- **GET**: Read-only. Must be safe and idempotent. Never alters state.
- **DELETE**: Idempotent. Return `2XX` even when the resource does not exist.

---

## URI & URL Conventions
- URIs must use `kebab-case`
- Collections must be plural (e.g., `/events`, `/users`)
- Query parameters must use `lowerCamelCase` (e.g., `?postalCode=1000`)
- URLs must never contain verbs — use HTTP methods for actions
- Query parameters must not be used to transfer new/updated data (write in body)

---

## Date & Time Format
Always use [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) for dates and datetimes:
- Datetime with timezone offset: `2020-08-07T14:30:00+02:00`
- Datetime in UTC: `2020-08-07T12:30:00Z`
- Date only: `2020-08-07`
- Time without date: `14:30` (no timezone offset — document whether this is local or UTC)

---

## Error Responses
Error responses follow [RFC7807](https://datatracker.ietf.org/doc/html/rfc7807) with `Content-Type: application/problem+json`.

### Required properties
```json
{
  "type": "https://api.publiq.be/probs/url/not-found",
  "title": "Not Found",
  "status": "404"
}
```

### Optional extensions
- `detail`: human-readable description of this specific error instance (for developers)
- `endUserMessage`: localized message for end-users (object with `nl`, `en`, `fr`, `de` keys)
- `schemaErrors`: array of `{ "jsonPointer": "/field", "error": "..." }` for body validation errors

### When to use which status
- `400`: Invalid request body or data (`https://api.publiq.be/probs/body/invalid-data`)
- `401`: Missing/invalid/expired authentication (`https://api.publiq.be/probs/auth/unauthorized`)
- `403`: Authenticated but not permitted (`https://api.publiq.be/probs/auth/forbidden`)
- `404`: Resource not found (`https://api.publiq.be/probs/url/not-found`)
- `500`: Internal errors — use `about:blank` as type, avoid leaking implementation details

---

## Pagination
Endpoints returning lists support `start` (default `0`) and `limit` query parameters.

Response body must include:
```json
{
  "totalItems": 100,
  "member": [...]
}
```

---

## Sorting
Use a `sort` query parameter with optional `-` prefix for descending order:
```
?sort=name,-creationDate
```
Sort field names are handled case-insensitively.

---

## Documentation File Conventions
Markdown files in `docs/` should:
- Use lowercase slugs with dashes (e.g., `booking-availability.md`)
- Be stored as a flat list in `docs/` — avoid deep subdirectory nesting
- Never be renamed after going public (would break existing links)

Images go in `assets/images/` with slug-style filenames.

---

## Keeping Examples Up to Date

Whenever a new property is added to a schema, **all `examples` arrays in related schema files must be updated** to include the new property. This ensures examples stay accurate and useful for integrators.

Files to check when adding a property to a schema:
- The schema file itself (e.g., `event-subEvent-patch.json`)
- Any `*-put.json` or `*-post.json` counterparts (e.g., `event-subEvent-put.json`)
- The read model if one exists (e.g., `event-subEvent.json`)

---

## Reference Examples

### Booking Availability Schemas

| Context | File | Properties | Validation |
|---|---|---|---|
| Event | `event-bookingAvailability.json` | `type`, `capacity` | `type` required |
| Subevent | `event-subEvent-bookingAvailability.json` | `type`, `capacity`, `remainingCapacity` | `type` OR `remainingCapacity` required (or both) — uses `anyOf` |
| Place | `place-bookingAvailability.json` | `type` | `type` required |

### Files to Check
- `projects/uitdatabank/models/event-bookingAvailability.json`
- `projects/uitdatabank/models/event-subEvent-bookingAvailability.json`
- `projects/uitdatabank/models/place-bookingAvailability.json`
- `projects/uitdatabank/models/event-subEvent-patch.json`
- `projects/uitdatabank/models/event-subEvent.json`
