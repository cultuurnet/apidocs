# UiTPAS test dataset

## Organizers

| Name                                                |                   ID                   |
| --------------------------------------------------- | :------------------------------------: |
| \[TEST] UiTPAS Organisatie (Regio Gent + Paspartoe) | `0ce87cbc-9299-4528-8d35-92225dc9489f` |

Your test client should have permission to this organizer. You can double-check which organizer you have permission to by using [GET /permissions](/reference/uitpas.json/paths/~1permissions/get)

```http
GET /permissions HTTP/1.1
Host: https://api-test.uitpas.be
Authorization: Bearer YOUR_ACCESS_TOKEN'
```

Example response:

```json
[
  {
    "organizer": {
      "id": "0ce87cbc-9299-4528-8d35-92225dc9489f",
      "name": "[TEST] UiTPAS Organisatie (Regio Gent + Paspartoe)"
    }
  }
]
```

You will need the organizer id when registering events.

## Events

If you want to test ticket-sales without registering your own events, you can use these existing events:

| Name                               |                   ID                   |                         Details                         |
| ---------------------------------- | :------------------------------------: | :-----------------------------------------------------: |
| Permanente UiTPAS Test Festiviteit | `5a0967f9-cc06-4c3c-9206-30481a767434` | Allows 100 ticket sales per passholder per week         |
| Test event met beperkte aankoop    | `d83b5b8a-108a-45d6-9ac9-8bdc44a0a24a` | Allows only 1 ticket sale per week, to test refusals    |
| Test event with no permission      | `373d6cee-b4ae-4637-9b7c-eeb79e45f044` | Event by a different organizer - no ticketsale possible |

## Passholders

When testing ticket sale requests, you'll need an UitpasNumber of a passholder. The table below contains some samples in different flavors:

| UitpasNumber    |    Chip Number   |     Social tariff     | Postal code |          Coupons         |    Card status   |  INSZ-number  |              Comment             |
| --------------- | :--------------: | :-------------------: | :---------: | :----------------------: | :--------------: | :-----------: | :------------------------------: |
| `0900000095902` | `04784CDAEE3880` |           no          |     9000    |            no            |      active      | `83030201540` | Use this pass for points rewards |
| `0900000067513` | `04363CDAEE3880` |       yes (Gent)      |     9090    |            no            |      active      | `36051380284` | Use this pass for points rewards |
| `0900000031618` | `04CEE7528E6180` |      yes (expired)    |     9000    |            --            |      active      | `66010101785` |                 -                |
| `0900010959113` | `04ED6ACACF6180` |    yes (Gentbrugge)   |     9090    |            no            |      active      | `08091860684` |                 -                |
| `0900000002312` | `04B00412F15284` |       yes (Gent)      |     9000    |            no            |   **blocked**    | `71030360442` |                 -                |
| `0900000058918` | `045157B2B63780` |      yes (expired)    |     1000    |            no            |      active      | `17010180147` |                 -                |
| `1000000520006` | `045A4832633680` |           no          |     9000    |            no            |      active      | `80010101392` |                 -                |
| `0900000093204` | `045D69DAEE3880` | yes (in other region) |     9000    | 2 coupons (other region) |      active      | `10010105762` |                 -                |
| `0900004518305` |        -         |           no          |     9000    |            n/a           |      active      | `80010170282` | Online UiTPAS, family account    |
| `0900004518305` |        -         |           no          |     9000    |            n/a           |      active      | `20010170215` | Daughter of above user, child    |
| `0900011902815` |        -         |       yes (Gent)      |     9000    |            n/a           |      active      | `91063061055` | Online UiTPAS, family account    |
| `0900011903417` |        -         |       yes (Gent)      |     9000    |            n/a           |      active      | `15021760024` | Daughter of above user, child    |
| `0900000074519` | `044AC54A8E6180` |          yes          |     n/a     |            n/a           | **unregistered** |      N/A      |                 -                |
| `0900000020405` | `047E2EEA053B80` |           no          |     n/a     |            n/a           | **unregistered** |      N/A      |                 -                |

## Group passes

| UitpasNumber    |   Chip Number    | Social tariff | Coupons | Card status |           Comment           |
| --------------- | :--------------: | :-----------: | :-----: | :---------: | :-------------------------: |
| `0900000045410` | `04D0AB6AF85C80` |      yes      |    no   |    active   |              -              |
| `0900000191800` | `048B25DAEE3880` |       no      |   yes   |    active   | max. 50 ticketsales per day |

## Rewards

If you want to test rewards without creating your own rewards, you can use these existing rewards:

| Name                              |   ID   |    Type   |        Details       |
| --------------------------------- | :----: | :-------: | :------------------: |
| Test Voordeel Regio Gent          | `5687` |  `POINTS` | Without restrictions |
| Test Welkomstvoordeel Regio Gent  | `5688` | `WELCOME` | Without restrictions |
| Test Voordeel Regio Gent - 1/week | `5823` |  `POINTS` | 1 per week           |
| Test Online Voordeel - 10/dag     | `5824` |  `POINTS` | Online Reward 10/day |
| Test Vervallen Voordeel           | `5825` |  `POINTS` | Should not work      |
| Test Vervallen Welkomsvoordeel    | `5826` | `WELCOME` | Should not work      |
