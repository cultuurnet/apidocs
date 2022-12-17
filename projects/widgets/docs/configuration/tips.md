# Tips

The tips block always contains a (preferably small) collection of activities. For this block you can determine:
* **which events** are displayed in the widget agenda
* **which information** is shown about the events (location, date & time, price information, etc.)
* **how** the information is **visualy represented**

Below, we go over each possible setting for the tips block. The settings are ordered according to their position in the widget builder (from top to bottom).


## Settings 

### Algemeen

#### Aantal elementen

#### Linken naar detailpagina

* **URL**

* **Opties**

* `Cdbid toevoegen aan querystring`
* `Cdbid toevoegen aan Url`

#### Labels altijd weergeven als iconen

By default, labels are always displayed as follows:
* as text on desktop devices
* as icons on mobile devices  (tablet / smartphone)

With this setting you can enforce that labels are always shown as icons, regardless of the viewport.

### Tipselementen

In the "tipselementen" section you determine which informative elements are visible in the list view of your events.

#### Type

Determine whether a badge containing the event type (e.g. `concert`) may be displayed for each event or not.

#### Thema

Determine whether a badge containing the event theme (e.g. `pop en rock`) may be displayed for each event or not.

#### Vlieg-logo

Determine whether a "Vlieg" may be displayed next to events for children or not.

#### UiTPAS-logo

Determine whether the UiTPAS-logo may be displayed next to events for UiTPAS and Paspartoe or not.

#### Museumpas-logo

Determine whether the Museumpas-logo may be displayed next to events accessible with Museumpassmusées or not.

#### Beschrijving

Determine to display the description of events or not. 

When enabled, you can also determine to limit the amount of characters that should be displayed from the description.

#### Prijs

Determine whether the price information (all tariffs + UiTPAS social tariff) may be displayed for events or not.

#### Reserveringen

Determine whether a ticketing link (`Koop tickets`) or a reservation link (`Reserveer plaatsen` or `Schrijf je in`) may be displayed or not.

#### Waar

Determine whether the location of the events may be displayed or not.

#### Wanneer

Determine whether the date and time of the events may be displayed or not.

#### Organisator

Determine whether the organizer of the events may be displayed or not.

#### Leeftijd

Determine whether the targetted age group of the events may be displayed or not.

> For events for children (0 - 12 years old), the age information is also displayed inside the [Vlieg icon](#Vlieg). If your agenda contains only events for children, we recommend to only show the Vlieg icon.

#### Toegang

Determine whether you want to show for whom the event is accessible. 

> It is only relevant to enable this setting if you also display events in your agenda that are accessible for [members only](#Ledenaanbod).

#### Taaliconen

Determine whether language icons (if applicable) may be displayed or not.

> Language icons indicate the level of knowledge of the dutch language you need in order to participate in an event or activity.

#### Afbeelding

Determine whether the image of the events may be displayed or not.

When enabled you can also set the following settings:

* **Breedte**

Determine the width of the event images.

* **Hoogte**

Determine the height of the event images.

* **Altijd een afbeelding tonen**

When enabled, a default image will be shown when an event has no image:
* `UiT-logo`: the default image is the UiT-logo
* `Themafoto`: the default image is a thematic picture. For every event type there is a different picture. 

When disabled, no image will be shown when an event has no image.

* **Positie van de afbeelding**

Determine the relative position of the images (left or right from the event content).

[insert video]

#### Labels

Determine whether the labels ("keywords", "tags") linked to the events may be displayed or not.

* **Toon enkel specifieke labels**

You can determine which specific labels may be displayed. If you want to add multiple values, you must seperate them with a semicolon (`;`).

#### Leeslink

Determine whether a "read more link" may be displayed per event. When a visitor of your agenda clicks this link, he/she is sent to the event detail page of the event.

When enabled you can change the label of the "read more link" into a label of your choice.


### Zoekparameters

In the zoekparameters section you define which events will be displayed in your agenda. 

#### Query

Determine the query of the search result block. 

> You must use the advanced query parameter syntax (to do: link to guide) in your query.

**Examples**

Get all the events happening in Ghent:
```
address.nl.postalCode:90*
```

Get all the events happening in Ghent with eventtype `concert` or `exposition`:
```
address.nl.postalCode:90* AND terms.id:(0.50.4.0.0 OR 0.0.0.0.0)
```

#### Displaying events for members

Determine whether you want to display events for members or not.

* **Displaying public events only**

Leave the checkbox `Doorzoek ook ledenaanbod` disabled

* **Displaying both public events and events for members**

Enable the checkbox `Doorzoek ook ledenaanbod`

* **Displaying events for members only**

Enable the checkbox `Doorzoek ook ledenaanbod` and set (or add to) the query:

```html
audienceType:members
```

#### Displaying events outside Belgium

By default, only events in Belgium are displayed in the UiT-widgets. However, you can choose to display events from outside Belgium:
* `Doorzoek aanbod in België`: the search results will be limited to events in Belgium.
* `Doorzoek aanbod in Nederland`: the search results will be limited to events in the Netherlands.
* `Doorzoek aanbod in alle landen`: the search results will show events regardless of the location (country) where they take place.

The radio button settings mentioned above cover the most common use cases. However, it is possible to limit the search results within a widget to events that happen in a country of your choice. You can do this with by following these 2 steps:
1. Enable the radio button `Doorzoek aanbod in alle landen` 
2. Add the advanced query parameter `address.\*.addressCountry` (to do: link to guide) to your query and add the values of the countries for which you want to retrieve events.
```
address.\*.addressCountry:(BE OR DE)
```

### Footer

The footer is a HTML block where you can add text and or images.
