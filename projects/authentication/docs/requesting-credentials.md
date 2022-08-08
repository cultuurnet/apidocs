# Requesting client credentials

Before you can start making authenticated API requests, you need to register your integration with us so we can provide you with the necessary credentials.

While we are working on a new self-service platform where you will be able to register your project for any API integration and automatically recieve client credentials in the future, the method to request your credentials currently varies per API as it is handled by multiple teams.

## UiTPAS

To use [UiTPAS API v4](https://docs.publiq.be/docs/uitpas), see its [quickstart guide](https://docs.publiq.be/docs/uitpas/d0748f47a3dba-quick-start) to request a client id and client secret via the linked Google Form.

## UiTdatabank

UiTdatabank APIs currently uses a custom authentication method based on API keys instead of client ids and secrets.

While support for the standardized authentication methods documented in this space has been implemented, new client ids and secrets are only provided to a select few partners that are trying out these new authentication methods in UiTdatabank. In the future this will be opened up to all integrators.

Want to start integrating with UiTdatabank right now? There are three options:

1.  If you need to integrate with both the **UiTPAS API and UiTdatabank API(s)**, you can follow the procedure of requesting credentials for the UiTPAS API and mention that you also require access to the UiTdatabank APIs. We will then provide you with a set of credentials that can access both.
2.  **Or**, contact us at vragen@uitdatabank.be to get a client id and client secret for UiTdatabank to start using the new authentication mechanism already. Once you have your client id and secret you can use the standard authentication methods described here.
3.  **Or**, register your project at [Projectaanvraag](https://projectaanvraag.uitdatabank.be) to automatically get a test **API key** that you can use as described on the [EntryAPI authentication documentation](https://documentatie.uitdatabank.be/content/entry_api\_3/latest/authentication.html) in our older documentation portal. While this way of authentication will be phased out in the future for new integrators, it will still be supported for existing integrations for the foreseeable future.

Aside from the authentication method all API operations work exactly the same whether you have a client id and secret, or an API key.

## museumPASSmusées

Access to the [museumPASSmusées Partner API](https://docs.publiq.be/docs/museumpassmusees) is only provided to very specific partners at the moment as the functionality is very specific to museum visits. To request your credentials, please contact support@museumpassmusees.be.
