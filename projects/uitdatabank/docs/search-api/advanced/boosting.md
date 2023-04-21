# Boosting

When [sorting by score](../sorting.md), you may wish to influence the scores of results based on specific factors. For example, you may want to show all events that have at least one image before those without images.

You can achieve this by applying a boost factor to specific filters in [advanced queries](advanced-queries.md).
<!-- theme: info -->
> Boosting does not change which search results you see, but it does change the sorting of these results. By default, search results are sorted by a score that measures the relevance of a search result. A boosting query ensures that certain hits within a result set receive a higher score and therefore rank higher.

## Positive boosting

You can use the boost operator `^` in advanced queries to make specific matches more important than others.

For example, to get all events that have either the `lorem` or `ipsum` labels but show the ones with the `lorem` label first:

```http
GET /events/?q=labels:lorem^10 OR labels:ipsum
```

The default boost value is `1`, and it can be any positive `float` number. To make sure that the boost has enough influence on the results' scores, we recommend using large values.

Keep in mind that results that do not match a (boosted) filter at all are always excluded. So if you want to for example boost all results with an image, but also show results without images, you should create an `OR` query with both cases and boost one:

```http
GET /events/?q=mediaObjectsCount:[1 TO *]^10 OR mediaObjectsCount:0
```

*This query matches both events that have 1 or more image and boosts those, and events with exactly 0 images. Events with 0 images are not boosted in this case.*

In another example, you may wish to boost all results with a specific label but also show results that do not have that label:

```http
GET /events/?q=(labels:lorem^10) OR (NOT labels:lorem)
```

*This query matches both events that have the `lorem` label and boosts those, and events without the `lorem` label. Events without the `lorem` label are not boosted in this case.*

It is possible to add a hierarchy between multiple parameters when boosting, like in the example below:

```http
GET /events/?q=[...] AND ((labels:lorem^3 OR (NOT labels:lorem))) OR ((labels:ipsum^2 OR NOT labels:ipsum)))
```

*This query query matches both events that have the `lorem` and `ipsum` label, and events without those labels. It positvely boosts events with the label `lorem` and `ipsum`, but events with the label `lorem` will appear higher.*
In the example above,


## Negative boosting

You can influence the score or results negatively by using a boost value that is between `0` and `1`.

For example:

```http
GET /events/?q=(labels:lorem^0.5) OR (NOT labels:lorem)
```

*This query matches both events that have the `lorem` label and boosts those negatively, and events without the `lorem` label. Events without the `lorem` label are not boosted in this case.*

Alternatively, you can positively boost the results that do not match a specific filter. For example, you can boost all events that do not have the label `lorem`:

```http
GET /events/?q=(labels:lorem) OR (NOT labels:lorem)^10
```

*This query matches both events that have the `lorem` label, and events without the `lorem` label and positively boosts the latter ones.*


## Restrictions

* You can only use boosting when you [sort by score](../sorting.md), as the boost influences the results' scores.
* Scores can also be influenced by other factors, especially when using [free text search](../filters/freetext.md). To make your boosts more effective, you can use large(r) boost values. However, there is never a guarantee that a specific boost cleanly splits results into two groups (for example all events with images first, and then all events without images) since some events without an image may score very high in other factors.
* You can currently only use boosting on filters in [advanced queries](advanced-queries.md). However, other filters that do not require boosting can still be applied using regular URL parameters.

## Read more

You can learn more about boosting in Lucene queries [in the Elasticsearch documentation](https://www.elastic.co/guide/en/elasticsearch/reference/master/query-dsl-query-string-query.html#_boosting).
