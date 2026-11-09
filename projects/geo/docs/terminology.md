# Terminology

## Coordinates

A point on the earth as `latitude` and `longitude` in decimal degrees (WGS 84, the system used by GPS, OpenStreetMap and Google Maps). The Geo API uses the same `coordinates` object as the `geo` property of places in UiTdatabank:

```json
{
  "latitude": 51.0425,
  "longitude": 3.7268
}
```

In query parameters, coordinates are written as one string: `latitude,longitude`, for example `51.0425,3.7268`.

> GeoJSON reverses the order: `[longitude, latitude]`. The `geometry` of a route in GeoJSON format follows the GeoJSON order, as every map library expects.

## Location

What `GET /coordinates` returns: a point that matched your text, as `coordinates`. Nothing else for now; descriptive properties such as a name or address may be added later.

A location is not a UiTdatabank place. It has no id and no URL, because it comes from several sources. When you need the UiTdatabank place itself, search it in the [Search API](https://docs.publiq.be/docs/uitdatabank/search-api/introduction) with the coordinates you got.

## Route

What `GET /routes` returns: one way to travel from the origin to the destination with a given means of transport (`mode`). A route has a total `distance` in metres and `duration` in seconds, a `geometry` (its shape) and `bounds` (the area it covers).

## Waypoint

A point the route passes through: the origin, each via point, and the destination. The response lists the waypoints as locations (coordinates), resolved from the text or coordinates you passed, so you can check which points the route was calculated between.

## Bounds

A rectangle on the map, given by its `southWest` and `northEast` corners:

```json
{
  "southWest": { "latitude": 51.038, "longitude": 3.71785 },
  "northEast": { "latitude": 51.0581, "longitude": 3.73395 }
}
```

The `bounds` of a route are the extent of its geometry, enlarged by `boundsPadding` metres on every side (500 by default). Use it to fit a map with some margin, or as the `bounds` filter of UiTdatabank's Search API to find events within walking distance of the route.

## Mode

The means of transport a route is calculated for: `car`, `bicycle` or `pedestrian`. The mode changes which roads are used and the duration.

## Attribution

The credit for the source of a response, for example `© OpenStreetMap contributors`. The licences of the sources behind the Geo API require you to show it next to the results. See [finding coordinates](./finding-coordinates.md#attribution-and-caching).
