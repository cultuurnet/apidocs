# Contributors

When you create a new [event](../events/create.md), [place](../places/create.md) or [organizer](../organizers/create.md) via Entry API using a [client access token](https://docs.publiq.be/docs/authentication/methods/client-access-token), that client will become the `creator` of the event/place/organizer. This means that it will only be editable afterward with a client access token for the same client.

If you use a [user access token](https://docs.publiq.be/docs/authentication/methods/user-access-token) instead, that user will become the `creator` of the event/place/organizer and it will only be editable with a user access token for the same user.

In some cases, you may want to give other specific UiTdatabank users also permission to edit the event/place/organizer that you created. For example, so they can add extra info in fields not supported by your integration via <https://www.uitdatabank.be>.

In this guide, you will learn how to add extra users as contributors on your event/place/organizer so that they see it in their dashboard on [UiTdatabank](https://www.uitdatabank.be) and are able to edit it when needed.

## Scope

Contributors can be added on:

* ✅ [Events](../events/introduction.md)
* ✅ [Places](../places/introduction.md)
* ✅ [Organizers](../organizers/introduction.md)

## Required permissions

Contributors can be added and retrieved by the creator of the event/place/organizer, and by anyone who has permission to edit the event/place/organizer (including contributors themselves).

## Adding contributors

Contributors need to be added to an event/place/organizer **after** it is created, via a separate endpoint. It is not possible to add contributors in the same request that creates the event/place/organizer.

The endpoint URL is slightly different per resource type:

* For events: [`PUT /events/{eventId}/contributors`](/reference/entry.json/paths/~1events~1{eventId}~1contributors/put)
* For places: [`PUT /places/{placeId}/contributors`](/reference/entry.json/paths/~1places~1{placeId}~1contributors/put)
* For organizers: [`PUT /organizers/{organizerId}/contributors`](/reference/entry.json/paths/~1organizers~1{organizerId}~1contributors/put)

You can also construct the URL of this endpoint by appending `/contributors` to the `url` property from the response to your `POST` request to create the event/place/organizer.

Using this endpoint, you can save a list of email addresses of UiTdatabank users that should be able to see the event in their dashboard and edit it.

**The email addresses do not necessarily have to be registered in UiTiD yet.** You can, for example, save a list of all email addresses of your team members even if they do not have an UiTiD account yet. When they later sign up and log in on UiTdatabank for the first time, the events/places/organizers that they were made a contributor of will be visible and editable by them.

Note that this endpoint does a complete overwrite of the list of contributors, so make sure to also include any previously added contributors unless you specifically want to remove them.

Example request:

```http
PUT /events/787d7420-c06f-4935-b3c5-5cd5a1276796/contributors HTTP/1.1
Host: https://io-test.uitdatabank.be
Authorization: Bearer YOUR_ACCESS_TOKEN
Content-Type: application/json

[
  "john.doe@acme.org",
  "jane@acme.com",
  "smith@ipsum.be"
]
```

## Removing contributors

The `PUT` request to save contributors on an event/place/organizer does a complete overwrite of the list of contributors, so you can remove contributors by sending a new `PUT` request without the contributors that should be removed.

For example, to remove all contributors:

Example request:

```http
PUT /events/787d7420-c06f-4935-b3c5-5cd5a1276796/contributors HTTP/1.1
Host: https://io-test.uitdatabank.be
Authorization: Bearer YOUR_ACCESS_TOKEN
Content-Type: application/json

[]
```

## Retrieving contributors

For privacy reasons, only the creator of the event/place/organizer and users that have permission to edit it (including contributors themselves) are able to retrieve the list of contributors on an event/place/organizer.

For this reason, contributors are not included in the JSON of events/places/organizers by default, as this data is publicly available.

However, you can include your client or user access token in the request to fetch the JSON of an event/place/organizer, in which case a `contributors` property will be included if you have sufficient permissions to view them (i.e. you can edit the event/place/organizer yourself).

Example request:

```http
GET /events/787d7420-c06f-4935-b3c5-5cd5a1276796 HTTP/1.1
Host: https://io-test.uitdatabank.be
Authorization: Bearer YOUR_ACCESS_TOKEN
```

Example response:

```json
HTTP/1.1 200 OK
Content-Type: application/json

{
  "@id": "https://io-test.uitdatabank.be/events/787d7420-c06f-4935-b3c5-5cd5a1276796",
  "...": "...",
  "contributors": [
    "john.doe@acme.org",
    "jane@acme.com",
    "smith@ipsum.be"
  ]
}
```

Alternatively, you can retrieve contributors of an event/place/organizer by sending a `GET` request to the same URL as when saving them.

Example request:

```http
GET /events/787d7420-c06f-4935-b3c5-5cd5a1276796/contributors HTTP/1.1
Host: https://io-test.uitdatabank.be
Authorization: Bearer YOUR_ACCESS_TOKEN
```

Example response:

```http
HTTP/1.1 200 OK
Content-Type: application/json

[
  "john.doe@acme.org",
  "jane@acme.com",
  "smith@ipsum.be"
]
```
