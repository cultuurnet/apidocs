---
stoplight-id: fbz0p8ipnt9zd
---

# Letting passholders pay with UiTPAS-points in your application

This guide illustrates how to let passholders pay with their UiTPAS-points, for example in a ticketing application.

You'll learn how to get or create a reward, check if the passholder can redeem the reward and how to redeem the reward. 

## Authentication

Before you can create and redeem rewards, you'll need **client credentials**, so you can access the UiTPAS API using a [Client Access Token](https://publiq.stoplight.io/docs/authentication/docs/client-access-token.md) or [User access Token](https://publiq.stoplight.io/docs/authentication/docs/user-access-token.md).

To decide what kind of token to use, see the [overview of token types](https://publiq.stoplight.io/docs/authentication/docs/methods.md).

## Workflow overview

<!-- focus: false -->
![](../assets/images/steps-pay-with-points.png)

### 1. Get or create the reward

To start the flow, you first need to know which reward you'll be redeeming.

You can find a list in the [rewards section of uitpas.be](https://www.uitpas.be/voordelen-zoeken#/voordelen). When you open the detail page of a reward, you'll find the reward-id at the end of the URL.




> ##### Permissions to create and redeem rewards
>
> To be able to create and redeem rewards for an organizer, your client needs to receive the related rewards permissions for the organizer you are creating and redeeming these rewards for.

### 2. Passholder wants to buy a ticket

Some time *after* you have registered your event in UiTdatabank, a passholder on your website or application wants to buy a ticket to the event.

Your application then starts its typical flow of guiding the passholder through a checkout process.

