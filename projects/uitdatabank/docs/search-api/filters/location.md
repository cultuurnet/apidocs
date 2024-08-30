# Filtering on location

It is possible to filter the results from Search API based on the geographical information. There are many different options, which we outline in detail in this guide.

## Filtering
### On countries

You can filter results from Search API based on the country the event / place / organizer is in.

Note that the UiTdatabank search API uses by default

`addressCountry`
<!-- 
addressCountry (mention default filter on this and link to that guide)
--> 

### On regions

`regions`

### On municipalities and postal codes

`address.\*.postalCode` 
`addressLocality`

### On specific locations

`locationId` 
`location.id`

`location.name`

`virtual location`

### On specific coordinates

### With distance

### With bounds



## Example requests
