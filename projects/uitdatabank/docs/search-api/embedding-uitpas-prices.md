---
stoplight-id: 43709fe00ab3f
---

## Embedding UiTPAS prices

Currently, UiTPAS prices are by default hidden from the response from the UiTdatabank Search API. You can now easily retrieve the UiTPAS prices for events (if applicable) by setting the `embedUitpasPrices` to `true`.

<!-- theme: warning -->

> The `embedUitpasPrices` parameter is a **temporary parameter** which now defaults to `false`. This parameter is specifically provided for those integrators that now retrieve UiTPAS prices from the UiTPAS API and that need to make the switch to UiTPAS prices from the UiTdatabank Search API. This parameter and its documentation will be removed in the foreseeable future and UiTPAS prices will be returned by default.

### Applicable URLs

* `GET /events`
* `GET /places`
* `GET /offers`

### Examples

#### Without UiTPAS prices embedded

**request**

Set the `embedUitpasPrices` parameter to `false`:

```
GET /events/?q=id:5330a84f-7496-46a1-b60d-fa7d62ec5fb8&embedUitpasPrices=false
```

**response**

UiTPAS prices are not included in the JSON response:

```json
{
"priceInfo": [
    {
      "category": "base",
      "name": {
        "nl": "Basistarief",
        "fr": "Tarif de base",
        "en": "Base tariff",
        "de": "Basisrate"
      },
      "price": 10,
      "priceCurrency": "EUR"
    }
  ]
}
```

#### With UiTPAS prices embedded

**request**

Set the `embedUitpasPrices` parameter to `true`:

```
GET /events/?q=id:5330a84f-7496-46a1-b60d-fa7d62ec5fb8&embedUitpasPrices=true
```

**response**

The indicative UiTPAS price for the applicable card system UiTPAS Leuven is included in the JSON response:

```js
{
"priceInfo": [
    {
      "category": "base",
      "name": {
        "nl": "Basistarief",
        "fr": "Tarif de base",
        "en": "Base tariff",
        "de": "Basisrate"
      },
      "price": 10,
      "priceCurrency": "EUR"
    },
    {
      "category": "uitpas",
      "name": {
        "nl": "Kansentarief met UiTPAS Leuven"
      },
      "price": 2,
      "priceCurrency": "EUR"
    }
  ]
}
```
