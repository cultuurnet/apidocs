# Sorting

The UiTdatabank Search API provides several options to sort events, places and organizers.

*   `availableTo`
*   `created`
*   `distance`
*   `modified`
*   `score`

For every sort parameter it is possible to change the sort `order`:

*   Ascending order (from smallest to biggest value) by using `asc`
*   Descending order (from biggest to smallest value) by using `desc`

## Sort parameters

### availableTo

<!-- theme: info -->

> Only applicable on events and places.

Sorts the results on the date-time that they are last visible on most publication channels. This is most commonly used to show events & places that will be ending soon first. Sorting on availableTo (ascending) is what we advice for event calendars.

**Example**

    GET /offers/?sort[availableTo]=asc

Events & places that end soon will appear first, permanent events and places last.

### created

Sorts the data by the date it is created in the API.

**Example**

    GET /organizers/?sort[created]=desc

Newly created organizers will appear first.

### distance

<!-- theme: info -->

> Only applicable on `/events`, `/places` and `/offers`, and only when the the `coordinates` and `distance` parameters are also present

When searching by `geo distance`, it is possible to sort the results by the distance from the given coordinates.

**Example**

    GET /places/?coordinates=50.8511740,4.3386740&distance=10km&sort[distance]=asc

Places that are the closest to the given coordinates will appear first.

### modified

Sorts the data by the date it is modified in the API.

**Example**

    GET /events/?sort[modified]=desc

The events that were modified recently will appear first.

### score

Sorts the data by its relevance. This is the default sort that is used. For an in-depth look how relevance (`score`) is calculated, see the [elasticsearch documentation](https://www.elastic.co/guide/en/elasticsearch/guide/current/relevance-intro.html).

**Examples**

    GET https://search.uitdatabank.be/events/

The events with the heighest score will appear first.

    GET /events/?sort[score]=desc

The events with the heighest score will appear first.

## Using multiple sort options

It is possible to use multiple sort options. When doing so, the order of the `sort` options influences the order in which they are sorted.

**Example**

    GET /offers/?sort[availableTo]=asc&sort[score]=desc

In the example above, all events and places will be sorted by `availableTo` first, and afterwards any events or places with the same `availableTo` are sorted by `score`.
