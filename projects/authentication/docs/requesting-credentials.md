# Requesting client credentials

Before you can start making authenticated API requests, you need to register your integration with us so we can provide you with the necessary credentials.

While we are working on a new self-service platform where you will be able to register your project for any API integration and automatically recieve client credentials in the future, the method to request your credentials currently varies per API as it is handled by multiple teams.

> You may access multiple APIs with the same client credentials, but your project needs to be configured correctly on our side to have permission to access all the APIs you need. So if you require access to multiple APIs, make sure to mention this when requesting the credentials so we can give your client sufficient access permissions.

## UiTPAS

To use [UiTPAS API v4](https://docs.publiq.be/docs/uitpas/introduction), see its [quickstart guide](https://docs.publiq.be/docs/uitpas/d0748f47a3dba-quick-start) to request a client id and client secret via the linked Google Form.

## UiTdatabank

UiTdatabank APIs historically use a custom authentication method based on API keys instead of client ids and secrets.

Support for the standardized authentication methods documented in this space has been implemented, but new client ids and secrets are only provided to a select few partners that are trying out these new authentication methods in UiTdatabank. In the future this will be opened up to all integrators.

Want to start integrating with UiTdatabank right now? There are three options:

1. If you need to integrate with both the **UiTPAS API and UiTdatabank API(s)**, you can follow the procedure of requesting credentials for the UiTPAS API and mention that you also require access to the UiTdatabank APIs. We will then provide you with a set of credentials that can access both.
2. **Or**, if you only need to integrate with the UiTdatabank API(s) you can register your integration at [publiq platform](https://platform.publiq.be) to automatically get a test **client id** and **secret**.

Aside from the authentication method all API operations on the UiTdatabank APIs work exactly the same whether you have a client id and secret, or an API key.

## museumPASSmusées

Access to the [museumPASSmusées Partner API](https://docs.publiq.be/docs/museumpassmusees/introduction) is only provided to very specific partners for now as the primary use case at the moment is registering museum visits via a card reader. To request your credentials, please contact <support@museumpassmusees.be>.
