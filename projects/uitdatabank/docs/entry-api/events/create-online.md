# Online events

Online events are mostly the same as regular events, except that they do not have a physical location but instead take place online, for example via a live stream or in a video call.

Creating an online event is very similar to [creating a regular new event](./create.md), so it is recommended to read that guide first.

In this guide you will learn how to:

* Create an online event
* Add a URL for visitors to attend your event online (optional)
* Create a mixed event (online & offline)
* Change an existing regular event to an online or mixed event

## Required permissions

As with regular events, anyone can create new online events in UiTdatabank by using either a user access token or a client access token.

The user or client that created the event will become the `creator` of the online event, which allows them to later make changes to it or delete it. In some cases other users or clients may also be able to edit the event afterward. See the permissions info in the guide about [updating an event](./update.md) for more info.

## Creating an online event

Every event in UiTdatabank has an `attendanceMode` property that can be set to either `online`, `offline` or `mixed`.

When creating a new event this property is optional and is automatically set to `offline` by UiTdatabank when [creating a regular event with a location](./create.md).

To create an online event instead, include the `attendanceMode` property and set it to `online`. When doing so, you must not include a `location` property.

For example, to create an online concert happening on a single date:

```http
POST /events HTTP/1.1
Host: https://io-test.uitdatabank.be
Authorization: Bearer YOUR_ACCESS_TOKEN
Content-Type: application/json

{
  "mainLanguage": "nl",
  "name": {
    "nl": "Voorbeeld concert"
  },
  "attendanceMode": "online",
  "terms": [
    {
      "id": "0.50.4.0.0"
    }
  ],
  "calendarType": "single",
  "subEvent": [
    {
      "startDate": "2023-01-18T17:30:00+01:00",
      "endDate": "2023-01-18T23:00:00+01:00"
    }
  ]
}
```

After creating your new event, UiTdatabank will automatically add a `location` with the UUID `00000000-0000-0000-0000-000000000000`. We call this the ["nil location"](../../terminology.md#nil-location). It is used for backward compatibility with integrations that existed before we introduced online events, as those usually expect an event to always have a location. You may safely ignore this location when displaying online events in your application.

**Note that you cannot set the location of an event to the nil location yourself.** The only way to use this location on your event is by explicitly setting the `attendanceMode` to `online`.

An example of an online event after it's been created:

```json
{
  "@id": "https://io-acc.uitdatabank.be/event/db8253cb-988b-46b0-b8ce-01f2fe319281",
  "@context": "/contexts/event",
  "mainLanguage": "nl",
  "name": {
    "nl": "Voorbeeld concert"
  },
  "attendanceMode": "online",
  "location": {
    "@type": "Place",
    "@id": "https://io-acc.uitdatabank.be/place/00000000-0000-0000-0000-000000000000",
    "mainLanguage": "nl",
    "name": {
      "nl": "Online"
    },
    "terms": [
      {
        "id": "0.8.0.0.0",
        "label": "Openbare ruimte",
        "domain": "eventtype"
      }
    ],
    "calendarType": "permanent",
    "status": {
      "type": "Available"
    },
    "bookingAvailability": {
      "type": "Available"
    },
    "address": {
      "nl": {
        "addressCountry": "BE",
        "addressLocality": "___",
        "postalCode": "0000",
        "streetAddress": "___"
      }
    },
    "typicalAgeRange": "-"
  },
  "...": "..."
}
```

Try it out below by replacing `YOUR_ACCESS_TOKEN` with your access token for the Entry API test environment:

```json http
{
  "url": "https://io-test.uitdatabank.be/events",
  "method": "post",
  "headers": {
    "authorization": "Bearer YOUR_ACCESS_TOKEN"
  },
  "body": {
    "mainLanguage": "nl",
    "name": {
      "nl": "Voorbeeld concert"
    },
    "attendanceMode": "online",
    "terms": [
      {
        "id": "0.50.4.0.0"
      }
    ],
    "calendarType": "single",
    "subEvent": [
      {
        "startDate": "2023-01-18T17:30:00+01:00",
        "endDate": "2023-01-18T23:00:00+01:00"
      }
    ]
  }
}
```

To view the JSON data of your online event afterward, copy the `url` property from the response and open it in your web browser (no authentication required).

## Creating a mixed event

A mixed event is a combination of an online and offline event, for example a concert that is played at a specific venue but also has a livestream at the same time.

To create a mixed event, you must provide both a `location` (as on a regular event) and set the `attendanceMode` to `mixed`.

For example, a concert performed at the Ancienne Belgique and also via livestream:

```http
POST /events HTTP/1.1
Host: https://io-test.uitdatabank.be
Authorization: Bearer YOUR_ACCESS_TOKEN
Content-Type: application/json

{
  "mainLanguage": "nl",
  "name": {
    "nl": "Voorbeeld concert"
  },
  "attendanceMode": "mixed",
  "location": {
    "@id": "https://io-test.uitdatabank.be/place/787d7420-c06f-4935-b3c5-5cd5a1276796"
  },
  "terms": [
    {
      "id": "0.50.4.0.0"
    }
  ],
  "calendarType": "single",
  "subEvent": [
    {
      "startDate": "2023-01-18T17:30:00+01:00",
      "endDate": "2023-01-18T23:00:00+01:00"
    }
  ]
}
```

## Adding a URL to attend your online or mixed event

When creating or [updating](./update.md) an online or mixed event, you can optionally include an `onlineUrl` property for visitors to attend your event online. The `onlineUrl` expects a URL string that starts with `http://` or `https://`.

This property is not required because some online or mixed events may require attendees to purchase a ticket first before they gain access to the online event, for example via a link in an email.

For example, to create an online event for a livestream of a concert on YouTube:

```http
POST /events HTTP/1.1
Host: https://io-test.uitdatabank.be
Authorization: Bearer YOUR_ACCESS_TOKEN
Content-Type: application/json

{
  "mainLanguage": "nl",
  "name": {
    "nl": "Voorbeeld concert livestream @ YouTube"
  },
  "attendanceMode": "online",
  "onlineUrl": "https://www.youtube.com/watch?v=...",
  "terms": [
    {
      "id": "0.50.4.0.0"
    }
  ],
  "calendarType": "single",
  "subEvent": [
    {
      "startDate": "2023-01-18T17:30:00+01:00",
      "endDate": "2023-01-18T23:00:00+01:00"
    }
  ]
}
```

## Updating an event's attendanceMode

You can always change an event's `attendanceMode` after its initial creation by [updating the event](./update.md).

Keep the following restrictions in mind:

* When changing the attendanceMode from `offline` or `mixed` **to** `online`, you must remove the `location` property from the event at the same time (or explicitly set it to the "nil location").
* When changing the attendanceMode from `online` **to** `offline` or `mixed`, you must add a `location` property with an `@id` that links to the place where the event happens at.
* When changing the attendanceMode from `online` or `mixed` **to** `offline`, the `onlineUrl` property will be removed from the event if present.

You can also update the `attendanceMode` and/or `onlineUrl` of an event using the following endpoints if you do not want to use the [`PUT /events/{eventId}`](/reference/entry.json/paths/~1events~1{eventId}/put) endpoint to update the event completely:

* [`PUT /events/{eventId}/attendance-mode`](reference/entry.json/paths/~1events~1{eventId}~1attendance-mode/put)
* [`PUT /events/{eventId}/online-url`](/reference/entry.json/paths/~1events~1{eventId}~1online-url/put)
* [`DELETE /events/{eventId}/online-url`](/reference/entry.json/paths/~1events~1{eventId}~1online-url/delete)
