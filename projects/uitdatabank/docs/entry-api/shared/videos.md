# Videos

Videos make your events or places stand out from the crowd and more attractive to visitors.

Online calendars can show an embedded video player, so results with videos are more likely to be checked out by visitors.

In this guide you will learn how to link videos to your events and places. Additionally, you'll learn how to update or remove the videos afterward.

## Scope

Videos can linked to:

* ✅ [Events](../events/introduction.md)
* ✅ [Places](../places/introduction.md)
* ❌ [Organizers](../organizers/introduction.md)

## Supported video sites

Only videos from [YouTube](https://www.youtube.com/) or [Vimeo](https://vimeo.com/) are supported.

## Linking a video

When creating or updating an event/place, you can include a `videos` property, with one or more videos. A video must have the video url of a supported site and a language. CopyrightHolder is recommended, but not mandatory.

For example:

```json
{
  "mainLanguage": "nl",
  "name": {
    "nl": "Mijn voorbeeld activiteit"
  },
  "...": "...",
  "videos": [
    {
      "url": "https://www.youtube.com/watch?v=35SMEnyPutE",
      "language": "nl",
      "copyrightHolder": "publiq vzw"
    }
  ]
}
```

<!--
  @todo
  - Explain supported types of videos
  - Explain how to add/update/remove videos from events/places
  - Explain how to embed on your website
-->
