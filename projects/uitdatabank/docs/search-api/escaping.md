# Escaping

Special characters like `:`, `"` or `*` should always be escaped.

## Examples
### Using wildcards in field names
You can use wildcards in field names to search across multiple translated versions. When doing so, the wildcard should be escaped using a backslash, like in the example below:

```
GET /events/q=address.\*.postalCode:9000
```


### Using date time filters 
A colon (`:`) should always be escaped using a backlash (`\`), e.g. in a date time filter.

```
GET /offers/?q=dateRange:2023-01-01T00\:00\:00%2B01\:00
```

If colons are not escaped correctly, ElasticSearch will consider it as key-value separators. An error will be thrown.

