# Search results

A search result block always contains a collection of activities. For this block you can determine:
* **which events** are displayed in the widget agenda
* **which information** is shown about the events (location, date & time, price information, etc.)
* **how** the information is **visualy represented**

Below, we go over each possible setting for the search results block. The settings are ordered according to their position in the widget builder (from top to bottom).

## Settings 

### Naam zoekresultaten

Set the name of the search result page. 

This name only has a functional value to link a search result block to a facet block. The name of a search result block will not be displayed in your calendar. 

> It is only relevant to set the name of the search result block if you create a widget with more than one search result block.

[insert video: link facet block to search result block]

### Algemeen

#### Huidige zoekopdracht tonen

Determine whether the current search from the search box or the facets should be displayed or not. 

When enabled the different fields on which the user in your agenda filtered will be shown on top of the search results, as you can see in the example below:

![huidige zoekopdracht.png](<../../assets/images/huidige zoekopdracht.png>)

#### Verbergfilter

With this setting you can choose to show filters a visitor of your agenda can use to hide certain events:
* `langlopend aanbod`: a filter to hide long-running events 
* `permanent aanbod`: a filter to hide permanent events

#### Labels altijd weergeven als iconen

By default, labels are always displayed as follows:
* as text on desktop devices
* as icons on mobile devices  (tablet / smartphone)

With this setting you can enforce that labels are always shown as icons, regardless of the viewport.

#### Weergave van evenementen

Determine how the events are visually represented:
* `Lijstweergave`: displays the events in a vertical list
* `Tegelvorm`: displays the list in a grid

> When you choose to display events in a grid (`tegelvorm`) we strongly recommend to set to [amount of results per page](#Aantal-resultaten-per-pagina) to a multiple of 3.

#### Aantal resultaten per pagina

Determine how many events are displayed per page. There is no minimum or maximum limit.

[insert video where grid view + multiple of 3 is used for the number of results per page]

### Header

The header is a HTML block where you can add text and or images.

### Lijstelementen

In the "lijstelementen" section you determine which informative elements are visible in the list view of your events.

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

#### Toon UiT-tip badge

Determine whether a badge maye be displayed next to events that are highlighted in the media. 

When enabled, it is possible to only show a badge when the event is highlighted by a certain media channel, with the setting `Toon enkel UiT-tip badge van een specifieke curator`.

#### Toon enkel UiT-tip badge van een specifieke curator

With this setting you can only show an UiT-tip badge when the event is highlighted by a certain media channel.

**Possible values:**

`BRUZZ` `festivalfinder` `Gazet van Antwerpen` `Indiestyle` `kunst-zetter` `NXTPOP` `UiTinVlaanderen` `UiTX` `Vlieg`

If you want to add multiple values, you must seperate them with a semicolon (`;`).

[insert video]

#### Prijs

Determine whether the price information (all tariffs + UiTPAS social tariff) may be displayed for events or not.

#### Reserveringen

Determine whether a ticketing link (`Koop tickets`) or a reservation link (`Reserveer plaatsen` or `Schrijf je in`) may be displayed or not.

#### Waar

Determine whether the location of the events may be displayed or not.

#### Organisatie

Determine whether the organizer of the events may be displayed or not.

#### Wanneer

Determine whether the date and time of the events may be displayed or not.

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

#### Toegankelijkheid

Determine whether the facilities (to do: link to guide) applicable on the event may be displayed or not.

#### Leeslink

Determine whether a "read more link" may be displayed per event. When a visitor of your agenda clicks this link, he/she is sent to the event detail page of the event.

When enabled you can change the label of the "read more link" into a label of your choice.

### Detailpagina

Determine which elements (information) may be displayed on the detail page of the events.

> Unlike with search results, it is not possible for the detail page to see a preview of your customisations.

#### Type

Determine whether a badge containing the event type (e.g. `concert`) may be displayed or not.

#### Thema

Determine whether a badge containing the event theme (e.g. `pop en rock`) may be displayed  or not.

#### Google Maps kaart

Determine whether a link to Google Maps with the route to the event location may be displayed or not.

#### Prijs

Determine whether the price information (all tariffs + UiTPAS social tariff) may be displayed or not.

#### Reserveringen

Determine whether a ticketing link (`Koop tickets`) or a reservation link (`Reserveer plaatsen` or `Schrijf je in`) may be displayed or not.

#### Contact

Determine whether the contact details for the event (email, phone number & website) may be displayed or not.

#### UiTPAS-voordelen

Determine whether the UiTPAS rewards the organizer of the event offers may be displayed or not.

#### Taalwisselaar

Determine whether a language switcher may be displayed or not. The language switcher allows you to switch between the following languages on the detail page:
* Dutch (`NL`)
* French (`FR`)
* German (`DE`)
* English (`EN`)

> Only a small minority of the event content in UiTdatabank is translated, especially in German & English. If you enable this setting, make sure the event content in your agenda is translated.

#### Deelknoppen 

Determine whether share buttons for Facebook & Twitter may be displayed or not.

#### Terugknop

Determine to show a "back button" on the detail page or not. 

By default, the back button will always go back to the last visited page. This page can be a different page than the agenda overview (which is in most cases the desired page to return to). If you want to enforce that the back button always returns to a certain page (e.g. the agenda overview), you can set this url in the field `URL terugknop`.

* **URL terugknop**

Define the exact url for the back button.

**Example:**

<https://www.uitinvlaanderen.be/agenda>

#### Vlieg-logo

Determine whether a "Vlieg" may be displayed next to events for children or not.

#### UiTPAS-logo

Determine whether the UiTPAS-logo may be displayed next to events for UiTPAS and Paspartoe or not.

#### Museumpas-logo

Determine whether the Museumpas-logo may be displayed next to events accessible with Museumpassmusées or not.

#### Beschrijving

Determine to display the description or not. 

When enabled, you can also determine to limit the amount of characters that should be displayed from the description.

#### Waar

Determine whether the location of the events may be displayed or not.

#### Wanneer

Determine whether the date and time of the events may be displayed or not.

#### Organisatie

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

#### Video

Determine whether video linked to the event may be displayed or not.

#### Labels

Determine whether the labels ("keywords", "tags") linked to the events may be displayed or not.

* **Toon enkel specifieke labels**

You can determine which specific labels may be displayed. If you want to add multiple values, you must seperate them with a semicolon (`;`).

#### Toegankelijkheid

Determine whether the facilities (to do: link to guide) applicable on the event may be displayed or not.

#### Toon gerelateerde artikels

Determine whether editorial content linked to events (e.g. reviews, event announcements, interviews, etc.) may be displayed or not.

* **Toon enkel specifieke curatoren**

With this setting you can determine to only show editorial content of specific media curators.

**Possible values:**

`BRUZZ` `festivalfinder` `Gazet van Antwerpen` `Indiestyle` `kunst-zetter` `NXTPOP` `UiTinVlaanderen` `UiTX` `Vlieg`

If you want to add multiple values, you must seperate them with a semicolon (`;`).

### Extra parameters

In the extra parameter section you define which events will be displayed in your agenda. 

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
