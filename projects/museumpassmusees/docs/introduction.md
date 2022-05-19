<!-- focus: false -->

![](../assets/images/logo.png)

Welcome to the museumPASSmusées API documentation!

## Partner API

With the museumPASSmusées Partner API you can look up the card of a passholder and check if they are allowed to visit your museum and register their visit so your museum gets reimbursed for it. *(Coming soon)*

It also enables you to sell museumPASSmusées subscriptions to new passholders by generating voucher codes and selling those to new passholders to use in the online order process on [museumpassmusees.be](https://museumpassmusees.be).

## Authentication
To use the museumPASSmusées APIs as they are documented here, you will need a **client id** and **client secret** to retrieve a [client access token](https://docs.publiq.be/docs/authentication/4706c3721316a-client-access-token) to authenticate your requests. 

To call an endpoint, your client also needs specific permissions linked to a role.

We distinguish 2 roles:
*   **Visit registrar**: a museum partner that is allowed to scan cards, verify passholder identity and register visits for these passholders
*   **Voucher generator**: a partner that is allowed to resell museumPASSmusées voucher codes

Client ids and secrets are only provided to specific partners. To request your credentials, please contact support@museumpassmusees.be.

## Postman

<!-- focus: false -->

[![Download postman collection](https://postman.publiq.be/postman-download.svg)](https://postman.publiq.be/?api=mpm-partner-api)

Do you already have a **client id** and **client secret**?
Download a personalized Postman collection to start making requests in seconds!
