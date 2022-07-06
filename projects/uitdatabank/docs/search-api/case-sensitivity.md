# Case sensitivity

Unless noted otherwise:
-   All parameters are `case-sensitive`
-   All values are `case-insensitive`

## Parameters are case-sensitive

Every parameter should be written in `camelCase`: seperation of words is done with a single capitalized letter, and the first word starting with either case.

### Examples

#### Using the `bookingAvailability` parameter correctly (with camelCase)

**request**
```
GET /offers/?q=bookingAvailability:unavailable
```

**response**

Results are returned ✅
```js
{
   "@context":"http://www.w3.org/ns/hydra/context.jsonld",
   "@type":"PagedCollection",
   "itemsPerPage":30,
   "totalItems":157,
   "member":[ ],
   ...
}
```

#### Using the `bookingavailability` parameter incorrectly (without camelCase)

**request**
```
GET /offers/?q=bookingavailability:unavailable
```

**response**

No results are returned ❌
```js
{
   "@context":"http://www.w3.org/ns/hydra/context.jsonld",
   "@type":"PagedCollection",
   "itemsPerPage":30,
   "totalItems":0,
   "member":[ ]
}
```

## Values are case-insensitive

All values you can pass to  parameter are case-insensitive. This also goes for fields that look for "exact" matches, such as IDs and labels.

### Examples

#### Search on the label `UiTPAS` 
**request**
```
GET /offers/?q=labels:UiTPAS
```

**response**

Results are returned ✅
```js
{
   "@context":"http://www.w3.org/ns/hydra/context.jsonld",
   "@type":"PagedCollection",
   "itemsPerPage":30,
   "totalItems":198,
   "member":[ ],
   ...
}
```

#### Search on the label `uitpas` 

**request**
```
GET /offers/?q=labels:uitpas
```

**response**

The same results are returned as when using the correct casing for "UiTPAS" ✅
```js
{
   "@context":"http://www.w3.org/ns/hydra/context.jsonld",
   "@type":"PagedCollection",
   "itemsPerPage":30,
   "totalItems":198,
   "member":[ ],
   ...
}
```
