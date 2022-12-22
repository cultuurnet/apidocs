# Compatibiliteit

## Widgetbouwer

De widgetbouwer is 100% compatibel (zowel functioneel als qua design) met alle browserversies voor Edge, Safari, Firefox en Google Chrome waarvoor de fabrikant van de browserapplicatie nog ondersteuning voor voorziet.

Voor oudere browserversies en alternatieve browserapplicaties biedt publiq geen garanties qua compatibiliteit.

## Agendawidgets

Voor de integratie van een UiT-widget moet je website voldoen aan een aantal (eenvoudige) technische vereisten:

#### De website moet URL-parameters toelaten

Widgets gebruiken een set van URL-parameters om te navigeren naar verschillende pagina's (zoals de detailpagina).

#### Gebruik van jQuery (toelaten)

Standaard laden de widgets `jQuery v3.1.0` in. Dit is nodig om de widgets goed te laten werken. 

Gebruikt je website andere versie van jQuery en zorgt dit voor conflicten, dan kan je deze standaardinstelling uitschakelen in de  [geavanceerde instellingen](./geavanceerde-instellingen.md#jquery-niet-inladen) van de widget.
