# Zoekresultaten

Een zoekresultatenblok bevat altijd een verzameling activiteiten. Voor dit blok kan je bepalen

* **welke evenementen** worden opgehaald
* **welke informatie** wordt getoond over de evenementen (locatie, datum & tijd, prijsinformatie, etc.)
* **hoe** de informatie **visueel** wordt weergegeven.

Hieronder overlopen we elke mogelijke instelling voor het zoekresultatenblok. De instellingen zijn gerangschikt volgens hun positie in de widget builder (van boven naar beneden).

<https://youtu.be/jMG8WHq_WvM>

## Instellingen

#### Naam zoekresultaten

Met dit veld kan je de naam van de zoekresultatenpagina wijzigen.

De naam van deze pagina is standaard `zoekresultaten-1` en wordt niet getoond in de agenda die je uiteindelijk publiceert op je website.

> De naam dient enkel en alleen om het onderscheid tussen verschillende zoekresultatenblokken binnen dezelfde widget te kunnen maken. Het is daarom niet nodig deze naam te wijzigen, tenzij je een widget maakt met meer dan één zoekresultatenblok.

### Algemeen

#### Huidige zoekopdracht tonen

Hiermee kan je bepalen of de huidige zoekopdracht uit de zoekbox of de verfijningen getoond moet worden of niet.

Wanneer deze instelling aanstaat, worden de verschillende velden waarop een bezoeker van je agenda filtert bovenaan de zoekresultaten getoond.

![huidige zoekopdracht.png](<../../assets/images/huidige zoekopdracht.png>)

#### Verbergfilter

Met deze instelling kan je filters tonen die een bezoeker van je agenda kan gebruiken om bepaalde evenementen te verbergen uit de zoekresultaten:

* `langlopend aanbod`: een filter om langlopende evenementen te verbergen
* `permanent aanbod`: een filter om permanente evenementen te verbergen

#### Labels altijd weergeven als iconen

Standaard worden labels altijd als volgt weergegeven:

* als tekst op desktop
* als iconen op mobiele toestellen (tablet / smartphone)

Met deze instelling kan je bepalen dat labels altijd als pictogrammen worden weergegeven, ongeacht de viewport.

#### Weergave van evenementen

Hiermee bepaal je hoe de evenementen visueel worden weergegeven:

* `Lijstweergave`: toont de evenementen in een verticale lijst
* `Tegelvorm`: geeft de evenementen weer in een raster

> Wanneer je kiest voor weergave van evenementen in een raster (`tegelvorm`) raden we aan om het [aantal resultaten per pagina](#Aantal-resultaten-per-pagina) op een veelvoud van 3 te zetten.

<https://youtu.be/50elW-XFryI>

#### Aantal resultaten per pagina

Hiermee bepaal je hoeveel evenemnenten per pagina worden weergegeven. Er is geen minimum- of maximumlimiet.

### Header

De header is een HTML-blok waarin je tekst of afbeeldingen kan toevoegen.

### Lijstelementen

In de lijstelementen bepaal je welke informatieve elementen zichtbaar moeten zijn in het agendaoverzicht.

#### Type

Bepaal of voor elk evenement een badge met het evenementtype (bijvoorbeeld `concert`) mag worden getoond of niet.

#### Thema

Bepaal of voor elk evenement een badge met het thema (bijvoorbeeld `pop en rock`) mag worden getoond of niet.

#### Vlieg-logo

Bepaal of bij evenementen voor kinderen een "Vlieg" mag worden weergegeven of niet.

#### UiTPAS-logo

Bepaal of het UiTPAS-logo mag worden weergegeven bij evenementen voor UiTPAS en Paspartoe of niet.

#### Museumpas-logo

Bepaal of het Museumpas-logo mag worden weergegeven bij evenementen die toegankelijk zijn met Museumpassmusées of niet.

#### Beschrijving

Bepaal of je de beschrijving van evenementen wilt tonen of niet.

Wanneer deze instelling ingeschakeld is, kan je ook bepalen om het aantal tekens dat van de beschrijving moet worden getoond te beperken.

#### Toon UiT-tip badge

Bepaal of een badge mag worden getoond bij evenementen die in de media onder de aandacht zijn gebracht.

Indien ingeschakeld, is het mogelijk om alleen een badge te tonen wanneer een evenement is uitgelicht door een bepaald mediakanaal, met de instelling `Toon enkel UiT-tip badge van een specifieke curator`.

#### Toon enkel UiT-tip badge van een specifieke curator

Met deze instelling kan je ervoor kiezen om alleen een UiT-tip badge te tonen wanneer het evenement door een bepaald mediakanaal is uitgelicht.

**Mogelijke waarden:**

`BRUZZ` `festivalfinder` `Gazet van Antwerpen` `Indiestyle` `kunst-zetter` `NXTPOP` `UiTinVlaanderen` `UiTX` `Vlieg`

Als je meerdere waarden wilt toevoegen, moet je ze scheiden met een puntkomma (`;`).

<https://youtu.be/LkejtEkK2EQ>

#### Prijs

Bepaal of de prijsinformatie (inclusief het UiTPAS kansentarief) mag worden getoond voor evenementen of niet.

#### Reserveringen

Bepaal of een ticketlink (`Koop tickets`) of een reserveringslink (`Reserveer plaatsen`, `Schrijf je in` of `Controleer beschikbaarheid`) mag worden getoond of niet.

#### Waar

Bepaal of de locatie van de evenementen getoond mag worden of niet.

#### Organisatie

Bepaal of de organisator van de evenementen getoond mag worden of niet.

#### Wanneer

Bepaal of de datum en het tijdstip van de evenementen mogen worden getoond of niet.

#### Leeftijd

Bepaal of de leeftijdsdoelgroep van de evenementen mag worden getoond of niet.

> Bij evenementen voor kinderen (0 - 12 jaar) wordt de leeftijdsinformatie ook weergegeven in het [Vlieg-icoon](#Vlieg-logo). Als je agenda uitsluitend evenementen voor kinderen bevat, raden wijaan alleen het Vlieg-icoon te tonen.

#### Toegang

Bepaal of je wilt tonen voor wie het evenement toegankelijk is.

> Het heeft enkel zin om deze instelling aan te zetten als je in je agenda ook evenementen toont die uitsluitend toegankelijk zijn voor [leden](#doorzoek-ook-ledenaanbod).

#### Taaliconen

Bepaal of je taaliconen (indien van toepassing) mogen worden weergegeven of niet.

> [Taaliconen](https://www.huisnederlandsbrussel.be/de-taaliconen) geven aan welk kennisniveau van het Nederlandse je nodig hebt om deel te nemen aan een evenement of activiteit.

#### Afbeelding

Bepaal of de hoofdafbeelding van evenementen mag worden weergegeven of niet.

Indien ingeschakeld kan je ook de volgende instellingen bepalen:

* **Breedte**

Bepaal de breedte van de afbeeldingen.

* **Hoogte**

Bepaal de hoogte van de afbeeldingen.

* **Altijd een afbeelding tonen**

Indien ingeschakeld, wordt een standaard afbeelding getoond wanneer een evenement geen afbeelding heeft:

* `UiT-logo`: de standaardafbeelding is het UiT-logo
* `Themafoto`: de standaardafbeelding is een thematische foto. Voor elk evenementtype is er een andere afbeelding.

Indien uitgeschakeld, wordt er geen afbeelding getoond wanneer een evenement geen afbeelding heeft.

* **Positie van de afbeelding**

Bepaal de relatieve positie van de afbeeldingen:

* `links`: op desktop zullen de afbeeldingen links van de inhoud van het evenement verschijnen, en op mobiele weergave boven de inhoud.
* `rechts`: op desktop zullen de afbeeldingen rechts van de inhoud van het evenement verschijnen, en op mobiele weergave onder de inhoud.

#### Labels

Bepaal of de labels ("keywords", "tags") die gelinkt zijn aan de evenementen getoond mogen worden of niet.

* **Toon enkel specifieke labels**

Je kan bepalen welke specifieke labels mogen worden getoond. Als je meerdere labels wilt toevoegen, moet je die scheiden met een puntkomma (`;`).

#### Toegankelijkheid

Bepaal of de [toegankelijkheidsvoorzieningen](https://docs.publiq.be/docs/uitdatabank/7d8d9b4653fc1-terms#facility) die aanwezig zijn op een evenement mogen worden getoond of niet.

> Wil je meer informatie over het verrijken van voorzieningen voor mensen met een beperking? Contacteer <partnerships@publiq.be>.

#### Leeslink

Bepaal per evenement of er een leeslink mag worden getoond.

Wanneer een bezoeker van je agenda op deze link klikt, wordt hij of zij naar de detailpagina van het evenement gestuurd.

Indien ingeschakeld kan je ook de het label van de leeslink veranderen in een label naar keuze.

### Detailpagina

Hier kan je bepalen welke elementen (informatie) getoond mag worden op de detailpagina van de evenementen.

> In tegenstelling tot bij de zoekresultaten is het niet mogelijk om voor de detailpagina een preview van je aanpassingen te zien.

#### Type

Bepaal of een badge met het type (bijvoorbeeld `concert`) mag worden getoond of niet.

#### Thema

Bepaal of een badge met het thema van het evenement (bijvoorbeeld `pop en rock`) getoond mag worden of niet.

#### Google Maps kaart

Bepaal of een link naar Google Maps met de route naar de locatie van het evenement mag worden getoond of niet.

#### Prijs

Bepaal of de prijsinformatie (inclusief het UiTPAS kansentarief) mag worden getoond of niet.

#### Reserveringen

Bepaal of een ticketlink (`Koop tickets`) of een reserveringslink (`Reserveer plaatsen`, `Schrijf je in` of `Controleer beschikbaarheid`) mag worden getoond of niet.

#### Contact

Bepaal of de contactgegevens van het evenement (e-mail, telefoonnummer & website) mogen worden getoond of niet.

#### UiTPAS-voordelen

Bepaal of de UiTPAS-voordelen die de organisator van het evenement aanbiedt mogen worden getoond of niet.

#### Taalwisselaar

Bepaal of een taalwisselaar getoond mag worden of niet.

Met de taalwisselaar kan je op de detailpagina wisselen tussen de volgende talen:

* Nederlands (`NL`)
* Frans (`FR`)
* Duits (`DE`)
* Engels (`EN`)

> Slechts een kleine minderheid van de evenementen in UiTdatabank is vertaald. Als je deze instelling inschakelt, zorg je er best voor dat de evenementen in je agenda vertaald zijn.

#### Deelknoppen

Bepaal of deelknoppen voor Facebook & Twitter mogen worden getoond of niet.

#### Terugknop

Bepaal of een "terugknop" op de detailpagina mag worden getoond of niet.

Standaard stuurt de terugknop de bezoeker altijd terug naar de laatst bezochte pagina. Deze pagina kan een andere pagina zijn dan het agendaoverzicht (wat in de meeste gevallen de gewenste pagina is om naar terug te keren). Als je ervoor wilt zorgen dat de terugknop altijd naar een bepaalde pagina gaat (bijvoorbeeld het agendaoverzicht), kan je deze url instellen in het veld `URL terugknop`.

* **URL terugknop**

Hiermee kan je de exacte bestemming (url) voor de terugknop instellen, bijvoorbeeld `https://www.uitinvlaanderen.be/agenda`.

#### Vlieg-logo

Bepaal of een "Vlieg" mag worden getoond naast evenementen voor kinderen of niet.

#### UiTPAS-logo

Bepaal of het UiTPAS-logo mag worden getoond naast evenementen voor UiTPAS en Paspartoe of niet.

#### Museumpas-logo

Bepaal of het Museumpas-logo mag worden getoond bij evenementen die toegankelijk zijn met Museumpassmusées of niet.

#### Beschrijving

Bepaal of je de beschrijving wilt tonen of niet.

Indien ingeschakeld, kan je ook bepalen om het aantal tekens dat moet worden weergegeven van de beschrijving te beperken.

Wanneer je het aantal karakters van de beschrijving op de detailpagina beperkt dan wordt de beschrijving maar tot het aantal ingestelde karakters getoond. Hierna wordt een `lees meer` link getoond, waarop een bezoeker van je agenda kan klikken om de volledige beschrijving te lezen.

#### Waar

Bepaal of de locatie van de evenementen mag worden getoond of niet.

#### Wanneer

Bepaal of de datum en het tijdstip van de evenementen mogen worden getoond of niet.

#### Organisatie

Bepaal of de organisator van de evenementen getoond mag worden of niet.

#### Leeftijd

Bepaal of de leeftijdsdoelgroep van de evenementen mag worden getoond of niet.

> Bij evenementen voor kinderen (0 - 12 jaar) wordt de leeftijdsinformatie ook weergegeven in het [Vlieg-icoon](#Vlieg-logo). Als je agenda uitsluitend evenementen voor kinderen bevat, raden wijaan alleen het Vlieg-icoon te tonen.

#### Toegang

Bepaal of je wilt tonen voor wie het evenement toegankelijk is.

> Het heeft enkel zin om deze instelling aan te zetten als je in je agenda ook evenementen toont die uitsluitend toegankelijk zijn voor [leden](#doorzoek-ook-ledenaanbod).

#### Taaliconen

Bepaal of je taaliconen (indien van toepassing) mogen worden weergegeven of niet.

> [Taaliconen](https://www.huisnederlandsbrussel.be/de-taaliconen) geven aan welk kennisniveau van het Nederlandse je nodig hebt om deel te nemen aan een evenement of activiteit.

#### Afbeelding

Bepaal of de hoofdafbeelding van evenementen mag worden weergegeven of niet.

Indien ingeschakeld kan je ook de volgende instellingen bepalen:

* **Breedte**

Bepaal de breedte van de afbeeldingen.

* **Hoogte**

Bepaal de hoogte van de afbeeldingen.

* **Altijd een afbeelding tonen**

Indien ingeschakeld, wordt een standaard afbeelding getoond wanneer een evenement geen afbeelding heeft:

* `UiT-logo`: de standaardafbeelding is het UiT-logo
* `Themafoto`: de standaardafbeelding is een thematische foto. Voor elk evenementtype is er een andere afbeelding.

Indien uitgeschakeld, wordt er geen afbeelding getoond wanneer een evenement geen afbeelding heeft.

* **Positie van de afbeelding**

Bepaal de relatieve positie van de afbeeldingen:

* `links`: op desktop zullen de afbeeldingen links van de inhoud van het evenement verschijnen, en op mobiele weergave boven de inhoud.
* `rechts`: op desktop zullen de afbeeldingen rechts van de inhoud van het evenement verschijnen, en op mobiele weergave onder de inhoud.

#### Video

Bepaal of videos gekoppeld aan het evenement mag worden getoond of niet.

#### Labels

Bepaal of de labels ("keywords", "tags") die gelinkt zijn aan de evenementen getoond mogen worden of niet.

* **Toon enkel specifieke labels**

Je kan bepalen welke specifieke labels mogen worden getoond. Als je meerdere labels wilt toevoegen, moet je die scheiden met een puntkomma (`;`).

#### Toegankelijkheid

Bepaal of de [toegankelijkheidsvoorzieningen](https://docs.publiq.be/docs/uitdatabank/7d8d9b4653fc1-terms#facility) die aanwezig zijn op een evenement mogen worden getoond of niet.

> Wil je meer informatie over het verrijken van voorzieningen voor mensen met een beperking? Contacteer <partnerships@publiq.be>.

#### Toon gerelateerde artikels

Bepaal of aan evenementen gekoppelde redactionele content (zoals recensies, aankondigingen van evenementen, interviews) mogen worden getoond of niet.

* **Toon enkel specifieke curatoren**

Met deze instelling kan je bepalen om alleen redactionele content van van specifieke mediakanalen te tonen.

**Mogelijke waarden:**

`BRUZZ` `festivalfinder` `Gazet van Antwerpen` `Indiestyle` `kunst-zetter` `NXTPOP` `UiTinVlaanderen` `UiTX` `Vlieg`.

Als je meerdere waarden wilt toevoegen, moet je ze scheiden met een puntkomma (`;`).

### Extra parameters

In de sectie extra parameters bepaal je welke evenementen in je agenda worden weergegeven.

#### Query

De query bepaalt welke evenementen opgehaald worden uit de UiTdatabank.

> In het queryveld kan je uitsluitend de [advanced query syntax](../../uitdatabank/docs/search-api/advanced-queries.md) gebruiken.

**Voorbeelden**

Alle evenementen in Gent ophalen:

```
address.\*.postcode:90*
```

Alle evenementen in Gent met het type `concert` of `expositie` ophalen:

```
address.\*.postalCode:90* AND terms.id:(0.50.4.0.0 OR 0.0.0.0)
```

#### Doorzoek ook ledenaanbod

Bepaal of je evenementen voor leden wilt tonen of niet.

* **Alleen publieksaanbod ophalen**

Om alleen publieksevenementen op te halen, laat je de checkbox `Doorzoek ook ledenaanbod` uitgeschakeld.

* **Zowel publieksaanbod als ledenaanbod ophalen**

Hiervoor schakel duid je het selectievakje `Doorzoek ook ledenaanbod` aan.

* **Alleen ledenaanbod ophalen**

Hiervoor schakel duid je het selectievakje `Doorzoek ook ledenaanbod` aan en voeg je het volgende toe aan je query:

```
AND audienceType:members
```

#### Evenementen buiten België tonen

Standaard worden alleen evenementen in België opgehaald in de UiT-widgets. Je kan ervoor kiezen om (ook) evenementen buiten België op te halen:

* `Doorzoek aanbod in België`: de zoekresultaten worden beperkt tot evenementen in België.
* `Doorzoek aanbod in Nederland`: de zoekresultaten worden beperkt tot evenementen in Nederland.
* `Doorzoek aanbod in alle landen`: de zoekresultaten tonen evenementen ongeacht de locatie (land) waar ze plaatsvinden.

De bovenstaande keuzemogelijkheden dekken de meest voorkomende gevallen. Het is echter ook mogelijk om de zoekresultaten binnen een widget te beperken tot evenementen die plaatsvinden in een land naar keuze. Je kunt dit doen door de volgende twee stappen te volgen:

1. Duid het selectievakje `Doorzoek aanbod in alle landen` aan.
2. Voeg de parameter `address.\*.addressCountry` toe aan je query en voeg als waarde de landen toe waarvoor je evenementen wilt ophalen.

```
address.\*.addressCountry:(BE OR DE)
```

### Footer

De footer is een HTML-blok waarin je tekst en afbeeldingen kan toevoegen.
