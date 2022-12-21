# Verfijningen

Het verfijningen-blok bevat een samenvatting van de zoekresultaten. Ze kunnen door de bezoeker van je agenda gebruikt worden om de zoekresultaten te filteren. Daarom moet dit blok altijd gekoppeld zijn aan een zoekresultatenblok.

## Soorten verfijningen

We bieden volgende groepen van verfijningen aan die de bezoeker van je agenda kan gebruiken om zoekresultaten te filteren:

* Wanneer
* Waar
* Wat
* Toegankelijkheid
* Extra groepfilters (voor UiTPAS en Paspartoe, gratis activiteiten en kinderaanbod)

Daarnaast kan je ook zelf verfijningen aanmaken.

De taal waarin de verfijningen weergegeven worden is afhankelijk van de gekozen taal in de [taalinstellingen](../taalinstellingen.md).

### Wanneer

De 'wanneer' groep bevat filters op het tijdstip van de evenementen:

* Vandaag
* Morgen
* Dit weekend
* Volgende 7 dagen
* Volgende 14 dagen
* Volgende 30 dagen

> Een filter op 'wanneer' is zinvol als je agenda evenementen toont die op verschillende data doorgaan.

### Waar

De 'waar' groep bevat geografische filters. De filters bevatten volgende drie niveaus:

1. Provincies
2. Gemeenten
3. Deelgemeenten

Een bezoeker van je agenda zal altijd moeten starten met filteren vanaf het hoogste niveau (provincies), om vervolgens op gemeenten en subgemeenten te kunnen filteren.

> Een filter op 'waar' is zinvol als je agenda evenementen uit verschillende provincies ophaalt.

### Wat

De 'wat' groep bevat filters op het type evenement (bijvoorbeeld `concert`).

> Een filter op 'wat' is zinvol als je agenda evenementen van verschillende eventtypes ophaalt.

### Toegankelijkheid

De groep 'toegankelijkheid' bevat meer dan twintig filters, specifiek voor mensen met een handicap. De voorzieningen zijn opgedeeld in verschillende clusters, waarbij elke cluster voorzieningen bundelt voor een specifieke doelgroep:

* Personen met een motorische beperking
* Personen met een visuele beperking
* Personen met een auditieve beperking
* Personen met een verstandelijke beperking
* Neurodiverse personen
* Andere voorzieningen

Een volledig overzicht van de verschillende voorzieningen en hun betekenis kan je [hier](https://docs.publiq.be/docs/uitdatabank/7d8d9b4653fc1-terms#facility) terugvinden.

> Een filter op 'toegankelijkheid' is zinvol als (een deel van) de evenementen in je agenda verrijkt zijn met toegankelijkheidsvoorzieningen.

### Extra groepsfilters

Tot slot bieden we extra groepfilters aan:

* `Voor UiTPAS en Paspartoe`: zoekt naar activiteiten voor UiTPAS en Paspartoe
* `Voor kinderen`: zoekt naar activiteiten voor kinderen (0 - 12 jaar) of activiteiten voor volwassenen die kindvriendelijk zijn
* `Gratis activiteiten`: zoekt naar activiteiten waar je gratis aan kan deelnemen

## Zelf filters maken

Aan een verfijningenblok kan je zelf gemaakte filters toevoegen, onder de naam `groepfilters`. De groepfilters stellen je in staat filters te maken op maat je doelgroep.

Een groepfilter is een verzameling van één of meerdere filters (SAPI 3 queries) die je een logische naam geeft.

Een groepfilter binnen het verfijingenblok bestaat uit volgende elementen:

**Een logische naam voor de groep**

Geef je groep een logische naam, zodat het voor de bezoekers duidelijk is voor welke doeleinden hij de filters binnen deze groep kan gebruiken.

Voorbeeld: `Vakantieperiodes`

**Eén of meerdere filters**

Vervolgens voeg je één of meerdere filters toe aan de groep. Voor elke filter moet je volgende elementen bepalen:

* De naam van de filter, bijvoorbeeld `kerstvakantie` of `paasvakantie`)
* een SAPI 3 query die bepaalt welk aanbod de filter ophaalt, bijvoorbeeld `dateRange:[2023-04-03T00:00:00+01:00 TO 2022-04-16T23:59:59+01:00]`

`[INSERT VIDEO]`

## Een verfijningenblok koppelen aan een zoekresultatenblok

Omdat de verfijningen een samenvatting zijn van de zoekresultaten, moet een verfijningenblok steeds gekoppeld zijn aan een zoekresultatenblok.

<!-- theme: success -->

> Binnen het [agendatemplate](../templates.md#Agenda) en het [UiTPAS en Paspartoe template](../templates.md#UiTPAS-en-Paspartoe) is het verfijningenblok steeds automatisch aan de zoekresultaten gekoppeld. Hierdoor hoef je dit niet meer manueel te doen.

In sommige gevallen moet je een verfijningenblok zelf manueel koppelen aan een zoekresultatenblok:

* Wanneer je vertrekt van een [leeg template](../templates.md#Leeg)
* Wanneer je een widget hebt met meer dan één zoekresultatenblok

`[INSERT VIDEO]`
