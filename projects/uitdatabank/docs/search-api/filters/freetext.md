# Free text search

Using either the `text` (or `name`) and the `q` URL parameters, you can search for text across multiple pre-defined fields:

```http
GET /offers/?text="this is a test"
```
or
```http
GET /offers/?q="this is a test"
```

The main difference between the two is that `q` allows you to search through other fields than the pre-defined free text search fields.

For example, the following queries will NOT return the same results:

```http
GET /offers/?text=labels:Paspartoe
```
vs.
```http
GET /offers/?q=labels:Paspartoe
```

In this example, the `text` parameter will look for documents that have the string `labels:Paspartoe` in them, while the `q` parameter will look for documents that actually have the label `Paspartoe`.

<!-- theme: warning -->
> The `text` parameter will return results faster. In addition, using specific characters (such as `:`) may produce different results than you expect when using the `q` parameter. 
> 
> Therefore we strongly advise to use the `text` or `name` parameter to execute free text searches instead of the `q` parameter. 

## Parameters
### q

The following fields will be searched when using the `q` parameter with free text:

`id`, `name`, `description`, `labels`, `terms.id`, `terms.label`, `addressLocality`, `postalCode`, `streetAddress`, `location.id`, `location.name`, `organizer.id`, `organizer.name`

> Albeit possible we do not recommend the `q` parameter for free text searches.

**Applicable on endpoints**

`/offers` `/events` `/places` `/organizers`

**Examples**

```http
GET /events/?q="concert"
```

The query above will return all events that have the word "concert" in its document.

### text

The following fields will be searched when using the `q` parameter with free text:

`id`, `name`, `description`, `labels`, `terms.id`, `terms.label`, `addressLocality`, `postalCode`, `streetAddress`, `location.id`, `location.name`, `organizer.id`, `organizer.name`

**Applicable on endpoints**

`/offers` `/events` `/places` 

**Examples**

```http
GET /offers/text=monument*
```

The query above will return all events & places that have the word "monument" in its document. This can include
* places with the eventtype `monument`
* events with the label `open monumentendag`
* an event that has the word "oorlogsmonument" or "monumentaal" in its document
* ..

## Exact matches

By default the free text search looks for one or more matches with any of the given terms, regardless of their order and/or position in the document's text.

For example, both an event with the title `Lekker vegetarisch` and a different event with the title `Vegetarisch eten is niet lekker` would be returned as results when searching for `text=lekker veggie`.

To limit the results to exact matches, encapsulate the given search terms with double quotes:

```http
GET /offers/?text="lekker vegetarisch"
```

This will only return results that have `lekker vegetarisch` in exactly that order in their text.

Encapsulated terms can still be combined with other terms, for example:

```http
GET /offers/?text="lekker vegetarisch" eten bereiden koken
```

## Localization \(Translations\)

By default the free text search looks for matching terms in both the original documents and their translations.

To limit your free text queries to one or more specific languages, you can use the `textLanguages` URL parameter.

```http
GET /offers/?text="the editors"&textLanguages[]=nl
```

You can search through multiple languages by repeating the same parameter with a different value:

```http
GET /offers/?text="the editors"&textLanguages[]=nl&textLanguages[]=fr
```

> Note that the `textLanguages` parameter does not filter documents by their available languages. For example, when searching in both `nl` and `fr`, you can get results that only have either one language but still have a matching term in that specific language.
