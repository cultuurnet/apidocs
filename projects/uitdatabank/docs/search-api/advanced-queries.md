# Advanced queries

Every endpoint on Search API supports various URL parameters for the most common filters. However these URL parameters have certain limitations, for example grouping and custom boolean operators are not possible.

With advanced queries you can make more complex queries using boolean operators, keywords and/or specific field values, and grouping.

Advanced queries are defined using the `q` parameter which uses the Lucene query syntax. More details about the syntax can be found in the [Elasticsearch documentation](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-query-string-query.html#query-string-syntax) and [Apache Lucene documentation](https://lucene.apache.org/core/2_9_4/queryparsersyntax.html#Escaping%20Special%20Characters).

## Supported fields

### address.{language}.addressCountry

With the `addressCountry` field you can limit your results to one or more countries.

> By default, the search API will only return results that are in Belgium. In order to retrieve results outside Belgium you'll need to disable the default filter of the addressCountry URL parameter. You can reset this default as described in the [default filters guide](./filters/default-filters.md).

**Applicable on endpoints**

`/events` `/places` `/offers` `/organizers`

**Possible values**

The value for this field must always be an [ISO 3166-1 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) country code.

**Examples**

Because a document can have address translations, you can search by a specific language or alternatively use a wildcard instead of specifying a language, as in the example below. The query above will look for specific matches in the `nl` address:

```
GET /places/?q=address.nl.addressCountry:BE 
```

The following example looks for matches in any language:

```
GET /places/?q=address.\*.addressCountry:BE
```

### address.{language}.addressLocality

With the `addressLocality` field you can limit your results to one or more municipalities.

<!-- theme: warning --> 

> The name of municipalities can change over time (e.g. in the context of municipality mergers). The postal code of municipalities is far less subject to change. Therefore it is better to use the `postalCode` field instead of the `addressLocality` field (when possible).

**Applicable on endpoints**

`/events` `/places` `/offers` `/organizers`

**Possible values**

The value for `addressLocality` can be any municipality in a supported language.

**Examples**

Because a document can have address translations, you can search by a specific language or alternatively use a wildcard instead of specifying a language, as in the example below. The query above will look for specific matches in the `fr` address:

```
GET /places/?q=address.fr.addressLocality:Bruxelles
```

The following example looks for matches in any language:

```
GET /places/?q=address.\*.addressLocality:Bruxelles
```

### address.{language}.postalCode

Filter on the postal code (zipcode) of an event, place or organizer with the `postalCode` field.

**Applicable on endpoints**

`/events` `/places` `/offers` `/organizers`

<!-- theme: info -->

> Organizers do not always have address information. Thus, filtering on `postalCode` on the `/organizers` endpoint may result in incomplete results.

**Possible values**

Any valid postal code (integer).

**Example**

Retrieve all events that take place in the postal codes starting with `90`:

```
GET /events/?q=address.\*.postalCode:90*
```

### address.{language}.streetAddress

With the `streetAddress` field you can limit your results to a certain street or a specific address.

**Applicable on endpoints**

`/events` `/places` `/offers` `/organizers`

**Possible values**

A street name and (!) a street number.

**Example**

Retrieve all organizers that are located on Henegouwenkaai 41-43:

```
GET /organizers/?q=address.nl.streetAddress:"Henegouwenkaai 41-43"
```

### allAges

The `allAges` field can be used to filter out events and places that are (not) suitable for all ages.

**Applicable on endpoints**

`/events` `/places` `/offers`

**Possible values**

`true` `false`

**Examples**

Setting allAges to `true` only returns events and places that are suitable for all ages:

```
GET /offers/?q=allAges:true
```

Setting allAges to `false` only returns events and places that are only suitable for a specific age range:

```
GET /offers/?q=allAges:false
```

Setting allAges to `*` returns both events and places that are suitable for all ages and those that are only suitable for a specific age range:

```
GET /offers/?q=allAges:*
```

### attendanceMode

The `attendanceMode` indicates whether an event takes places at a physical location, online or both.

**Applicable on endpoints**

`/events` `/places` `/offers`

**Possible values**

`offline` `online` `mixed`

Places always have attendance mode `offline`, only events can have an attendance modes `online` or `mixed`.

**Example**

In the example below, all events that take place completely or partially online will be returned:

```
GET /events/?q=attendanceMode:(online OR mixed)
```

### audienceType

With the `audienceType` field you can limit your results that are targetted to a specific audience.

> By default, the search API will only return results that have audienceType set as everyone. In order to search for a specific audienceType you'll need to disable the defaultfilter for audienceType. In the [default filters guide](filters/default-filters.md) you can find how you can reset this filter.

**Applicable on endpoints**

`/events` `/places` `/offers`

**Possible values**

`everyone` `members` `education`

**Example**

```
GET /events/?q=audienceType:members&audienceType=*
```

### availableRange

Using the `availableRange` field, you can get all events and places that were available in a given range in the past, or will be available in a given range in the future.

> By default, the search API will only return results that are currently available. In order to also retrieve results that are not available (yet), you'll need to disable the default filters for `availability`. You can reset this default as described in the [default filters guide](filters/default-filters.md).

Most events in UiTdatabank have a limited availability, from the time they are published (or their scheduled publication date has been reached) until the end date of the event. Specific types of events are only available until the start date of an event (e.g. a course series).

Places are considered to be permanently available, starting when they are published (or, again, when their scheduled publication date has been reached). A small portion of the events is permanent as well, depending on their calendar information.

**Applicable on endpoints**

`/events` `/places` `/offers`

**Possible values**

Any dateFrom and dateTo date in ISO-8601.

**Example**

```
GET /events/?q=availableRange:[2023-01-01T00\:00\:00%2B01\:00 TO 2023-03-31T23\:59\:59%2B01\:00]&availableFrom=*&availableTo=*
```

### bookingAvailability

The `bookingAvailability` indicates whether there are still tickets or seats left for an event or not.

**Applicable on endpoints**

`/events` `/places` `/offers`

**Possible values**

`available` `unavailable`

**Example**

Get all events that are not sold out or fully booked:

```
GET /events/?q=bookingAvailability:available
```

Get all places that are permanently closed:

```
GET /places/?q=bookingAvailability:unavailable
```

TO DO: link to booking availability guide when that guide is finished.

### calendarType

Every event and place in UiTdatabank has one of the following four calendarTypes:

* `single`: the event occurs on a single date, indicated by a single startDate and endDate.
* `multiple`: the event occurs on multiple dates, and has multiple subEvent entries with each a different startDate and endDate.
* `periodic`: the event or place runs for a specific period as indicated by its startDate and endDate, and can optionally have openingHours.
* `permanent`: the event or place is permanent and has no startDate or endDate, but it can optionally have openingHours.

With the `calendarType` field you can look for results that match a certain calendarType.

**Applicable on endpoints**

`/events` `/places` `/offers`

**Possible values**

`single` `multiple` `periodic` `permanent`

**Example**

Retrieve all permanent events and places:

```
GET /offers/?q=calendarType:permanent
```

### completedLanguages

All documents created in UiTdatabank are available in Dutch (NL). Besides Dutch, content editors can use UiTdatabank to translate the name and description of their documents in French (FR), German (DE) and English (EN). The API supports translations in every [two-letter language ISO 639-1 code](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes).

You can use the `completedLanguages` field to only look for documents that are fully translated to a specific language.

> Note that if an optional field is left empty in all languages, a translation can still be considered to be complete if all other fields that have a value are translated.

**Applicable on endpoints**

`/events` `/places` `/offers` `/organizers`

**Possible values**

Allowed values for both are any of the two-letter language ISO 639-1 codes, but the most used languages are: `nl` `fr` `de` `en`

**Example**

Retrieve all organizers that are fully translated in English:

```
GET /organizers/?q=completedLanguages:en
```

### created

UiTdatabank keeps track of the creation dates of each document. This metadata for the creation date can be queried with the `created` field.

**Applicable on endpoints**

`/events` `/places` `/offers` `/organizers`

**Possible values**

Any ISO-8601 datetime, e.g. `2023-04-01T12:08:01+01:00`

<!-- theme: info -->

> Note that the `+` sign must be encoded for URLs (as `%2B`). Otherwise it will be interpreted as whitespace and the given date time will be considered invalid.

**Example**

Get all events and places that are created since the start of 2022:

```
GET /offers/?q=created:[2022-01-01T00\:00\:00%2B01\:00 TO *]
```

### creator

Use the `creator` field to search for documents created by a specific creator.

**Applicable on endpoints**

`/events` `/places` `/offers` `/organizers`

**Possible values**

Any identifier of a creator.

**Example**

Retrieve all events and places created by user with id `86a02c65-696d-5b12-a9b1-9e3bc8e6303c`:

```
GET /offers/?q=creator:86a02c65-696d-5b12-a9b1-9e3bc8e6303c
```

### dateRange

Using the `dateRange` field, you can get all events and places that took place in a given range in the past, or will take place in a given range in the future.

> By default, the search API will only return results that are currently available. In order to also retrieve results that are not available (yet), you'll need to disable the default filters for `availability`. You can reset this default as described in the [default filters guide](filters/default-filters.md).

**Applicable on endpoints**

`/events` `/places` `/offers`

**Possible values**

Any ISO-8601 datetime, e.g. `2023-04-01T12:08:01+01:00`

<!-- theme: info -->

> Note that the `+` sign must be encoded for URLs (as `%2B`). Otherwise it will be interpreted as whitespace and the given date time will be considered invalid.

**Example**

Retrieve all events that took place in the year 2020:

```
GET /events/?q=dateRange:[2020-01-01T00\:00\:00%2B01\:00 TO 2021-12-31T23\:59\:59%2B01\:00]&availableTo=*&availableFrom=*
```

### id

Retrieve events that match a specific id with the `id` field. It is possible to search by an event id, place id or organizer id.

A specific id can be found by

* extracting the id from the `@id` property in the JSON-LD projection

```json
{
   "@id": "https://io.uitdatabank.be/event/75573a64-ddc8-4fd0-8b07-d258939dd74f"
}
```

or

* looking for the value for the `id` property in the JSON response of the UiTdatabank entry API to a `POST /events` request (to create a new event)

```json
{
    "id": "75573a64-ddc8-4fd0-8b07-d258939dd74f",
    "eventId": "75573a64-ddc8-4fd0-8b07-d258939dd74f",
    "url": "https://io.uitdatabank.be/event/75573a64-ddc8-4fd0-8b07-d258939dd74f",
    "commandId": "00000000-0000-0000-0000-000000000000"
}
```

> Extracting the id from the `id` property is only possible from the JSON response of the UiTdatabank Entry API. If you use Search API to build an agenda, you'll have to extract the id from the `@id` property in the JSON-LD projection.

**Applicable on endpoints**

`/events` `/places` `/offers` `/organizers`

**Possible values**

Any identifier of an event, place or organizer.

**Example**

Retrieve the event with id `75573a64-ddc8-4fd0-8b07-d258939dd74f`:

```
GET /offers/?q=id:75573a64-ddc8-4fd0-8b07-d258939dd74f
```

### imagesCount

With the `imagesCount` field you can filter organizers by their number of images.

> This field can only be used to filter on organizers. To filter events and places by their number of images (mediaObjects), the field `mediaObjectsCount` must be used.

**Applicable on endpoints**

`/organizers`

**Possible values**

* an integer, e.g. `2`
* a range, consisting of two integers (lower and upper bound), e.g. `[1 TO *]`

**Examples**

Retrieve all organizers that have at least one image:

```
GET /organizers/?q=imagesCount:>=1
```

Retrieve all organizers that have 5 to 10 images:

```
GET /organizers/?q=imagesCount:[5 TO 10]
```

### labels

Search for documents that have a specific label (or hidden label) with the `labels` field.

**Applicable on endpoints**

`/events` `/places` `/offers` `/organizers`

**Possible values**

A label name (string).

**Example**

Retrieve all events with the label `ook voor kinderen`

```
GET /events/?q=labels:"ook voor kinderen"
```

### languages

All documents created in UiTdatabank are available in Dutch (NL). Besides Dutch, content editors can use UiTdatabank to translate the name and description of their documents in French (FR), German (DE) and English (EN). The API supports translations in every [two-letter language ISO 639-1 code](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes).

To limit your results to documents that have translations for `name` and `description` in a specific language, you can use the `languages` field.

For an in-depth understanding of the languages fields and translations we advice you to read our Language guide. (TO DO: link naar guide)

**Applicable on endpoints**

`/events` `/places` `/offers` `/organizers`

**Possible values**

Allowed values for both are any of the two-letter language ISO 639-1 codes, but the most used languages are: `nl` `fr` `de` `en`

**Example**

Retrieve documents that have translations for `name` and `description` in `fr` or `de`.

```
GET /offers/?q=languages:("fr" OR "de")
```

### localTimeRange

With the `localtimeRange` field it is possible to filter out events that are happening on a specific part of the day, regardless of the day or date of the event.

Typically this field is used to filter out events that are happening:

* in the morning
* in the afternoon
* in the evening
* at night

However, these parts of the day are not pre-defined. Using a integer between 0 and 2359 you can define the timeRange yourself.

**Applicable on endpoints**

`/events` `/places` `/offers`

**Possible values**

A range, consisting of two integers between 0 and 2359 (lower and upper bound), e.g. `[2130 TO 2359]`.

**Examples**

Get all events that take place in the morning:

```
GET /events/?q=localTimeRange:[0600 TO 1159]
```

Get all events that take place in the afternoon:

```
GET /events/?q=localTimeRange:[1200 TO 1659]
```

Get all events that take place in the evening:

```
GET /events/?q=localTimeRange:[1700 TO 2359]
```

Get all events that take place at night:

```
GET /events/?q=localTimeRange:[0000 TO 0559]
```

### location.name.{language}

Using the field `location.name`, you can find events that take place on a certain location.

**Applicable on endpoints**

`/events` `/offers`

**Possible values**

Any location name (string).

**Example**

Search for all events that have “Ancienne Belgique” as their location:

```
GET /events/?q=location.name.\*:"ancienne belgique"
```

### location.id

Using the field `location.id` field, you can find events that take place on a certain location.

**Applicable on endpoints**

`/events` `/offers`

**Possible values**

Any identifier of a location.

**Example**

Search for all events that have location id `a0368d10-ded0-4925-b94a-2835f73e255e` as their location:

```
GET /events/?q=location.id:a0368d10-ded0-4925-b94a-2835f73e255e
```

### location.labels

Using the field `location.labels` field, you can find events that have a location with a certain label.

**Applicable on endpoints**

`/events` `/offers`

**Possible values**

A label name (string).

**Example**

Search for all events that have a location with the label `museumPASSmusees`:

```
GET /events/?q=location.labels:museumPASSmusees
```

### location.terms.id

Using the `location.terms.id` field you can filter out events that take place on a specific type of location.

**Applicable on endpoints**

`/events` `/offers`

**Possible values**

Any valid term id applicable on locations (places). For a list of available terms, see [our guide about taxonomy terms](../taxonomy-api/terms.md).

**Example**

Retrieve all events that take place in a theater (termId `8.70.0.0.0`):

```
GET /events/?q=location.terms.id:8.70.0.0.0
```

### mainLanguage

Traditionally, each document created in UiTdatabank starts as Dutch and can then be translated to other languages. However, it is possible to create an event, place or organizer in a different language. The `mainLanguage` property indicates in which language the main content of the document is.

For an in-depth understanding of the languages fields and translations we advice you to read our Language guide. (TO DO: link naar guide)

**Applicable on endpoints**

`/events` `/places` `/offers` `/organizers`

**Possible values**

Allowed values for both are any of the two-letter language ISO 639-1 codes, but the most used languages are: `nl` `fr` `de` `en`

**Examples**

Retrieve events with their mainlanguage set to `fr`:

```
GET /events/?q=mainLanguage:fr
```

### mediaObjectsCount

With the `mediaObjectsCount` field you can filter events and places by their number of images.

> This field can only be used to filter on events and places. To filter organizers by their number of images, the field `imagesCount` must be used.

**Applicable on endpoints**

`/events` `/places` `/offers`

**Possible values**

* an integer, e.g. `2`
* a range, consisting of two integers (lower and upper bound), e.g. `[1 TO *]`

**Examples**

Retrieve all places that have at least one image:

```
GET /places/?q=mediaObjectsCount:>=1
```

Retrieve all events that have 5 to 10 images:

```
GET /events/?q=mediaObjectsCount:[5 TO 10]
```

### modified

UiTdatabank keeps track of the modification date of each document. This metadata for the modification date can be queried with the `modified` field.

**Applicable on endpoints**

`/events` `/places` `/offers` `/organizers`

**Possible values**

Any ISO-8601 datetime, e.g. `2023-04-01T12:08:01+01:00`

<!-- theme: info -->

> Note that the `+` sign must be encoded for URLs (as `%2B`). Otherwise it will be interpreted as whitespace and the given date time will be considered invalid.

**Example**

Get all events and places that are modified since the start of 2022:

```
GET /offers/?q=modified:[2022-01-01T00\:00\:00%2B01\:00 TO *]
```

### name.{language}

Using the field `name`, you can find events by their name (title).

**Applicable on endpoints**

`/events` `/places` `/offers`

**Possible values**

Any name (string).

**Example**

Search for all events that have `Soulwax` in their name:

```
GET /events/?q=name.\*:*Soulwax*
```

### organizer.name.{language}

Using the field `organizer.name`, you can find events and places that take are organized by a certain organizer.

**Applicable on endpoints**

`/events` `/places` `/offers`

**Possible values**

Any organizer name (string).

**Example**

Search for all events that have "Ancienne Belgique" as its organizer:

```
GET /events/?q=organizer.name.\*:"ancienne belgique"
```

### organizer.labels

Using the field `organizer.labels` field, you can find events or places that have an organizer with a certain label.

**Applicable on endpoints**

`/events` `/places` `/offers`

**Possible values**

A label name (string).

**Example**

Search for all events or places that have an organizer with the label `UiTPAS Oostende`:

```
GET /offers/?q=organizer.labels:"UiTPAS Oostende"
```

### price

Search for an exact price or a price range with the `price` field.

Currently a price field is always treated as EUR.

**Applicable on endpoints**

`/events` `/places` `/offers`

**Possible values**

* Any floating-point number, e.g. `7.59`.
* Any range, consisting of two floating-point numbers. The range consists a lower bound and an upper bound. The upper bound must be greater than the lower bound, e.g. `[10.5 TO 15]`

**Examples**

Retrieve all events with the exact price of 6.66 EUR:

```
GET /events/?q=price:6.66
```

Retrieve all events with a price lower than 10 EUR:

```
GET /events/?q=price:<10
```

or

```
GET /events/?q=price:[O TO 10]
```

Retrieve all events with a price equal to or higher than 50 EUR:

```
GET /events/?q=priceRange:[50 TO *]
```

### regions

publiq has a list of pre-indexed geographical shapes that represent the administrative state of Belgium. The geographical coördinates of events and places are then matched with pre-indexed geographical shapes for:

* Provinces
* Regions
* Municipalities
* Submunicipalities

With the `regions` field you can filter on either one region or a combination of regions.

<!-- theme:info -->

> Filtering by region uses a cache in advanced queries, which is faster but may be slightly out of date. The URL parameter on the other hand does the filtering on-demand, which is slower but always up to date.

**Applicable on endpoints**

`/events` `/places` `/offers` `/organizers`

**Possible values**

Any valid region. For a list of all shapes, see (TO DO: link to guide)

**Example**

Search for all places in the Brussels Capital Region:

```
GET /places/?q=regions:nis-01000
```

### status

The `status` indicates whether an event or place is still available for visits or not.

For an in-depth understanding of the `status` field we advice to read our guide (TO DO: link to guide).

**Applicable on endpoints**

`/events` `/places` `/offers`

**Possible values**

`Available` `TemporarilyUnavailable` `Unavailable`

**Examples**

Search for all events that take places as planned:

```
GET /events/?q=status:Available
```

Search for all places that are permanently closed:

```
GET /places/?q=status:Unavailable
```

### terms.id

Each event and place in UiTdatabank is categorized with a type (e.g. `concert` for events or `theater` for places). Events can also have a event theme (e.g. `dance music`). Each of these categories (terms) have a unique identifier.

With the `terms.id` field you can filter results based on their categorisation.

A complete overview of our terms can be found on in our [guide about taxonomy terms](../taxonomy-api/terms.md).

**Applicable on endpoints**

`/events` `/places` `/offers`

**Possible values**

See our [guide about taxonomy terms](../taxonomy-api/terms.md).

**Example**

Retrieve all events with the eventtype `concert`:

```
GET /events/?q=terms.id:0.50.4.0.0
```

Retrieve all events with the eventtype `concert` and that also have the event theme `dance music`:

```
GET /events/?q=terms.id:(0.50.4.0.0 AND 1.8.3.3.0)
```

### typicalAgeRange

Filter out results based on the targetted age group of the event/place with the `typicalAgeRange` field.

For an in-depth understanding of the different fields and parameters to filter on age information we recommend to read our guide (TO DO: link to guide).

**Applicable on endpoints**

`/events` `/places` `/offers`

**Possible values**

A range, consisting of two integers (lower and upper bound), e.g. `[3 TO 5]`

**Example**

Retrieve all events for childeren under 12 years old:

```
GET /events/?q=typicalAgeRange:[0 TO 12]
```

Note that this query will also return events that are for all ages (see allAges (TO DO link to docs)) and events for ages that only partially overlap with the given age range (e.g. an event for childeren of 10-15 years old).

Retrieve all events exclusively for childeren under 12 years old:

```
GET /events/?q=typicalAgeRange:[0 TO 12] NOT typicalAgeRange:[12 TO *]
```

### videosCount

With the `videosCount` field you can filter events an places by their number of videos.

**Applicable on endpoints**

`/events` `/places` `/offers`

**Possible values**

* an integer, e.g. `2`
* a range, consisting of two integers (lower and upper bound), e.g. `[1 TO *]`

**Examples**

Retrieve all events and places that have at least one video:

```
GET /offers/?q=videosCount:>=1
```

Retrieve all events and places that have exactly one video:

```
GET /offers/?q=videosCount:1
```

Retrieve all events and places that have less than 10 videos:

```
GET /offers/?q=videosCount:<10
```

Retrieve all events and places that have 5 to 10 videos:

```
GET /offers/?q=videosCount:[5 TO 10]
```

### workflowStatus

Use the `workflowStatus` field to retrieve documents with a specific `worfklowStatus`.

**Applicable on endpoints**

`/events` `/places` `/offers` `/organizers`

**Possible values**

For events & places:

* `DRAFT`: the event or place is created but misses some information and is therefore not ready for publication.
* `READY_FOR_VALIDATION`: the event or place is created with all mandatory fields present. The event or place is ready for validation, meaning that an external validator can either approve or reject the event or place.
* `APPROVED`: the event or place is explicitely approved by a validator.
* `REJECTED`: the event or place is explicitely approved by a validator, e.g. because it is a duplicate or it is not conform the rules of UiTdatabank (TO DO: link to rules).
* `DELETED`: the event or place is deleted.

<!-- Theme:info -->

> By default only events and places with a workflowStatus `READY_FOR_VALIDATION` or `APPROVED` are returned by Search API. To include documents with another workflowStatus in your search results, you need to disable the [default filter for worfklowStatus](filters/default-filters.md).

For organizers:

* `ACTIVE`: the organizer is created with all mandatory fields present.
* `DELETED`: the organizer is deleted.

<!-- Theme:info -->

> By default only organizers with a workflowStatus `ACTIVE` are returned by Search API. To include documents with another workflowStatus in your search results, you need to disable the [default filter for worfklowStatus](filters/default-filters.md).

**Examples**

Retrieve only events that are explicitely approved:

```
GET /events/?q=workflowStatus:APPROVED
```

Retrieve places that are still in a draft version:

```
GET /places/?q=workflowStatus:DRAFT&workflowStatus=*
```

Retrieve events and places that are ready for publication in an (online) event agenda:

```
GET /offers/?q=workflowStatus:READY_FOR_VALIDATION,APPROVED
```

Or you can just simply omit the search from the example above, since Search API will return all always results that are ready for publication:

```
GET /offers
```

### \_exists\_

With the `_exists_` field you can search for the documents that have a given field name in their index.

**Applicable on endpoints**

`/events` `/places` `/offers` `/organizers`

**Possible values**

Any field name documented on this page.

**Example**

Retrieve all events with a description in dutch:

```
GET /events/?q=_exists_:description.nl
```

## Boolean operators

With advanced queries it is possible to combine multiple fields to define a very specific set of events, places or organizers. In order to combine multiple fields boolean operators must be used:

* `AND`: is used to narrow the search. Only results that meet all fields in the AND-combination will be returned.
* `OR` is used to broaden the search. Results that meet either one (or both fields) will be returned.
* `NOT` is used to exclude a set of data.

**Examples**

Only events that take place in postal code 9000 `AND` that are free too will be returned:

```
GET /events/?q=address.\*.postalCode:9000 AND price:0
```

All events that take place in postal code 9000 `OR` the free events that are outside postal code 9000 will be returned:

```
GET /events/?q=address.\*.postalCode:9000 OR price:0
```

All events that take place in postal code 9000 will be returned, except (`NOT`) if they are for free:

```
GET /events/?q=address.\*.postalCode:9000 NOT price:0
```

## Usage of round brackets

Use round brackets in your advanced queries to:

* group values that belong to the same field
* specify the order (hierarchy) between different fields
* avoid the need to repeat fields
* keep your query simple, clean and more human readable

### Use round brackets to group values in the query

In the example below, no round brackets are used. Because of this, the field `address.\*.postalCode` is repeated 3 times. This is unneccesary and makes the query dificult to read.

```
GET /events/?q=address.\*.postalCode:9000 OR address.\*.postalCode:1000 OR address.\*.postalCode:2000 OR address.\*.postalCode:3000
```

Round brackets make it possible to group values and avoid the need to repeat fields. As a result, the query is shorter, more simple and easier to maintain:

```
GET /events/?q=address.\*.postalCode:(9000 OR 1000 OR 2000 OR 3000)
```

### Use round brackets to specify the order between different fields

In the case of more complex queries the correct usage of round brackets is mandatory.

Imagine you want to retrieve all concerts (term id `0.50.4.0.0`) and expositions (term id `0.0.0.0.0`) that happen in Ghent (postal code `9000`) or Leuven (postal code `3000`).

Therefore, first we need to make 2 OR relations:

1. between the 2 postal code values (because we want to retrieve events from Ghent *or* Leuven): `address.\*.postalCode:(9000 OR 3000)`
2. between the 2 term id values (because we want to retrieve concerts *or* expositions): `terms.id:(0.0.0.0.0 OR 0.50.4.0.0)`

Consequently we need to link both OR-relations with an AND operator:

```
/events/?q=address.\*.postalCode:(9000 OR 3000) AND terms.id:(0.0.0.0.0 OR 0.50.4.0.0)
```

Now the query will return concerts and expositions that either happen in Ghent or Leuven. Without the usage of round brackets you would get incomplete or incorrect results.

## Escaping & encoding

Everything inside the `q` must be URL-encoded. Also, special characters like `"` or `*` must always be escaped if used as part of a field name or field value.

### Examples

**Escaping wildcards in field names**

You can use wildcards in field names to search across multiple translated versions. When doing so, the wildcard must be escaped using a backslash, like in the example below:

```
GET /events/?q=address.\*.postalCode:9000
```

**Encoding the `+` sign in field values**

The `+` sign should be encoded for as `%2B`. Otherwise it will be interpreted as whitespace and the given date time will be considered invalid.

```
GET /events/?q=dateRange:[2022-01-01T00:00:00%2B01:00%20TO%202022-12-31T23:59:59%2B01:00]
```

## Other resources

* [Elasticsearch Lucene Query Syntax](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-query-string-query.html#query-string-syntax)
* [List of special characters that require escaping](https://lucene.apache.org/core/2_9_4/queryparsersyntax.html#Escaping%20Special%20Characters)
