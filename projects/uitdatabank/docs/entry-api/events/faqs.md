# Adding frequently asked questions (FAQs)

Attendees often have practical questions about an event before they decide to go: how to get there, whether food is provided, what to bring along, whether the location is accessible, ...

Instead of putting all of this in the description of your event, you can add a list of frequently asked questions (FAQs) to it. Every FAQ is a question with its answer, so publication channels can show them in a structured way, for example as a separate FAQ section on the detail page of your event.

In this guide you will learn how to add, update and remove the FAQs of your event via Entry API.

Before getting started, we recommend that you have read the following guides:

* [Creating a new event](./create.md)
* [Updating an event](./update.md)

## Permissions

Anyone who [creates a new event](./create.md) can include FAQs. For [updates to an existing event](./update.md), the usual permission checks apply.

## The faqs property

FAQs are stored in the `faqs` property of an event. It is a list of at most 30 FAQ items.

Each item contains the question and its answer in one or more of the languages `nl`, `fr`, `de` and `en`:

```json
{
  "faqs": [
    {
      "nl": {
        "question": "Hoe geraak ik er?",
        "answer": "Met de bus."
      },
      "en": {
        "question": "How do I get there?",
        "answer": "By bus."
      }
    },
    {
      "nl": {
        "question": "Is er eten voorzien?",
        "answer": "Ja, we hebben verschillende opties, inclusief vegetarisch."
      }
    }
  ]
}
```

The following rules apply to every FAQ item:

* It must contain at least one language.
* Every language you include must have both a `question` and an `answer`.
* A `question` can be at most 255 characters long, an `answer` at most 5000 characters.

You do not have to provide every language, and the items in the list do not need to have the same languages. We do recommend to always include the main language of your event.

FAQs are only available on events, not on places.

## Adding FAQs when creating an event

You can include `faqs` right away in the body of [`POST /events`](/reference/entry.json/paths/~1events/post) when [creating a new event](./create.md):

```json
{
  "mainLanguage": "nl",
  "name": {
    "nl": "Zomerkamp in het bos"
  },
  "faqs": [
    {
      "nl": {
        "question": "Wat moet mijn kind meebrengen?",
        "answer": "Sportieve kledij, een drinkbus en een lunchpakket."
      }
    }
  ],
  "...": "..." // Other properties omitted for brevity
}
```

## Updating the FAQs

To change the FAQs of an existing event, use the [`PUT /events/{eventId}/faqs`](/reference/entry.json/paths/~1events~1{eventId}~1faqs/put) endpoint. The request body is the complete list of FAQs:

```json
[
  {
    "nl": {
      "question": "Hoe geraak ik er?",
      "answer": "Met de bus."
    }
  },
  {
    "nl": {
      "question": "Is het terrein rolstoeltoegankelijk?",
      "answer": "Ja, alle activiteiten vinden plaats op vlak terrein."
    }
  }
]
```

This endpoint replaces the existing FAQs of the event. FAQs that were previously set on the event, but are not included in your request body, are removed. So if you want to add one FAQ to an event that already has some, send the existing FAQs together with the new one.

The same applies to the FAQs in the body of [`PUT /events/{eventId}`](/reference/entry.json/paths/~1events~1{eventId}/put) when you update your event in its entirety. When you leave out `faqs` from that body, the existing FAQs of the event are removed.

## Removing the FAQs

To remove all FAQs from your event, send an empty list to [`PUT /events/{eventId}/faqs`](/reference/entry.json/paths/~1events~1{eventId}~1faqs/put):

```json
[]
```

## Reading the FAQs

When you [retrieve an event](/reference/entry.json/paths/~1events~1{eventId}/get), its FAQs are included in the `faqs` property. When the event has no FAQs, the `faqs` property is omitted from the response.

FAQs are not indexed in Search API, so you cannot search or filter events on their FAQs.

## Validation errors

When your FAQs do not follow the rules above, for example because a list contains more than 30 items, or a language has a `question` without an `answer`, your request is rejected with a `400` error of type `https://api.publiq.be/probs/body/invalid-data`. The `schemaErrors` in the response point to the invalid property in your request body using a `jsonPointer`.
