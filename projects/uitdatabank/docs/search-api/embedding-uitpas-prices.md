---
stoplight-id: 43709fe00ab3f
---

# Embedding UiTPAS prices

While UiTdatabank events can contain price info, they do not contain UiTPAS prices by default as these are calculated by UiTPAS based on the regular prices in UiTdatabank in case of UiTPAS events.

Because you may also want to display UiTPAS prices in event details of your Search API results without setting up an additional integration with the [UiTPAS API](https://docs.publiq.be/docs/uitpas), Search API provides a way to automatically include the UiTPAS prices in the search result data.

## Applicable URLs

* `GET /events`
* `GET /places`
* `GET /offers`

## Parameter

To include UiTPAS prices in the search result data, use the `embedUitpasPrices` URL parameter and set it to `true`. The current default is `false`.

Note that you also need to set the `embed` parameter to `true` to [include search result data](./embedding.md) in the first place.

<!-- theme: warning -->
> The default value of the `embedUitpasPrices` parameter is planned to change to `true` in the future. 
>
> It is set to `false` for the time being so that existing integrations can make any changes necessary before the UiTPAS prices are included by default. For example, so they can remove their existing integration with UiTPAS API to fetch the prices because this would otherwise result in duplicate UiTPAS prices being shown.
>
> If you do not wish to every display UiTPAS prices from Search API, make sure to explicitly set the `embedUitpasPrices` parameter to `false` to exclude them when the default changes to `true` in the future.

## Examples

### Without UiTPAS prices embedded

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

### With UiTPAS prices embedded

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
