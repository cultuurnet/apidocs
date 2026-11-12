# Finding coordinates

This guide shows how to turn text into coordinates with [`GET /coordinates`](/reference/geo-api.json/paths/~1coordinates/get) and how to get good matches.

## A first request

```http
GET /coordinates?query=Sint-Pietersplein%201,%20Gent HTTP/1.1
Host: geo-api-test.publiq.be
```

```json
{
  "totalItems": 1,
  "member": [
    {
      "coordinates": { "latitude": 51.0425, "longitude": 3.7268 }
    }
  ]
}
```

The `member` array holds the matches, best first, as coordinates only. `totalItems` is `0` when nothing matched; that is a normal `200` response, not an error.

A location has no name or address for now. Those may be added later, as optional properties, when a product needs to show results to a user.

## What you can search for

The `query` parameter accepts any of these:

* An address: `Sint-Pietersplein 1, Gent`
* A venue or point of interest: `Vooruit Gent`, `Gravensteen`
* A municipality: `Gent`

The API looks the text up in several sources in a fixed order, and returns the results of the first source that recognises it. Venues known in UiTdatabank come first, so `Vooruit Gent` gives you the coordinates of the venue rather than of a street called Vooruit. Addresses come from an address database.

## Getting good matches

* **Add the municipality.** `Korenmarkt` exists in several cities; `Korenmarkt, Gent` does not.
* **Take the first match.** Results are ordered best first and `limit` is `1` by default; you can ask for up to 10. Ask for more only when you filter them yourself, for example by distance to a point you already know.
* **Route from text directly.** When the coordinates are only needed to calculate a route, pass the text as `origin` or `destination` of [`GET /routes`](/reference/geo-api.json/paths/~1routes/get); it resolves the text the same way and saves you a request.
* **Restrict the country.** `country` defaults to `BE`. Pass another ISO 3166-1 code for addresses abroad.

## Do not search on every keystroke

The Geo API is not an autocomplete service. Call it when the user has finished typing (after a pause of a few hundred milliseconds, or on submit), and only for queries of two characters or more.
