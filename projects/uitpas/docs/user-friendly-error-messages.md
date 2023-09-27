---
stoplight-id: 9fg84nc7ean2s
---

# User friendly error messages

The API provides "user friendly error messages" in Dutch for endpoints that are typically used in flows that require enduser input.

This way, you don't need to translate error codes to explain the problem to the user.

**Best practice: always show the endUserMessage to the user, when you receive one.**

## Example

You can use the [GET /tariffs](/reference/uitpas.json/paths/~1tariffs/get) endpoint to check which tariffs are applicable for a passholder, typically in a ticketing flow where the passholder will enter his or her UiTPAS-number to receive a discount.

There may be different reasons why a passholder doesn't have an UiTPAS-tariff available.

For example, the social tariff of the passholder might have expired.

In this case you'll receive a 400-response with an endUserMessage explaining what this means for the passholder:

```json
{
  "type": "https://api.publiq.be/probs/uitpas/social-tariff-expired",
  "title": "Social tariff expired",
  "status": 400,
  "detail": "",
  "endUserMessage": {
    "nl": "Je kansenstatuut is vervallen, daarom kan je je UiTPAS momenteel niet gebruiken. Informeer of je dit statuut kan hernieuwen bij het UiTPAS-aankooppunt waar je jouw pas hebt gekocht."
  }
}

```

Sometimes, the endUserMessage can be returned in the 200 response. This happens when there isn't a real "error" as defined in the API, but we still want to clarify something to the user.

For example, in [GET /tariffs](/reference/uitpas.json/paths/~1tariffs/get), a passholder might be using his or her card for an event that isn't in the UiTPAS-region. We'll return a 200 with an empty available": \[] and an endUserMessage:

```json
{
    "available": [],
    "endUserMessage": {
        "nl": "Je kan dit ticket niet aankopen aan kansentarief. Dit kan verschillende redenen hebben. UiTPAS is ingedeeld in 
verschillende regio's en je kan enkel genieten van je kansentarief binnen je UiTPAS-regio. Indien deze activiteit niet binnen je UiTPAS-regio wordt georganiseerd, 
is het dus mogelijk dat je geen recht hebt op kansentarief. Daarnaast is het mogelijk dat er binnen je UiTPAS-regio andere beperkingen zijn ingesteld, 
bv. een maximum prijs waarvoor een kansentarief mogelijk is. Neem contact op met je UiTPAS-regio om hierover meer informatie te krijgen."
    }
}
```

## Conclusion

As a best practice, always check if there's an endUserMessage in the response and show it to the user. This way, lots of confusion can be avoided, as the user can clearly see what's wrong.
