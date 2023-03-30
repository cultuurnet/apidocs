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

## Case sensitivity

The sort field names must be handled case insensitively. e.g. both `Name` and `name` must be accepted.
