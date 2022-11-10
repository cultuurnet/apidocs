# Terms

The categorisation model of UiTdatabank is a standard aimed at simplifying data exchange and avoiding complex mapping procedures.

The main purpose of the categorisation model is to categorise cultural and leisure activities. The categorisation model consists of 3 dimensions (`domains`):
1. `eventtype`
2. `theme`
3. `facility`

There is no strong hierarchy between the different dimensions: there is only a hierarchical relationship between the first and second dimension.

The complete categorisation model is available in our [Taxonomy API](https://taxonomy.uitdatabank.be/terms).

> The categorisation model only applies on events & places. There is currently no categorisation model for organizers.


## Eventtype
Scope: `events`, `places`

The eventtype describes the form of the event or place, e.g. a `concert` (for an event) or a `theatre hall` (for a place).

When creating an event or place in UiTdatabank, a term with domain `eventtype` is mandatory.

## Theme
Scope: `events`

A term with domain `theme` is used to describe the content of an event more precisely, e.g. a concert can have a theme `pop and rock` or `jazz and blues`.
There is no strict relationship between eventtypes and themes. However, we strongly advice to make logical combinations. These logical combinations can be found in the taxonomy API as `otherSuggestedTerms`.

When creating an event in UiTdatabank, a term with domain `theme` is optional.

## Facility
Scope: `events`, `places`

A term with domain `facility` describes specific accessibility facilities for people with disabilities, e.g. accessible sanitary facilities. Some facilities apply on locations only, others on events only.

> The list of accessibility features below has been compiled in consultation with Inter - Toegankelijk Vlaanderen. These facilities are behind a permission model and can only be added by trusted partners. If you are interested in enriching your own event data or data from third parties with facility information, please contact vragen@publiq.be.

### Location-level facilities
Location-level facilities are facilities that are permanently on site. These facilities are available for all events taking place at the location:

* `Facilities for guide dogs`: guide dogs must be allowed at events at all times. The organisation will provide water and a place for relief for assistance dogs.
* `Parking area`: there are adapted parking spaces for visitors with disabilities close to the event.
* `Point of contact for people with a disability`: there is a clear point of contact on site where visitors with disabilities can go with their questions. This can be a physical reception and information point (accessible, of course) or with assistants.
* `Wheelchair available`: there is at least one wheelchair available that can be borrowed by visitors with disabilities.


### Event-level facilities
Facilities that differ from event to event.

#### Facilities for people with a physical disability

* `Accessible for wheelchairs`: the public area of the event location (entrance, venue and sanitary facilities) is accessible for wheelchair users.
* `Accessible sanitary facilities`: at least 1 accessible toilet for visitors with disabilities is available at the event.
* `Assistance`: staff at the event offer welcome and assistance to visitors with disabilities. 
* `Parking area`: there are adapted parking spaces for visitors with disabilities close to the event.
* `Viewing platform`: a raised platform is available for people with disabilities and wheelchair users so that they have a clear view of the event.  
* `Wheelchair available`: there is at least one wheelchair available that can be borrowed by visitors with disabilities.


#### Facilities for visually impaired persons

* `Audiodescription`: there is an offer of audio description for the blind and visually impaired. Audio-description is a technique where a voice explains what can be seen, allowing the target audience to fully experience the event.
* `Facilities for guide dogs`: guide dogs must be allowed at events at all times. The organisation will provide water and a place for relief for assistance dogs.


#### Facilities for persons with hearing impairment

* `Audio induction loop`: an audio induciton loop is a device that allows people with hearing aids to hear electrically amplified spoken language or music without disturbing ambient noise. The sound is converted via an electromagnetic field and that signal can be heard through the hearing aid.
* `Subtitles`: supertitling or subtitling is a textual version of spoken language. Supertitles are used in live performances. Subtitles in film or video.
* `Sign language interpreting service`: Flemish Sign Language interpreters ensure smooth communication between hearing persons using spoken language (Dutch) and deaf persons using Flemish Sign Language ("VGT"). And translate the spoken language or music lyrics of your event into Flemish Sign Language.


#### Facilities for persons with intellectual disabilities

* `Simplified information`: an offer of simplified texts, introductions or information about the event or how to participate in the event. 


#### Facilities for neurodiverse persons

* `Agreements and predictability`: a range of information and facilities that ensure clear arrangements and better predictability of the event.
* `Low incentive`: a range of activities, facilities and materials that ensures that the event can be experienced in a low-incentive way.


#### Other facilities for disabled persons

* `Alternative entrance`: alternative accessible entrance for wheelchair users
* `Carer pass`: for each person with a disability, a maximum of one companion may participate in the event and use the facilities free of charge. In some provinces, the companion pass exists for this purpose. 
* `Care room`: there is a care room at the event where people with disabilities can be cared for and changed. A hoist, care bed and water are available. 
* `Certified accessibility`: Inter's accessibility guarantee label indicates that the event is accessible to all.
* `Charging facility for wheelchairs`: persons with disabilities can use power at the event to charge electric wheelchairs and devices according to their disability.
* `Guaranteed view`: visitors with disabilities are guaranteed a clear view of what is going on during your event. 
* `Point of contact for people with a disability`: there is a clear point of contact on site where visitors with disabilities can go with their questions. This can be a physical reception and information point (accessible, of course) or with assistants.
* `Reserved campsite`: there is a campsite (separate or part of the regular campsite) for visitors with disabilities. This section is accessible to visitors with disabilities and has accessible sanitary facilities and showers. 
* `Special assitance`: Inter-volunteers provide welcome and assistance to visitors with disabilities during the event. 
