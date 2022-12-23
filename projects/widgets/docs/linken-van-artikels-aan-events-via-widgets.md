# Linken van artikels aan events via redactionele tools

> Onderstaande functionaliteiten kan je enkel gebruiken met toestemming van publiq. Wil je hiermee aan de slag? Contacteer hiervoor dan <partnerships@publiq.be>.

## Wat zijn redactionele tools?

Redactionele tools zijn een uitbreiding bovenop de widget modules. Ze zijn gericht naar partners die op hun eigen website artikels publiceren over evenementen. 

Met behulp van de redactionele tools kunnen deze partners hun artikels eenvoudig automatisch laten linken aan de overeenkomstige evenementen in de UiTdatabank. Eens gelinkt, wordt een artikel op verschillende kanalen en websites van UiT gepubliceerd (zoals UiTinVlaanderen).

Door redactionle content te linken aan evenementen zorgen we op verschillende vlakken voor meerwaarde:
* **Redacteurs** bereiken een **groter publiek** voor hun **artikels**, omdat het artikel op tal van websites gepubliceerd wordt. 
* Daarnaast **besparen redacteurs tijd uit**, want aan de hand van de widgets kunnen ze de praktische informatie van een evenement in enkele klikken intgreren in artikels
* **Organisatoren** doordat een link ontstaat tussen het artikel en het evenement krijgt hun **activiteit extra aandacht**
* **Geïnteresseerde bezoekers** van activiteiten worden **beter en vollediger geïnformeerd** over een evenement

## Hoe werkt het? 

Om redactionele tools te integreren is er weinig werk vereist langs de partnerkant. Het enige wat je hoeft te doen om je artikel aan een evenement te linken, is het integreren van een specifieke widget `<script>` tag in je artikel, met daarin het `cdbid` van het evenement waarvoor het artikel gaat.

> Het cdbid is de unieke identifier van een evenement in de UiTdatabank. 

### Het `<script>` tag

Het `<script>` tag dat je moet integreren in een artikel ziet er ongeveer als volgt uit: 

```html
<div id="embed" data-cdbid="2274db28-231f-48e8-9531-f290dbd12d66">
  <script type="text/javascript" src="https://projectaanvraag-api.uitdatabank.be/widgets/layout/1234.js"></script>
</div>
```

Deze `<script>` tag bevat 2 variabelen:
1. `data-cdbid`: dit bepaalt welk evenement aan het artikel gelinkt wordt en moet door de redacteur (via het CMS van de website) toegevoegd worden 
2. `src`: dit is de unieke javascript file van je widget, die we jou bezorgen
 
Bovenstaande embed-code genereert een tipsblok met daarin de naam van het evenement, de locatie, het tijdstip en de prijs van het evenement:

`[INSERT IMAGE]`

### Het unieke ID vinden van een evenement 

De waarde van `data-cdbid` uit het `<script>`tag bepaalt welk evenement ingeladen wordt. In bovenstaand voorbeeld is dit het evenement met id `2274db28-231f-48e8-9531-f290dbd12d66`. 

Een redacteur hoeft dus enkel te kiezen welk evenement hij wilt integreren in zijn artikel, door de waarde voor `data-cdbid` aan te passen. De waarde voor `data-cdbid` kan je terugvinden op verschillende manieren

### in de eigen UiT-agenda 

Je kan naar de detailpagina van het evenement in de eigen UiT-agenda surfen. In de url vind je het `cdbid` van het evenement:

`[INSERT VIDEO]`

Deze `cdbid` dien je vervolgens te plakken als waarde voor `data-cdbid` in het widget `<script>` tag.

### in de agenda van UiTinVlaanderen

Je kan naar de detailpagina van het evenement op UiTinVlaanderen surfen. In de url vind je het `cdbid` van het evenement:

`[INSERT IMAGE]`

Deze `cdbid` dien je vervolgens te plakken als waarde voor `data-cdbid` in het widget `<script>` tag.

### door de UiTdatabank te doorzoeken vanuit je eigen CMS

Je kan ook een zoek bouwen doorheen evenementen vanuit je eigen CMS. 

`[DOCS VERDER AANVULLEN]`

## Vereisten

### Inhoudelijke vereisten 

De artikels die je linkt moeten voldoen aan een aantal inhoudelijke vereisten.

#### Wordt toegelaten
* ✅ Een reportage of interview met de maker(s) of artiesten van een voorstelling of activiteit, naar aanleiding van een evenement dat nog moet plaatsvinden
* ✅ Artikel waarin één of meerdere komende activiteiten getipt worden 
* ✅ Recensie van een activiteit waarvoor nog voorstellingen of toonmomenten in de toekomst plaatsvinden

#### Wordt niet toegelaten
* ❌ Zuiver promotionele redactionele content voor evenementen die als organisator zelf organiseert
* ❌ redactionele content die geen meerwaarde toevoegt bovenop de aankondiging van het evenement zelf
* ❌ redactionele content waarbij teruggeblikt wordt naar een afgelopen evenement en waarvoor geen link is met een evenement in de toekomst (bijvoorbeeld de recensie van activiteit die niet meer terugkeert)

### Technische vereisten

Om artikels te kunnen linken via widgets moet je website voldoen aan volgende technische vereisten.

#### Elk artikel moet een aantal vaste HTML tags bevatten

* Een `<h>` tag met daarin de titel van het artikel
* Een `<p>` tag bevatten met daarin de inleiding van het artikel
* Een `<meta>` tag bevatten met daarin `description`als waarde voor het attribuut `name`:

```html
<meta name="description" content="Slongs: sociaal bewogen hangen">
```
#### Aanwezigheid van een favicon

Dit favicon zal gebruikt worden om je artikels extra onder de aandacht te brengen in de agenda's waar je artikels gepubliceerd worden.

#### Gebruik van canonical URL's

Door gebruik te maken van [canonical url's](<https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls>) voor je artikels vermijd je dat hetzelfde artikel meerdere keren gelinkt wordt aan een evenement.

## Bronnen
* [Canonicalization van duplicate URLs](<https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls>)
