# Embedding
With embed parameters you can expand the JSON the Search API returns with extra information.

## Embedding result bodies
By default the search API endpoints only return a list of links to the individual search results.

To get the actual bodies of the results, there are two options:
-   Loop over the results yourself and perform GET requests using the given URLs
-   Use the `embed`  URL parameter (`bool`, defaults to `false`)

### Base URL

-   `GET /events`
-  ` GET /places`
-   `GET /offers`

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

The response contains a list of links to the individual search results.
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
      "..."
   ]
}
```

#### With embedding
**request**
```
GET /offers/?embed=true
```

**response**

The response contains actual JSON-LD documents.
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
-   `xs`: extra small
-   `sm`: small
-   `md`: medium
-   `lg`: large

We currently support 4 languages for the calendar summary: 
-   `nl`
-   `fr`
-   `en`
-   `de`

The calendar summary can be retrieved in `text` and in `html`.

<!-- theme: info -->
> The response is always multilingual. It is possible to request multiple sizes and formats at once.
>
> If applicable, the calendar summary will also include the `status` or `booking availability` of the event or place.

### Base URL
-   `GET /events`
-  ` GET /places`
-   `GET /offers`

### Recommended use
-   We recommend to use the format `md` for the search results but `lg` for events with calendarType `single` specifically
-   We recommend to use `lg` for the detailpage
-   In some cases (e.g. mobile apps) calendar summary `xs` can be useful
-   You can use the `embedCalendarSummaries` parameter with or without `embed=true`

### Parameters
| Parameter                     | Required? | Type   | Possible values                         | Example                            |
|:-------------------------------|:-----------|:--------|:-----------------------------------------|:------------------------------------|
| embedCalendarSummaries (text) | optional  | string | `xs-text` `sm-text` `md-text` `lg-text` | `embedCalendarSummaries[]=sm-text` |
| embedCalendarSummaries (html) | optional  | string | `xs-html` `sm-html` `md-html` `lg-html` | `embedCalendarSummaries[]=lg-html` |



### Examples
#### Calendar summary `xs-text`

**request**
```
GET /events/?embedCalendarSummaries[]=xs-text
```

**response**
```json
"calendarSummary":{
   "nl":{
      "text":{
         "xs":"21 okt"
      }
   },
   "fr":{
      "text":{
         "xs":"21 oct"
      }
   },
   "de":{
      "text":{
         "xs":"21 Okt"
      }
   },
   "en":{
      "text":{
         "xs":"21 Oct"
      }
   }
}
```


#### Calendar summary `sm-text` for a cancelled event

**request**
```
GET /events/?embedCalendarSummaries[]=sm-text
```

**response**
```json
"calendarSummary":{
   "nl":{
      "text":{
         "sm":"3 jun (geannuleerd)"
      }
   },
   "fr":{
      "text":{
         "sm":"3 juin (annulé)"
      }
   },
   "de":{
      "text":{
         "sm":"3 Juni (abgesagt)"
      }
   },
   "en":{
      "text":{
         "sm":"3 Jun (cancelled)"
      }
   }
}
```

#### Calendar summary `sm-html` for an event that is sold out or fully booked

**request**
```
GET /events/?embedCalendarSummaries[]=sm-html
```

**response**
```json
"calendarSummary":{
   "nl":{
      "html":{
         "sm":"<span class=""cf-from cf-meta"">Van</span> <span class=""cf-date"">28 september 2022</span> <span class=""cf-to cf-meta"">tot</span> <span class=""cf-date"">21 december 2022</span> <span class=""cf-status"">(Volzet of uitverkocht)</span>"
      }
   },
   "fr":{
      "html":{
         "sm":"<span class=""cf-from cf-meta"">Du</span> <span class=""cf-date"">28 septembre 2022</span> <span class=""cf-to cf-meta"">au</span> <span class=""cf-date"">21 décembre 2022</span> <span class=""cf-status"">(Complet)</span>"
      }
   },
   "de":{
      "html":{
         "sm":"<span class=""cf-from cf-meta"">Von</span> <span class=""cf-date"">28 September 2022</span> <span class=""cf-to cf-meta"">bis</span> <span class=""cf-date"">21 Dezember 2022</span> <span class=""cf-status"">(Ausgebucht oder ausverkauft)</span>"
      }
   },
   "en":{
      "html":{
         "sm":"<span class=""cf-from cf-meta"">From</span> <span class=""cf-date"">28 September 2022</span> <span class=""cf-to cf-meta"">till</span> <span class=""cf-date"">21 December 2022</span> <span class=""cf-status"">(Sold out or fully booked)</span>"
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
```json
"calendarSummary":{
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
