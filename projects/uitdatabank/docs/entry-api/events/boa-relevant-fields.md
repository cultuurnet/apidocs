# BOA - Relevant fields

The BOA Decree (Decreet Buitenschoolse Opvang en Activiteiten) aims to ensure that every child aged 3 to 12 has access to high-quality care and leisure opportunities before and after school, as well as during holidays. It emphasizes relaxation, play, and personal development in a warm, inclusive environment close to home.

Local governments are responsible for organizing out-of-school care within their municipalities. They coordinate and collaborate with partners across education, childcare, youth work, sports, and culture to provide a comprehensive and integrated offering.

For more information, visit [the boa page on vlaanderen.be](https://www.vlaanderen.be/cjm/nl/cultuur/cultuureducatie/cultuur-en-boa/wat-boa). 

This guide covers all BOA-specific fields, how they apply per calendar type, and what endpoints to use.

| Field | Calendar type | Notes |
|---|---|---|
| [`overnight`](../shared/calendar-info.md#overnight-events-only-singlemultiple) | single, multiple | Only for term `0.57.0.0.0`; hidden in response when `false` |
| [`faq`](/docs/uitdatabank/event-faqs) | all | Up to 30 items; dedicated `PUT /events/{eventId}/faqs` endpoint |
| [`openingHoursClosedDays`](../shared/calendar-info.md#adjusted-closed-days-events-only-periodicpermanent) | periodic, permanent | Date ranges with optional localized description |
| [`openingHoursAdjustedDays`](../shared/calendar-info.md#adjusted-opening-hours-events-only-periodicpermanent) | periodic, permanent | Date ranges with custom schedule |
| [`audience.audienceType: childrenOnly`](/entry-api/events/creating-an-event-for-children-only) | all | Unlocks `departurePlaces` |
| [`bookingInfo` on subEvents](../shared/booking-and-contact-info.md#bookinginfo) | single, multiple | Per-date booking contacts |
| [`bookingAvailability` capacity/remainingCapacity](./booking-availability.md) | single, multiple | See also [booking availability guide](./booking-availability.md) |
| [`childcare`](../shared/calendar-info.md#childcare-times-events-only) | single/multiple (subEvent), periodic (openingHours) | Different placement per calendar type |
| [`departurePlaces`](/entry-api/events/creating-an-event-for-children-only#departureplaces) | all (requires `childrenOnly`) | Dedicated `PUT /events/{eventId}/departurePlaces` endpoint |

### Related guides

* [Creating a new event](./create.md)
* [Updating an event](./update.md)
* [Calendar info](../shared/calendar-info.md)
