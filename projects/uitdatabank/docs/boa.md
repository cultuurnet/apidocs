# BOA

The BOA decree (*Buitenschoolse Opvang en Activiteiten*) aims to create a comprehensive and integrated offering of out-of-school care and leisure activities for school-aged children in Flanders. Local governments act as the central directors, coordinating with partners across education, youth work, sports, and culture. To properly capture this specific offering in UiTdatabank, several new features and fields have been added to the Entry API.

For more general information about publiq's role in the BOA decree, visit [publiq.be/boa](https://publiq.be/boa).

## Use the new BOA features

Do you want to:

* Enter BOA activities in UiTdatabank?
* Create an agenda featuring BOA offerings?
* Expand an existing integration?

Find all technical information in our [BOA guide](./entry-api/events/create-boa.md).

## The new BOA features

| Feature                    | Description                                                                        |
| -------------------------- | ---------------------------------------------------------------------------------- |
| [**New types**](./taxonomy-api/terms.md#eventtype) | Activiteit met de jeugdbeweging, Kinderopvang, Speelpleinwerking                     |
| [**Children only**](/reference/entry.json/paths/~1events~1{eventId}~1children-only/put) | Indicate whether your activities are exclusively aimed at children                   |
| [**Birthdate range**](/reference/entry.json/paths/~1events~1{eventId}~1birthdate-range/put) | Specify the target age range using birth dates                                  |
| [**FAQs**](/reference/entry.json/paths/~1events~1{eventId}~1faqs/put) | Add frequently asked questions and answers to supplement your activity description   |
| [**Expanded calendar info**](./entry-api/shared/calendar-info.md) | <ul><li><a href="./entry-api/shared/calendar-info.md#childcare-times-events-only">Childcare times</a></li><li><a href="./entry-api/shared/calendar-info.md#adjusted-opening-hours-periodicpermanent">Adjusted opening hours</a></li><li><a href="./entry-api/shared/calendar-info.md#closed-days-periodicpermanent">Closed days</a></li><li><a href="./entry-api/shared/calendar-info.md#overnight-stay-events-only-singlemultiple">Overnight stay (camps)</a></li></ul> |
| [**Departure places**](/reference/entry.json/paths/~1events~1{eventId}~1departure-places/put) | Specify pickup locations offering supervised transport to your activity              |
