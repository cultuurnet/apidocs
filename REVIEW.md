# Review guidelines

When reviewing PRs, always focus on these key points:

1. Avoid breaking changes to existing functionality. When in doubt, we want to follow the robustness principle and be flexible in what we accept and conservative in what we respond
2. Look at the proposed changes from the perspective of an API integrator and check if the API is understandable, predictable and easy-to-use. For example, make sure naming is consistent and predictable, or that standards like ISO-8601 are used instead of custom data formats.
3. Encourage re-use of existing schemas via `$ref` (where possible) instead of copy-pasting schemas
4. Make sure REST design guidelines in `projects/api-design-guidelines/docs/rest.md` are followed

## Entry API

Scope: `projects/uitdatabank/reference/entry.json`

- Every new endpoint, property, or other substantial change must be added to the release notes inside `projects/release-notes/docs/uitdatabank` under an "Upcoming" title
- Any property that can be set on events, places or organizers in "granular" endpoints must also be supported in general CRUD endpoints like `POST /events`, `PUT /events/:id`, `POST /places`, `PUT /places/:id`, `POST /organizers`, `PUT /organizers/:id`

## Search API

Scope: `projects/uitdatabank/reference/search.json`

- Every new endpoint, property, or other substantial change must be added to the release notes inside `projects/release-notes/docs/uitdatabank` under an "Upcoming" title
- New URL query parameters used to filter events, places, offers and organizers must always have the same name as their corresponding field in the event/place/organizer JSON schema. For example, if the event schema has a property called `labels`, the corresponding URL parameter on Search API must also be `labels` (plural), not `label` (singular) even if the filter is (sometimes) used to filter on 1 value. The idea is that the name describes the property that you filter on, not the filter itself
- New URL query parameters may only deviate from the names in the JSON schemas if they have to be stored as a different field inside Elasticsearch. For example, event has properties called `startDate` and `endDate`, but we store them as `dateRange` inside Elasticsearch to enable range queries. 
- New URL query parameters that accept multiple values combined as an `AND` must be suffixed with `[]`, as Search API uses PHP which requires URL parameters to be passed as an array using `[]`. When a query parameter has a name that is plural (e.g. `labels`), suggest to add `[]` and add support for `AND` queries.
- New URL query parameters that accept multiple values combined as an `OR` must use `,` for concatenation. When a query parameter has a singular name, suggest to add support for `OR` queries using comma-separated values.
- New URL query parameters must have a corresponding Lucene field with the same name that is queryable in the `q` URL parameter. Make sure this Lucene field is documented in `projects/uitdatabank/docs/search-api/advanced/advanced-queries.md`