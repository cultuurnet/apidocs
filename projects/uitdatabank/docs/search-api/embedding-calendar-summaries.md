---
stoplight-id: 3c97258ab250f
---

# Embedding calendar summaries

UiTdatabank events and places have calendar info of different types and can often contain a large amount of dates and/or opening hours.

Formatting this info into a human-readable overview can be complex. Therefore, we provide a parameter to expand the results from the API with an easy to read calendar summary for each result.

The calendar summary will be embedded in every result as an additional `calendarSummary` property.

For every event or place a calendar summary is available in different sizes (`xs`, `sm`, `md`, `lg`) and can be retrieved in `text` and/or `html`.

The calendar summary is always provided in `nl`, `fr`, `en` and `de`. It is possible to request multiple sizes and formats at once.

When applicable, the calendar summary will also include the `status` or `booking availability` of the event or place.

## Applicable URLs

* `GET /events`
* `GET /places`
* `GET /offers`

Calendar summaries are not supported on `GET /organizers` because organizers do not have calendar information.

## Parameter and possible values

Parameter name: `embedCalendarSummaries[]`

Possible values:

* `xs-text`: extra small summary in plain text
* `sm-text`: small summary in plain text
* `md-text`: medium summary in plain text
* `lg-text`: large summary in plain text
* `xs-html`: extra small summary in HTML
* `sm-html`: small summary in HTML
* `md-html`: medium summary in HTML
* `lg-html`: large summary in HTML

You can request multiple sizes and formats by repeating the parameter with different values. (See examples below.)

## Recommended use

* We recommend to use the format `md` for the search results but `lg` for events with calendarType `single` specifically
* We recommend to use `lg` for the detailpage
* In some cases (e.g. mobile apps) calendar summary `xs` can be useful
* You can use the `embedCalendarSummaries` parameter with or without `embed=true`

## Examples

### Calendar summary `xs-text`

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

### Calendar summary `sm-text` for an event that is happening tonight

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

### Calendar summary `md-text` for a cancelled event

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

### Calendar summary `lg-html` for an event that is sold out or fully booked

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
         "lg":"<time itemprop=\"startDate\" datetime=\"2022-11-28T20:00:00+01:00\"><span class=\"cf-weekday cf-meta\">Maandag</span> <span class=\"cf-date\">28 november 2022</span> <span class=\"cf-from cf-meta\">van</span> <span class=\"cf-time\">20:00</span></time> <span class=\"cf-to cf-meta\">tot</span> <time itemprop=\"endDate\" datetime=\"2022-11-28T21:00:00+01:00\"><span class=\"cf-time\">21:00</span></time> <span class=\"cf-status\">(Volzet of uitverkocht)</span>"
      }
   },
   "fr":{
      "html":{
         "lg":"<time itemprop=\"startDate\" datetime=\"2022-11-28T20:00:00+01:00\"><span class=\"cf-weekday cf-meta\">Lundi</span> <span class=\"cf-date\">28 novembre 2022</span> <span class=\"cf-from cf-meta\">du</span> <span class=\"cf-time\">20:00</span></time> <span class=\"cf-to cf-meta\">au</span> <time itemprop=\"endDate\" datetime=\"2022-11-28T21:00:00+01:00\"><span class=\"cf-time\">21:00</span></time> <span class=\"cf-status\">(Complet)</span>"
      }
   },
   "de":{
      "html":{
         "lg":"<time itemprop=\"startDate\" datetime=\"2022-11-28T20:00:00+01:00\"><span class=\"cf-weekday cf-meta\">Montag</span> <span class=\"cf-date\">28 November 2022</span> <span class=\"cf-from cf-meta\">von</span> <span class=\"cf-time\">20:00</span></time> <span class=\"cf-to cf-meta\">bis</span> <time itemprop=\"endDate\" datetime=\"2022-11-28T21:00:00+01:00\"><span class=\"cf-time\">21:00</span></time> <span class=\"cf-status\">(Ausgebucht oder ausverkauft)</span>"
      }
   },
   "en":{
      "html":{
         "lg":"<time itemprop=\"startDate\" datetime=\"2022-11-28T20:00:00+01:00\"><span class=\"cf-weekday cf-meta\">Monday</span> <span class=\"cf-date\">28 November 2022</span> <span class=\"cf-from cf-meta\">from</span> <span class=\"cf-time\">20:00</span></time> <span class=\"cf-to cf-meta\">till</span> <time itemprop=\"endDate\" datetime=\"2022-11-28T21:00:00+01:00\"><span class=\"cf-time\">21:00</span></time> <span class=\"cf-status\">(Sold out or fully booked)</span>"
      }
   }
}
```

### Requesting multiple calendar summaries at once

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
