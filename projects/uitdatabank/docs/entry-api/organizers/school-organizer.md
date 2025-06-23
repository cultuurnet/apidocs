# School Organizers

School Organizers are organizers who have [events for schools](../events/create-school.md). School organizers do not have to work exclusivly for schools.
Apart from their events targeted to schools, they might also organize events targeted to the general public.

## Required properties

Unlike general organizers, several extra properties are required for a school organizer.

* The [label](../shared/labels.md) `cultuurkuur_organizer` must be added to the organizer.
* It must have a a contact info with an [email](/docs/uitdatabank/entry-api/shared/booking-and-contact-info#email)
* It must have an [educational description](/docs/uitdatabank/entry-api/reference/operations/update-a-organizer-educational-description)
* It must have an [address](/docs/uitdatabank/entry-api/reference/operations/update-a-organizer-address-1)

Other `cultuurkuur` labels like `cultuurkuur_op_maat` or `cultuurkuur_op_verplaatsing` are optional.
