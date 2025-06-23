# School Organizers

School Organizers are organizers who have (also) [events for schools](../events/create-school.md).
School organizers (link) are the same als other  organizers in UiTdatabank, except that they are also published on [Cultuurkuur](https://www.cultuurkuur.be).
School organizers can create [school events](../events/create-school.md), as well as regular events.

If you already have your organization in UiTdatabank, just update with below properties to turn it into a school organizer. Read our guide on finding and re-using existing organizers (link)

## Required properties

Unlike general organizers, several extra properties are required for a school organizer.

* The [label](../shared/labels.md) `cultuurkuur_organizer` must be added to the organizer.
* It must have a a contact info with an [email](/docs/uitdatabank/entry-api/shared/booking-and-contact-info#email)
* It must have an [educational description](/docs/uitdatabank/entry-api/reference/operations/update-a-organizer-educational-description)
* It must have an [address](/docs/uitdatabank/entry-api/reference/operations/update-a-organizer-address-1)

Other `cultuurkuur` labels like `cultuurkuur_op_maat` or `cultuurkuur_op_verplaatsing` are optional.
