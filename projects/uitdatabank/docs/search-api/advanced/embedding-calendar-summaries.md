---
stoplight-id: 3c97258ab250f
---

# Calendar summaries

UiTdatabank events and places have calendar info of different types and can often contain a large amount of dates and/or opening hours.

Formatting this info into a human-readable overview can be complex. Therefore, we provide a parameter to expand the results from the API with an easy-to-read calendar summary for each result.

The calendar summary will be embedded in every result as an additional `calendarSummary` property.

For every event or place a calendar summary is available in different sizes (`xs`, `sm`, `md`, `lg`, `xl`) and can be retrieved in `text` and/or `html`.

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
* `xl-text`: extra large summary in plain text
* `xs-html`: extra small summary in HTML
* `sm-html`: small summary in HTML
* `md-html`: medium summary in HTML
* `lg-html`: large summary in HTML
* `xl-html`: extra large summary in HTML

You can request multiple sizes and formats by repeating the parameter with different values. (See examples below.)

## Recommended use

* We recommend to use the format `md` for the search results but `lg` for events with calendarType `single` specifically
* We recommend to use `lg` for the detailpage
* In some cases (e.g. mobile apps) calendar summary `xs` can be useful
* `xl` adds the `openingHoursAdjustedDays` and the `openingHoursClosedDays` to the `lg` summary, which only mentions that the hours can differ during those periods. It is mostly useful on the detailpage of an event or place with calendarType `periodic` or `permanent`, since only those have opening hours. For calendarType `single` and `multiple` the `xl` summary is the same as the `lg` one
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

### Calendar summary `xl-text`

**request**

```
GET /events/?embedCalendarSummaries[]=xl-text
```

**response**

Every result in the response will have a `calendarSummary` property with a value like:

```json
{
   "nl":{
      "text":{
         "xl":"Van dinsdag 25 november 2025 tot en met zaterdag 30 november 2030\n(maandag van 9:00 tot 12:00 en van 13:00 tot 17:00, dinsdag van 9:00 tot 16:00)\n (maandag opvang van 8:00 tot 18:00)\n\nBehalve tijdens\nMaandag 2 november 2026 tot en met zaterdag 7 november 2026\nMaandag - dinsdag van 10:00 tot 15:00\n\nGesloten\nDonderdag 24 december 2026 tot en met zondag 3 januari 2027"
      }
   },
   "fr":{
      "text":{
         "xl":"Du mardi 25 novembre 2025 au samedi 30 novembre 2030\n(lundi de 9:00 à 12:00 et de 13:00 à 17:00, mardi de 9:00 à 16:00)\n (lundi garderie de 8:00 à 18:00)\n\nSauf pendant\nLundi 2 novembre 2026 au samedi 7 novembre 2026\nLundi - mardi de 10:00 à 15:00\n\nFermé\nJeudi 24 décembre 2026 au dimanche 3 janvier 2027"
      }
   },
   "de":{
      "text":{
         "xl":"Von Dienstag 25 November 2025 bis Samstag 30 November 2030\n(Montag von 9:00 bis 12:00 und von 13:00 bis 17:00, Dienstag von 9:00 bis 16:00)\n (Montag Kinderbetreuung von 8:00 bis 18:00)\n\nAußer während\nMontag 2 November 2026 bis Samstag 7 November 2026\nMontag - Dienstag von 10:00 bis 15:00\n\nGeschlossen\nDonnerstag 24 Dezember 2026 bis Sonntag 3 Januar 2027"
      }
   },
   "en":{
      "text":{
         "xl":"From Tuesday 25 November 2025 to Saturday 30 November 2030\n(Monday from 9:00 till 12:00 and from 13:00 till 17:00, Tuesday from 9:00 till 16:00)\n (Monday childcare from 8:00 till 18:00)\n\nExcept during\nMonday 2 November 2026 till Saturday 7 November 2026\nMonday - Tuesday from 10:00 till 15:00\n\nClosed\nThursday 24 December 2026 till Sunday 3 January 2027"
      }
   }
}
```

The first three lines are the same as the `lg` summary: the period, the opening hours per day and the childcare of the days that have one. The `Behalve tijdens` and `Gesloten` blocks that follow are what `xl` adds, one for the `openingHoursAdjustedDays` and one for the `openingHoursClosedDays`. Both blocks are left out when the offer has none, in which case the `xl` summary is the same as the `lg` one.

### Calendar summary `xl-html`

**request**

```
GET /events/?embedCalendarSummaries[]=xl-html
```

**response**

The adjusted days and the closed days are rendered as a `<details>` element each, so they can be collapsed. Only the `nl` value is shown here, the other languages have the same structure with translated labels:

```json
{
   "nl":{
      "html":{
         "xl":"<p class=\"cf-period\"> <span class=\"cf-weekday cf-meta\">dinsdag</span> <time itemprop=\"startDate\" datetime=\"2025-11-25\"> <span class=\"cf-date\">25 november 2025</span> </time> <span class=\"cf-to cf-meta\">tot en met</span> <span class=\"cf-weekday cf-meta\">zaterdag</span> <time itemprop=\"endDate\" datetime=\"2030-11-30\"> <span class=\"cf-date\">30 november 2030</span> </time> </p> <p class=\"cf-openinghours\">Open op:</p> <ul class=\"list-unstyled\"> <meta itemprop=\"openingHours\" datetime=\"Ma 9:00-17:00\"> </meta> <li itemprop=\"openingHoursSpecification\"> <span class=\"cf-days\">Maandag</span> <span itemprop=\"opens\" content=\"9:00\" class=\"cf-from cf-meta\">van</span> <span class=\"cf-time\">9:00</span> <span itemprop=\"closes\" content=\"12:00\" class=\"cf-to cf-meta\">tot</span> <span class=\"cf-time\">12:00</span> <span itemprop=\"opens\" content=\"13:00\" class=\"cf-from cf-meta\">en van</span> <span class=\"cf-time\">13:00</span> <span itemprop=\"closes\" content=\"17:00\" class=\"cf-to cf-meta\">tot</span> <span class=\"cf-time\">17:00</span> <span class=\"cf-childcare\">(Opvang van 8:00 tot 18:00)</span> </li> <meta itemprop=\"openingHours\" datetime=\"Di 9:00-16:00\"> </meta> <li itemprop=\"openingHoursSpecification\"> <span class=\"cf-days\">Dinsdag</span> <span itemprop=\"opens\" content=\"9:00\" class=\"cf-from cf-meta\">van</span> <span class=\"cf-time\">9:00</span> <span itemprop=\"closes\" content=\"16:00\" class=\"cf-to cf-meta\">tot</span> <span class=\"cf-time\">16:00</span> </li> </ul> <details class=\"cf-adjusted-days\"> <summary>Behalve tijdens</summary> <ul class=\"list-unstyled\"> <li> <span class=\"cf-date\">Maandag 2 november 2026</span> <span class=\"cf-to cf-meta\">tot en met</span> <span class=\"cf-date\">zaterdag 7 november 2026</span> <ul class=\"list-unstyled\"> <li> <span class=\"cf-days\">Maandag - dinsdag</span> <span class=\"cf-from cf-meta\">van</span> <span class=\"cf-time\">10:00</span> <span class=\"cf-to cf-meta\">tot</span> <span class=\"cf-time\">15:00</span> </li> </ul> </li> </ul> </details> <details class=\"cf-closed-days\"> <summary>Gesloten</summary> <ul class=\"list-unstyled\"> <li> <span class=\"cf-date\">Donderdag 24 december 2026</span> <span class=\"cf-to cf-meta\">tot en met</span> <span class=\"cf-date\">zondag 3 januari 2027</span> </li> </ul> </details>"
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
