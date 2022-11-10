<!-- focus: false -->

![](../assets/images/uitdatabank.png)

A warm welcome to our UiTdatabank API documentation! 👋

<!-- theme: warning -->

> ##### Construction ahead 🚧
>
> We are hard at work to port our documentation to this new documentation portal. If you cannot find what you are looking for, check out our old documentation portal at <https://documentatie.uitdatabank.be>.

## Authentication

To use the UiTdatabank APIs as they are documented here, you will need a **client id** and **client secret** to [retrieve a token](https://docs.publiq.be/docs/authentication) to authenticate your requests. This is a new authentication mechanism that will be used to make it easier to authenticate compared to the [**API key** authentication](https://documentatie.uitdatabank.be/content/entry_api_3/latest/authentication.html) that we already provide.

Currently new client ids and secrets are only provided to a select few partners that are trying out this new authentication mechanism. In the future this authentication mechanism will be available to all integrators.

Want to start building right now? There are two options:

1. Contact us at <vragen@uitdatabank.be> to get a client id and client secret, to start using the new authentication mechanism already. Once you have your client id and secret, follow the [new authentication documentation](https://docs.publiq.be/docs/authentication) for all of publiq's APIs.
2. **Or**, register your project at [Projectaanvraag](https://projectaanvraag.uitdatabank.be) to automatically get a test **API key** that you can use as described on [EntryAPI's Authentication documentation](https://documentatie.uitdatabank.be/content/entry_api_3/latest/authentication.html). While this way of authentication will be fased out in the future for new integrators, it will still be supported for existing integrations for the foreseeable future.

> Aside from the authentication method all API operations work exactly the same whether you have a client id and secret, or an API key.

## Postman

<!-- focus: false -->

[![Download postman collection](https://postman.publiq.be/postman-download.svg)](https://postman.publiq.be/?api=udb-entry)

Do you already have a **client id** and **client secret**?
Download a personalized Postman collection to start making requests in seconds!
