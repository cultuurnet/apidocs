# Creating a new organizer

This guide explains how to create a new organizer in UiTdatabank using Entry API. You'll learn about all the required properties of an organizer and how to define them, and see examples of various possible organizers.

<!-- theme: warning -->

> Creating duplicate organizers is not allowed, you must reuse and existing ones. See [finding and reusing organizers](./finding-and-reusing-organizers.md)

Before diving in, make sure you have read the following guides first:

* [Authentication](../authentication.md)
* [What are events?](introduction.md)

## Required permissions

Anyone can create new organizers in UiTdatabank by using either a user access token or a client access token.

The user or client that created the organizer will become the `creator` of the event, which allows them to later make changes to the organizer or delete it. In some cases other users or clients may also be able to edit the organizer afterward. See the permissions info in the guide about [updating an organizer](./update.md) for more info.

<!-- theme: warning -->

> When you use a client access token to create organizers, your users will not be able to see those organizers in their dashboard or edit them when logging in on the [UiTdatabank web application](https://uitdatabank.be), because your client will be the creator of the organizer and there is no other link between the event and the UiTiD users logging in on UiTdatabank.
>
> To fix this, you can [add your users as contributors](../shared/contributors.md) on your organizer after creating it.

## Overview

<!--
  @todo
  - Mention that you must always reuse an existing organizer when possible and link to that guide.
  - Focus on creating a simple organizer with just the required properties here.
  - Explain that you can also supply optional properties and give examples
  - Link to some other guides as next steps (for example "Updating an organizer", ...)
-->
