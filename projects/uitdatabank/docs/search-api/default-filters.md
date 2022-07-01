# Default filters

The search API applies a couple of filters by default to provide you with the most relevant results for most use cases:

-   `workflowStatus`: only results with the status `APPROVED` or `READY_FOR_VALIDATION` are returned by default.
-   `availableFrom`: only results with an availableFrom-date equal or less than the now-date are returned by default.
-   `availableTo`: only results that with an availableTo-date equal or bigger then the now-date are returned by default.
-   `addressCountry`: only results that are in Belgium are returned by default.
-   `audienceType`: only results that have an `audienceType` set to `everyone` are returned by default.

You can either disable these filters individually, or disable them all at once.

## Disable individual filters
### workflowStatus
Disabling the default workflowStatus filter will also show results with status `DRAFT`, `DELETED` and `REJECTED`.
```
GET /offers/?workflowStatus=*
```

### availableFrom
Disabling the default `availableFrom` filter will also show results with an `availableFrom`-date in the future. 
<!-- theme: info -->

> Note that when disabling this filter you will get results that may not be published yet.

```
GET /offers/?availableFrom=*
```

### availableTo
Disabling the default `availableTo` filter will also show results with an `availableTo`-date in the past. 
<!-- theme: info -->

> Note that when disabling this filter you might get results that are not relevant anymore.
```
GET /offers/?availableTo=*
```

### addressCountry
Disabling the default `addressCountry` filter will also show results outside Belgium.
```
GET /offers/?addressCountry=*
```

### audienceType
Disabling the default `audienceType` filter will also show results with audienceType `members` and `education`.
```
GET /offers/?audienceType=*
```

## Disable multiple filters
It is possible to disable multiple filters at once, as in the example below.

```
GET /offers/?workflowStatus=*&addressCountry=*&audienceType=*
```

## Disable all filters at once
In order to disable all filters at once you can set the `disbableDefaultFilters` parameter to `true`.
```
GET /offers/?disableDefaultFilters=true
```
