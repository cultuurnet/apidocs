# Terminology

On this page you can get a grasp of common UiTdatabank terminology and concepts, referenced throughout the API documentation.

## Event

An API resource with a unique id that represents a cultural, pastime or sport-related activity. Usually happening on one or multiple specific dates and times, or on a pre-defined weekly schedule.

Most events will be published in [online calendars](#online-calendar) so potential attendees can find them.

Every event is required to have a related [place](#place) as its [location](#location), and can optionally have a related [organizer](#organizer).

Find out more about events in the [What are events?](entry-api/events/introduction.md) guide.

### Bookable school event

A bookable school event is an event that is solely targetted towards schools. These events have not a fixed location but are bookably by schools for education purposes. Bookable school events always have the [location in consultation with the school](#location-in-consultation-with-the-school) as their location.

### Online event

Same as an [event](#event), but happening online (as indicated by their `attendanceMode` property).

For backward compatibility with older integrations that expect every event to have a [location](#location), online events are automatically related to the [nil location](#nil-location).

## Labels

A label is a keyword or tag that makes an activity more easily picked up by search engines or certain calendars. Everyone can add labels to events, places and organizers, even if they did not enter the item.

A label is either private or public and visible or hidden.

### Public versus private labels

Public labels can be added by anyone, whereas private labels can only be added by users that are granted the permission in UiTdatabank to use the label. Labels are by default public.

### Visible versus hidden labels

Visible labels are sometimes displayed in [online calendars](#online-calendar), whereas hidden labels are not meant for publication.

**Example of a visible label**

```json
"labels": [
   "jongerentip"
],
```

**Example of a hidden label**

```json
"hiddenLabels": [
   "UiTPAS Maasmechelen"
],
```

## Location

A [place](#place) that a specific [event](#event) is happening at. The place will be included in the event's JSON as a `location` property.

### Nil location

A location for events that have no [physical location](#physical-location), like [online events](#online-event), to maintain compatibility with older integrations that expect every [event](#event) to have a location.

* Test: <https://io-test.uitdatabank.be/place/00000000-0000-0000-0000-000000000000>
* Production: <https://io.uitdatabank.be/place/00000000-0000-0000-0000-000000000000>

Online events will automatically become related to the nil location. Offline or mixed events have to be located at a [physical location](#physical-location) and cannot be located at the nil location.

### Physical location

A location of an event that has a real geographical address (all locations not mentioned under another name on this page).

### Location in consultation with the school

A location reserved for events that do not have a fixed location, but are bookable by schools for educational purposes.

* Test: <https://io-test.uitdatabank.be/place/3b92c85b-a923-4895-85f5-ed056dae11e2>
* Production: <https://io.uitdatabank.be/place/c3f9278e-228b-4199-8f9a-b9716a17e58f>

### Dummy location

Events with a dummy location do not have a location `@id`, only an embedded location with a name and address.

An example of an event with a dummy location: <https://io.uitdatabank.be/event/e160f0f3-89a8-45d7-94a6-34fda89fd69c>

```json
{
  "location": {
    "mainLanguage": "nl",
    "name": {
      "nl": "Jeugdheem te Bellefontaine - Vertrek Antwerpen - Station Berchem"
    },
    "address": {
      "nl": {
        "addressCountry": "BE",
        "addressLocality": "Berchem",
        "postalCode": "2600",
        "streetAddress": "Station Berchem "
      }
    },
    "geo": {
      "latitude": 51.2002552,
      "longitude": 4.4325658
    },
    "status": {
      "type": "Available"
    },
    "bookingAvailability": {
      "type": "Available"
    }
  }
}
```

These events were imported from UiTdatabank v2, where their location did not have to be a separate resource that would be linked.

No new events can be created with a dummy location in UiTdatabank v3.

## Offer

The collective name for events and places. Usually used to indicate the events and places that users of [online calendars](#online-calendar) can attend or visit. (Translated from the Dutch "Aanbod".)

## Organizer

An API resource with a unique id that represents an organization or person that organizes [events](#event) or runs a [place](#place) that can be visited.

By linking events and places to an organizer, they can easily be grouped or linked in [online calendars](#online-calendar) to find related events or places from the same organizer.

To prevent accidental duplicates, every organizer must have a unique website URL.

Find out more about organizers in the [What are organizers?](entry-api/organizers/introduction.md) guide.

### Dummy organizer

Events and places with a dummy organizer do not have an organizer `@id`, only an embedded organizer with a name and sometimes contact information.

An example of an event with a dummy organizer: <https://io.uitdatabank.be/event/206b6d13-5739-4b44-800a-6056bc34ce92>

```json
{
  "organizer": {
    "name": "CCV",
    "email": ["info@ccv.be"],
    "phone": ["016389891"]
  }
}
```

These events and places were imported from UiTdatabank v2, where their organizer did not have to be a separate resource that would be linked.

No new events or places can be created with a dummy organizer in UiTdatabank v3.

### UiTPAS organizer

An organizer that participates in the UiTPAS program is an UiTPAS organizer. These organizers always have at least on `UiTPAS` label.

An example of an UiTPAS organizer: <https://io.uitdatabank.be/organizers/D04BE067-FBE7-6633-2351893716796CB5>

```json
hiddenLabels": [
  "UiTPAS Gent"
],
```

## Online calendar

A website or mobile application that enables its users to find events to attend or places to visit, powered by UiTdatabank's Search API v3.

Often an online calendar will focus on a specific region or target audience.

Examples include:

* [UiTinVlaanderen](https://www.uitinvlaanderen.be) to browse all events and places in Flanders
* [UiTinGent](https://www.uitingent.be), [UiTinHasselt](https://www.uitinhasselt.be), [UiTinLeuven](https://www.uitinleuven.be), ... to find events and places in the municipality that you live in or want to visit
* [Seniorennet](https://www.seniorennet.be/page/info/agenda), [INTER](https://www.vlaanderen.be/inter/meedoen-aan-een-toegankelijke-samenleving/agenda-toegankelijke-evenementen), [Indiestyle](https://www.indiestyle.be/agenda) ... to find events and places for specific target audiences

## Place

An API resource with a unique id that represents a place that can be visited and/or where [events](#event) can be located.

If the place is published, it will also be published in [online calendars](#online-calendar) for interested visitors to find them, or to find other events located at the same place.

Places created as a draft that do not get published can still be used as [locations](#location) for events, but will not be visible in search results in online calendars.

Find out more about places in the [What are places?](entry-api/places/introduction.md) guide.

## Productions

A production is a bundle of events. These events have the same content, but time and / or location differs.

An example of a production are movies which are screened several times a day or week, and on different locations. The movie itself, e.g. Frozen 2 (= the [event](#event)) is always the same.
Other examples are theatre productions, dance productions, cabaret shows, etc.

Some events in UiTdatabank are linked to a production. These events have an extra property `production` in their JSON:

```json
"production":{
   "id":"a9a75b95-0f6c-4a78-8092-243be295995c",
   "title":"Portland - Departures",
   "otherEvents":[
      "https://io.uitdatabank.be/event/1b23c716-fd28-4e93-99b3-53c6c5338730",
      "https://io.uitdatabank.be/event/1cee1a32-3ba4-4172-9d5b-1207cc6f1d93",
      "https://io.uitdatabank.be/event/9ffd6bf0-3ea1-4c71-8e96-6f1d2da6a975",
      "https://io.uitdatabank.be/event/e9221e36-854a-4b9e-aa16-4966f873c284"
   ]
}
```

The process of linking events to productions is done centrally and cannot be done by the creator or other third party.

## Terms

Terms are the different components of the UiTdatabank categorization model.

terms are the components of the UiTdatabank categorization model. This  categorisation model consists of 3 domains: `eventtype`, `theme` and `facility`.

### Eventtype

The `eventtype` describes the form of the event or place, e.g. a `concert` (for an event) or a `theatre hall` (for a place).

When creating an event or place in UiTdatabank, a term with domain `eventtype` and the correct scope (`events` for events, `places` for places) is mandatory.

### Theme

A term with domain `theme` is used to describe the content of an event more precisely, e.g. a concert can have a theme `pop and rock` or `jazz and blues`. There is no strict relationship between eventtype and theme terms. However, we strongly advice to make logical combinations. These logical combinations can be found in the taxonomy API as `otherSuggestedTerms`.

When creating an event in UiTdatabank, a term with domain theme is optional.

### Facility

A term with domain `facility` describes specific accessibility facilities for people with disabilities, e.g. accessible sanitary facilities. Some facilities apply on places only, others on events only.
