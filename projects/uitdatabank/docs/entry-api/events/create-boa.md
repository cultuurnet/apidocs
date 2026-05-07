# Introduction to BOA (Buitenschoolse Opvang en Activiteiten)

The BOA decree aims to create a comprehensive and integrated offering of out-of-school care and leisure activities for school-aged children in Flanders. Local governments act as the central directors, coordinating with partners across education, youth work, sports, and culture.
To properly capture this specific offering in UiTdatabank, several features and fields have been added to the API. This guide provides an overview of all BOA-specific data models and endpoints.

For more general information about publiq's role in the BOA decree, visit [publiq.be/boa](https://publiq.be/boa).

> This guide covers all BOA-specific fields, how they apply per calendar type, and what endpoints to use.

| Field | Calendar type | Notes |
|---|---|---|
| [`overnight`](../shared/calendar-info.md#overnight-events-only-singlemultiple) | single, multiple | Only for term `0.57.0.0.0`; hidden in response when `false` |
| [`faq`](/docs/uitdatabank/event-faqs) | all | Up to 30 items; dedicated `PUT /events/{eventId}/faqs` endpoint |
| [`openingHoursClosedDays`](../shared/calendar-info.md#adjusted-closed-days-events-only-periodicpermanent) | periodic, permanent | Date ranges with optional localized description |
| [`openingHoursAdjustedDays`](../shared/calendar-info.md#adjusted-opening-hours-events-only-periodicpermanent) | periodic, permanent | Date ranges with custom schedule |
| [`audience.audienceType: childrenOnly`](./create-children-only.md) | all | Unlocks `departurePlaces` |
| [`bookingInfo` on subEvents](../shared/booking-and-contact-info.md#bookinginfo) | single, multiple | Per-date booking contacts |
| [`bookingAvailability` capacity/remainingCapacity](./booking-availability.md) | single, multiple | See also [booking availability guide](./booking-availability.md) |
| [`childcare`](../shared/calendar-info.md#childcare-times-events-only) | single/multiple (subEvent), periodic (openingHours) | Different placement per calendar type |
| [`departurePlaces`](./create-children-only.md#departureplaces) | all (requires `childrenOnly`) | Dedicated `PUT /events/{eventId}/departurePlaces` endpoint |

### Related guides

* [Creating a new event](./create.md)
* [Updating an event](./update.md)
* [Calendar info](../shared/calendar-info.md)
* [Creating an event for children only](./create-children-only.md)
