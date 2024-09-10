# Filtering on location

It is possible to filter the results from Search API based on the geographical information. There are many different options, which we outline in detail in this guide.

## Filtering on country

You can filter results from Search API based on the country the event / place / organizer is in.

> By default, the search API will only return results that are in Belgium. In order to retrieve results outside Belgium you'll need to disable the default filter of the addressCountry URL parameter. You can reset this default as described in the [default filters guide](../filters/default-filters.md).

The `addressCountry` is available as both an URL parameter and as an advanced query field:
- URL parameter: `addressCountry`
- Advanced query parameter: `address.{language}.addressCountry`

**Applicable on endpoints**

`/events` `/places` `/offers` `/organizers`

**Possible values**

The value for this field must always be an [ISO 3166-1 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) country code.

**Examples**

Because a document can have address translations you can search by a specific language, like in the example below:

```
GET /places/?q=address.nl.addressCountry:NL&addressCountry=*
```

Use a wildcard instead of specifying a language:

```
GET /places/?q=address.\*.addressCountry:NL&addressCountry=*
```

In the queries above, we disabled the addressCountry default filter using a URL parameter and applied a filter for the Netherlands through the advanced query parameter (address.nl.AddressCountry). However, if the goal is to restrict results solely to locations within the Netherlands, it’s simpler to use just the URL parameter:

```
GET /places/?addressCountry=NL
```

## Filtering on regions

publiq has a list of pre-indexed geographical shapes that represent the administrative state of Belgium. The geographical coördinates of events and places are then matched with pre-indexed geographical shapes for:
- Provinces
- Regions
- Municipalities
- Submunicipalities

Using the `regions` parameter, you can filter on pre-indexed geographical shapes or regions. `regions` is available as both an URL parameter and as an advanced query field:
- URL parameter: `regions`
- Advanced query parameter: `regions`

> Filtering by region uses a cache in advanced queries, which is faster but may be slightly out of date. The URL parameter on the other hand does the filtering on-demand, which is slower but always up to date.

> The `regions` URL parameter only accepts complete region ids, and wildcards are not supported. Any incomplete id will return zero results.

**Applicable on endpoints**

`/events` `/places` `/offers` `/organizers`

**Possible values**

Any valid region. You can find a list of all pre-indexed regions over [here](https://search.uitdatabank.be/autocomplete.json).

**Examples**

Search for all places in the Brussels Capital Region:

```
GET /places/?q=regions:nis-01000
```

Get all events and places Leuven:

```
GET /offers/?regions=gem-leuven
```

If you want to filter multiple regions, pass them along as separate parameters:

```
GET /offers/?regions[]=prv-vlaams-brabant&regions[]=gem-leuven
```

## Filtering on municipality

With the `addressLocality` field you can limit your results to one or more municipalities.

<!-- theme: warning --> 

> The name of municipalities can change over time (e.g. in the context of municipality mergers). The postal code of municipalities is far less subject to change. Therefore, it is better to use the `postalCode` field instead of the `addressLocality` field (when possible).

The `addressLocality` is available as both an URL parameter and the advanced query field `address.{language}.addressLocality`

**Applicable on endpoints**

`/events` `/places` `/offers` `/organizers`

**Possible values**

The value for `addressLocality` can be any municipality in a supported language.

**Examples**

Because a document can have address translations, you can search by a specific language or alternatively use a wildcard instead of specifying a language, as in the example below. 

```
GET /places/?q=address.fr.addressLocality:Bruxelles
```

The following example looks for matches in any language:

```
GET /places/?q=address.\*.addressLocality:Bruxelles
```

## Filtering on postal code

Filter on the postal code (zipcode) of an event, place or organizer with the `postalCode` field.
The `postalCode` is available as both an URL parameter and as advanced query field:
- URL parameter: `postalCode`
- Advanced query parameter: `address.{language}.postalCode`

**Applicable on endpoints**

`/events` `/places` `/offers` `/organizers`

<!-- theme: info -->

> Organizers do not always have address information. Thus, filtering on `postalCode` on the `/organizers` endpoint may result in incomplete results.

**Possible values**

Any valid postal code (integer).

**Examples**

Retrieve all events that take place in the postal codes starting with `90`:

```
GET /events/?q=address.\*.postalCode:90*
```

You can achieve the same result with the URL parameter:

```
GET /events/?postalCode=90*
```

If you want to make more complex queries, and want to retrieve events from multiple postal codes, you must use the advanced query field. In the example below we limit the results to events from Genk (postal code 3600) and Tongeren (postal code 3700):

```
GET /events/?q=address.\*.postalCode:(3600 OR 3700)
```

## Filtering on a specific location

You can filter on specific locations or venues using the ID of the location.
- URL parameter: `id` (on the `/places` endpoint) or locationId (on `/events` endpoint)
- Advanced query parameter: `id` (on the `/places` endpoint) or `location.id` (on `/events` endpoint)

<!-- theme: warning --> 

> Although you can filter by a location's name (`location.name`), we do not recommend this approach because location names may change over time. Instead, we strongly advise filtering by the location's unique identifier for consistent and reliable results.

**Applicable on endpoints**

`/events` `/places` `/offers` 

**Possible values**

A valid uuid of a place.

**Examples**

Retrieve all events that take place in Ancienne Belgique (production environment)

```
GET /events/?q=location.id:787d7420-c06f-4935-b3c5-5cd5a1276796
```

You can achieve the same result with the URL parameter:

```
GET /events/?locationId=787d7420-c06f-4935-b3c5-5cd5a1276796
```

Retrieve all events happening in an an online / virtual location:

```
GET /events/?locationId=00000000-0000-0000-0000-000000000000
```

However, in order we recommend using the attendanceMode filter for that:

```
GET /events/?q=attendanceMode:online
```

## Filtering on a specific address 

With the `streetAddress` field you can limit your results to a certain street or a specific address. The `streetAddress` is available as both an URL parameter and as advanced query field:
- URL parameter: `streetAddress`
- Advanced query parameter: `address.{language}.streetAddress`

**Applicable on endpoints**

`/events` `/places` `/offers` `/organizers`

**Possible values**

A street name and (!) a street number.

**Example**

Retrieve all organizers that are located on Henegouwenkaai 41-43:

```
GET /organizers/?q=address.nl.streetAddress:"Henegouwenkaai 41-43"
```

## Filtering on coordinates

With the `coordinates` parameter you can limit results that lie on a specific coordinate. The parameter is only available as URL-parameter.

In order to search by geo distancce, you can combine the `coordinates` parameter with the [distance](#With-Distance) parameter.

**Applicable on endpoints**

`/events` `/places` `/offers` `/organizers`

**Possible values**

A decimal representation of latitude & longitude.

**Example**

Get all events and places that are in a range of 10km or less from a 50.8511740,4.3386740

```
GET /offers/?coordinates=50.8511740,4.3386740&distance=10km
```

## Filtering on distance

With the `distance` parameter you can limit results that lie at a certain range of a given coordinate. The distance parameter is only available as URL parameter and must always be combined with the [coordinates parameter](#Filtering-on-coordinates).

**Applicable on endpoints**

`/events` `/places` `/offers` `/organizers`

**Possible values**

A distance, in km.

**Example**

Get all events and places that are in a range of 10km or less from a 50.8511740,4.3386740

```
GET /offers/?coordinates=50.8511740,4.3386740&distance=10km
```

## Filtering on bounds

Using bounds you can find items that are located in a specific region (a specific Google Maps view, for example). `Bounds` is currently only available as an URL parameter.

**Applicable on endpoints**

`/events` `/places` `/offers` `/organizers`

**Possible values**

Valid coordinates, decimal representations of latitude & longitude \(in that order\), separated by a comma.

> It's important that you pass the south-west coordinates first, and the north-east coordinates second.

**Example**

```
GET /offers/?bounds=34.172684,-118.604794|34.236144,-118.500938
```
