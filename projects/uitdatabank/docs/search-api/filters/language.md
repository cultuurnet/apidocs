# Languages and translations

All documents created in UiTdatabank are available in Dutch (`NL`). Besides Dutch, content editors can use UiTdatabank to translate the `name` and `description` of their documents in French (`FR`), German (`DE`) and English (`EN`). The API supports translations in every [two-letter language ISO 639-1 code](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes).

## Parameters

In the UiTdatabank API you can use the following parameters to get relevant (translated) information:
* [languages](#languages): to limit your results to documents that have translations for `name` and `description` in a specific language
* [\_exists\_](#\_exists\_): to look for documents that have a translation for one or more specific fields (e.g. `address`)
* [completedLanguages](#completedlanguages): to only look for documents that are fully translated to a specific language
* [mainLanguage](#mainlanguage): to filter documents based on their initial language

### languages

To limit your results to documents that have translations for `name` and `description` in a specific language, you can use the `languages` URL parameter, or the `languages` field in [advanced queries](../advanced/advanced-queries.md).

**Applicable on endpoints**

`/events` `/places` `/offers` `/organizers`

**Possible values**

Allowed values for both are any of the [two-letter language ISO 639-1 codes](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes), but the most used languages are `NL`, `FR`, `DE` and `EN`.

**Examples**

An example to get results that have a French translation for the `name` and/or `description`:

```http
GET /offers/?languages[]=fr
```

You can repeat this parameter to filter by multiple languages. Note that this uses the `AND` operator, so you will only get results that have translations for both languages in the `name` and/or `description` field):

```http
GET /offers/?languages[]=fr&languages[]=de
```

Using the `q` parameter, you can execute more [advanced queries](../advanced/advanced-queries.md) than by using the `languages` URL parameter. For example:

```http
GET /offers/?q=languages:("FR" OR "DE")
```

## \_exists\_

With the `languages` parameter above, you might still get results that only have partial translations. This is because as soon as a single field (`name` or `description`) is translated to a specific language, the whole document is considered to have a translation in that specific language \(albeit an incomplete one\).

If you require specific fields to be translated, you can search for those documents by using the `_exists_` field in the advanced query parameters.

**Applicable on endpoints**

`/events` `/places` `/offers` `/organizers`

**Possible values**

* `address.{language}`
* `description.{language}`
* `location.name.{language}`
* `name.{language}`
* `organizer.name.{language}`

**Examples**

```http
GET /events/?q=_exists_:name.fr AND _exists_:description.fr
```

The example above will filter out any documents that do not have both their `name` and `description` translated to French.

The same way, you can also search for documents that are missing translations for specific fields:

```http
GET /offers/?q=!(_exists_:name.fr) OR !(_exists_:description.fr)
```

This will return all documents that are missing French translations for either `name` and/or `description`.

## completedLanguages

Alternatively, you use the `completedLanguages` URL parameter \(and field in [advanced queries](../advanced/advanced-queries.md) to only look for documents that are fully translated to a specific language.

**Applicable on endpoints**

`/events` `/places` `/offers` `/organizers`

**Possible values**

Allowed values for both are any of the [two-letter language ISO 639-1 codes](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes), but the most used languages are `NL`, `FR`, `DE` and `EN`.

**Examples**

Look for documents that are fully translated in French, by using the URL parameter `completedLanguages`:

```http
GET /offers/?completedLanguages[]=fr
```

or by using the advanced query parameter `completedLanguages`:

```http
GET /places/?q=completedLanguages:(fr OR de)
```

> Note that if an optional field is left empty in all languages, a translation can still be considered to be complete if all other fields that have a value are translated.

## mainLanguage

The majority of the documents created in UiTdatabank starts as Dutch and can then be translated to other languages. However, it is possible to create events, places and organizers in another language. To accommodate this, each document already has a `mainLanguage` property on which you can also search in the Search API.

**Applicable on endpoints**

`/events` `/places` `/offers` `/organizers`

**Possible values**

Allowed values for both are any of the [two-letter language ISO 639-1 codes](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes), but the most used languages are `NL`, `FR`, `DE` and `EN`.

**Examples**

Look for al documents that have the mainLanguage `NL` with the `mainLanguage` URL-parameter:

```http
GET /offers/?mainLanguage=nl
```

Or by using [advanced queries](../advanced/advanced-queries.md):

```http
GET /offers/?q=mainLanguage:nl
```
