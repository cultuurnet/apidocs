# Price info
Events and places can have pricing information attached to them.
One entity can have several price lines of information, with a different category/name combination.

## Basic structure</h2>
Each price line in Uitdatabank breaks down into several components:

| Property      | Type   | Description                                                                                                                                    | Example          |
|---------------|--------|------------------------------------------------------------------------------------------------------------------------------------------------|------------------|
| category      | string | The first price info object has category ‘base’, all the following objects have category ‘tariff’ (differentiated price for specific segments) | base             |
| name          | array  | Category ‘base’ should always have ‘Basistarief’ for name, discounts for specific segments can be named with category ‘tariff’                 | “nl”: “Senioren” |
| price         | number | Pricevalue is a floating-point number, use 0.0 for free events/places                                                                          | 10.0             |
| priceCurrency | string | 3-characters currency indicator                                                                                                                | EUR              |

```json json_schema
{
  "type": "object",
  "properties": {
    "priceInfo": {
       "$ref": "./../../../models/common-priceInfo.json"
     }
  }
}
```

### What is the category base?
The 'base' category the primary pricing baseline for events or places. This price will later be used for calculating discounts (eg. Uitpas tariff).
When defining a price info object with the category 'base,' it should always use the recommended matching name:

| Language | Translation   |
|----------|---------------|
| nl       | Basistarief   |
| fr       | Tarif de base |
| en       | Base tariff   |
| de       | Basisrate     |

### What is a category tariff?
The 'tariff' category is used to specify differentiated pricing for specific segments of an event/place. Unlike the 'base' category, which represents the primary price, 'tariff' is employed to define discounts or alternate price structures for distinct target groups or conditions, and you can create as many as you want for a single event or place.

When using the 'tariff' category, you can define the name based on the specific segment or condition for which the price is being set. For example, you can name it 'Student Discount,' 'Senior Citizens,' or 'Early Bird Pricing.'

### What is the category Uitpas?
The 'Uitpas' category is a special category that is automatically generated when working when creating your base price. It is used to represent the discounted price that is granted to specific target groups.

The price value under the 'Uitpas' category is automatically determined by the system. It is based on a discounted price derived from the 'base' price. Users do not have the ability to set or modify the price value for this category as it is automatically created based on the 'base' price.

## Relevant API calls
* [Update an event price info](./../../../models/event-priceInfo.json)
* [Update a place info](./../../../models/place-priceInfo.json)
* [Get the price info for an event](./../../../models/event.json)
* [Get the price info for a place](./../../../models/place.json)
