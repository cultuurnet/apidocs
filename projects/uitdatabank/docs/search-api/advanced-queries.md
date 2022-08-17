# Advanced queries

With advanced queries you can make more complex queries, using boolean operators and a specific set of parameters. The syntax is based on the Lucene query syntax. More info can be found in the [ElasticSearch documentation](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-query-string-query.html#query-string-syntax).

The usage of advanced query parameters is mandatory when using the widgets.

## Parameters

### addressCountry
Applicable on endpoints: `/events` `/places` `/offers` `/organizers`

### addressLocality
Applicable on endpoints: `/events` `/places` `/offers` 

### allAges
Applicable on endpoints: `/events` `/places` `/offers` 

### audienceType
Applicable on endpoints: `/events` `/places` `/offers` 

### availableRange
Applicable on endpoints: `/events` `/places` `/offers` 

### attendanceMode
Applicable on endpoints: `/events` `/places` `/offers` 

### bookingAvailability
Applicable on endpoints: `/events` `/places` `/offers` 

### calendarType
Applicable on endpoints: `/events` `/places` `/offers` 

### completedLanguages
Applicable on endpoints: `/events` `/places` `/offers` `/organizers`

### created
Applicable on endpoints: `/events` `/places` `/offers` `/organizers`

### creator
Applicable on endpoints: `/events` `/places` `/offers` `/organizers`

### dateRange
Applicable on endpoints: `/events` `/places` `/offers` 

### exists
Applicable on endpoints: `/events` `/places` `/offers` `/organizers`

### id
Applicable on endpoints: `/events` `/places` `/offers` `/organizers`

### imagesCount
Applicable on endpoints: `/organizers`

### labels
Applicable on endpoints: `/events` `/places` `/offers` `/organizers`

### languages
Applicable on endpoints: `/events` `/places` `/offers` `/organizers`

### localTimeRange
Applicable on endpoints: `/events` `/places` `/offers` 

### location.name
Applicable on endpoints: `/events` `/places` `/offers` 

### location.terms.id
Applicable on endpoints: `/events` `/places` `/offers` 

### mainLanguage
Applicable on endpoints: `/events` `/places` `/offers` `/organizers`

### mediaObjectsCount 
Applicable on endpoints: `/events` `/places` `/offers` 

### modified
Applicable on endpoints: `/events` `/places` `/offers` `/organizers`

### name
Applicable on endpoints: `/events` `/places` `/offers` `/organizers`

### organizer.name
Applicable on endpoints: `/events` `/places` `/offers` 

### postalCode
Applicable on endpoints: `/events` `/places` `/offers` `/organizers`

### price
Applicable on endpoints: `/events` `/places` `/offers` 

### priceRange
Applicable on endpoints: `/events` `/places` `/offers` 

### q (free text search)
Applicable on endpoints: `/events` `/places` `/offers` `/organizers`

Using the `q` parameter, you can search for text across multiple pre-defined fields. The following fields will be searched when the q parameter with free text: `id`, `name`, `description`, `labels`, `terms.id`, `terms.label`, `addressLocality`, `postalCode`, `streetAddress`, `location.id`, `location.name`, `organizer.id`, `organizer.name`.

<!-- theme: info -->
> Important notes:
> -   IDs only return results if the complete ID is given in the free text input.
> -   Wildcards are supported. For example, searching for `Fiets*` will return results with Fietsen or Fietseling or Fietstocht, etc.
> -   By default, the `AND` operator is used between multiple given words. So the query `wandelen dijle fietsen` actually becomes `wandelen AND dijle AND fietsen`

By default the free text search looks for one or more matches with any of the given terms, regardless of their order and/or position in the document’s text:
```
GET /events/?q=lekker vegetarisch
```
both an event with the title `Lekker vegetarisch` and a different event with the title `Vegetarisch eten is niet lekker` would be returned with the query above.

To limit the results to exact matches only, encapsulate the given search term with double quotes:
```
GET /events/?q="lekker vegetarisch"
```
This will only return results that have `lekker vegetarisch` in exactly that order in their event body.

TO DO: link to docs about exact matches

TO DO: link to corresponding url parameter docs

### regions
Applicable on endpoints: `/events` `/places` `/offers` `/organizers`

### status
Applicable on endpoints: `/events` `/places` `/offers` `/organizers`

The status indicates whether an offer is still available for visits or not. The following values the `status` parameter are applicable:
-   `Available` 
-   `TemporarilyUnavailable`
-   `Unavailable`

**Example**
```
GET /events/?q=status:Available
```
All events that take place as planned will be returned.

TO DO: link to status guide when that guide is finished

### streetAddress
Applicable on endpoints: `/events` `/places` `/offers` `/organizers`

### terms.id
Applicable on endpoints: `/events` `/places` `/offers` 

### typicalAgeRange
Applicable on endpoints: `/events` `/places` `/offers`

### videosCount
Applicable on endpoints: `/events` `/places` `/offers` 

### workflowStatus
Applicable on endpoints: `/events` `/places` `/offers` `/organizers`

## Using boolean operators
With advanced queries it is possible to combine multiple parameters to define a very specific set of events, places or organizers. In order to combine multiple parameters boolean operators should be used:
- `AND`: is used to narrow the search. Only results that meet all parameters in the AND-combination will be returned.
- `OR` is used to broaden the search. Results that meet either one (or both parameters) will be returned.
- `NOT` is used to exclude a set of data. 

### Examples
#### AND
```
/events/?q=address.\*.postalCode:9000 AND price:0
```
Only events that take place in postal code 9000 and that are free will be returned.

#### OR
```
/events/?q=address.\*.postalCode:9000 OR price:0
```
All events that take place in postal code 9000 and all free events will be returned.

#### NOT
```
/events/?q=address.\*.postalCode:9000 NOT price:0
```
All events that take place in postal code 9000 will be returned, except if they are for free.

### Usage of round brackets

Use round brackets in your advanced queries to:
-   group values that belong to the same parameter 
-   specify the order (hierarchy) between different parameters
-   avoid the need to repeat parameters
-   keep your query simple, clean and more human readable

#### Use round brackets to group values in the query

In the example below, no round brackets are used. Because of this, the parameter `address.\*.postalCode` is repeated 3 times. This is unneccesary and makes the query more dificult to read.
```
/events/?q=address.\*.postalCode:9000 OR address.\*.postalCode:1000 OR address.\*.postalCode:2000 OR address.\*.postalCode:3000
```

Round brackets make it possible to group values and avoid the need to repeat parameters. As a result, the query is shorter, more simple and easier to maintain:
```
/events/?q=address.\*.postalCode:(9000 OR 1000 OR 2000 OR 3000)
```

#### Use round brackets to specify the order between different parameters

In the case of more complex queries the correct usage of round brackets is mandatory. 

Imagine you want to retrieve all concerts (term id `0.50.4.0.0`) and expositions (term id `0.0.0.0.0`) that happen in Ghent (postal code `9000`) or Leuven (postal code `3000`).

Therefore, first we need to make 2 OR relations:
-   between the 2 postal code values (because we want to retrieve events from Ghent _or_ Leuven): `address.\*.postalCode:(9000 OR 3000)`
-   between the 2 term id value (because we want to retrieve concerts _or_ expositions): `terms.id:(0.0.0.0.0 OR 0.50.4.0.0)`

Consequently we need to link both OR-relations with an AND operator:
```
/events/?q=address.\*.postalCode:(9000 OR 3000) AND terms.id:(0.0.0.0.0 OR 0.50.4.0.0)
```
Now your query will return concerts and expositions that either happen in Ghent or Leuven. Without the usage of round brackets you would get incomplete or incorrect results.

## Exact matches and partial matches

