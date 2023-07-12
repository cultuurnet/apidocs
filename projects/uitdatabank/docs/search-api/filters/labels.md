# Labels

It is possible to filter the results from Search API based on the presence or absence of one or more label(s). 

<!-- theme: info -->
> With the `labels` parameter you search both the visible and the hidden labels. It is currently not possible to specifically filter by visible or hidden labels.

<!-- theme: warning -->
> It is technically possible to filter on UiTPAS labels to filter out UiTPAS events or organizers. However, we do not recommend doing this since the name of UiTPAS regions (and their label) can change over time. We recommend using the [UiTPAS](./uitpas.md)-parameter instead.

## URL parameters

Retrieve all organizers that have the label `Erkend_SCVW`:

```http
GET /organizers/?labels="Erkend_SCVW"
```

## Advanced query parameters

Retrieve all events with the label `ook voor kinderen`:

```http
GET /events/?q=labels:"ook voor kinderen"
```
