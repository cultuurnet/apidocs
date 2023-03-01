<!--
  This document contains the Markdown for the landing page on https://docs.publiq.be
  Note that this page is not deployed, but instead must be configured via https://docs.publiq.be/admin/settings ("Landing Page")
  A copy is stored here in git for safekeeping and version control.
-->

# Welcome 👋

Welcome to publiq's API documentation portal!

Here you can find how-to guides, API specifications and other tools to help you integrate with our products like UiTdatabank, UiTPAS and museumPASSmusées.

To learn more about publiq and our products, see <https://www.publiq.be>

## Getting started

If you want to build an API integration:

1. Check out the introduction pages of the [UiTdatabank](https://docs.publiq.be/docs/uitdatabank), [UiTPAS](https://docs.publiq.be/docs/uitpas) and [museumPASSmusées](https://docs.publiq.be/docs/museumpassmusees) APIs to see which ones you'd like to integrate with.
2. [Register your project](https://docs.publiq.be/docs/authentication/requesting-credentials) to receive client credentials to authenticate with.
3. [Learn about our different authentication methods](https://docs.publiq.be/docs/authentication/methods/overview) and pick the one best suited to your situation.
4. Browse the how-to guides and API specifications of the product that you're integrating with. Every API also has an **OpenAPI file** and a **Postman collection** to get you started quickly.
5. Get building!

Alternatively, check out our flexible plug and play [Widgets](https://docs.publiq.be/docs/widgets) to easily add an online calendar to your website without building an API integration.

## Versioning strategy

At publiq, we aim for API evolution over versioning.

Our APIs only have a major version number (for example Search API v3, UiTPAS API v4, ...), which is always supported over the span of many years.

When we make changes to an existing version of an API, we make sure that the changes are backward compatible with existing integrations.
For example, we may add support for extra **optional** properties in `POST`/`PUT`/`PATCH` requests, we may start returning new properties in `GET` responses (which a typical existing integration should ignore), or we may add new **optional** query parameters to URLs.
But we will never add new required properties in `POST`/`PUT`/`PATCH` requests, required URL query parameters, and so on.

At some point a new major version of an API may be introduced. While this usually requires a rewrite of existing integrations, this is always communicated well beforehand to all known integrators and we always keep supporting the old version for a long time so that you have sufficient time to switch to the new version.
We usually only introduce a new major version when we need to make major changes after many years, for example when we switched from an old XML data model to a more modern JSON model in multiple APIs.

## Contact us

For general information about partnerships or the setup of [Widgets](https://docs.publiq.be/docs/widgets) please email us at partnerships@publiq.be.

Email us at technical-support@publiq.be for any technical questions regarding API integrations or Widgets. You can also request access to a channel on our Slack workspace via this email address, for more detailed technical conversations.

Please include the following information (if applicable), so we can help as quickly as possible:

* [x] The API(s) that you are integrating with
* [x] Your client id(s), or alternatively your API key(s) (if you are still using API key authentication on UiTdatabank Entry API or Search API)
* [x] The environment that you are experiencing issues with (testing, production, or both)
* [x] An example of the HTTP request(s) that you are sending (including URL, method, headers, and body data)
* [x] An example of the HTTP response(s) that you are receiving (including status, headers and body data)
