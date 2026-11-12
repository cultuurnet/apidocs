# Calculating routes

This guide shows how to calculate a route with [`GET /routes`](/reference/geo-api.json/paths/~1routes/get), draw it on a map, and use its bounds to find UiTdatabank events along the way.

## A first request

```http
GET /routes?origin=51.0536,3.7250&destination=51.0425,3.7268&mode=bicycle HTTP/1.1
Host: geo-api-test.publiq.be
```

The response is a collection with the recommended route in `member[0]`, and the resolved `waypoints`:

```json
{
  "totalItems": 1,
  "member": [
    {
      "distance": 1377,
      "mode": "bicycle",
      "bounds": {
        "southWest": { "latitude": 51.0425, "longitude": 3.725 },
        "northEast": { "latitude": 51.0536, "longitude": 3.7268 }
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [[3.725, 51.0536], [3.7262, 51.048], [3.7268, 51.0425]]
      }
    }
  ],
  "waypoints": [
    { "coordinates": { "latitude": 51.0536, "longitude": 3.725 } },
    { "coordinates": { "latitude": 51.0425, "longitude": 3.7268 } }
  ]
}
```

`distance` is in metres. The `geometry` of the route is a GeoJSON `LineString` by default. Use `geometry=polyline6` for an encoded polyline, or `geometry=none` to get `null` when you only need numbers and bounds.

## Coordinates or text

`origin`, `destination` and `via` accept two forms:

* Coordinates as `latitude,longitude`: `51.0536,3.7250`
* Free text: `Korenmarkt, Gent`

Text is resolved exactly like the `query` of [`GET /coordinates`](/reference/geo-api.json/paths/~1coordinates/get), and the best match is used. The `waypoints` in the response show the coordinates the route was calculated between, so you can put them on the map and check that the API understood the text as the user meant it.

Pass text when you want one request and the best guess is good enough, for example a route from the user's own address. Pass coordinates when you already have them, or when the user should choose between candidates first; then call `GET /coordinates`, let the user pick, and pass the coordinates of the pick.

When a text does not match any location, the response is a `404` with type `https://api.publiq.be/probs/geo-api/location-not-found` and a `detail` naming the parameter. See [errors](./errors.md).

## Via points, modes and alternatives

* `via`: points the route must pass, in order. Repeat the parameter: `?via=51.05,3.72&via=51.04,3.73`.
* `mode`: `car` (default), `bicycle` or `pedestrian`.
* `alternatives`: ask for up to 3 alternative routes next to the recommended one. They follow in `member` after the recommended route; fewer may be returned when no sensible alternatives exist. Alternatives cannot be combined with `via`.
* `country`: the country used to resolve `origin`, `destination` and `via` when they are text (`BE` by default). It does not restrict the route itself, which may cross a border.

## Drawing the route

By default, the `geometry` of a route is GeoJSON and drops straight into Leaflet, MapLibre or Mapbox GL. Note that GeoJSON uses `[longitude, latitude]` order.

Fit the map to `bounds`, a `{ southWest, northEast }` object with the exact extent of the route. Pass `boundsPadding` (in metres) when you want a margin around it.

With `geometry=polyline6`, decode the string with any Google encoded polyline decoder, using precision 6 (not the default 5).

## Finding events along the route

Every route comes with `bounds`. Pass `boundsPadding` to enlarge it by that many metres on every side, for example `boundsPadding=500` for events within walking distance. That rectangle is exactly what the `bounds` filter of UiTdatabank's Search API expects, as `southWestLatitude,southWestLongitude|northEastLatitude,northEastLongitude`:

```http
GET /events/?bounds=51.038,3.71785|51.0581,3.73395&embed=true HTTP/1.1
Host: search-test.uitdatabank.be
```

Choose `boundsPadding` for your use case: a few hundred metres for events within walking distance of a cycling route, a few kilometres for a car trip. Keep in mind that a rectangle around a long diagonal route covers a lot of area far from the route itself; for those cases, filter the events further on your side using the route `geometry`.

Read more about the `bounds` filter in the [Search API documentation](https://docs.publiq.be/docs/uitdatabank/search-api/filters/filtering-by-location).
