# Embedding result data

By default, the search API endpoints only return a list of links to the individual search results.

For example:

```json
{
   "@context": "http://www.w3.org/ns/hydra/context.jsonld",
   "@type": "PagedCollection",
   "itemsPerPage": 30,
   "totalItems": 86978,
   "member": [
      {
         "@id": "https://io.uitdatabank.be/event/d9a71b53-1756-4126-9926-a83f5dd84f45",
         "@type": "Event"
      },
      {
         "@id": "https://io.uitdatabank.be/place/557d0ddc-efc9-42b3-934b-9f88b0945ab1",
         "@type": "Place"
      },
      "..."
   ]
}
```

To get the actual bodies of the results, there are two options:

* Loop over the results yourself and perform GET requests using the given URLs
* Use the `embed`  URL parameter to include the complete result bodies in the response (`bool`, defaults to `false`)

<!-- theme: success -->

> Including the result bodies is not done by default because it used to have a small performance impact as the data was fetched on the fly in the background. This is no longer the case as the data is now cached in Search API v3 itself, but the default has not been changed yet so that integrations that do not require the result data and have bandwidth limitations do not suddenly get responses that are a lot bigger than before.

## Applicable URLs

* `GET /events`
* `GET /places`
* `GET /offers`
* `GET /organizers`

## Recommended use

We recommend setting the `embed` parameter to `true` in order to limit the amount of requests that need to be made if you require the result data. However, if you do not need the result data, for example if you only need the result count and you have bandwidth concerns, we recommend that you explicitly set the `embed` parameter to `false` in case the default behavior should ever change.

## Examples

### Without embedding

**request**

```
GET /offers
```

or

```
GET /offers/?embed=false
```

**response**

The response contains a list of links to the individual search results:

```json
{
   "@context":"http://www.w3.org/ns/hydra/context.jsonld",
   "@type":"PagedCollection",
   "itemsPerPage":30,
   "totalItems":86978,
   "member":[
      {
         "@id":"https://io.uitdatabank.be/event/d9a71b53-1756-4126-9926-a83f5dd84f45",
         "@type":"Event"
      },
      {
         "@id":"https://io.uitdatabank.be/place/557d0ddc-efc9-42b3-934b-9f88b0945ab1",
         "@type":"Place"
      },
      "..."
   ]
}
```

### With embedding

**request**

```
GET /offers/?embed=true
```

**response**

The response contains actual JSON-LD documents:

```json
{
  "@context": "http://www.w3.org/ns/hydra/context.jsonld",
  "@type": "PagedCollection",
  "itemsPerPage": 30,
  "totalItems": 12,
  "member": [
    {
      "@id": "https://io.uitdatabank.be/place/39e6d5ee-c3d6-453a-bcb5-4e6e0eaf7054",
      "@type": "Place",
      "@context": "/contexts/place",
      "name": {
        "nl": "Jeugdhuis Sojo"
      },
      "address": {
        "addressCountry": "BE",
        "addressLocality": "Kessel-Lo (Leuven)",
        "postalCode": "3010",
        "streetAddress": "Eenmeilaan 1"
      },
      "terms": [
        {
          "id": "JCjA0i5COUmdjMwcyjNAFA",
          "label": "Jeugdhuis of jeugdcentrum",
          "domain": "eventtype"
        }
      ],
      "...": "..."
    },
    "..."
  ]
}
```
