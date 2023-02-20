# Creating rewards

There are two ways to create new rewards:

* The UiTPAS regional coordinator can create new rewards via the UiTPAS admin tools.
* New rewards can be created programmatically via the API.

This guide explains **how to create UiTPAS rewards programmatically**.

To learn how to let passholders pay with UiTPAS points in your application, [check out this guide](pay-with-UiTPAS-points.md).

## Before you start

Before starting this guide, make sure you clearly understand which type of reward you want to create: [a **welcome reward** or a **points reward**](terminology.md#rewards).

## Authentication

Before you can [create rewards](/reference/uitpas.json/paths/~1rewards/post), you'll need **client credentials**, so you can access the UiTPAS API using a [Client Access Token](https://publiq.stoplight.io/docs/authentication/docs/client-access-token.md) or [User access Token](https://publiq.stoplight.io/docs/authentication/docs/user-access-token.md).

To decide what kind of token to use, see the [overview of token types](https://publiq.stoplight.io/docs/authentication/docs/methods.md).

> ##### Permissions to create and redeem rewards
>
> To be able to create and redeem rewards for an organizer, your client needs to have the `REWARDS_WRITE` and `REWARDS_REDEEM` permissions for the organizer you are creating and redeeming these rewards for. You can get access to your list of organizers with the [GET /permissions endpoint](/reference/uitpas.json/paths/~1permissions/get).

## How to create rewards programmatically

Rewards are published to public channels where passholders can view and redeem them, such as [uitpas.be](https://www.uitpas.be). That's why it's important to clearly describe your reward and add as much detail as possible.

To create any type of [**reward**](terminology.md#rewards), **the following properties are required:**

* **Title**: choose a clear title for the reward.
* **Type**: choose which type of reward you are creating, possible values are [**"POINTS" or "WELCOME"**](terminology.md#rewards)
* **Promotional description:** give some more detail about the reward, describe what the passholder will receive.
* **Publication period:** choose a period wherein this reward can be redeemed. For example: for a concert ticket, de end date should be the day of the concert.

To create a reward of type [POINTS](terminology.md#points-rewards) **the following properties are also required**:

* **Points**: how many points will this reward cost the passholder.
* **Category:** choose one or more categories that fit the reward. Allowed values are: "Eten en drinken", "Doen", "Gadget of item" and "Goede doel".
* **More info URL:** Add a URL where passholders can learn more about this reward, or the organizer offering this reward.

The following properties are not required for points and welcome rewards, **but we strongly advice to add them:**

* **organizers**: list of organizers where this reward can be redeemed. Unique IDs of UiTPAS organizers. (same organizer IDs as in UiTdatabank). If you leave this empty, the first organizer you have permission to create rewards for will be linked to the new reward. You can get access to your list of organizers with the [GET /permissions endpoint](/reference/uitpas.json/paths/~1permissions/get).
* **pictures**: add one or more URLs to images related to your reward. The URL can be external, hosted on your own server. Make sure you don't remove the image as we won't store a copy of it.

Example request:

```http
POST /rewards HTTP/1.1
Content-Type: application/json
Host: https://api-test.uitpas.be
Authorization: Bearer YOUR_ACCESS_TOKEN'

{
 "organizers": [
    {
      "id": "0ce87cbc-9299-4528-8d35-92225dc9489f"
    ]
  },
  "title": "Gratis ticket Design Museum Brussels",
  "type": "POINTS",
  "points": 10,
  "categories": [
    "Doen"
  ],
  "promotionalDescription": "this is the mandatory description",
  "publicationPeriod": {
    "begin": "2021-08-24T14:15:22Z",
    "end": "2022-08-24T14:15:22Z"
  },
  "moreInfoURL": "https://example.org/more-info-about-this-reward",
  "pictures": 
    ["https://uitid-media-test.imgix.net/f4e03b5d-540c-4ab4-8eed-93501994a9fc/design-voordeeljpg?w=500&h=500"]
  }
}
```
