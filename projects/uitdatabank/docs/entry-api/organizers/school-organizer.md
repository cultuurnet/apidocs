# School Organizers

School organizers are the same as other organizers in UiTdatabank, except that they are also published on [Cultuurkuur](https://www.cultuurkuur.be).
School organizers can create [school events](../events/create-school.md), as well as regular events.

If you already have your organization in UiTdatabank, just update with below properties to turn it into a school organizer. Read our guide on [finding and re-using existing organizers](finding-and-reusing-organizers.md)

## Required properties

Every organizer has a set of [properties that are required](create.md#required-properties) to create it, and that are always guaranteed to be on existing organizers. School organizers have several additional required properties, as listed below.


* The [label](../shared/labels.md) `cultuurkuur_organizer` must be added to the organizer.
* It must have a contactPoint containing an [email address](/docs/uitdatabank/entry-api/shared/booking-and-contact-info#email)
* It must have an [educational description](/docs/uitdatabank/entry-api/reference/operations/update-a-organizer-educational-description)
* It must have an [address](/docs/uitdatabank/entry-api/reference/operations/update-a-organizer-address-1)

## More properties

### Tailored offering
School organizers can also indicate whether they can tailor their offering to the specific needs of a school. This is done by adding the label `cultuurkuur_op_maat`.

### On school grounds
School organizers that are willing to organize their offering on school grounds, can indicate so, and can specify in which regions. 

This is done by adding the label `cultuurkuur_op_verplaatsing` and adding the right working region labels.
