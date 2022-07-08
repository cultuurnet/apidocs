# Facets

It is possible to get facet counts for specific filters using the `facets` URL parameter.

Supported values are:
-   `regions`
-   `types`
-   `themes`
-   `facilities`
-   `labels`

## Request individual facets

### Facilities
Applicable on: `/offers`, `/events`, `/places`

**Example request**
```
GET /offers/?facets[]=facilities
```

**Example response**
```js
{
   "@context":"http://www.w3.org/ns/hydra/context.jsonld",
   "@type":"PagedCollection",
   "itemsPerPage":30,
   "totalItems":87637,
   "member":[
      "..."
   ],
   "facet":{
      "facilities":{
         "3.23.2.0.0":{
            "name":{
               "nl":"Assistentie",
               "fr":"Assistance",
               "de":"Hilfe",
               "en":"Assistance"
            },
            "count":26
         },
         "3.23.3.0.0":{
            "name":{
               "nl":"Rolstoel ter beschikking",
               "fr":"Disponibilité de fauteuils roulants",
               "de":"Rollstuhl verfügbar",
               "en":"Wheelchair available"
            },
            "count":14
         }
...
```

### Labels
Applicable on: `/offers`, `/events`, `/places`

**Example request**
```
GET /offers/?facets[]=labels
```

**Example response**
```js
{
   "@context":"http://www.w3.org/ns/hydra/context.jsonld",
   "@type":"PagedCollection",
   "itemsPerPage":30,
   "totalItems":87637,
   "member":[
      "..."
   ],
   "facet":{
      "labels":{
         "ook voor jongeren":{
            "name":{
               "nl":"ook voor jongeren",
               "fr":"ook voor jongeren",
               "de":"ook voor jongeren",
               "en":"ook voor jongeren"
            },
            "count":13614
         },
         "ook voor kinderen":{
            "name":{
               "nl":"ook voor kinderen",
               "fr":"ook voor kinderen",
               "de":"ook voor kinderen",
               "en":"ook voor kinderen"
            },
            "count":13525
         },
         
...      
```

### Themes
Applicable on: `/offers`, `/events`

**Example request**
```
GET /events/?facets[]=themes
```

**Example response**
```js
{
   "@context":"http://www.w3.org/ns/hydra/context.jsonld",
   "@type":"PagedCollection",
   "itemsPerPage":30,
   "totalItems":56048,
   "member":[
      "..."
   ],
   "facet":{
      "themes":{
         "0.52.0.0.0":{
            "name":{
               "nl":"Circus",
               "fr":"Cirque",
               "de":"Zirkus",
               "en":"Circus"
            },
            "count":367
         },
         "1.17.0.0.0":{
            "name":{
               "nl":"Antiek en brocante",
               "fr":"Antiquités ou brocantes",
               "de":"Antik-und Flohmarkt",
               "en":"Antiques"
            },
            "count":133
         }
...
```

### Types
Applicable on: `/offers`, `/events`, `/places`

**Example request**
```
GET /places/?facets[]=types
```

**Example response**
```js
{
   "@context":"http://www.w3.org/ns/hydra/context.jsonld",
   "@type":"PagedCollection",
   "itemsPerPage":30,
   "totalItems":5,
   "member":[
      "..."
   ],
   "facet":{
      "types":{
         "0.5.0.0.0":{
            "name":{
               "nl":"Festival",
               "fr":"Festival",
               "de":"Festival",
               "en":"Festival"
            },
            "count":1
         },
         "0.3.2.0.0":{
            "name":{
               "nl":"Lezing of congres",
               "fr":"Conférence ou congrès",
               "de":"Vortrag oder Gespräch",
               "en":"Lecture or conference"
            },
            "count":1
         },
...
```

### Regions
Applicable on: `/offers`, `/events`, `/places`, `/organizers`

<!-- theme: warning -->

> You should never assume a specific amount of levels for the region facet in your code. Instead, you should parse the given facets recursively by looking for the children property.

**Example request**
```
GET /organizers/?facets[]=regions
```

**Example response**
```js
{
   "@context":"http://www.w3.org/ns/hydra/context.jsonld",
   "@type":"PagedCollection",
   "itemsPerPage":30,
   "totalItems":834,
   "member":[
      "..."
   ],
   "facet":{
      "regions":{
         "nis-40000":{
            "name":{
               "nl":"Provincie Oost-Vlaanderen",
               "fr":"Province de Flandre orientale",
               "de":"Provinz Ostflandern"
            },
            "count":832,
            "children":{
               "reg-gent":{
                  "name":{
                     "nl":"Gent"
                  },
                  "count":826,
                  "children":{
                     "nis-44021":{
                        "name":{
                           "nl":"Gent"
                        },
                        "count":826,
                        "children":{
                           "nis-44021-Z":{
                              "name":{
                                 "nl":"Gent"
                              },
                              "count":749
                           },
                           "nis-44021D-IV":{
                              "name":{
                                 "nl":"Oostakker"
                              },
                              "count":2
                           },
                           "nis-44021E":{
                              "name":{
                                 "nl":"Sint-Amandsberg"
                              },
                              "count":18
                           },
                           
...
```

<!-- theme: info -->

> The key of each facet node is the value you should use to filter that specific field. 
>
> In the example above, you can filter by using the `regionId` URL parameter or the `regions` field in advanced queries in combination with any key from the returned facets, to narrow down your search.

## Request multiple facets at once
It is possible to request multiple facets at once.

**Example request**
```
GET /events/?facets[]=types&facets[]=labels
```



