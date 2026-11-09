# Calculating routes

This guide shows how to calculate a route with [`GET /routes`](/reference/geo-api.json/paths/~1routes/get), draw it on a map, and use its bounds to find UiTdatabank events along the way.

## A first request

```http
GET /routes?origin=51.0536,3.7250&destination=51.0425,3.7268&mode=bicycle&geometry=geojson HTTP/1.1
Host: geo-test.publiq.be
x-client-id: your-client-id
```

The response is a collection with the recommended route in `member[0]`, and the resolved `waypoints`:

```json
{
  "totalItems": 1,
  "member": [
    {
      "distance": 1377,
      "duration": 310,
      "mode": "bicycle",
      "bounds": {
        "southWest": { "latitude": 51.038, "longitude": 3.71785 },
        "northEast": { "latitude": 51.0581, "longitude": 3.73395 }
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

`distance` is in metres and `duration` in seconds. The `geometry` of the route is in the format you asked for with `geometry`: a GeoJSON `LineString` here, an encoded polyline by default, or `null` with `geometry=none` when you only need numbers and bounds.

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
* `alternatives`: ask for up to 3 alternative routes next to the recommended one. They follow in `member` after the recommended route; fewer may be returned when no sensible alternatives exist. Alternatives cannot be combined with `via` or `departAt`.
* `departAt`: an ISO 8601 date and time, for roads that are closed at certain hours. The time is interpreted as local time at the origin.

## Drawing the route

With `geometry=geojson`, the `geometry` of a route drops straight into Leaflet, MapLibre or Mapbox GL. Note that GeoJSON uses `[longitude, latitude]` order.

Fit the map to `bounds`, a `{ southWest, northEast }` object, to show the whole route with some margin. Pass `boundsPadding=0` for a tight fit.

With the default `geometry=polyline6`, decode the string with any Google encoded polyline decoder, using precision 6 (not the default 5).

## Finding events along the route

Every route comes with `bounds`: its extent enlarged by `boundsPadding` metres on every side, 500 by default. That rectangle is exactly what the `bounds` filter of UiTdatabank's Search API expects, as `southWestLatitude,southWestLongitude|northEastLatitude,northEastLongitude`:

```http
GET /events/?bounds=51.038,3.71785|51.0581,3.73395&embed=true HTTP/1.1
Host: search-test.uitdatabank.be
x-client-id: your-client-id
```

Choose `boundsPadding` for your use case: a few hundred metres for events within walking distance of a cycling route, a few kilometres for a car trip. Keep in mind that a rectangle around a long diagonal route covers a lot of area far from the route itself; for those cases, filter the events further on your side using the route `geometry`.

Read more about the `bounds` filter in the [Search API documentation](https://docs.publiq.be/docs/uitdatabank/search-api/filters/filtering-by-location).

## Caching

Routes change rarely. The `cache-control` header tells you how long you may reuse a response for the same request.
