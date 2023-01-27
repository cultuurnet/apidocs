# Responsive gedrag

De verschillende blokken binnen een widget schalen automatisch mee met de afmetingen van het scherm, van brede computerschermen tot mobiele telefoons. De lay-out is steeds vlot toegankelijk en leesbaar op de smalste schermen.

De content choreografie van de verschillende templates & lay-outs op brede en smalle schermen:

![widget choreografie.png](<../assets/images/widget choreografie.png>)

Het responsive gedrag van een widget kan je in de widgetbouwer simuleren door te switchen tussen viewports (mobiel, tablet, desktop):

<https://youtu.be/m9o8aYY1JVM>

Hieronder gaan we specifiek in op het standaard responsive gedrag per blok.

## Standaard responsive gedrag

### Zoekbox

* Header en footer worden steeds over de ganse breedte (van de container) boven -en onderaan weergegeven
* In een smalle container (zoals een zijbalk) wordt de zoekbox automatisch verticaal weergegeven
* In bredere containers wordt de zijbalk standaard horizontaal weergeven waarbij het aantal kolommen gelijk is aan het aantal aangevinkte componenten

### Resultatenlijst

* De labels in de rijkoppen (bv. wat, waar, wanneer, prijs, etc.) worden op het kleinste breekpunt vervangen door icoontjes
* De beschrijving wordt op mobiele weergave niet getoond
* Afbeeldingen links van de evenementinformatie worden mobiel boven de evenementinformatie weergegeven. Afbeeldingen rechts verschijnen onder de evenementinformatie in mobiele weergave

### Verfijningen

Wanneer de beschikbare container breedte kleiner is dan `768 pixels` wordt de verfijningen-kolom ingeklapt bovenaan de zoeklijst weergegeven, onafhankelijk van de gekozen linker- of rechter positie.

### Tips

De verschillende items van een tipsblok worden op het kleinste breekpunt (mobiele weergave, `576px`) onder elkaar weergegeven.

## Responsive gedrag beïnvloeden

Je kan het responsive gedrag van widgets op verschillende manieren beïnvloeden.

### Via geavanceerde instellingen

In de [geavanceerde instellingen](./gevanceerde-instellingen.md) kan je ervoor kiezen om een widget altijd weer te geven volgens de mobiele weergave, met de setting `Forceer smalle weergave`.

### Via CSS

Je kan ook aan de hand van [eigen geschreven CSS](./stijlen.md) de mobiele weergave bepalen. Je kan hiervoor gebruik maken van de breekpunten die de widgets zelf hanteren:

* **tablet**: `786px`
* **mobile**: `576px`

> Je kan ook eigen, extra breekpunten bepalen. Dat raden we echter af omdat dit de content choreografie (onnodig) complex maakt.

**Voorbeeld**

Volgende regels CSS zullen ervoor zorgen dat de afbeeldingen op mobiele weergave (smartphone) niet getoond worden:

```css
@media screen and (max-width: 576px) {
  .cnw_img_responsive {
    display: none;
  }
}
```
