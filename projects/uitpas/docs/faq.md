# F.A.Q.

### Will the UiTPAS API be able to handle all of my requests? I'm worried about a realtime dependency on UiTPAS at check out.

Only a small percentage of your requests should be accessing the UiTPAS API, as you only show [UiTPAS tariffs](/reference/uitpas.json/paths/~1tariffs/get) for those users who entered an UiTPAS number or have an UiTPAS number saved in their user profile. Numerous applications are already successfully accessing the UiTPAS API every day, which has been running since 2012 with very low downtime.

### Can the regularPrice sent in /ticket-sales differ from the prices listed in the UiTdatabank event?

Yes, you can send any price, not only the prices listed in the UiTdatabank event.
We strongly advice to always update the price of the UiTdatabank event when the price changes, as this price will be listed publicly on websites such as [UiTinVlaanderen](http://www.uitinvlaanderen.be).
Keeping this price up-to-date also helps us fight fraud and makes it easier to audit price changes.

### Why can't I calculate the UiTPAS tariffs in my application?

The calculation of the correct UiTPAS tariff is dependent on many factors such as the availability of a social tariff for the passholder and settings within the UiTPAS region. These are checked in realtime by UiTPAS. You should never calculate the UiTPAS tariff yourself, because only UiTPAS can [give you the correct tariff](/reference/uitpas.json/paths/~1tariffs/get) for a specific passholder at the current time.

### Can I get a list of discounts instead of a list of tariffs?

No, [/tariffs](/reference/uitpas.json/paths/~1tariffs/get) will give you the discounted tariffs for a given price.
You shouldn't calculcate these discounts yourself because they can vary from a relative (-50%) or an absolute discount (-5 euro).

### My events are private and I don't want them to be public. How can I do this?

One of the biggest advantages of creating UiTdatabank events, is that your events will be available throughout thousand of local events calendars and websites such as [UiTinVlaanderen](http://www.uitinvlaanderen.be).

If you don't want your events to be published in this way you [should set the audienceType](https://docs.publiq.be/docs/uitdatabank/entry-api%2Freference%2Foperations%2Fupdate-a-event-audience) to "members" on your events.

```
"audience": {
  "audienceType": "members"
}
```

### When should I register the ticket sale?

Within UiTPAS, there are constraints such as the number of tickets that can be sold at a social tariff or how many times a coupon can be used.
That's why it makes sense to already [register the ticket sale](/reference/uitpas.json/paths/~1ticket-sales/post) right before the payment.
Otherwise if you wait to register the ticket sale until after the passholder has paid, the chosen tariff might not be valid anymore.

If the passholder doesn't end up buying the ticket, you should [cancel the ticket sale registration](/reference/uitpas.json/paths/~1ticket-sales~1%7BticketSaleId%7D/delete).

### Can I get a list of all UiTPAS numbers that have a social tariff ('kansentarief')?

The calculation of the correct UiTPAS tariffs is dependent on many factors such as the availability of a social tariff for the passholder and settings within the UiTPAS region. These are checked in realtime by UiTPAS. That's why it's a bad idea to only use UiTPAS numbers without accessing the UiTPAS API.

### Can I use the same client access tokens for multiple UiTPAS organizers?

Organizers can be grouped into your customer units. Different organizations tied to the same municipality or overarching organization will be tied to the same credentials. For every customer, we will expect you to request a new set of credentials. Keep in mind that user permissions now need to be managed by your application as client access tokens are agnostic of the person performing the actions.
