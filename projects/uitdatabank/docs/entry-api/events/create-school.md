---
stoplight-id: c7be5835e744b
---

# School events

School events are events that are specifically organized and intended for:

* students (e.g. a school performance)
* teachers (e.g. an after-school training)

School events are published on [Cultuurkuur](https://www.cultuurkuur.be), but not on UiTinVlaanderen.

Creating a school event is very similar to [creating a regular new event](./create.md), so it is recommended to read that guide first.

> There is also a user interface available to enter school events, on <https://www.uitdatabank.be>. We recommend using this interface, instead of building an API integration, if you only organize a limited number of school events per year.
>
> For questions about school events, please contact <vragen@cultuurkuur.be>.

## Required permissions

As with regular events, anyone can create new school events in UiTdatabank by using either a user access token or a client access token.

The user or client that created the event will become its `creator`, which allows them to later make changes to it or delete it. In some cases other users or clients may also be able to edit the event afterward. See the permissions info in the guide about [updating an event](./update.md) for more info.

## Types

We distinguish 3 different types of school events.

### School performances

School performances are events of which both the date and the location is known in advance. For example, a theater performance aimed at a toddler of 3-4 years old in "hetpaleis" on 14/05/2023, from 14:30 to 16:00.

* ✅ date is known in advance
* ✅ location is known in advance

### Guided tours

Guided tours are events that have no specific date (or the date is not known in advance), but they do have a location. For example, a guided tour in the Royal Museum of Fine Arts Antwerp.

* ❌ date is not known in advance
* ✅ location is known in advance

### Bookable events

Bookable events are events that have no specific date and location (or the date and location is not known in advance). Both the date and the location are determined in mutual agreement between the organizer or artist and the consumer (school).

For example, as a school you can book Stijn Meuris for a school performance at your school or local cultural centre, on a date that suits both the artist and the school.

* ❌ date is not known in advance
* ❌ location is not known in advance

## Creating a school event

Creating a school event is the same as [creating a regular event](./create.md), but with some extra required properties:

1. The `audience.audienceType` property must be set to `education`
2. The event must be linked to an `organizer` that has the `Cultuurkuur` label
3. In case of a [guided tour](#guided-tours) or a [bookable event](#bookable-events), the `calendarType` must be set to `permanent`
4. In case of a [bookable event](#bookable-events), the *"Location in consultation with the school"* place must be used for the location
5. The event must have at least one label that indicates the education level of the target audience

We will go over these required properties in more detail below, followed by some examples.

### audienceType

For school events you must include an extra property `audienceType` and set the value for the property to `education`.

```json
{
  "audience": {
    "audienceType": "education"
  }
}
```

### organizer

Every school event must be linked to an [existing organizer page on Cultuurkuur](https://www.cultuurkuur.be/organisaties).

**How to check if your organization already has an organizer page on Cultuurkuur:**

1. Go to <https://www.cultuurkuur.be/organisaties>
2. Type in the name of your organization in the search box, e.g. `hetpaleis`
3. If a match is found, open the detail page of the organization
4. In the url of the browser you'll find the identifier of the organizer in UiTdatabank:

![](../../../assets/images/cultuurkuur-search-organizer.png)

Prefix this value with the host url of the according environment and use this as the value for the `organizer.@id` property in the `POST /events` request. For example on production:

```json
{
  "organizer": {
    "@id": "https://io.uitdatabank.be/organizers/d319d57f-7400-4c16-aa19-8f04992da3fa"
  }
}
```

> Only in the case the organizer of your event does not already have its own page on Cultuurkuur yet, you can [create a new organizer on UiTdatabank](../organizers/school-organizer.md).

### calendarType

In case of a [guided tours](#guided-tours) or [bookable event](#bookable-events) you must set the value for the `calendarType` property to `permanent`.

```json
{
  "calendarType": "permanent"
}
```

In case of [school performances](#school-performances), you must set the `calendarType` property to `single`, `multiple` or `periodic` depending on the schedule of the performance.

See the [guide about calendar info](../shared/calendar-info.md) for more details.

### location

In case of a [bookable event](#bookable-events) you must use the url of the *"Location in consultation with the school"* place as the value for the `location.@id` property in the `POST /events` request of the event(s) that you want to create.

On the other hand, [school performances](#school-performances) and [guided tours](#guided-tours) must be linked to the place that they are happening at.

**URLs for "location in consultation with school" places**:

* Test environment: `https://io-test.uitdatabank.be/place/3b92c85b-a923-4895-85f5-ed056dae11e2`
* Production environment: `https://io.uitdatabank.be/place/c3f9278e-228b-4199-8f9a-b9716a17e58f`

```json
{
  "location": {
    "@id": "https://io.uitdatabank.be/place/c3f9278e-228b-4199-8f9a-b9716a17e58f"
  }
}
```

### labels

For school events, specific Cultuurkuur-related labels are mandatory.

Each school event must have **at least one** education level label. Education level labels indicate to which education levels (grades) the school event is aimed at.

There is a hierarchical relationship between the different education level labels, and this hierarchy must be followed.

<!-- theme: warning -->

> **In 2025** we changed the labels for `Secundair onderwijs`

<!-- theme: warning -->

> **In 2025** we changed the hierarchy depth from 4 to 3 levels.

**Examples**:

* If a level 3 label (e.g. `cultuurkuur_Kleuter-2-3-jaar`) is applicable on an event, the corresponding level 2 and level 1 label must also be added to the event: `cultuurkuur_Gewoon-kleuteronderwijs` (level 2) and `cultuurkuur_Gewoon-basisonderwijs` (level 1)
* If only level 1 label is applicable (e.g. `cultuurkuur_Volwassenenonderwijs`), then it suffices to add only the level 1 label

The complete list of Cultuurkuur labels can be found at the following endpoint: `https://io.uitdatabank.be/cultuurkuur/education-levels`

## Request body examples

### School performance

Example of a theater performance aimed at toddlers of 3-4 years old in "hetpaleis" on 14/05/2023, from 14:30 to 16:00.

```json
{
   "mainLanguage":"nl",
   "name":{
      "nl":"Example of a school performance"
   },
   "location":{
      "@id":"https://io-test.uitdatabank.be/place/be6673e8-8149-4470-bb79-14293f412a39"
   },
   "terms":[
      {
         "id":".0.55.0.0.0"
      }
   ],
   "calendarType":"single",
   "startDate":"2023-05-23T13:00:00+00:00",
   "endDate":"2023-05-23T14:30:00+00:00",
   "subEvent":[
      {
         "@type":"Event",
         "startDate":"2023-05-14T14:30:00+02:00",
         "endDate":"2023-05-14T16:00:00+02:00"
      }
   ],
   "audience":{
      "audienceType":"education"
   },
   "labels":[
      "cultuurkuur_Leerlingen",
      "cultuurkuur_dans",
      "cultuurkuur_basisonderwijs",
      "cultuurkuur_Gewoon-basisonderwijs",
      "cultuurkuur_Gewoon-kleuteronderwijs",
      "cultuurkuur_Kleuter-3-4-jaar"
   ]
}
```

### Guided tour

Example of a guided tour at the Royal Museum of Fine Arts Antwerp aimed at university and college students.

```json
{
   "mainLanguage":"nl",
   "name":{
      "nl":"Example of a guided tour"
   },
   "location":{
      "@id":"https://io-test.uitdatabank.be/place/f4f69e51-ac3f-4790-9861-5c881df7aad8"
   },
   "terms":[
      {
         "id":"0.7.0.0.0"
      }
   ],
   "calendarType": "permanent",
   "audience":{
      "audienceType":"education"
   },
   "labels":[
      "cultuurkuur_Leerlingen",
      "cultuurkuur_kunst-en-cultuur",
      "cultuurkuur_Hoger-onderwijs"
   ]
}
```

### Bookable event

Example of a bookable school event aimed at students of "derde graad BSO". Note that the location points to the *"Locatie in overleg met de school"* place on the test environment in this case.

```json
{
   "mainLanguage":"nl",
   "name":{
      "nl":"Example of a bookable school event"
   },
   "location":{
      "@id":"https://io-test.uitdatabank.be/place/3b92c85b-a923-4895-85f5-ed056dae11e2"
   },
   "terms":[
      {
         "id":"0.55.0.0.0"
      }
   ],
   "calendarType":"permanent",
   "audience":{
      "audienceType":"education"
   },
   "labels":[
      "cultuurkuur_Leerlingen",
      "cultuurkuur_kunst-en-cultuur",
      "cultuurkuur_Secundair-onderwijs",
      "cultuurkuur_Voltijds-gewoon-secundair-onderwijs",
      "cultuurkuur_derde-graad",
      "cultuurkuur_derde-graad-BSO"
   ]
}
```
