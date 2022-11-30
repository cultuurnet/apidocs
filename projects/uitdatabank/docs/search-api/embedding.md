# Embedding

With embed parameters you can expand the JSON the Search API returns with extra information.

## Embedding result bodies

By default the search API endpoints only return a list of links to the individual search results.

To get the actual bodies of the results, there are two options:

* Loop over the results yourself and perform GET requests using the given URLs
* Use the `embed`  URL parameter (`bool`, defaults to `false`)

### Applicable URLs

* `GET /events`
* `GET /places`
* `GET /offers`
* `GET /organizers`

### Recommended use

We recommend using the `embed=true` parameter in order to limit the amount of requests that need to be made.

### Examples

#### Without embedding

**request**

```
GET /offers
```

or

```
GET /offers/?embed=false
```

**response**

The response contains a list of links to the individual search results:

```json
{
   "@context":"http://www.w3.org/ns/hydra/context.jsonld",
   "@type":"PagedCollection",
   "itemsPerPage":30,
   "totalItems":86978,
   "member":[
      {
         "@id":"https://io.uitdatabank.be/event/d9a71b53-1756-4126-9926-a83f5dd84f45",
         "@type":"Event"
      },
      {
         "@id":"https://io.uitdatabank.be/place/557d0ddc-efc9-42b3-934b-9f88b0945ab1",
         "@type":"Place"
      },
      ...
   ]
}
```

#### With embedding

**request**

```
GET /offers/?embed=true
```

**response**

The response contains actual JSON-LD documents:

```json
{
  "@context": "http://www.w3.org/ns/hydra/context.jsonld",
  "@type": "PagedCollection",
  "itemsPerPage": 30,
  "totalItems": 12,
  "member": [
    {
      "@id": "https://io.uitdatabank.be/place/39e6d5ee-c3d6-453a-bcb5-4e6e0eaf7054",
      "@type": "Place",
      "@context": "/contexts/place",
      "name": {
        "nl": "Jeugdhuis Sojo"
      },
      "address": {
        "addressCountry": "BE",
        "addressLocality": "Kessel-Lo (Leuven)",
        "postalCode": "3010",
        "streetAddress": "Eenmeilaan 1"
      },
      "terms": [
        {
          "id": "JCjA0i5COUmdjMwcyjNAFA",
          "label": "Jeugdhuis of jeugdcentrum",
          "domain": "eventtype"
        }
      ],
      ...
    },
    ...
  ]
}
```

## Embedding calendar summaries

Formatting a large amount of dates and/or opening hours into a human-readable overview can be complex. Therefore we provide a parameter to expand the results from the API with a calendar summary for each result with calendar information (events, places). The calendar summary will be embedded in every result as an additional `calendarSummary` property.

For every event or place a calendar summary is available in different sizes:

* `xs`: extra small
* `sm`: small
* `md`: medium
* `lg`: large

We currently support 4 languages for the calendar summary:

* `nl`
* `fr`
* `en`
* `de`

The calendar summary can be retrieved in `text` and in `html`.

<!-- theme: info -->

> The response is always multilingual. It is possible to request multiple sizes and formats at once.
>
> If applicable, the calendar summary will also include the `status` or `booking availability` of the event or place.

### Applicable URLs

* `GET /events`
* `GET /places`
* `GET /offers`

### Recommended use

* We recommend to use the format `md` for the search results but `lg` for events with calendarType `single` specifically
* We recommend to use `lg` for the detailpage
* In some cases (e.g. mobile apps) calendar summary `xs` can be useful
* You can use the `embedCalendarSummaries` parameter with or without `embed=true`

### Parameter and possible values

Parameter name: `embedCalendarSummaries`

Possible values:

* `xs-text`: extra small summary in plain text
* `sm-text`: small summary in plain text
* `md-text`: medium summary in plain text
* `lg-text`: large summary in plain text
* `xs-html`: extra small summary in HTML
* `sm-html`: small summary in HTML
* `md-html`: medium summary in HTML
* `lg-html`: large summary in HTML

### Examples

#### Calendar summary `xs-text`

**request**

```
GET /events/?embedCalendarSummaries[]=xs-text
```

**response**

Every result in the response will have a `calendarSummary` property with a value like:

```json
{
   "nl":{
      "text":{
         "xs":"28 nov"
      }
   },
   "fr":{
      "text":{
         "xs":"28 nov"
      }
   },
   "de":{
      "text":{
         "xs":"28 Nov"
      }
   },
   "en":{
      "text":{
         "xs":"28 Nov"
      }
   }
}
```

#### Calendar summary `sm-text` for an event that is happening tonight 

```json
{
   "nl":{
      "text":{
         "sm":"Vanavond"
      }
   },
   "fr":{
      "text":{
         "sm":"Ce soir"
      }
   },
   "de":{
      "text":{
         "sm":"Diesen Abend"
      }
   },
   "en":{
      "text":{
         "sm":"Tonight"
      }
   }
}
```


#### Calendar summary `md-text` for a cancelled event

**request**

```
GET /events/?embedCalendarSummaries[]=md-text
```

**response**

Every result in the response will have a `calendarSummary` property with a value like:

```json
{
   "nl":{
      "text":{
         "md":"Ma 28 november 2022 (geannuleerd)"
      }
   },
   "fr":{
      "text":{
         "md":"Lun. 28 novembre 2022 (annulé)"
      }
   },
   "de":{
      "text":{
         "md":"Mo. 28 November 2022 (abgesagt)"
      }
   },
   "en":{
      "text":{
         "md":"Mon 28 November 2022 (cancelled)"
      }
   }
}
```


#### Calendar summary `lg-html` for an event that is sold out or fully booked

**request**

```
GET /events/?embedCalendarSummaries[]=lg-html
```

**response**

Every result in the response will have a `calendarSummary` property with a value like:

```json
{
   "nl":{
      "html":{
         "lg":"<time itemprop=""startDate"" datetime=""2022-11-28T20":"00":"00+01":00"><span class=""cf-weekday cf-meta"">Maandag</span> <span class=""cf-date"">28 november 2022</span> <span class=""cf-from cf-meta"">van</span> <span class=""cf-time"">20:00</span></time> <span class=""cf-to cf-meta"">tot</span> <time itemprop=""endDate"" datetime=""2022-11-28T21":"00":"00+01":00"><span class=""cf-time"">21:00</span></time> <span class=""cf-status"">(Volzet of uitverkocht)</span>"
      }
   },
   "fr":{
      "html":{
         "lg":"<time itemprop=""startDate"" datetime=""2022-11-28T20":"00":"00+01":00"><span class=""cf-weekday cf-meta"">Lundi</span> <span class=""cf-date"">28 novembre 2022</span> <span class=""cf-from cf-meta"">du</span> <span class=""cf-time"">20:00</span></time> <span class=""cf-to cf-meta"">au</span> <time itemprop=""endDate"" datetime=""2022-11-28T21":"00":"00+01":00"><span class=""cf-time"">21:00</span></time> <span class=""cf-status"">(Complet)</span>"
      }
   },
   "de":{
      "html":{
         "lg":"<time itemprop=""startDate"" datetime=""2022-11-28T20":"00":"00+01":00"><span class=""cf-weekday cf-meta"">Montag</span> <span class=""cf-date"">28 November 2022</span> <span class=""cf-from cf-meta"">von</span> <span class=""cf-time"">20:00</span></time> <span class=""cf-to cf-meta"">bis</span> <time itemprop=""endDate"" datetime=""2022-11-28T21":"00":"00+01":00"><span class=""cf-time"">21:00</span></time> <span class=""cf-status"">(Ausgebucht oder ausverkauft)</span>"
      }
   },
   "en":{
      "html":{
         "lg":"<time itemprop=""startDate"" datetime=""2022-11-28T20":"00":"00+01":00"><span class=""cf-weekday cf-meta"">Monday</span> <span class=""cf-date"">28 November 2022</span> <span class=""cf-from cf-meta"">from</span> <span class=""cf-time"">20:00</span></time> <span class=""cf-to cf-meta"">till</span> <time itemprop=""endDate"" datetime=""2022-11-28T21":"00":"00+01":00"><span class=""cf-time"">21:00</span></time> <span class=""cf-status"">(Sold out or fully booked)</span>"
      }
   }
}
```

#### Requesting multiple calendar summaries at once

**request**

```
GET /events/?embedCalendarSummaries[]=sm-text&embedCalendarSummaries[]=lg-html
```

**response**

Every result in the response will have a `calendarSummary` property with a value like:

```json
{
   "nl":{
      "text":{
         "sm":"Tot 30 jun 2021"
      },
      "html":{
         "lg":"<p class=\"cf-period\"> <time itemprop=\"startDate\" datetime=\"2020-09-01\"> <span class=\"cf-date\">1 september 2020</span> </time> <span class=\"cf-to cf-meta\">tot</span> <time itemprop=\"endDate\" datetime=\"2021-06-30\"> <span class=\"cf-date\">30 juni 2021</span> </time> </p>"
      }
   },
   "fr":{
      "text":{
         "sm":"Au 30 juin 2021"
      },
      "html":{
         "lg":"<p class=\"cf-period\"> <time itemprop=\"startDate\" datetime=\"2020-09-01\"> <span class=\"cf-date\">1 septembre 2020</span> </time> <span class=\"cf-to cf-meta\">au</span> <time itemprop=\"endDate\" datetime=\"2021-06-30\"> <span class=\"cf-date\">30 juin 2021</span> </time> </p>"
      }
   },
   "de":{
      "text":{
         "sm":"Bis 30 Juni 2021"
      },
      "html":{
         "lg":"<p class=\"cf-period\"> <time itemprop=\"startDate\" datetime=\"2020-09-01\"> <span class=\"cf-date\">1 September 2020</span> </time> <span class=\"cf-to cf-meta\">bis</span> <time itemprop=\"endDate\" datetime=\"2021-06-30\"> <span class=\"cf-date\">30 Juni 2021</span> </time> </p>"
      }
   },
   "en":{
      "text":{
         "sm":"Till 30 Jun 2021"
      },
      "html":{
         "lg":"<p class=\"cf-period\"> <time itemprop=\"startDate\" datetime=\"2020-09-01\"> <span class=\"cf-date\">1 September 2020</span> </time> <span class=\"cf-to cf-meta\">till</span> <time itemprop=\"endDate\" datetime=\"2021-06-30\"> <span class=\"cf-date\">30 June 2021</span> </time> </p>"
      }
   }
}
```

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
