# Sorting

Endpoints that support sorting based on one or more field names and order(s) must use a `sort` query parameter with the following syntax:

```
?sort[field_name_1]=desc&sort[field_name_2]=asc
```

In the example above, the results would first be sorted by `field_name_1` in a `desc` order, and then by `field_name_2` in an `asc` order.

## Case sensitivity

The orders `asc` and `desc` must be handled case insensitively. So both `asc` or `ASC` must be accepted.
