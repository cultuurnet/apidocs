# Reuse places & organizers

<!-- theme: warning -->
> 
> When sending event content to UiTdatabank trough the Entry API it is essential to reuse existing organizer IDs and place IDs in your requests. Otherwise your integration can be blocked because of the creation of duplicates. Only when a certain place or organizer does not exist yet, a new one can be created.

On this page, we outline some options to reuse existing places & organizers from UiTdatabank in your integration.

## Reuse existing places
### Solution 1: store the place ID(s) inside your application
This is the simplest method. You simply store the identifer(s) of the place(s) inside your application. 

*   ✅ Suitable when all the events created through your application all have the same location
*   ✅ Suitable when the events created through your application can have a different location, but (1) the amount of locations is limited & (2) the list of locations is static and won't change a lot over time
*   ❌ Not suitable when the locations for the events of created through your application are are unpredicatble in advance


#### Example

In the example below, all the events created through the integration take place in the "Het Depot", a concert hall in Leuven. First you'll need to find the identifier of the place `Het Depot` in UiTdatabank. 

**request**

Perform a `GET` request to the UiTdatabank API including the name of the location and the postal code:

```
GET /places/?q=name.\*:"Het Depot" AND address.\*.postalCode:3000
```

**response**

The response now contains the identifier of "Het Depot":
```js
{
   "@context":"http://www.w3.org/ns/hydra/context.jsonld",
   "@type":"PagedCollection",
   "itemsPerPage":30,
   "totalItems":1,
   "member":[
      {
         "@id":"https://io.uitdatabank.be/place/8248e289-c986-4006-902f-b0616dcbcde7",
         "@type":"Place"
      }
   ]
}
```

You can now store the identifier of the location "Het Depot" (`8248e289-c986-4006-902f-b0616dcbcde7`) in your application to reuse it when creating an event in UiTdatabank through the Entry API

### Solution 2: search existing locations within the entry form

In this solution you directly integrate with the UiTdatabank Search API in your own entry form.

*   ✅ Suitable when the locations for the events created through your application are unpredictable in advance
*   ❌ Not recommended when the events created through your application all have the same location
*   ❌ Not recommended when the events created through your application can have a different location, but (1) the amount of locations is limited & (2) the list of locations is static and won't change a lot over time

#### Example

In the example below, a user in your entry form types the name "Het Depot":

Under the hood an API call to the UiTdatabank Search API is made to check if that location already exists:

**request**

```
GET /places/?q=name.\*:"Het Depot" AND address.\*.postalCode:3000
```

**response**

The response now contains the identifier of "Het Depot":
```js
{
   "@context":"http://www.w3.org/ns/hydra/context.jsonld",
   "@type":"PagedCollection",
   "itemsPerPage":30,
   "totalItems":1,
   "member":[
      {
         "@id":"https://io.uitdatabank.be/place/8248e289-c986-4006-902f-b0616dcbcde7",
         "@type":"Place"
      }
   ]
}
```

If the location already exists, it is suggested in the user interface in a human-readable way so that the user can choose to reuse the location:

Only when no results are found, or the results found do not match the location that the user wants to use, a new place can be created.

### Solution 3: provide a mapping when exporting your data to UiTdatabank

## Reuse existing organizers
### Solution 1: store the organizer ID(s) inside your application
This is the simplest method. You simply store the identifer(s) of the organizer(s) inside your application. 

*   ✅ Suitable when all the events created through your application all have the same organizer
*   ✅ Suitable when the events created through your application can have a different organizer, but (1) the amount of organizers is limited & (2) the list of organizers is static and won't change a lot over time
*   ❌ Not suitable when the organizers for the events of created through your application are unpredictable in advance

#### Example

In the example below, all the events created through the integration have the same organizer, "Natuurpunt Holsbeek"
. First you'll need to find the identifier of the organizer `Natuurpunt Holsbeek` in UiTdatabank. 

**request**

Perform a `GET` request to the UiTdatabank API including the name of the organizer

```
GET /organizers/?q=name.\*:"Natuurpunt Holsbeek"
```

<!-- theme: warning -->
>
> For organizers, only search for the `name` and do not include a search on `postalCode` (since this is an optional field for organizers).

**response**

The response now contains the identifier of "Natuurpunt Holsbeek":
```js
{
   "@context":"http://www.w3.org/ns/hydra/context.jsonld",
   "@type":"PagedCollection",
   "itemsPerPage":30,
   "totalItems":1,
   "member":[
      {
         "@id":"https://io.uitdatabank.be/organizers/e83edb7f-6f23-47cd-a730-66fd7687f116",
         "@type":"Organizer"
      }
   ]
}
```

You can now store the identifier of the organizer "Natuurpunt Holsbeek" (`e83edb7f-6f23-47cd-a730-66fd7687f116`) in your application to reuse it when creating an event in UiTdatabank through the Entry API.

### Solution 2: search existing organizers within the entry form

In this solution you directly integrate with the UiTdatabank Search API in your own entry form.

*   ✅ Suitable when the organizers for the events created through your application are unpredictable in advance
*   ❌ Not recommended when the events created through your application all have the same organizer
*   ❌ Not recommended when the events created through your application can have a different organizer, but (1) the amount of organizers is limited & (2) the list of organizers is static and won't change a lot over time

#### Example

In the example below, a user in your entry form types the name "Natuurpunt Holsbeek":

Under the hood an API call to the UiTdatabank Search API is made to check if that organizer already exists:

**request**

```
GET /organizers/?q=name.\*:"Natuurpunt Holsbeek"
```

**response**

The response now contains the identifier of "Natuurpunt Holsbeek":
```js
{
   "@context":"http://www.w3.org/ns/hydra/context.jsonld",
   "@type":"PagedCollection",
   "itemsPerPage":30,
   "totalItems":1,
   "member":[
      {
         "@id":"https://io.uitdatabank.be/organizers/e83edb7f-6f23-47cd-a730-66fd7687f116",
         "@type":"Organizer"
      }
   ]
}
```

If the organizer already exists, it is suggested in the user interface in a human-readable way so that the user can choose to reuse the organizer:

Only when no results are found, or the results found do not match the organizer that the user wants to use, a new organizer can be created.

### Solution 3: provide a mapping when exporting your data to UiTdatabank
