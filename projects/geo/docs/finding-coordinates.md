# Finding coordinates

This guide shows how to turn text into coordinates with [`GET /coordinates`](/reference/geo-api.json/paths/~1coordinates/get), how to get good matches, and what the licences of the sources require from you.

## A first request

```http
GET /coordinates?query=Sint-Pietersplein%201,%20Gent HTTP/1.1
Host: geo-test.publiq.be
```

```json
{
  "totalItems": 1,
  "member": [
    {
      "coordinates": { "latitude": 51.0425, "longitude": 3.7268 }
    }
  ],
  "attribution": "© OpenStreetMap contributors"
}
```

The `member` array holds the matches, best first, as coordinates only. `totalItems` is `0` when nothing matched; that is a normal `200` response, not an error.

A location has no name or address for now. Those may be added later, as optional properties, when a product needs to show results to a user.

## What you can search for

The `query` parameter accepts any of these:

* An address: `Sint-Pietersplein 1, Gent`
* A venue or point of interest: `Vooruit Gent`, `Gravensteen`
* A municipality: `Gent`

The API looks the text up in several sources in a fixed order, and returns the results of the first source that recognises it. Venues known in UiTdatabank come first, so `Vooruit Gent` gives you the coordinates of the venue rather than of a street called Vooruit. Addresses come from an address database. The `attribution` in the response tells you which source answered.

## Getting good matches

* **Add the municipality.** `Korenmarkt` exists in several cities; `Korenmarkt, Gent` does not.
* **Take the first match.** Results are ordered best first and `limit` is `1` by default. Ask for more only when you filter them yourself, for example by distance to a point you already know.
* **Route from text directly.** When the coordinates are only needed to calculate a route, pass the text as `origin` or `destination` of [`GET /routes`](/reference/geo-api.json/paths/~1routes/get); it resolves the text the same way and saves you a request.
* **Restrict the country.** `country` defaults to `BE`. Pass another ISO 3166-1 code for addresses abroad.

## Do not search on every keystroke

The Geo API is not an autocomplete service. Call it when the user has finished typing (after a pause of a few hundred milliseconds, or on submit), and only for queries of three characters or more. Requests are rate limited per client.

## Attribution and caching

The sources behind the Geo API have licences with two obligations that pass on to you:

* **Show the attribution.** Display the `attribution` text of the response next to the results, for example under the list or in the corner of the map. The text differs per source, so always take it from the response instead of hard-coding it.
* **Respect the cache limit.** You may store coordinates in your own application, but not forever. The `cache-control` header of the response tells you for how long (`max-age`, in seconds). After that, ask the Geo API again. Store the original query text next to the coordinates so you can refresh them.

If you store coordinates in UiTdatabank as part of a place, those rules are handled there and do not apply to you.
