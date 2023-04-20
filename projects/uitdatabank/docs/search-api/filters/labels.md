# Filtering on labels

## url parameters

Get all organizers that have a label that contains the word UiTPAS
```http
GET /organizers/?labels=UiTPAS*
```

## advanced query parameters

### examples

Get all events with the label `ook voor kinderen`
```http
GET /events/?q=labels:"ook voor kinderen"
```

Get all 


## UiTPAS

Events for UiTPAS automatically get one or more `UiTPAS` labels. The UiTPAS label(s) an event gets is determined by the applicable active card systems on the event. 

It is possible to filter out UiTPAS events using the `labels` parameter, for example:

```
GET /events/?q=labels:("UiTPAS Regio Gent" OR "UiTPAS Noorderkempen" OR "UiTPAS 39" OR "UiTPAS 40" OR ...)
```

<!-- theme: warning -->
> We do not recommend to filter on UiTPAS labels to filter out all UiTPAS events. The query on UiTPAS labels would become outdated rather quickly because new UiTPAS regions emerge (and therefore new labels). Also, the name of UiTPAS regions (and their label) can change over time. Overall, a query on UiTPAS label is hard to maintain.

Instead of trying to filter by all UiTPAS labels you can filter UiTPAS events with the `uitpas=true` parameter. This parameter will filter out all UiTPAS events and will always take into account the new UiTPAS regions.

```http
GET /events/?uitpas=true
```

<!-- theme: success -->

> All UiTPAS events are returned. No changes to the query are needed when new UiTPAS regions emerge or when UiTPAS regions change their name.

<!--
  @todo
  Explain how to filter by labels (both with URL parameters and q parameter)
  Explain that you cannot specifically filter by visible/hidden labels
  Explain that you can filter UiTPAS events with `?uitpas=true` instead of trying to filter by all UiTPAs labels
-->
