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

If you want to test ticket-sales without registering your own event, you can use these existing events:

| Name                               |                   ID                   |                     Details                     |
| ---------------------------------- | :------------------------------------: | :---------------------------------------------: |
| Permanente UiTPAS Test Festiviteit | `5a0967f9-cc06-4c3c-9206-30481a767434` | Allows 100 ticket sales per passholder per week |

## Passholders

When testing ticket sale requests, you'll need an UitpasNumber of a passholder. The table below contains some samples in different flavors:

| UitpasNumber    |    Chip Number   |     Social tariff     | Postal code |          Coupons         |  Card status |  INSZ-number  |              Comment             |
| --------------- | :--------------: | :-------------------: | :---------: | :----------------------: | :----------: | :-----------: | :------------------------------: |
| `0900000095902` | `04784CDAEE3880` |           no          |     9000    |            no            |    active    | `83030201540` | Use this pass for points rewards |
| `0900000067513` | `04363CDAEE3880` |       yes (Gent)      |     9090    |            no            |    active    | `36051380284` | Use this pass for points rewards |
| `0900000031618` | `04CEE7528E6180` |        expired        |     9000    |      1 coupon (Gent)     |    active    | `66010101785` |                 -                |
| `0900000036112` | `04DF396AF85C80` |       yes (Gent)      |     9090    |            no            |    active    | `08091860684` |                 -                |
| `0900000002312` | `04B00412F15284` |       yes (Gent)      |     9000    |            no            |    blocked   | `71030360442` |                 -                |
| `0900000058918` | `045157B2B63780` |        expired        |     1000    |            no            |    active    | `17010180147` |                 -                |
| `1000000520006` | `045A4832633680` |           no          |     9000    |            no            |    active    | `80010101392` |                 -                |
| `0900000093204` | `045D69DAEE3880` | yes (in other region) |     9000    | 2 coupons (other region) |    active    | `10010105762` |                 -                |
| `0900000074519` | `044AC54A8E6180` |          yes          |     n/a     |            n/a           | unregistered |      N/A      |                 -                |
| `0900000020405` | `047E2EEA053B80` |           no          |     n/a     |            n/a           | unregistered |      N/A      |                 -                |

## Group passes

| UitpasNumber    |    Chip Number   | Social tariff | Coupons | Card status |           Comment           |
| --------------- | :--------------: | :-----------: | :-----: | :---------: | :-------------------------: |
| `0900000045410` | `04D0AB6AF85C80` |      yes      |    no   |    active   |              -              |
| `0900000191800` | `048B25DAEE3880` |       no      |   yes   |    active   | max. 50 ticketsales per day |

## Rewards

If you want to test rewards without creating your own rewards, you can use these existing rewards:

| Name                              |   ID   |    Type   |        Details       |
| --------------------------------- | :----: | :-------: | :------------------: |
| Test Voordeel Regio Gent          | `5687` |  `POINTS` | Without restrictions |
| Test Welkomstvoordeel Regio Gent  | `5688` | `WELCOME` | Without restrictions |
| Test Voordeel Regio Gent - 1/week | `5823` |  `POINTS` |      1 per week      |
| Test Online Voordeel - 10/dag     | `5824` |  `POINTS` | Online Reward 10/day |
| Test Vervallen Voordeel           | `5825` |  `POINTS` |    Should not work   |
| Test Vervallen Welkomsvoordeel    | `5826` | `WELCOME` |    Should not work   |
