# Terminology

On this page you can get a grasp of common UiTdatabank terminology and concepts, referenced throughout the API documentation.

## Event

An API resource with a unique id that represents a cultural, leisure or sport-related activity. Usually happening on one or multiple specific dates and times, or on a pre-defined weekly schedule.

Most events will be published in [online calendars](#online-calendar) so potential attendees can find them.

Every event is required to have a related [place](#place) as its [location](#location), and can optionally have a related [organizer](#organizer).

### Online event

Same as an [event](#event), but happening online (as indicated by their `attendanceMode` property).

For backward compatibility with older integrations that expect every event to have a [location](#location), online events are automatically related to the [nil location](#nil-location).

## Place

An API resource with a unique id that represents a place that can be visited and/or where [events](#event) can be located.

If the place is published, it will also be published in [online calendars](#online-calendar) for interested visitors to find them, or to find other events located at the same place.

Places created as a draft that do not get published can still be used as [locations](#location) for events, but will not be visible in search results in online calendars.

## Offer

The collective name both for events and places, usually used to indicate. Translated from the Dutch "Aanbod" to indicate the events/places that users of [online calendars](#online-calendar) can attend or visit.

## Location

A [place](#place) that a specific [event](#event) is happening at. The place will be included in the event's JSON as a `location` property.

### Nil location

A location for events that have no [physical location](#physical-location), like [online events](#online-event), to maintain compatibility with older integrations that expect every [event](#event) to have a location.

*   Test: https://io-test.uitdatabank.be/place/00000000-0000-0000-0000-000000000000 
*   Production: https://io.uitdatabank.be/place/00000000-0000-0000-0000-000000000000

Online events will automatically become related to the nil location. Other events cannot be located at the nil location.

### Physical location

A location of an event that has a real geographical address. (All locations not mentioned under another name on this page.)

### Location in consultation with the school

A location reserved for events that do not have a fixed location, but are bookable by schools for educational purposes.

*   Test: https://io-test.uitdatabank.be/place/3b92c85b-a923-4895-85f5-ed056dae11e2
*   Production: https://io.uitdatabank.be/place/c3f9278e-228b-4199-8f9a-b9716a17e58f

### Dummy location

Events with a dummy location do not have a location `@id`, only a location name and address.

An example of an event with a dummy location: https://io.uitdatabank.be/event/e160f0f3-89a8-45d7-94a6-34fda89fd69c

These events were imported from UiTdatabank v2, where an event's location did not have to be a separate place that would be related.

No new events can be created with a dummy location in UiTdatabank v3.

## Organizer

An API resource with a unique id that represents an organization or person that organizes [events](#event).

By linking events to a separate organizer resource, events can easily be grouped by their organizer in [online calendars](#online-calendar) to find related events from the same organizer.

To prevent accidental duplicates, every organizer must have a unique website URL.

## Online calendar

A website or mobile application that enables its users to find events to attend or places to visit, powered by UiTdatabank's Search API v3.

Often an online calendar will focus on a specific region or target audience.

Examples include:

*   [UiTinVlaanderen](https://www.uitinvlaanderen.be) to browse all events and places in Flanders
*   [UiTinGent](https://www.uitingent.be), [UiTinHasselt](https://www.uitinhasselt.be), [UiTinLeuven](https://www.uitinleuven.be), [UiTinMechelen](https://www.uitinmechelen.be), ... to find events and places in the municipality that you live in or want to visit
*   [Erfgoed in Leuven](https://www.erfgoedcelleuven.be/nl/agenda), [INTER](https://inter.vlaanderen/alle-evenementen), [Indiestyle](https://www.indiestyle.be/agenda) ... to find events and places for specific target audiences
