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

Only videos from YouTube or Vimeo are supported.

## Linking a video

When creating or updating an event/place, you can include a `videos` property, with one or more videos. A video must have the video url of a supported site and a language. While copyrightHolder is optional, it is recommended.

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

Alternatively, you can link a video using one of these endpoints:

* For events: [`POST /events/{eventId}/videos/{language}`](/reference/entry.json/paths/~1events~1{eventId}~1videos/post)
* For places: [`POST /places/{placeId}/videos/{language}`](/reference/entry.json/paths/~1places~1{placeId}~1videos/post)

After linking the video to your event or place, it will get an id. You can retrieve this id by fetching the [event](/reference/entry.json/paths/~1events~1{eventId}/get) or [place](/reference/entry.json/paths/~1places~1{placeId}/get) from UiTdatabank.
You need this id to update the video information or removing the video from your event or place.

## Updating video information

You can update the information of a video using one of these endpoints:

* For events: [`PATCH /events/{eventId}/videos/{language}`](/reference/entry.json/paths/~1events~1{eventId}~1videos/patch)
* For places: [`PATCH /places/{placeId}/videos/{language}`](/reference/entry.json/paths/~1places~1{placeId}~1videos/patch)

## Removing a video

You can remove a video from your event or place using one of the endpoins:

* For events: [`DELETE /events/{eventId}/videos/{language}`](/reference/entry.json/paths/~1events~1{eventId}~1videos~1{videoId}/delete)
* For places: [`DELETE /places/{placeId}/videos/{language}`](/reference/entry.json/paths/~1places~1{placeId}~1videos~1{videoId}/delete)

## Embedding a video on your website

When you fetch an [event](/reference/entry.json/paths/~1events~1{eventId}/get) or [place](/reference/entry.json/paths/~1places~1{placeId}/get) with a video, then the video will have a property `embedUrl`

For example:

```json
"videos": [
  {
    "id": "7a870b7b-a543-4837-a0c2-d8d55bba5e1a",
    "url": "https://www.youtube.com/watch?v=35SMEnyPutE",
    "embedUrl": "https://www.youtube.com/embed/35SMEnyPutE",
    "language": "nl",
    "copyrightHolder": "publiq vzw"
  }
]
```

You can use this in your website:

```html
<iframe type="text/html" width="640" height="360" src="https://www.youtube.com/embed/35SMEnyPutE" frameborder="0">
</iframe>
```
