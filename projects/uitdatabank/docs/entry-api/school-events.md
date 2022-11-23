# School events

School events are events that are specifically organized and intented for:

* students (e.g. a school performance)
* teachers (e.g. an after-school training)

School events are published on [Cultuurkuur](https://www.cultuurkuur.be), but not on UiTinVlaanderen.

> If you’re planning to create school events in UiTdatabank with the Entry API, please contact <content.cultuurkuur@publiq.be> in advance so that we can guide you through this process.

## Types

We distinguish 3 different types of school events:

1. **School performances** are events of which both the date and the location is known in advance.
2. **Guided tours** are events that have no specific date, but they do have a location.
3. **Bookable events** are events that have no specific date and location (or the date and location is not known in advance). Both the date and the location are determined in mutual agreement between the organizer or artist and the consumer (school).

### School performances

<<<<<<< HEAD
School performances are events of which both the date and the location is known in advance. For example, a theater performance aimed at a toddler of 3-4 years old in hetpaleis on 14/05/2023, 14:30 - 16:00 PM. 
=======
School performances are events of which both the date and the location is known in advance. For example, a theater performance aimed at a fourth degree in hetpaleis on 14/05/2023, 14:30 - 16:00 PM.
>>>>>>> 47bf1375e9e8d90b55fca4c1a62aedbdf36463d9

* ✅ date is known in advance
* ✅ location is known in advance

<<<<<<< HEAD
Since school performances both have a date and a location, you can create them in a very similar way to regular events:
* you can use a calendarType of your preference (`single`, `multiple` or `periodic`)
* for the location you must use the URL of an existing place as `location.@id` in the `POST /events` request of the event
=======
Since school performances both have a date and a location, you can create them in a very similar way to regular events. You can use:

* a calendarType of your preference (`single`, `multiple` or `periodic`)
* an existing identifier of a place in UiTdatabank
>>>>>>> 47bf1375e9e8d90b55fca4c1a62aedbdf36463d9

### Guided tours

Guided tours are events that have no specific date (or the date is not known in advance), but they do have a location. For example, a guided tour in the Royal Museum of Fine Arts Antwerp.

* ❌ date is not known in advance
* ✅ location is known in advance

In order to create a guided school tour you must use:
<<<<<<< HEAD
* calendarType `permanent` 
* the URL of an existing place as `location.@id` in the `POST /events` request of the event
=======

* calendarType `permanent`
* an existing identifier of a place in UiTdatabank
>>>>>>> 47bf1375e9e8d90b55fca4c1a62aedbdf36463d9

### Bookable events

Bookable events are events that have no specific date and location (or the date and location is not known in advance). Both the date and the location are determined in mutual agreement between the organizer or artist and the consumer (school).

For example, as a school you can book Stijn Meuris for a school performance at your school or local cultural centre, on a date that suits both the artist and the school.

* ❌ date is not known in advance
* ❌ location is not known in advance

In order to create a bookable school event you must use
<<<<<<< HEAD
* calendarType `permanent` 
* the URL of the dummy place as `location.@id` in the `POST /events` request of the bookable events 

**URL of the dummy place for bookable events**:
* Test environment: `https://io-test.uitdatabank.be/place/3b92c85b-a923-4895-85f5-ed056dae11e2`
* Production environment: `https://io.uitdatabank.be/place/c3f9278e-228b-4199-8f9a-b9716a17e58f`

=======

* calendarType `permanent`
* the identifier of the dummy place for bookable events

**Identifiers of the dummy place for bookable events**:

* Test environment: `3b92c85b-a923-4895-85f5-ed056dae11e2`
* Production environment: `c3f9278e-228b-4199-8f9a-b9716a17e58f`
>>>>>>> 47bf1375e9e8d90b55fca4c1a62aedbdf36463d9

## Creating school events via the Entry API

For the creation of school events several extra requirements apply:

1. The `audienceType` must be set to `education`
2. The event must have an `organizer` that has the `Cultuurkuur` label
3. Specific education related `labels` are mandatory
4. In case of a [guided tour](#Guided-tour) or a [bookable event](#Bookable-events): the `calendarType` must be set to `permanent`
5. In case of a [bookable event](#Bookable-events): the `dummy place for bookable events` must be used for the location

### 1. audienceType

For school events you must include an extra property `audienceType` and set the value for the property to `education`.

```js
{
  "audienceType": "education"
}
```

### 2. organizer

Every school event must be linked to an [existing organizer page on Cultuurkuur](https://www.cultuurkuur.be/organisaties).

<<<<<<< HEAD
**How to check if your organization already has an organizer page on Cultuurkuur:**
=======
**How can you check if your organization already has an organizer page on Cultuurkuur?**

>>>>>>> 47bf1375e9e8d90b55fca4c1a62aedbdf36463d9
1. Go to <https://www.cultuurkuur.be/organisaties>
2. Type in the name of your organization in the search box, e.g. `hetpaleis`
3. If a match is found, open the detail page of the organization
4. In the url of the browser you'll find the identifier of the organizer in UiTdatabank:

![](../../assets/images/cultuurkuur-search-organizer.png)

Prefix this value with the host url of the according environment and use this as the value for the `organizer.@id` property in the `POST /events` request:

```js
{
  "organizer": {
    "@id": "https://io.uitdatabank.be/organizers/d319d57f-7400-4c16-aa19-8f04992da3fa"
  }
}
```

> Only in the case the organizer of your event does not already have its own page on Cultuurkuur yet, you can [create a new organizer on Cultuurkuur](https://www.cultuurkuur.be/faq/hoe-voeg-ik-mijn-organisatie-toe-op-cultuurkuur).

### 3. labels

For school events, specific Cultuurkuur-related labels are mandatory. There are 3 different types of Cultuurkuur-related labels:

1. **Target group labels** are used to specify if the if event is for students or for teachers.
2. **Subject labels** are used to define the learning objective of the school event.
3. **Education level labels**

#### Target group labels

Target group labels are used to specify if the if event is for students or for teachers.

| Target group | Label                      |
| :----------- | :------------------------- |
| Students     | `cultuurkuur_Leerlingen`   |
| Teachers     | `cultuurkuur_leerkrachten` |

> Your school event must have **exactly 1** target group label.

#### Subject labels

Subject labels are used to specify the learning objective of the school event.

| Subject                                     | Label                                                     |
| :------------------------------------------ | :-------------------------------------------------------- |
| Actief Burgerschap                          | `cultuurkuur_Actief Burgerschap`                          |
| Duurzaamheid, natuur en milieu              | `cultuurkuur_Duurzaamheid, natuur en milieu`              |
| Filosofie religie                           | `cultuurkuur_Filosofie-religie`                           |
| Beeldende en audiovisuele kunst             | `cultuurkuur_Beeldende-en-audiovisuele-kunst`             |
| kunst en cultuur                            | `cultuurkuur_kunst-en-cultuur`                            |
| Leren leren                                 | `cultuurkuur_Leren leren`                                 |
| Lichamelijke, sociale en mentale gezondheid | `cultuurkuur_Lichamelijke, sociale en mentale gezondheid` |
| Media                                       | `cultuurkuur_Media`                                       |
| Mobiliteit                                  | `cultuurkuur_Mobiliteit`                                  |
| Muziek                                      | `cultuurkuur_muziek`                                      |
| Ondernemingszin                             | `cultuurkuur_Ondernemingszin`                             |
| Taal                                        | `cultuurkuur_taal`                                        |
| Dans                                        | `cultuurkuur_dans`                                        |
| Wiskunde                                    | `cultuurkuur_Wiskunde`                                    |
| Woordkunst en drama                         | `cultuurkuur_Woordkunst-drama`                            |

> Your school event must have **at least 1** subject label.

#### Education level labels

Education level labels indicate to which education levels (grades) the school event is aimed at.

There is a hierarchical relationship between the different education level labels, and this hierarchy must be followed.

<<<<<<< HEAD
**Examples**:
=======
**For example:**

>>>>>>> 47bf1375e9e8d90b55fca4c1a62aedbdf36463d9
* If a level 4 label (e.g. `cultuurkuur_Kleuter-2-3-jaar`) is applicable on an event, the corresponding level 3, level 2 and level 1 label must also be added to the event: `cultuurkuur_Gewoon-kleuteronderwijs` (level 3), `cultuurkuur_Gewoon-basisonderwijs` (level 2) and `cultuurkuur_basisonderwijs` (level 1)

<!---->

* If only level 1 label is applicable (e.g. `cultuurkuur_Volwassenenonderwijs`), then it suffices to add only the level 1 label

##### Level 1 labels

<<<<<<< HEAD
| Education level | Label (level 1) | 
| :-- | :-- | 
| Basis onderwijs | `cultuurkuur_basisonderwijs` | 
| Secundair onderwijs | `cultuurkuur_Secundair-onderwijs` | 
| Hoger onderwijs | `cultuurkuur_Hoger-onderwijs` | 
| Volwassenenonderwijs | `cultuurkuur_Volwassenenonderwijs` | 
=======
| Education level          | Label                                      |
| :----------------------- | :----------------------------------------- |
| Basis onderwijs          | `cultuurkuur_basisonderwijs`               |
| Secundair onderwijs      | `cultuurkuur_Secundair-onderwijs`          |
| Hoger onderwijs          | `cultuurkuur_Hoger-onderwijs`              |
| Volwassenenonderwijs     | `cultuurkuur_Volwassenenonderwijs`         |
>>>>>>> 47bf1375e9e8d90b55fca4c1a62aedbdf36463d9
| Deeltijds kunstonderwijs | `cultuurkuur_Deeltijds-kunstonderwijs-DKO` |

##### Level 2 labels

> A level 2 label must always be combined with a level 1 label.

**Basisonderwijs**

<<<<<<< HEAD
The following labels must always be combined with level 1 label `cultuurkuur_basisonderwijs`: 

| Education level | Label (level 2) | 
| :-- | :-- | 
| Gewoon basis onderwijs | `cultuurkuur_Gewoon-basisonderwijs` | 
| Buitengewoon basis onderwijs | `cultuurkuur_Buitengewoon-basisonderwijs` | 

**Secundair onderwijs**

he following labels must always be combined with level 1 label `cultuurkuur_Secundair-onderwijs`: 

| Education level | Label (level 2) | 
| :-- | :-- | 
| Voltijds gewoon secundair onderwijs | `cultuurkuur_Voltijds-gewoon-secundair-onderwijs` | 
| Buitengewoon secundair onderwijs | `cultuurkuur_Buitengewoon-secundair-onderwijs` | 
| Deeltijds leren en werken | `cultuurkuur_Deeltijds-leren-en-werken ` | 

**Deeltijds kunstonderwijs**

he following labels must always be combined with level 1 label `cultuurkuur_Deeltijds-kunstonderwijs-DKO`: 

| Education level | Label (level 2)| 
| :-- | :-- |
=======
The following labels must be combined with level 1 label `cultuurkuur_basisonderwijs`:

| Education level              | Label                                     |
| :--------------------------- | :---------------------------------------- |
| Gewoon basis onderwijs       | `cultuurkuur_Gewoon-basisonderwijs`       |
| Buitengewoon basis onderwijs | `cultuurkuur_Buitengewoon-basisonderwijs` |

**Secundair onderwijs**

The following labels must be combined with level 1 label `cultuurkuur_Secundair-onderwijs`:

| Education level                     | Label                                             |
| :---------------------------------- | :------------------------------------------------ |
| Voltijds gewoon secundiar onderwijs | `cultuurkuur_Voltijds-gewoon-secundair-onderwijs` |
| Buitengewoon secundair onderwijs    | `cultuurkuur_Buitengewoon-secundair-onderwijs`    |
| Deeltijds leren en werken           | `cultuurkuur_Deeltijds-leren-en-werken `          |

**Deeltijds kunstonderwijs**

The following labels must be combined with level 1 label `cultuurkuur_Deeltijds-kunstonderwijs-DKO`:

| Education level                 | Label                                         |
| :------------------------------ | :-------------------------------------------- |
>>>>>>> 47bf1375e9e8d90b55fca4c1a62aedbdf36463d9
| Beeldende en audiovisuele kunst | `cultuurkuur_Beeldende-en-audiovisuele-kunst` |
| Dans                            | `cultuurkuur_dans `                           |
| Muziek                          | `cultuurkuur_muziek`                          |
| Woordkunst & drama              | `cultuurkuur_Woordkunst-drama`                |

##### Level 3 labels

> A level 3 label must always be combined with both a level 1 label and a level 2 label.

**Gewoon basisonderwijs** 

The following level 3 labels must always be combined with: 
* level 1 label `cultuurkuur_basisonderwijs`
* level 2 label `cultuurkuur_Gewoon-basisonderwijs` 

| Education level | Label (level 3) | 
| :-- | :-- |
| Gewoon kleuteronderwijs | `	cultuurkuur_Gewoon-kleuteronderwijs` |
| Gewoon lager onderwijs | `cultuurkuur_Gewoon-lager-onderwijs` |  
| Onthaalonderwijs voor anderstalige nieuwkomers (OKAN) | `cultuurkuur_Onthaalonderwijs-voor-anderstalige-nieuwkomers (OKAN)` |  

**Buitengewoon basisonderwijs**

<<<<<<< HEAD
The following level 3 labels must always be combined with: 
* level 1 label `cultuurkuur_basisonderwijs`
* level 2 label `cultuurkuur_Buitengewoon-basisonderwijs` 

| Education level | Label (level 3) | 
| :-- | :-- |
=======
The following labels must be combined with level 2 label `cultuurkuur_Buitengewoon-basisonderwijs` and level 1 label `cultuurkuur_basisonderwijs`:

| Education level               | Label                                        |
| :---------------------------- | :------------------------------------------- |
>>>>>>> 47bf1375e9e8d90b55fca4c1a62aedbdf36463d9
| Buitengewoon kleuteronderwijs | `cultuurkuur_Buitengewoon-kleuteronderwijs	` |
| Buitengewoon lager onderwijs  | `cultuurkuur_Buitengewoon-lager-onderwijs`   |

**Voltijds gewoon secundair onderwijs**

<<<<<<< HEAD
The following level 3 labels must always be combined with:
* level 1 label `cultuurkuur_Secundair-onderwijs`
* level 2 label `cultuurkuur_Voltijds-gewoon-secundair-onderwijs` 

| Education level | Label (level 3) | 
| :-- | :-- |
| Eerste graad | `cultuurkuur_eerste-graad` |
| Tweede graad | `cultuurkuur_tweede-graad` |  
| Derde graad | `cultuurkuur_derde-graad` |
| Secundair na Secundair (Se-n-Se)| `cultuurkuur_Secundair-na-secundair-(Se-n-Se)` |  
=======
The following labels must be combined with label 2 label `cultuurkuur_Voltijds-gewoon-secundair-onderwijs` and level 1 label `cultuurkuur_Secundair-onderwijs`:

| Education level                                       | Label                                                              |
| :---------------------------------------------------- | :----------------------------------------------------------------- |
| Eerste graad                                          | `cultuurkuur_eerste-graad`                                         |
| Tweede graad                                          | `cultuurkuur_tweede-graad`                                         |
| Derde graad                                           | `cultuurkuur_derde-graad`                                          |
| Secundair na Secundair (Se-n-Se)                      | `cultuurkuur_Secundair-na-secundair-(Se-n-Se)`                     |
>>>>>>> 47bf1375e9e8d90b55fca4c1a62aedbdf36463d9
| Onthaalonderwijs voor anderstalige nieuwkomers (OKAN) | `	cultuurkuur_Onthaalonderwijs-voor-anderstalige-nieuwkomers-OKAN` |

##### Level 4 labels

> A level 4 label must always be combined with both a level 1, level 2 and level 3 label.

**Gewoon kleuteronderwijs**

The following level 4 labels must always be combined with 
* level 1 label `cultuurkuur_basisonderwijs`
* level 2 label `cultuurkuur_Gewoon-basisonderwijs` 
* level 3 label `cultuurkuur_Gewoon-kleuteronderwijs`

| Education level | Label (level 4) | 
| :-- | :-- |
| Kleuter (2-3 jaar) | `cultuurkuur_Kleuter-2-3-jaar` |
| Kleuter (3-4 jaar) | `cultuurkuur_Kleuter-3-4-jaar` |  
| Kleuter (4-5 jaar) | `cultuurkuur_Kleuter-4-5-jaar` |

**Gewoon lager onderwijs**

The following level 4 labels must always be combined with 
* level 1 label `cultuurkuur_basisonderwijs`
* level 2 label `cultuurkuur_Gewoon-basisonderwijs` 
* level 3 label `cultuurkuur_Gewoon-lager-onderwijs`

| Education level | Label (level 4) | 
| :-- | :-- |
| Eerste graad | `cultuurkuur_1ste-graad` |
| Tweede graad | `cultuurkuur_2de-graad` |  
| Derde graad | `cultuurkuur_3de-graad` |

**Eerste graad secundair**

The following level 4 labels must always be combined with 
* level 1 label `cultuurkuur_Secundair-onderwijs`
* level 2 label `cultuurkuur_Voltijds-gewoon-secundair-onderwijs` 
* level 3 label `cultuurkuur_eerste-graad`

| Education level | Label (level 4) | 
| :-- | :-- |
| Eerste leerjaar A | `cultuurkuur_1ste-leerjaar-A` |
| Eerste leerjaar B | `cultuurkuur_1ste-leerjaar-B` |  
| Tweede leerjaar | `cultuurkuur_2de leerjaar` |
| Beroepsvoorbereidend leerjaar | `	cultuurkuur_beroepsvoorbereidend-leerjaar` |

**Tweede graad secundair**

The following level 4 labels must always be combined with 
* level 1 label `cultuurkuur_Secundair-onderwijs`
* level 2 label `cultuurkuur_Voltijds-gewoon-secundair-onderwijs` 
* level 3 label `cultuurkuur_tweede-graad`

| Education level | Label (level 4) | 
| :-- | :-- |
| Tweede graad ASO | `cultuurkuur_tweede-graad-ASO` |
| Tweede graad BSO | `cultuurkuur_tweede-graad-BSO` |  
| Tweede graad KSO | `cultuurkuur_tweede-graad-KSO` |
| Tweede graad TSO | `cultuurkuur_tweede-graad-TSO` |

**Derde graad secundair**

The following level 4 labels must always be combined with 
* level 1 label `cultuurkuur_Secundair-onderwijs`
* level 2 label `cultuurkuur_Voltijds-gewoon-secundair-onderwijs` 
* level 3 label `cultuurkuur_derde-graad`

| Education level | Label (level 4) | 
| :-- | :-- |
| Derde graad ASO | `cultuurkuur_derde-graad-ASO` |
| Derde graad BSO | `cultuurkuur_derde-graad-BSO` | 
| Derde graad BSO (specialisatiejaar) | `cultuurkuur_3de-graad-BSO-specialisatiejaar` | 
| Derde graad KSO | `cultuurkuur_derde-graad-KSO` |
| Derde graad TSO | `cultuurkuur_derde-graad-TSO` |
| Derde graad Voorbereidend jaar HO | `cultuurkuur_derde-graad-Voorbereidend-jaar-HO` |

### 4. calendarType

In case of a [guided tour](#guided-tour) or [bookable event](#Bookable-events) you must set the value for the `calendarType` property to `permanent`.

```js
{
  "calendarType": "permanent"
}
```

### 5. dummy place for bookable events

In case of a [bookable event](#Bookable-events) you must use the url of the the dummy place for bookable events in UiTdatabank as the value for the `location.@id` property in the `POST /events` request of the event(s) that you want to create.

**URL of the dummy place for bookable events**:

* Test environment: `https://io-test.uitdatabank.be/place/3b92c85b-a923-4895-85f5-ed056dae11e2`
* Production environment: `https://io.uitdatabank.be/place/c3f9278e-228b-4199-8f9a-b9716a17e58f`

```js
{
"location": {
    "@id": "https://io.uitdatabank.be/place/c3f9278e-228b-4199-8f9a-b9716a17e58f"
  }
}
```
<<<<<<< HEAD
=======

<!-- theme: warning -->

> Only if you use the dummy place for bookable events correctly, your event will be recognized by UiTdatabank and Cultuurkuur as a bookable event.
>>>>>>> 47bf1375e9e8d90b55fca4c1a62aedbdf36463d9
