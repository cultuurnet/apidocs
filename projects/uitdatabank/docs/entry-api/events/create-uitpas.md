# UiTPAS events

An UiTPAS event is a regular event that has ticketing options with an [UiTPAS](https://docs.publiq.be/docs/uitpas/introduction) discount.

Event organizers that offer UiTPAS discounts can get (partial) reimbursements for those discounts by [registering their ticket sales in UiTPAS](https://docs.publiq.be/docs/uitpas/ticket-sales/registering). However, ticket sales can only be registered for known UiTPAS events.

To register your UiTPAS event first, you need to register it in UiTdatabank. This way it will also appear on online calendars like [UiTinVlaanderen](https://www.uitinvlaanderen.be). After registering it in UiTdatabank, it will automatically also be registered in UiTPAS.

In this guide you will learn how to:

* Create an UiTPAS event in UiTdatabank
* Get the UiTPAS prices for an event in UiTdatabank
* Configure which card systems (for example UiTPAS Gent, UiTPAS Oostende, ...) should provide discounts for their passholders when they buy tickets for your event
* Change an UiTPAS event to a regular event instead
* Hide an UiTPAS event from online calendars

Before diving in, make sure you have read the following guides first:

* [Creating a new event](./create.md), as creating an UiTPAS event builds upon that.
* [What are organizers?](../organizers/introduction.md) to learn about the concept of organizers and more specifically, UiTPAS organizers.
* The guide about [linking an organizer to an event](../organizers/linking.md), which is required for UiTPAS events.
* The guide about [adding price info to your event](../shared/price-info.md), which is required for UiTPAS events.

## Required permissions

As with regular events, anyone can create new UiTPAS events in UiTdatabank by using either a user access token or a client access token.

The user or client that created the event will become the `creator` of the online event, which allows them to later make changes to it or delete it.

## Creating an UiTPAS event

An UiTdatabank event is also registered automatically in UiTPAS when it has a `priceInfo` property and is linked to an [UiTPAS `organizer`](../organizers/introduction.md).

For example, by creating an event linked to the organizer `[TEST] UiTPAS Organisatie (Regio Gent + Paspartoe)` that [every UiTPAS integration has access to on the testing environment](https://docs.publiq.be/docs/uitpas/test-dataset):

```http
POST /events HTTP/1.1
Host: https://io-test.uitdatabank.be
Authorization: Bearer YOUR_ACCESS_TOKEN

{
  "mainLanguage": "nl",
  "name": {
    "nl": "Example UiTPAS event"
  },
  "organizer": {
    "@id": "https://io-test.uitdatabank.be/organizers/0ce87cbc-9299-4528-8d35-92225dc9489f"
  },
  "priceInfo": [
    {
      "category": "base",
      "name": {
        "nl": "Basistarief"
      },
      "price": 11,
      "priceCurrency": "EUR"
    }
  ],
  "calendarType": "single",
  "subEvent": [
    {
      "startDate": "2021-01-01T12:00:00+01:00",
      "endDate": "2021-01-01T16:00:00+01:00"
    }
  ],
  "location": {
    "@id": "https://io-test.uitdatabank.be/place/8248e289-c986-4006-902f-b0616dcbcde7"
  },
  "terms": [
    {
      "id": "0.50.4.0.0"
    }
  ]
}
```

* An organizer is linked to an event in the exact same way as the event's `location`, but via the `organizer` property and using an organizer URI instead of a place URI. This is explained in more detail in [the guide about linking organizers to events](../organizers/linking.md).
* How to add price info to your event is explained in more detail in [the price info guide](../shared/price-info.md).
* Read on below to learn how to find the right organizer, and what price info to provide exactly for UiTPAS events.

Try it now by replacing the `YOUR_ACCESS_TOKEN` below with your access token for the testing environment of Entry API:

```json http
{
  "url": "https://io-test.uitdatabank.be/events",
  "method": "post",
  "headers": {
    "Authorization": "Bearer YOUR_ACCESS_TOKEN"
  },
  "body": {
    "mainLanguage": "nl",
    "name": {
      "nl": "Example UiTPAS event"
    },
    "organizer": {
      "@id": "https://io-test.uitdatabank.be/organizers/0ce87cbc-9299-4528-8d35-92225dc9489f"
    },
    "priceInfo": [
      {
        "category": "base",
        "name": {
          "nl": "Basistarief"
        },
        "price": 11,
        "priceCurrency": "EUR"
      }
    ],
    "calendarType": "single",
    "subEvent": [
      {
        "startDate": "2021-01-01T12:00:00+01:00",
        "endDate": "2021-01-01T16:00:00+01:00"
      }
    ],
    "location": {
      "@id": "https://io-test.uitdatabank.be/place/8248e289-c986-4006-902f-b0616dcbcde7"
    },
    "terms": [
      {
        "id": "0.50.4.0.0"
      }
    ]
  }
}
```

To view the JSON data of your UiTPAS event afterward, copy the `url` property from the response and open it in your web browser (no authentication required).

### UiTPAS labels

Shortly after creating your UiTPAS event in UiTdatabank, it will automatically gain one or more UiTPAS [labels](../shared/labels.md) once it has also been registered in UiTPAS. The UiTPAS labels are based on the card systems that the linked UiTPAS organizer is active in.

For example, when creating an UiTPAS event with the organizer from the example above, the event data will shortly afterward contain:

```json
{ 
  "hiddenLabels": [
    "Paspartoe",
    "UiTPAS Gent"
  ]
}
```

These labels mark the event as an UiTPAS event on online calendars, and are often used to filter events on specific UiTPAS card systems.

Note that UiTPAS-labels cannot be added or removed directly by regular API clients. They are always added or removed automatically by UiTdatabank depending on [the enabled card systems](#changing-the-card-systems-of-an-uitpas-event) for the UiTPAS event.

You can also check that the event is registered in UiTPAS by [fetching the card system configuration of your event on the UiTPAS API](https://docs.publiq.be/docs/uitpas/uitpas-api/reference/operations/list-event-card-systems), using the same access token as on Entry API.

<!-- @todo later: document how to get a mapping of card system ids to UiTPAS labels using /uitpas/labels? (Should also be documented as OpenAPI endpoint) -->

> Because **the registration in UiTPAS happens asynchronously**, it may take a couple of seconds for the labels to be added to your event after its creation.
>
> Likewise, it may take a couple of seconds before [the request to fetch the event's card systems from the UiTPAS API](https://docs.publiq.be/docs/uitpas/uitpas-api/reference/operations/list-event-card-systems) returns a response with status `200` instead of `404`.

### Finding the right organizer

While you can [link any existing organizer to your event](../organizers/linking.md), you will not be able to register ticket sales for the event in UiTPAS if your client does not have permission to make requests to the UiTPAS API on behalf of the linked organizer.

To find UiTPAS organizers that you can register ticket sales for, use the [`GET /permissions`](https://docs.publiq.be/docs/uitpas/uitpas-api/reference/operations/list-permissions) endpoint on the UiTPAS API.

Alternatively, if your API client does not need to be able to register UiTPAS ticket sales for the event, and you only wish to register the UiTPAS events in UiTdatabank with the correct organizer, you can [find an existing organizer based on its name or website](../organizers/finding-and-reusing-organizers.md).

If you only need to register UiTPAS events for one or a handful of UiTPAS organizers, we recommend to store the relevant organizer URIs in your application once you have found them.

### What price info to provide

You must only provide the **non-UiTPAS price tariffs** for your event when registering it in UiTdatabank.

When the event is registered successfully, UiTPAS will automatically add the correct UiTPAS prices to the event. The UiTPAS prices are calculated based on the event's base tariff, the event's enabled card systems, and the specific  discounts in those card system(s).

## Getting UiTPAS prices for an event in UiTdatabank

While UiTPAS automatically calculates and stores the discounted UiTPAS prices for an event, they are currently not returned by default when [fetching the event details from UiTdatabank](https://docs.publiq.be/docs/uitdatabank/entry-api/reference/operations/get-a-event).

To include the UiTPAS prices of an event when fetching it, you must add an `embedUitpasPrices` query parameter to the URL and set it to `true`.

For example:

```http
GET /event/a4425f9a-bc3a-4a45-ab20-a23b58e8259c?embedUitpasPrices=true HTTP/1.1
Host: https://io.uitdatabank.be
```

In addition to the price tariffs stored by your integration, one or more tariffs with the category `uitpas` will be included in the event's `priceInfo` property:

```json
{
  "priceInfo": [
    {
      "category": "base",
      "name": {
        "nl": "Basistarief",
        "fr": "Tarif de base",
        "en": "Base tariff",
        "de": "Basisrate"
      },
      "price": 3.1,
      "priceCurrency": "EUR"
    },
    {
      "category": "uitpas",
      "name": {
        "nl": "Kansentarief met UiTPAS Pelt"
      },
      "price": 0.62,
      "priceCurrency": "EUR"
    }
  ]
}
```

Try it now:

```json http
{
  "url": "https://io.uitdatabank.be/event/a4425f9a-bc3a-4a45-ab20-a23b58e8259c",
  "method": "get",
  "query": {
    "embedUitpasPrices": "true"
  }
}
```

<!-- theme: warning -->

> **The `embedUitpasPrices` parameter has no performance impact.** It only serves as a temporary feature toggle.
>
> The default value of the `embedUitpasPrices` parameter is planned to change to `true` in the future.
>
> It is set to `false` for the time being so that existing integrations can make any changes necessary before the UiTPAS prices are included by default. For example, so they can remove their existing integration with UiTPAS API to fetch the prices because this would otherwise result in duplicate UiTPAS prices being shown.
>
> If you do not wish to ever display UiTPAS prices, make sure to explicitly set the `embedUitpasPrices` parameter to `false` to exclude them when the default changes to `true` in the future.

## Changing the card systems of an UiTPAS event

By default, all the card systems that the event's UiTPAS organizer is active in will be enabled. This means that passholders from those card systems will be able to buy tickets with an UiTPAS discount.

For example: If the event's organizer is active in both UiTPAS Gent and UiTPAS Oostende, those card systems will be enabled by default on the event and passholders from both regions will be able to buy tickets with an UiTPAS discount for the event.

In the near future you will be able to enable/disable specific card systems on your UiTPAS events, so you can specify for which ones discounts should be provided. **This functionality is still under construction, please check back soon.** <!-- @todo Link to an UiTPAS guide on how to configure cardSystems on the event when that is ready. -->

When you enable/disable card systems on your UiTPAS event, the event's [UiTPAS labels](#uitpas-labels) will also be updated to reflect the enabled card systems. UiTPAS labels of disabled card systems are removed from the event.

## Changing an UiTPAS event to a regular event.

In some cases you may want to register a regular event and link it to an UiTPAS organizer without making it an UiTPAS event. For example, when the event's organizer participates in the UiTPAS program but does not offer UiTPAS discounts for this particular event.

After creating the event and linking it to the UiTPAS organizer (as well as adding price info) the event will automatically become an UiTPAS event as that is the expected behaviour in most cases.

However, you can disable UiTPAS discounts for such an event by disabling all the enabled card systems on the event as described in ["Changing the card systems of an UiTPAS event"](#changing-the-card-systems-of-an-uitpas-event).

When an UiTPAS event has no enabled card systems, its [UiTPAS labels](#uitpas-labels) will automatically be removed in UiTdatabank and it won't be marked as an UiTPAS event in online calendars.

## Hiding an UiTPAS event from online calendars

Some UiTPAS events are not meant to be visible in online calendars, for example because they are only used to collect points on UiTPAS check-in devices that need an UiTPAS event ID to be configured correctly.

You can hide an UiTPAS event from online calendars by setting the event's `audience.audienceType` property to `members` instead of the default `everyone`.

For example:

```json
{
  "audience": {
    "audienceType": "members"
  }
}
```

You may set this property when creating the event, or when updating it later. You can also set it via the [`PUT /events/{eventId}/audience`](https://docs.publiq.be/docs/uitdatabank/entry-api/reference/operations/update-a-event-audience) endpoint.

## More info

> Check out the guide about [registering UiTPAS events](https://docs.publiq.be/docs/uitpas/events/registering) in the UiTPAS API documentation for more info.
