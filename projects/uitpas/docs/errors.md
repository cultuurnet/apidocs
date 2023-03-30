# Errors

This page contains an overview of all possible error types inside the `https://api.publiq.be/probs/uitpas/` namespace that can be returned by UiTPAS APIs.

> For more info about error handling on our APIs in general, see the dedicated [Errors](https://docs.publiq.be/docs/errors) space.

## school-not-found

* **Complete type:** `https://api.publiq.be/probs/uitpas/school-not-found`
* **Title**: `School not found`
* **Status**: `404`

The request you are trying to perform cannot complete because the provided school cannot be found.

## passholder-not-found

* **Complete type:** `https://api.publiq.be/probs/uitpas/passholder-not-found`
* **Title**: `Passholder not found`
* **Status**: `404`

The request you are trying to perform cannot complete because the provided passholder cannot be found.

## pass-not-found

* **Complete type:** `https://api.publiq.be/probs/uitpas/pass-not-found`
* **Title**: `Pass not found`
* **Status**: `404`

The request you are trying to perform cannot complete because the provided pass cannot be found.

## card-blocked

* **Complete type:** `https://api.publiq.be/probs/uitpas/card-blocked`
* **Title**: `Card blocked`
* **Status**: `400`

The request you are trying to perform cannot complete because the provided card is blocked.

## event-not-found

* **Complete type:** `https://api.publiq.be/probs/uitpas/event-not-found`
* **Title**: `Event not found`
* **Status**: `404`

The request you are trying to perform cannot complete because the provided event cannot be found.

## cardsystem-not-found

* **Complete type:** `https://api.publiq.be/probs/uitpas/cardsystem-not-found`
* **Title**: `Card system not found`
* **Status**: `400`

The request you are trying to perform cannot complete because the provided card system cannot be found.

## organizer-not-found

* **Complete type:** `https://api.publiq.be/probs/uitpas/organizer-not-found`
* **Title**: `Organizer not found`
* **Status**: `404`

The request you are trying to perform cannot complete because the provided organizer cannot be found.

## invalid-uitpas-number

* **Complete type:** `https://api.publiq.be/probs/uitpas/invalid-uitpas-number`
* **Title**: `Invalid uitpas number`
* **Status**: `400`

The request you are trying to perform cannot complete because the provided uitpas number is invalid.

## invalid-insz-number

* **Complete type:** `https://api.publiq.be/probs/uitpas/invalid-insz-number`
* **Title**: `Invalid insz number`
* **Status**: `400`

The request you are trying to perform cannot complete because the provided insz number is invalid.

## invalid-card-system

* **Complete type:** `https://api.publiq.be/probs/uitpas/invalid-card-system`
* **Title**: `Invalid card system`
* **Status**: `400`

The request you are trying to perform cannot complete because the provided card system is not applicable in this context.

## disributionkey-not-found

* **Complete type:** `https://api.publiq.be/probs/uitpas/disributionkey-not-found`
* **Title**: `Distribution key not found`
* **Status**: `400`

The request you are trying to perform cannot complete because the provided distribution key cannot be found.

## invalid-distributionkey

* **Complete type:** `https://api.publiq.be/probs/uitpas/invalid-distributionkey`
* **Title**: `Invalid distribution key`
* **Status**: `500`

The request you are trying to perform cannot complete because the no valid distribution key can be found.

## report-not-found

* **Complete type:** `https://api.publiq.be/probs/uitpas/report-not-found`
* **Title**: `Report not found`
* **Status**: `404`

The request you are trying to perform cannot complete because the provided report cannot be found.

## report-invalid-status

* **Complete type:** `https://api.publiq.be/probs/uitpas/report-invalid-status`
* **Title**: `Invalid report status`
* **Status**: `400`

The request you are trying to perform cannot complete because the provided report is not in the correct state.

## group-not-found

* **Complete type:** `https://api.publiq.be/probs/uitpas/group-not-found`
* **Title**: `Group not found`
* **Status**: `400`

The request you are trying to perform cannot complete because the provided group cannot be found.

## event-already-has-ticketsales

* **Complete type:** `https://api.publiq.be/probs/uitpas/event-already-has-ticketsales`
* **Title**: `Event already has ticket sales`
* **Status**: `400`

The request you are trying to perform cannot complete because the event already has ticket sales.

## invalid-card

* **Complete type:** `https://api.publiq.be/probs/uitpas/invalid-card`
* **Title**: `Invalid card`
* **Status**: `400`

The request you are trying to perform cannot complete because the given card is not applicable in this context.

## invalid-card-status

* **Complete type:** `https://api.publiq.be/probs/uitpas/invalid-card-status`
* **Title**: `Invalid card status`
* **Status**: `400`

The request you are trying to perform cannot complete because the given card is not in the expected state.

## maximum-reached

* **Complete type:** `https://api.publiq.be/probs/uitpas/maximum-reached`
* **Title**: `Maximum reached`
* **Status**: `400`

The request you are trying to perform cannot complete because the maximum number of operations of this kind have been reached.

## invalid-coupon

* **Complete type:** `https://api.publiq.be/probs/uitpas/invalid-coupon`
* **Title**: `Invalid coupon`
* **Status**: `400`

The request you are trying to perform cannot complete because the given coupon is not valid.

## social-tariff-expired

* **Complete type:** `https://api.publiq.be/probs/uitpas/social-tariff-expired`
* **Title**: `Social tariff expired`
* **Status**: `400`

The request you are trying to perform cannot complete because the passholder has an expired social tariff.

## passholder-no-active-cardsystems

* **Complete type:** `https://api.publiq.be/probs/uitpas/passholder-no-active-cardsystems`
* **Title**: `Passholder has no active cardsystem memberships`
* **Status**: `400`

The request you are trying to perform cannot complete because the passholder has no active card system memberships.

## ticket-sale-not-found

* **Complete type:** `https://api.publiq.be/probs/uitpas/ticket-sale-not-found`
* **Title**: `Ticket sale not found`
* **Status**: `404`

The request you are trying to perform cannot complete because the given ticket sale cannot be found.

## invalid-city

* **Complete type:** `https://api.publiq.be/probs/uitpas/invalid-city`
* **Title**: `Invalid city`
* **Status**: `400`

The request you are trying to perform cannot complete because the provided city is invalid.

## invalid-postal-code

* **Complete type:** `https://api.publiq.be/probs/uitpas/invalid-postal-code`
* **Title**: `Invalid postal code`
* **Status**: `400`

The request you are trying to perform cannot complete because the provided postal code is invalid.

## insz-in-token-required

* **Complete type:** `https://api.publiq.be/probs/uitpas/insz-in-token-required`
* **Title**: `INSZ in token required`
* **Status**: `400`

The request you are trying to perform cannot complete because this request needs a token including an `https://publiq.be/rrn` claim.

## forbidden-underaged

* **Complete type:** `https://api.publiq.be/probs/uitpas/forbidden-underaged`
* **Title**: `Forbidden Underaged`
* **Status**: `400`

The request you are trying to perform cannot complete because it is not allowed for underaged users.

## insz-already-used

* **Complete type:** `https://api.publiq.be/probs/uitpas/insz-already-used`
* **Title**: `INSZ already used`
* **Status**: `400`

The request you are trying to perform cannot complete because the insz number is already in use.

## passholder-already-registered

* **Complete type:** `https://api.publiq.be/probs/uitpas/passholder-already-registered`
* **Title**: `Passholder already registered`
* **Status**: `400`

The request you are trying to perform cannot complete because the passholder is already registered.

## uitid-already-registered

* **Complete type:** `https://api.publiq.be/probs/uitpas/uitid-already-registered`
* **Title**: `UiTID already registered`
* **Status**: `400`

The request you are trying to perform cannot complete because the given uitid is already used to register another passholder.

## reward-not-found

* **Complete type:** `https://api.publiq.be/probs/uitpas/reward-not-found`
* **Title**: `Reward not found`
* **Status**: `404`

The request you are trying to perform cannot complete because the reward cannot be found.

## reward-not-editable

* **Complete type:** `https://api.publiq.be/probs/uitpas/reward-not-editable`
* **Title**: `Reward not editable`
* **Status**: `400`

The request you are trying to perform cannot complete because the reward cannot be edited.

## reward-period-constraint

* **Complete type:** `https://api.publiq.be/probs/uitpas/reward-period-constraint`
* **Title**: `Reward Period Constraint`
* **Status**: `400`

The request you are trying to perform cannot complete because the reward is not valid any more.

## reward-volume-constraint

* **Complete type:** `https://api.publiq.be/probs/uitpas/reward-volume-constraint`
* **Title**: `Reward Volume Constraint`
* **Status**: `400`

The request you are trying to perform cannot complete because the reward is sold out.

## reward-passholder-volume-constraint

* **Complete type:** `https://api.publiq.be/probs/uitpas/reward-passholder-volume-constraint`
* **Title**: `Reward Passholder Volume Constraint`
* **Status**: `400`

The request you are trying to perform cannot complete because the reward cannot be redeemed by this passholder anymore.

## reward-passholder-points-constraint

* **Complete type:** `https://api.publiq.be/probs/uitpas/reward-passholder-points-constraint`
* **Title**: `Reward Passholder Points Constraint`
* **Status**: `400`

The request you are trying to perform cannot complete because the passholder does not have sufficient points to redeem this reward.

## reward-passholder-no-applicable-cardsystems

* **Complete type:** `https://api.publiq.be/probs/uitpas/reward-passholder-no-applicable-cardsystems`
* **Title**: `Reward Passholder No Applicable Cardsystems`
* **Status**: `400`

The request you are trying to perform cannot complete because the passholder does not have a card system membership in an applicable card system.

## reward-invalid-redeem-type

* **Complete type:** `https://api.publiq.be/probs/uitpas/reward-invalid-redeem-type`
* **Title**: `Reward Invalid Redeem Type`
* **Status**: `400`

The request you are trying to perform cannot complete because the reward cannot be redeemed online.

## checkin-code-expired

* **Complete type:** `https://api.publiq.be/probs/uitpas/checkin-code-expired`
* **Title**: `Check-in code expired`
* **Status**: `400`

The request you are trying to perform cannot complete because the checkin code is expired.

## checkin-code-invalid

* **Complete type:** `https://api.publiq.be/probs/uitpas/checkin-code-invalid`
* **Title**: `Check-in code invalid`
* **Status**: `400`

The request you are trying to perform cannot complete because the checkin code is invalid.

## checkin-not-allowed

* **Complete type:** `https://api.publiq.be/probs/uitpas/checkin-not-allowed`
* **Title**: `Check-in not allowed`
* **Status**: `400`

The request you are trying to perform cannot complete because the checkin is currently not allowed.

## rate-limited

* **Complete type:** `https://api.publiq.be/probs/uitpas/rate-limited`
* **Title**: `Rate limited`
* **Status**: `429`

The request you are trying to perform cannot complete because it was performed too many times in a given period.
