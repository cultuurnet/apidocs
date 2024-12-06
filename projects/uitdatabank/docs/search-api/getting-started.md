# Getting started

Search API makes it easy to query the events, places and organizers stored in UiTdatabank.

You can use Search API to build your own online calendar with current events, or for example gain insights in historical events. Click on the button below to register your Search API integration and obtain credentials:

<!-- focus: false -->

[![Add your search API integration](https://raw.githubusercontent.com/cultuurnet/apidocs/main/assets/add-your-integration.svg)](https://platform.publiq.be)

Search API is also used to [find existing places](../entry-api/places/finding-and-reusing-places.md) and [organizers](../entry-api/organizers/finding-and-reusing-organizers.md) to reuse when [creating new events](../entry-api/events/create.md) with Entry API.

## Requirements

If you are not familiar yet with the concepts of events, places and organizers, it is recommended to read the following guides (from Entry API) first:

* [What are events?](../entry-api/events/introduction.md)
* [What are places?](../entry-api/places/introduction.md)
* [What are organizers?](../entry-api/organizers/introduction.md)

Before continuing, make sure to also check out the [authentication](./authentication.md) page to learn how to request credentials and authenticate requests to Search API v3.

## URLs

Search API v3 can be reached at two URLs:

* Testing environment: `https://search-test.uitdatabank.be`
* Production environment: `https://search.uitdatabank.be`

## Endpoints

Search API consists of three endpoints to query events and/or places:

* [`GET /events`](/reference/search.json/paths/~1events/get) to query events
* [`GET /places`](/reference/search.json/paths/~1places/get) to query places
* [`GET /offers`](/reference/search.json/paths/~1offers/get) to query both events and places at the same time

These three endpoints all support the same URL parameters to perform queries and/or filters.

Additionally, Search API also has a [`GET /organizers`](/reference/search.json/paths/~1organizers/get) endpoint to query organizers. This endpoint supports different URL parameters than the ones for events and places, because organizers do not share the exact same properties as events and places.

## Your first request

Thanks to its sensible [default filters](./filters/default-filters.md) for the most common use cases, getting a paginated list of current events in Belgium is as easy as sending this HTTP request:

```http
GET /events HTTP/1.1
Host: https://search-test.uitdatabank.be
X-Client-Id: YOUR_CLIENT_ID
```

Try it out now by replacing `YOUR_CLIENT_ID` below with your own client id for the test environment:

```json http
{
  "url": "https://search-test.uitdatabank.be/events",
  "method": "get",
  "headers": {
    "x-client-id": "YOUR_CLIENT_ID"
  }
}
```

## Filtering

To narrow the search results further down, you can specify additional filters via URL query parameters.

For example, to only return events from Ghent:

```http
GET /events?postalCode=9000 HTTP/1.1
Host: https://search-test.uitdatabank.be
X-Client-Id: YOUR_CLIENT_ID
```

Try it out now by replacing `YOUR_CLIENT_ID` below with your own client id for the test environment:

```json http
{
  "url": "https://search-test.uitdatabank.be/events",
  "method": "get",
  "query": {
    "postalCode": 9000
  },
  "headers": {
    "x-client-id": "YOUR_CLIENT_ID"
  }
}
```

> You can find more info about the possible filters in the "Common filters" section in the sidebar, or on the different endpoint pages under "API reference".

## Next steps

* As you may have noticed from trying out the examples above, Search API only returns links to search results by default. To also include the search result data, check out the guide about [embedding result data](./embedding.md).
* Check out the [pagination](./pagination.md) guide to get more than a handful of search results at a time.
* Read the [sorting](./sorting.md) guide to learn how to change the order of search results.
* Narrow down search results using [free text search](./filters/freetext.md), [date filters](./filters/datetime.md), [location filters](./filters/location.md) and many more under "Common filters" in the sidebar.
