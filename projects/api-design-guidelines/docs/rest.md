# REST

Every publiq API must follow the [Representational State Transfer (REST)](https://en.wikipedia.org/wiki/Representational_state_transfer) architectural style.

This architecture is more than just a styleguide. It also dictates how the API should behave in certain scenarios.

The term REST was introduced by Roy Fielding [in his doctoral dissertation](https://www.ics.uci.edu/~fielding/pubs/dissertation/rest_arch_style.htm) in 2000.

This page includes a brief summary of the most important points of the REST architecture, as well as some conventions that must be followed in REST APIs built by/for publiq.

## HTTP

REST APIs that work over HTTP must follow the [HTTP specifications](https://developer.mozilla.org/en-US/docs/Web/HTTP/Resources_and_specifications) as closely as possible.

This way each API is ensured to work correctly with generic infrastructure like proxies, load balancers, and generic HTTP libraries in client apps.

For example, they must provide unique URLs for resources, use status codes in the `>=400` range for [error responses](./errors.md), use the `Authorization` header for [authentication](./authentication.md), follow the standardized behaviour for each HTTP method, and so on.

When in doubt and something is not covered by our guidelines, always follow the HTTP specifcations as closely as possible.

## Resources

At its core, REST works with the concept of **resources**.

A resource is data that is returned by the API, based on internal application state. It can be data that is stored in for example a database or filesystem, but it does not necessarily have to directly map to this data. It can also be a combination, calculation, or other representation of this data. **The underlying storage mechanism must not dictate the structure of the resources.**

An example of a resource can for example be `the current weather in Brussels`, while your database may store the weather information with a specific datetime.

A resource must always be **identifiable by a unique [Uniform Resource Identifier (URI)](https://en.wikipedia.org/wiki/Uniform_Resource_Identifier)**. In practice, resources on REST APIs are almost always identified by **[Uniform Resource Locators (URLs)](https://en.wikipedia.org/wiki/URL)** which are a type of URI.

The example above could for example have the URI `https://api.ecma.org/weather-predictions/brussels/current`, which is a URL that also acts as a locator that conveys where the resource can be accessed.

Additionally, two resources can point to the same data but still be different identifiable resources that exist separately.

For example, the data for the resource `the current weather for my location`, which can have a URI like `https://api.ecma.org/weather-predictions/my-location/current`, can be exactly the same as the data for Brussels if the user is currently in Brussels. But they are still considered to be two different resources since they can change depending on the situation.

## Collections

Collections are a special type of resource, that contain multiple other resources of the same type. For example the collection `users` contains all `user` resources.

Like other resources, collections must have a unique URI.

For example a URI for the `users` collection could be `https://api.ecma.org/users`, while the URI for a specific user could be `https://api.ecma.org/users/john-doe`.

Resources can also contain sub-collections. For example `https://api.ecma.org/users/john-doe/friends` can return a collection of friends of the resource John Doe that is in the users collection.

## Naming conventions for URIs

Contrary to popular belief, the REST architecture does not dictate how URLs must be named or structured. It only specifies that the URL is always the **complete identifier** of a resource. As such, the following rules apply:

* **Query parameters must not be used to transfer new/updated data!** Query parameters, if used, are always part of the identifier of a resource.
* **URLs must not contain verbs to specify what action is being performed.** URLs are used to indentify resources, not actions. Instead HTTP methods must be used.

While not required by the REST architecture, we have agreed on some additional naming conventions that must always be followed on APIs built by/for publiq to ensure a consistent developer experience:

* URIs must always use `kebab-case`. 
* Collections must be pluralized. For example `/weather-predictions`, `/users`, ...
* Collections may support query parameters to filter them. For example `/users?postalCode=1000` could be the URI for all users that live in Brussels.
* Individual resources may use a database ID as part of their URI, but do not need to. If they do, it is advised to not use incremental IDs to avoid "URI guessing", but to use [UUIDs](https://nl.wikipedia.org/wiki/Universally_unique_identifier) instead. For example `/users/foo` may be used for the user with username `foo`, or `/users/550e8400-e29b-41d4-a716-446655440000` for the user with the database ID `550e8400-e29b-41d4-a716-446655440000`.
* Individual resources inside a collection must be prefixed with that collection's URI, as seen in the examples above.
* Individual resources may be a singular if only one instance exists. For example `/user` for the current user, or `/cities/brussels/weather` for the weather in Brussels.
* Individual resources may support or even require query parameters as part of their URI. For example `/points?uitpasNumber=1234567890123` could be the URI to get the points for the UiTPAS with number `1234567890123`. However, preference is given to a structure like `/uitpasNumbers/1234567890123/points` instead when possible.
* Query parameters must always be in `lowerCamelCase`.
* URLs must always work without `/` at the end. APIs may optionally support trailing slashes, as if the URL has no trailing slash. Alternatively a `404` error may be returned if a trailing slash is used but not supported.

> As mentioned above, URIs may contain internal database IDs. However it is important to keep in mind that while your API may use database IDs internally, **the URI of a resource is always its ID on an API**.

## HTTP methods

Every resource must support one or more HTTP methods, which indicate the action that should be performed on the resource.

While the HTTP specifications allows for custom methods, publiq APIs must never use custom methods to ensure compatibility with generic HTTP tooling.

APIs built by/for publiq must always use the following methods, and respect their documented behaviour.

**POST**

The `POST` method is used to send data to the API. It is most often used to *create* new resources in a collection.

For example, `POST https://io.uitdatabank.be/events` creates a new event in UiTdatabank.

A `POST` request can be repeated, but this can have side-effects like creating the new resource twice.

A relatively common scenario that this can happen in is if an API call is disrupted in transit and the API client did not recieve a response. The client might in that case retry the same request, but if the initial request was processed than the same resource can be created twice.

If this causes a lot of issues, APIs may implement [idempotency](https://developer.mozilla.org/en-US/docs/Glossary/Idempotent) on `POST` requests using [the `Idempotency-Key` header](https://datatracker.ietf.org/doc/draft-ietf-httpapi-idempotency-key-header/).

**GET**

The `GET` method is used to retrieve a representation of a resource.

`GET` requests **must** always be [safe](https://developer.mozilla.org/en-US/docs/Glossary/Safe/HTTP), meaning that they do not alter a resource directly or indirectly. As a result, they are also idempotent by default because successive `GET` requests for the same resource will always result in the same response.

For example, `GET https://io.uitdatabank.be/events/550e8400-e29b-41d4-a716-446655440000` always returns the event with that ID in UiTdatabank.

If you have a scenario in which an API client needs to retrieve a resource and also alter it (or another resource), split that action into two separate requests like `GET` + `POST`, `GET` + `PUT`, or `GET` + `PATCH`.

**PUT**

Like the `POST` method, the `PUT` method is used to send data to the API.

In most cases `PUT` is used to *update* existing resources.

For example `PUT https://io.uitdatabank.be/events/550e8400-e29b-41d4-a716-446655440000` updates a single event with that specific URL in UiTdatabank.

Contrary to `POST` requests, `PUT` requests **must** always be [idempotent](https://developer.mozilla.org/en-US/docs/Glossary/Idempotent). This means that the same request can be repeated multiple times and will each time have the same result as if the request was only made once, without any side-effects. For updates, this is normally not an issue.

However `PUT` requests *can* also be used to create new resources. However in the case of `PUT` requests idempotence **must** be guaranteed, so you cannot support a request like `PUT /events` to create a new event, since that cannot be idempotent without explicitly using an `Idempotency-Key` header.

It can however be used for resources with ids that can be provided by the API client itself. For example: `PUT https://io.uitdatabank.be/events/550e8400-e29b-41d4-a716-446655440000` *could* create a new event with this URL if one does not exist yet, as long as the API accepts this as a valid id. And if the request is repeated the result will be the same, because the previously created event will be "updated" but without any changes.

It can also be used to create a new resource if that resource is a singleton with a fixed URL. For example if an event with the URL `https://io.uitdatabank.be/events/550e8400-e29b-41d4-a716-446655440000` already exists, the API could support a request like `PUT https://io.uitdatabank.be/events/550e8400-e29b-41d4-a716-446655440000/price-info` to create *or* update the price info for that event. Since an event can only have one price info resource, it will be idempotent since it will be idempotent because the request will either create *or* update the same resource, without any side effects (like creating an extra price info resource).

**PATCH**

The `PATCH` method is used to do partial updates of existing resources on an API. It is not necessarily idempotent, but it can be.

This contrasts with `PUT` which does updates using a complete representation of the resource, and must always be idempotent.

The `PATCH` method should be avoided on APIs built by/for publiq, until we have agreed on a standardized approach like using [JSON PATCH](http://jsonpatch.com/) or [Merge PATCH](https://datatracker.ietf.org/doc/rfc7396/).

**DELETE**

The `DELETE` method is used to delete existing resources on an API.

`DELETE` requests are idempotent by default, since you cannot delete a resource twice.

When a `DELETE` is succesfull it can either return a [`200`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/200), [`202`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/202), or [`204`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/204). Preference is given to `204` on APIs built by/for publiq, but either one can be used.

Discussion exists in the REST APIs community what response should be returned when a `DELETE` is performed on a resource that does not exist (anymore). In theory the API could either return one of the success codes above, since the client's intent to delete the resource was achieved. However the API could also return a `404` to communicate that the resource did not exist anyway.

APIs built by/for publiq **must** return a `2XX` response code if a `DELETE` is performed on a resource that does not exist. This is because an API client might perform a `DELETE` on an existing resource, but the initial `2XX` response to that delete might get lost in transit and the API client may retry the request to be sure. The logical response then would be to send `2XX` again, as `404` implies an error in the request and that the request should be altered and tried again.

## Representations

When creating, retrieving or updating a resource the resource's data must always be represented in some way.

While [JSON](https://www.json.org/json-en.html) is the popular format to use for this, it is important to remember that JSON is merely a *representation* of the data. It can be stored in many different ways internally, and also be shared in many different formats.

Even if the data is also stored as JSON internally, the structure of that JSON can be different internally compared to the API.

When a resource is retrieved using a `GET` method, the API **must** include a `Content-Type` header in the response to specify the format that the data is represented in. The API may also support [content negotiation](https://developer.mozilla.org/en-US/docs/Web/HTTP/Content_negotiation) and allow the API client to include an [`Accept` header](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Accept) in its request to specify what format it would like to retrieve a resource in.

When sending data to the API, an API client may include a `Content-Type` header to specify the format that the data is in. APIs built by/for publiq **must** assume a default if this header is missing, and this default must be documented in the API's documentation. If the `Content-Type` header is specified in the request but the API does not support it, it should return an error response with the type `https://api.publiq.be/probs/header/unsupported-media-type`.

APIs built by/for publiq **must** always support JSON formats as either `application/json` and/or `application/ld+json` (for linked data). They may however also support additional content-types like `application/xml` if needed.

## Errors

When a request to a REST API cannot be processed, the API **must** return a response with one of the [HTTP error codes](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status) in the `4XX` and `5XX` ranges as its status code. In no circumstance may a `2XX` error code be used for requests that could not be processed.

APIs built by/for publiq **must** follow the guidelines in the [error response guidelines](./errors.md).

## Links

While REST APIs should work with linked data, it is advised not to implement linked data on any new APIs built by/for publiq for now until we have agreed on a standardized approach, as multiple standards exist and may conflict.

## Important design principles

The REST architecture includes many service guidelines. Below we outline the most important ones that must be followed on APIs built by/for publiq.

### Stateless

Communication between an API client and API server must always be stateless. The API may of course store internal application state, but it must not rely on information in previous requests by an API client to determine how a new HTTP request should be processed.

For example, an API client must always include its authentication information in each HTTP request using the `Authorization` header, and the API must always re-validate this information for each HTTP request.

Another example is when using [pagination](./pagination.md) on a collection of resources. An API client must always specify how big the window of resources should be and what resources can be skipped, instead of relying on the API to remember what results have already been returned. (For example `GET /users?start=10&limit=10` to skip the first 10 results and get the next 10 results.)

### Loose coupling

APIs must not "leak" implementation details to avoid tight coupling. When the communication between an API client and API server happens without leaking implementation details, the underlying implementation can always be changed without having to update the contract between the API client and the API server. This is called loose coupling.

For example, APIs must not allow resource collections to be filtered using an actual SQL query (aside from security reasons). While this may be an obvious example, implementation details can sometimes be leaked in unforeseen ways.

<!-- theme: warning -->

> One of the known violations of this rule is the `q` parameter in Search API 3, which allows an API client to directly perform a Lucene Query in the underlying Elasticsearch engine. However this example must still be supported for historical reasons and backward compatibility.
