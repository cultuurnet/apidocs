# Age

It is possible to filter the results from Search API based on the age group the event or place is targetted towards.

## Parameters

### minAge 

With the `minAge` URL parameter you can find events and/or places which are only accessible to people of a certain age, or are targetted to people of certain minimum age. You can use the `minAge` parameter on its own, or combined it with other parameters like `maxAge`.

**Applicable on endpoints**

`offers` `events` `places`

**Examples**

Retrieve all events that are targetted to adults

```http
GET /events/?minAge=18
```

### maxAge

With the `maxAge` URL parameter you can find events and/or places which are are targetted to people of certain maximum age. ou can use the `maxAge` parameter on its own, or combined it with other parameters like `minAge`.

**Applicable on endpoints**

`offers` `events` `places`

**Examples**

Retrieve all events that are targetted to minors

```http
GET /events/?maxAge=17
```

### allAges

With the `allAges` parameter you can filter out events and place that are (not) suitable for all ages.

**Applicable on endpoints**

`offers` `events` `places` 

**Examples**

Retrieve all places that are suitable for all ages:

```http
GET /events/?allAges=true
```

Retrieve all places that are not suitable for all ages:

```http
GET /events/?allAges=false
```

Setting allAges to `*` returns both events and places that are suitable for all ages and those that are only suitable for a specific age range (default):

```http
GET /offers/?allAges=*
```

The `allAges`

### typicalAgeRange

With the `typicalAgeRange` advanced query parameter you can filter out events and/or places that are targetted towards a certain age group.

**Applicable on endpoints**

`offers` `events` `places`

**Examples**

...

```http
GET /events/?maxAge=17
```


Using the q parameter, you can execute more advanced queries than by using the minAge and/or maxAge URL parameter.

For example:

GET https://search.uitdatabank.be/offers/?q=typicalAgeRange:[12 TO 14] OR typicalAgeRange:[* TO 8]
You can also use the same allAges parameter as mentioned above:

GET https://search.uitdatabank.be/offers/?q=allAges:false
