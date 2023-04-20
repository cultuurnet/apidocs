# Exceptions

This page contains an overview of possible exceptions and deprecated data.


## Missing `@id` for location

It is possible an event has **a place without `@id`**.

```json
"location": {
  "@type": "Place",
  "address": {
    "nl": {
      "addressCountry": "BE",
      "addressLocality": "Borgloon",
      "postalCode": "3840",
      "streetAddress": "Grootloonstraat 111a"
    }
  },
  "geo": {
    "latitude": 50.7925781,
    "longitude": 5.3658241
  }
```

We call this a [dummy location](terminology.md); legacy data from the previous version of UiTdatabank. These places can't be ignored because they contain the address and geocoordinates needed to locate the event.


## Missing `@id` for organizer

It is possible an event has **an organizer without `@id`**

```json
"organizer": {
    "name": "CodeFever VZW",
    "@type": "Organizer"
},
```

We call this a [dummy organizer](terminology.md); legacy data from the previous version of UiTdatabank. These organizers can be ignored or just used to print the name.

## availableTo

It is possible that some events and places do not have an `availableTo` property. In that case it can be considered an event with `"availableTo": "2100-01-01T00:00:00+00:00"`.

<!-- theme: warning -->
> Be mindful of the [Year 2038 problem](https://en.wikipedia.org/wiki/Year_2038_problem) when converting our dateTime to a signed 32-bit integer. The value `"2100-01-01T00:00:00+00:00"` can not be encoded to a signed 32-bit integer. Please refer to one of the [possible solutions](https://en.wikipedia.org/wiki/Year_2038_problem#Possible_solutions) provided in online documentation.

## completedLanguages

```json
"completedLanguages": [
  "nl",
  "en"
],
```

When an event, place or organizer contains all the translatable fields in one specific language, this language is added to the `completedLanguages` property.

The translatable fields are different for every entity:

**Event**
* name
* description
* bookingInfo/urlLabel*
* priceInfo/name*

**Place**
* name
* description
* address
* bookingInfo/urlLabel*
* priceInfo/name*

**Organizer**
* name
* address*

Fields marked with an `*` are not yet indexed under the `completedLanguages` property and are not taken into account when calculating for completed languages.

## bookingInfo

```json
"bookingInfo": {
  "availabilityEnds": "2024-11-28T12:36:11+01:00",
  "availabilityStarts": "2024-06-28T12:36:11+01:00",
  "email": "info@test.be",
  "phone": null,
  "url": "http://www.kasteelvanhorst.be/praktisch",
  "urlLabel": {
    "en": "Reserve seats",
    "nl": "Reserveer plaatsen"
  },
},
```

The following exceptions may occur:
* The dateTime for `availabilityEnds` and `availabilityStarts` may contain a deprecated dateTime format `2018-02-20T15:11:26.034Z`
* The three properties `email`, `url`, `phone` are not validated by the API and can all contain any string.

## contactPoint

The three properties `email`, `url`, `phone` are not validated by the API and can all contain any string. It is possible to find an emailaddress under `phone` and vice versa.

```json
"contactPoint": {
  "email": [],
  "phone": [
    "016 62 33 45"
  ],
  "url": [
    "http://www.kasteelvanhorst.be/families",
    "http://www.herita.be"
  ]
}
```

## creator

The creator field can contain one of the following values 
* the **nickname** for the creator
* the **email address** of the creator
* the **uuid** of the creator (user or client)
* the nickname and the uuid of the creator

```nickname
"creator": "Stiksels"
```

```email 
"creator": "user@info.org"
```

```uuid
"creator": "86a02c65-696d-5b12-a9b1-9e3bc8e6303c"
```


## Missing geo-coordinates

It is possible that not every place address has geo-coordinates.

```json
"geo": {
  "latitude": 50.9321713,
  "longitude": 4.8320582
},
```
