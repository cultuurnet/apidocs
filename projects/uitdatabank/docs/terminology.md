# Terminology

On this page you can get a grasp of common UiTdatabank terminology and concepts, referenced throughout the API documentation.

## Event

An API resource with a unique id that represents a cultural, leisure or sport-related activity. Usually happening on one or multiple specific dates and times, or on a pre-defined weekly schedule.

Most events will be published in [online calendars](#online-calendar) so potential attendees can find them.

Every event is required to have a related [place](#place) as its [location](#location), and can optionally have a related [organizer](#organizer).

Find out more about events in the [What are events?](entry-api/events/introduction.md) guide.

## Online event

Same as an [event](#event), but happening online (as indicated by their `attendanceMode` property).

For backward compatibility with older integrations that expect every event to have a [location](#location), online events are automatically related to the [nil location](#nil-location).

## Place

An API resource with a unique id that represents a place that can be visited and/or where [events](#event) can be located.

If the place is published, it will also be published in [online calendars](#online-calendar) for interested visitors to find them, or to find other events located at the same place.

Places created as a draft that do not get published can still be used as [locations](#location) for events, but will not be visible in search results in online calendars.

Find out more about places in the [What are places?](entry-api/places/introduction.md) guide.

## Offer

The collective name for events and places. Usually used to indicate the events and places that users of [online calendars](#online-calendar) can attend or visit. (Translated from the Dutch "Aanbod".)

## Location

A [place](#place) that a specific [event](#event) is happening at. The place will be included in the event's JSON as a `location` property.

## Nil location

A location for events that have no [physical location](#physical-location), like [online events](#online-event), to maintain compatibility with older integrations that expect every [event](#event) to have a location.

* Test: <https://io-test.uitdatabank.be/place/00000000-0000-0000-0000-000000000000>
* Production: <https://io.uitdatabank.be/place/00000000-0000-0000-0000-000000000000>

Online events will automatically become related to the nil location. Offline or mixed events have to be located at a [physical location](#physical-location) and cannot be located at the nil location.

## Physical location

A location of an event that has a real geographical address. (All locations not mentioned under another name on this page.)

## Location in consultation with the school

A location reserved for events that do not have a fixed location, but are bookable by schools for educational purposes.

* Test: <https://io-test.uitdatabank.be/place/3b92c85b-a923-4895-85f5-ed056dae11e2>
* Production: <https://io.uitdatabank.be/place/c3f9278e-228b-4199-8f9a-b9716a17e58f>

## Dummy location

Events with a dummy location do not have a location `@id`, only an embedded location with a name and address.

An example of an event with a dummy location: <https://io.uitdatabank.be/event/e160f0f3-89a8-45d7-94a6-34fda89fd69c>

These events were imported from UiTdatabank v2, where their location did not have to be a separate resource that would be linked.

No new events can be created with a dummy location in UiTdatabank v3.

## Organizer

An API resource with a unique id that represents an organization or person that organizes [events](#event) or runs a [place](#place) that can be visited.

By linking events and places to an organizer, they can easily be grouped or linked in [online calendars](#online-calendar) to find related events or places from the same organizer.

To prevent accidental duplicates, every organizer must have a unique website URL.

Find out more about organizers in the [What are organizers?](entry-api/organizers/introduction.md) guide.

## Dummy organizer

Events and places with a dummy organizer do not have an organizer `@id`, only an embedded organizer with a name and sometimes contact information.

An example of an event with a dummy organizer: <https://io.uitdatabank.be/event/206b6d13-5739-4b44-800a-6056bc34ce92>

These events and places were imported from UiTdatabank v2, where their organizer did not have to be a separate resource that would be linked.

No new events or places can be created with a dummy organizer in UiTdatabank v3.

## Online calendar

A website or mobile application that enables its users to find events to attend or places to visit, powered by UiTdatabank's Search API v3.

Often an online calendar will focus on a specific region or target audience.

Examples include:

* [UiTinVlaanderen](https://www.uitinvlaanderen.be) to browse all events and places in Flanders
* [UiTinGent](https://www.uitingent.be), [UiTinHasselt](https://www.uitinhasselt.be), [UiTinLeuven](https://www.uitinleuven.be), ... to find events and places in the municipality that you live in or want to visit
* [Erfgoed in Leuven](https://www.erfgoedcelleuven.be/nl/agenda), [INTER](https://inter.vlaanderen/alle-evenementen), [Indiestyle](https://www.indiestyle.be/agenda) ... to find events and places for specific target audiences
