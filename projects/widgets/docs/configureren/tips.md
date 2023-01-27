# Tips

Het tipsblok dient om een kleine, aantrekkelijke verzameling aan activiteiten in op te nemen. Voor dit blok kan je bepalen

* **welke evenementen** worden getoond in de widget agenda
* **welke informatie** wordt getoond over de evenementen (locatie, datum & tijd, prijsinformatie, etc.)
* **hoe** de informatie **visueel** wordt weergegeven.

Hieronder overlopen we elke mogelijke instelling voor het tipsblok. De instellingen zijn gerangschikt naar hun positie in de widgetbouwer (van boven naar beneden).

<https://youtu.be/GT6uPS8BQR0>

## Instellingen

### Algemeen

#### Aantal elementen

Hiermee bepaal je hoeveel evenemnenten in het tipsblok moeten worden weergegeven. Er is geen minimum- of maximumlimiet.

Aangezien er geen paginatie voorzien is voor het tipsblok houd je dit aantal best beperkt (maximum 10).

> Omdat het tipsblok in een raster van 3 kolommen wordt weergegeven, raden we aan om het aantal resultaten op een veelvoud van 3 te zetten. Wanneer het tipsblok in een smal blok (576px of smaller) geïntegreerd wordt op de website, wordt automatisch overgeschakeld op een lijstweergaven en ben je vrijer in de keuze van het aantal elementen.

#### Linken naar detailpagina

Het tipsblok laat je toe om evenementen weer te geven zonder dat je hiervoor linkt naar een detailpagina. Als je niet wilt linken naar een detailpagina laat je het selectievakje naast `Linken naar detailpagina` onaangevinkt.

Wil je wel linken naar een detailpagina, dan vink je `Linken naar detailpagina` wel aan. Vervolgens kan je kiezen om:

* de **detailpagina binnen de tipswidget te openen**. Hiervoor vink je `Linken naar detailpagina` aan, maar vul je geen URL in. We raden dit af wanneer je tipswidget geïntegreerd is op je home pagina, of een pagina waar weinig plaats voorzien is voor de tipswidget.
* te **linken naar een detailpagina op de eigen website**. Hiervoor vul je de url van de volledige agenda (met zoekresultatenblok) op je website in
* te **linken naar een detailpagina op een andere website** (dat gebruik maakt van data uit de UiTdatabank). Hiervoor vul je de url van die agenda in. Wil je linken naar UiTinVlaanderen, dan vul je als URL voor `https://www.uitinvlaanderen.be/agenda/e/x/` in.

Wanneer je de een URL voor je detailpagina instelt, kan je vervolgens ook kiezen hoe het event ID (`cdbid`) aan de ingegeven URL toegevoegd moet worden:

* `Cdbid toevoegen aan querystring`: hierbij wordt het event ID als URL-parameter aan de ingegeven URL toegevoegd. Dit werkt enkel in specifieke gevallen.
* `Cdbid toevoegen aan Url`: hierbij wordt het `cdbid` gewoon achteraan de ingegeven URL toegevoegd. Dit werkt altijd wanneer je de detailpagina van een widgetagenda ingeeft, of linkt naar UiTinVlaanderen.

#### Labels altijd weergeven als iconen

Standaard worden labels altijd als volgt weergegeven:

* als tekst op desktop
* als iconen op mobiele toestellen (tablet / smartphone)

Met deze instelling kan je bepalen dat labels altijd als pictogrammen worden weergegeven, ongeacht de viewport.

### Tipelementen

In de tipselementen bepaal je welke informatieve elementen zichtbaar moeten zijn in je tipsblok.

> Omdat het tipsblok evenementen in de kijker plaatst, houd je het aantal elementen best beperkt.
>
> In veel gevallen is het zinvol om enkel informatie die de aandacht trekt (zoals een afbeelding, logo's) en de belangrijkste informatieve elementen op te nemen (tijdstip en locatie).

#### Type

Bepaal of voor elk evenement een badge met het evenementtype (bijvoorbeeld `concert`) mag worden getoond of niet.

#### Thema

Bepaal of voor elk evenement een badge met het thema (bijvoorbeeld `pop en rock`) mag worden getoond of niet.

#### Vlieg-logo

Bepaal of bij evenementen voor kinderen een "Vlieg" mag worden weergegeven of niet.

#### UiTPAS-logo

Bepaal of het UiTPAS-logo mag worden weergegeven bij evenementen voor UiTPAS en Paspartoe of niet.

#### Beschrijving

Bepaal of je de beschrijving van evenementen wilt tonen of niet.

Wanneer deze instelling ingeschakeld is, kan je ook bepalen om het aantal tekens dat van de beschrijving moet worden getoond te beperken.

#### Prijs

Bepaal of de prijsinformatie (inclusief het UiTPAS kansentarief) mag worden getoond voor evenementen of niet.

#### Reserveringen

Bepaal of een ticketlink (`Koop tickets`) of een reserveringslink (`Reserveer plaatsen`, `Schrijf je in` of `Controleer beschikbaarheid`) mag worden getoond of niet.

#### Waar

Bepaal of de locatie van de evenementen getoond mag worden of niet.

#### Wanneer

Bepaal of de datum en het tijdstip van de evenementen mogen worden getoond of niet.

#### Organisator

Bepaal of de organisator van de evenementen getoond mag worden of niet.

#### Leeftijd

Bepaal of de leeftijdsdoelgroep van de evenementen mag worden getoond of niet.

> Bij evenementen voor kinderen (0 - 12 jaar) wordt de leeftijdsinformatie ook weergegeven in het [Vlieg-icoon](#Vlieg-logo). Als je agenda uitsluitend evenementen voor kinderen bevat, raden wijaan alleen het Vlieg-icoon te tonen.

#### Toegang

Bepaal of je wilt tonen voor wie het evenement toegankelijk is.

> Het heeft enkel zin om deze instelling aan te zetten als je in je agenda ook evenementen toont die uitsluitend toegankelijk zijn voor [leden](#Doorzoek-ook-ledenaanbod).

#### Taaliconen

Bepaal of je taaliconen (indien van toepassing) mogen worden weergegeven of niet.

> Taaliconen geven aan welk kennisniveau van het Nederlands je nodig hebt om deel te nemen aan een evenement of activiteit.

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

#### Leeslink

Bepaal per evenement of er een leeslink mag worden getoond.

Wanneer een bezoeker van je agenda op deze link klikt, wordt hij of zij naar de detailpagina van het evenement gestuurd.

<!-- theme: warning -->

> Als je deze instelling aanvinkt, zorg er dan zeker voor dat je een [detailpagina voor je evenementen](#Linken-naar-detailpagina) voorziet.

Indien ingeschakeld kan je ook het label van de leeslink veranderen in een label naar keuze.

### Zoekparameters

In de sectie zoekparameters bepaal je welke evenementen in het tipsblok worden weergegeven.

#### Query

De query bepaalt welke evenementen opgehaald worden uit de UiTdatabank. In het queryveld kan je uitsluitend de [advanced query syntax](https://docs.publiq.be/docs/uitdatabank/search-api/advanced-queries) gebruiken.

> Wist je dat je handig je query kan samenstellen aan de geavanceerde zoekopdracht bouwer in de [UiTdatabank](www.uitdatabank.be/search)?

![geavanceerde-zoekopdracht-bouwer.png](<../../assets/images/geavanceerde-zoekopdracht-bouwer.png>)

**Voorbeelden**

Enkel evenementen met één of meerdere afbeeldingen ophalen in je tipsblok:

```
mediaObjectsCount:>=1
```

Alle evenementen ophalen die 's avonds doorgaan:

```
localTimeRange:[1700 TO 2359]
```

#### Doorzoek ook ledenaanbod

Bepaal of je evenementen voor leden wilt tonen of niet.

* **Alleen publieksaanbod ophalen**

Om alleen publieksevenementen op te halen, laat je de checkbox `Doorzoek ook ledenaanbod` uitgeschakeld.

* **Zowel publieksaanbod als ledenaanbod ophalen**

Hiervoor schakel duid je het selectievakje `Doorzoek ook ledenaanbod` aan.

* **Alleen ledenaanbod ophalen**

Hiervoor duid je het selectievakje `Doorzoek ook ledenaanbod` aan en voeg je het volgende toe aan je query:

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
