# Pagination

Every search endpoint supports pagination using two url parameters:

* `start`: the number of results to skip (`int`, defaults to 0)
* `limit`: the number of results to return in a single page (`int`, defaults to 30)

Pagination will only work for a limited result set:

* The maximum value for for `start` is set to `10000`
* The maximum value for `limit` is set to `2000`

## Examples

### Valid value for `start` and `limit` parameter

**request**

```
GET /offers/?start=10&limit=5
```

**response**

```json
{
  "@context": "http://www.w3.org/ns/hydra/context.jsonld",
  "@type": "PagedCollection",
  "itemsPerPage": 5,
  "totalItems": 12,
  "member": [
    {
      "@id": "https://io.uitdatabank.be/event/441a5831-a65e-44fa-81ef-5c47e9c57a05",
      "@type": "Place"
    },
    {
      "@id": "https://io.uitdatabank.be/event/d8cac5d6-c2b5-4c8d-b730-d9801a920c89",
      "@type": "Event"
    }
  ]
}
```

Because we skipped the first 10 results, and we only have a total of 12 results, we only get the last 2 results for this particular request.

### Exceed maximum value for `start`

**request**

```
GET /offers/?start=15000&limit=100
```

**response**

```json
{
   "title":"Not Found",
   "type":"https://api.publiq.be/probs/url/not-found",
   "status":404,
   "detail":"The ""start"" parameter should be between 0 and 10000"
}
```

### Exceed maximum value for `limit`

**request**

```
GET /offers/?start=0&limit=2001
```

**response**

```json
{
   "title":"Not Found",
   "type":"https://api.publiq.be/probs/url/not-found",
   "status":404,
   "detail":"The \"limit\" parameter should be between 0 and 2000"
}
```
