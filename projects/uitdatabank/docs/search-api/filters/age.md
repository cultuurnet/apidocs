# Age

It is possible to filter the results from Search API based on the age group the event or place is targetted towards.

## Parameters
### minAge

With the `minAge` URL parameter you can find events and/or places which are only accessible to people of a certain age, or are targetted to people of certain minimum age.

**Applicable on endpoints**

`offers` `events` `places`

**Examples**

Retrieve all events that are targetted to adults

```http
GET /events/?minAge=18
```

### maxAge

With the `maxAge` URL parameter you can find events and/or places which are are targetted to people of certain maximum age.

**Applicable on endpoints**

`offers` `events` `places`

**Examples**

Retrieve all events that are targetted to minors

```http
GET /events/?maxAge=17
```

### Age



**Applicable on endpoints**

`offers` `events` `places` 

**Examples**



```http
GET ...
```

## typicalAgeRange

With the `typicalAgeRange` advanced query parameter you can filter out events and/or places that are targetted towards a certain age group.

**Applicable on endpoints**

`offers` `events` `places`

**Examples**

...

```http
GET /events/?maxAge=17


