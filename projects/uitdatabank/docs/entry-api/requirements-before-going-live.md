---
stoplight-id: 73ef6e15ee3ec
---

# Requirements before going live

For the integration with the UiTdatabank Entry API, there is a flow in which you first obtain access to our the test environment. 
Access to the production environment is given after your integration on test environment has been successful validated by publiq vzw.

On this page we describe how this flow works and how you can ensure that you gain access to the production environment as quickly as possible!

> Make sure you read this guide before you start developing on our test environment!

## Step 1: start on the test environment

You can easily apply for free test credentials. All information about how to request these can be found [here](https://docs.publiq.be/docs/authentication/requesting-credentials#uitdatabank).

Once you've obtained your personal test credentials you can start with the development of your integration with the UiTdatabank Entry API on our test environment.

## Step 2: validation by publiq vzw

As soon as you have finished developing your integration with the Entry API, you send a minimum of 5 of events to our test environment. You contact us via `vragen@publiq.be` with the email subject "content check". In the email you give us the identifiers of the created test events. We will then validate your integration as soon as possible. 

In this validation process we assess the integration in two manners:
1.  Is the **created data** qualitative, relevant and valuable for public agendas such as www.uitinvlaanderen.be?
2.  Is the **integration made robust**, e.g. is it possible to update and delete content through the integration?

It is important that you go through the checklist below in advance and validate your integration against it. By doing this in advance, you ensure a smooth transition to the production environment!

### Checklist for a succesfull integration
#### Mandatory properties
-   `name`: only use plain text 
-   `terms`: exactly one term of the domain `eventtype` is required. We strongly encourage to also include one term of the domain `theme` for events (see our [guide on taxonomy terms](../../docs/terms.md) for more info)
-   `location`: UiTdatabank already contains a lot of locations. Use existing locations as much as possible. Therefore, a search on existing locations in UiTdatabank should be built in in your application. Or alternatively (if all your events take place on the same location for example), the identifier of that location in UiTdatabank should be kept in your application so that each new event is created with the same location ID. Only when a location does not exist yet in UiTdatabank, a new one can be created. Always save the identifiers of the created locations in the application, so that later on you can update or delete the location if necessary
-   `calendar`: use the provided calendarTypes in a correct way. `single` should be used for single day events (e.g. a concert), `multiple` for events that span multiple days (e.g. a festival) and `periodic` for recurring events (e.g. a course that takes place each wednesday for a given period)

> In order to [create an UiTPAS event](https://docs.publiq.be/docs/uitpas/6e03991383b32-registering-events), the properties `organizer` and `priceInfo` are also mandatory!

#### Optional properties
-   `description`: only use plain text (and line breaks)
-   `mediaObject`: add an inspiring photo or image for your event, with respect to copyright. Avoid logos and posters.
-   `organizer`: UiTdatabank already contains a lot of organizers. Use existing organizers as much as possible. Therefore, a search on existing organizers in UiTdatabank should be built in in your application. Or alternatively (if all your events have the same organizer for example), the identifier of that organizer in UiTdatabank should be kept in your application so that each new event is created with the same organizer ID. Only when an organizer does not exist yet in UiTdatabank, a new one can be created. Always save the identifiers of the created organizer in the application, so that later on you can update or delete the organizer if necessary.
-   `typicalAgeRange`: this is especially important if your event is targeted to a specific age (e.g. children or seniors). Events that have an age range with an upperbound of 12 or less are considered as events for children and automatically get a Vlieg logo in UiT agendas.
-   `bookingInfo`: add a ticketing link or contact details for reservation if applicable


<!-- theme: warning -->
> 
> Albeit optional, note that these properties are often necessary in order for it to be published in an online calendar. This is especially the case for the `description`, `typicalAgerange` and the `mediaObject`.

When the created content & integration meets the listed conditions, we will immediately give you access to our production environment (see step 3). If necessary, we ask you to make some adjustments to the made integration.

## Step 3: switch to the production environment
After a successful validation you will receive the credentials to connect with production environment. You will receive your credentials via [Projectaanvraag](https://projectaanvraag.uitdatabank.be) where they can also be consulted later.

