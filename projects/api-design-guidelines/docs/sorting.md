# Sorting

Endpoints that support sorting based on one or more field names and order(s) must use a `sort` query parameter with the following syntax:

```
?sort=[-]field_name_1[,[-]field_name_2]...
```

Example

```
?sort=name,-creationDate
```

In the example above, the results would first be sorted by `name` in ascending order, and then by `creationDate` in an descending order.

The endpoints using a sort parameter, must clearly document the allowed sort field values.

This syntax for sorting was inspired by `json:api`, for more info see <https://jsonapi.org/format/#fetching-sorting>.

## Case sensitivity

The sort field names must be handled case insensitively. e.g. both `Name` and `name` must be accepted.

## Deprecated syntax

In ealier versions of these guidelines, and in multiple existing endpoints, a different syntax was used:

```
?sort[field_name_1]=desc&sort[field_name_2]=asc
```

In the example above, the results would first be sorted by `field_name_1` in a `desc` order, and then by `field_name_2` in an `asc` order.

This was changed to the new syntax above because relying on query param order isn't a recommended approach and difficult to implement in some programming languages / frameworks. (e.g. generated Java server stub code from openapi files)

Endpoints that support this old sort style, must continue to do so for backward compatibility. Those endpoints can of course introduce the new sort syntax next to the old one.
