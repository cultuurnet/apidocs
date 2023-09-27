## UiTPAS

Events for UiTPAS automatically get one or more `UiTPAS` labels. The UiTPAS label(s) an event gets is determined by the applicable active card systems on the event.

With the `UiTPAS` parameter you can easily filter out events that are in the UiTPAS program. If you're looking for events, places or organizers that are (only) applicable in a certain card system you can use the [labels](/labels.md) parameter.

## Examples

**Retrieve all UiTPAS events**

```http
GET /events/?uitpas=true
```

**Retrieve all UiTPAS events in Ghent**

```http
GET /events/?postalCode=9000&uitpas=true
```

**Retrieve all organizers in the cardsytem of UiTPAS Ghent**

```http
GET /organizers/?labels="UiTPAS Gent"
```
