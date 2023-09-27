# Terms

Through terms we categorize events and places. We distinguish 3 different sort of terms:
1. `eventtype`: describes the form of the event or place, e.g. a `concert` (for an event) or a `theatre hall` (for a place). Every event and place in UiTdatabank has exact 1 term of this domain. 
2. `theme`: describes the content of an event more precisely, e.g. a concert can have a theme `pop and rock` or `jazz and blues`. Events can have a theme, places don't.
3. `facility`: describes specific accessibility facilities for people with disabilities, e.g. accessible sanitary facilities. Some facilities are applicable on events, others on places.

It is possible to filter the results from Search API based on the presence or absence of one or more terms.

Want to know more about terms and our taxonomy? You can read more over [here](../taxonomy-api/introduction.md).

## Parameters

### term identifiers

* `termIDs` (URL-parameter) or `terms.id` (advanced query field): to look for events and/or places that have a certain term identifier.
* `locationTermIs[]` (URL-parameter) or `location.terms.id` (advanced query field): to look for events whose location match a certain location term.

**Applicable on endpoints**

`/offers` `/events` `/places`

**Possible values**

Any existing term identfier. For an overview of the identifiers name see our [Taxonomy API](https://docs.publiq.be/docs/uitdatabank/taxonomy-api/reference/operations/list-terms).

**Examples**

Search for all places with the facility "wheelchair available" (`3.23.3.0.0`)

```http
GET /places/?termIds[]=3.23.3.0.0
```

Search for all events that are an exposition (`0.0.0.0.0`):

```http
GET /events/?q=terms.id:0.0.0.0.0
```

Search for all events with the eventtype "concert" (`0.50.4.0.0`) but do not have the theme "jazz and blues" (`1.8.2.0.0`)

```http
GET /events?q=terms.id:0.50.4.0.0 NOT terms.id:1.8.2.0.0
```

### term labels

* `termLabels[]` (URL-parameter) or `terms.label` (advanced query field): to look for events and/or places that have a certain term label
* `locationTermLabels[]` (URL-parameter) or `location.terms.label` (advanced query field): to look for events whose location match a certain location term.

<!-- theme: warning -->

> The label of a term can change over time, so we strongly advice to search terms using the `termIds` URL parameter or the advanced query field `terms.id`.

**Applicable on endpoints**

`/offers` `/events` `/places`

**Possible values**

Any existing (and deprecated) label name. For an overview of the current label names see our [Taxonomy API](https://docs.publiq.be/docs/uitdatabank/taxonomy-api/reference/operations/list-terms).

**Examples**

Search for all events with the term "concert":

```http
GET /offers/?termLabels[]=concert
```

Or by using the advanced query fields:

```http
GET /events/?q=terms.label:concert
```
