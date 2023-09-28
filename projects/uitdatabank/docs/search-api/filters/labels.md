# Labels

It is possible to filter the results from Search API based on the presence or absence of one or more label(s).

<!-- theme: info -->

> With the different `labels` parameters you search both the visible and the hidden labels. It is currently not possible to specifically filter by visible or hidden labels.

## Parameters

### labels

With the `labels` parameter you can find events, places or organizers that have a certain label or not.

<!-- theme: warning -->

> It is technically possible to filter on UiTPAS labels to filter out UiTPAS events or organizers. However, we do not recommend doing this since the name of UiTPAS regions (and their label) can change over time. We recommend using the [UiTPAS](./uitpas.md)-parameter instead.

**Applicable on endpoints**

`/offers` `/events` `/places` `/organizers`

**Examples**

Retrieve all events that have the label `ook voor kinderen` with the URL parameter `labels`:

```http
GET /events/?labels="ook voor kinderen"
```

Or, with the advanced query parameter `labels`:

```http
GET /events/?q=labels:"ook voor kinderen"
```

### location labels

With the `locationLabels` URL parameter and the advanced query parameter `location.labels` you can filter out events that have a location with a certain label.

**Applicable on endpoints**

`/offers` `/events`

**Examples**

Retrieve all events of which the location has the label `internationaal` with the URL parameter `locationLabels`:

```http
GET /events/?locationLabels="internationaal"
```

Or, with the advanced query parameter `location.labels`:

```http
GET /events/?q=location.labels:"internationaal"
```

### organizer labels

With the `organizerLabels` URL parameter and the advanced query parameter `organizer.labels` you can filter out events that have an organizer with a certain label.

**Applicable on endpoints**

`/offers` `/events` `/places`

**Examples**

Retrieve all events of which the organizer has the label `Erkend_SCVW` with the URL parameter `organizerLabels`:

```http
GET /events/?organizerLabels="Erkend_SCVW"
```

Or, with the advanced query parameter `organizer.labels`:

```http
GET /events/?q=organizer.labels:"Erkend_SCVW"
```
