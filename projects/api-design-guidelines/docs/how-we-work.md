# How we work

## Traditionally

A common trend when building APIs is to start coding the functionality first, and then test and document it when it is considered to be ready. This makes the API a byproduct of the development process, instead of a product that was intentionally designed.

Event with design guidelines that can help by providing a high-level set of rules, a code-first approach can still cause several problems:

* Documentation and tests are an afterthought and often forgotten, incomplete, or incorrect.
* The functionality is often influenced by how the underlying system already works and may be too limited to achieve the intended goals. This also makes the API less flexible to work with for unforeseen use-cases in the long run.
* Without clearly communicated expectations, the implementation may work very different than the intended behaviour.
* Naming and resource representations are often decided by one or two developers as an afterthought. But because a lot of publiq APIs have some overlapping concepts, this quickly causes inconsistency and confusion about what the right name for a concept is and how they relate to eachother across APIs. (For example in UiTdatabank and UiTPAS we used to speak about `organizers` & `balies`, `labels` & `markers`, ...)

To make matters worse, once an API is released it is hard to make changes to its existing functionality. Once integrations have been built onto it, we must ensure that the API keeps working the same way to avoid breaking those integrations.

Even when these issues get spotted before the API (or new functionality) is released, it is always more work to fix them when the code has already been written and needs to be refactored.

## Design-first

To tackle the problems that come with a code-first approach, we have adopted a design-first approach.

While every team that builds an API is free to implement this how they see fit, our design-first approach centers around a few high-level steps.

<p align="center">

<!-- focus: false -->

![](../assets/images/openapi.png)

</p>

### 1. OpenAPI contract

Before a single line of code gets written, an [OpenAPI](https://www.openapis.org/) contract has to be created and reviewed by all stakeholders.

These OpenAPI contracts live in the Stoplight project of each product and must conform to the OpenAPI 3.0.x or (preferably) 3.1.x spec.

This way the expected functionality can be agreed upon before the API gets built, and teams can work in parallel on both the API and the frontend if needed.

Stakeholders that are often involved in writing or reviewing the OpenAPI contract:

* The API's product owner, to ensure all required functionality is covered and provide domain expertise
* The API's users, to give input about the expected functionality and behaviour (if possible)
* The API's developer(s), to give technical input
* An API architect, to ensure conformity with the design guidelines and give input on overlapping functionality/naming with existing APIs

Often this is implemented by discussing the required functionality first in a group setting like a meeting or video call, after which either the API developer(s) provide an initial draft of the OpenAPI contract that can then be reviewed by the API architect or vice-versa. In case many questions or problems arise this can be an iterative process with multiple meetings/videocalls with all stakeholders and changes to the draft before it is finalized.

The OpenAPI contract almost always lives in a git repository, in which a branch gets created for the new functionality. The changes can then be reviewed in a pull request, before they get merged.

Ideally the OpenAPI contract is also used in the actual API for request validation, code generation, ... That way it cannot get out of sync from the actual implementation, because it is a part of the implementation.

Of course the OpenAPI contract should follow the API design guidelines that are outlined in this space.

<p align="center">

<!-- focus: false -->

![](../assets/images/cucumber.png)

</p>

### 2. Automatic tests

While most APIs these days have some automatic tests in the form of unit tests, it is highly advised to also write automatic end-to-end or integration tests that send HTTP requests to the API and check the HTTP responses to make sure it works as intended.

While the exact implementation can vary per API, it is advised to use the [Cucumber](https://cucumber.io/) format to keep the tests readable for less technical stakeholders or those not familiar with the specific programming language that will be used to build the API.

Examples of such tests for UiTdatabank's Entry API can be found here: <https://github.com/cultuurnet/udb3-acceptance-tests>

Ideally the tests should be written before the actual implementation is done, so stakeholders can go over them to give feedback on the expected behaviour.

### 3. Implementation

After the OpenAPI contract and tests are written, the implementation can be developed. The exact details like the programming language and infrastructure can be decided by the developers and devops engineers who will build and maintain the API.

If issues with the previously agreed upon OpenAPI contract and/or tests arise, they should again be discussed with the stakeholders and the OpenAPI contract and/or tests should be adjusted. This should be an iterative process.

Once the implementation is ready, the API's product owner and other stakeholders should test it on an acceptance environment. When the API is deemed ready, it can deployed to the production environment.

After that point, no breaking changes should be made to the API. New features can be added (if backward compatible), but existing functionality should always keep working as before.

### 4. Guides

When the API is ready and deployed to production, how-to guides should be written to help explain to developers how to build integrations for common use cases.

In this step the descriptions of requests, properties, and so on can also be improved and expanded in the OpenAPI contract, as these will also serve as documentation but do not influence the design and implementation.

This is the last step in the process, because when the API is still being implemented it is possible that issues arise and the OpenAPI contract and/or tests need to be changed. If the guides are also already written (or in the process of being written) this would add a lot of work, while the guides are not necessary for the stakeholders to agree on how the API should work.

### 5. Repeat

The design-first approach is iterative. While existing features cannot be changed to avoid breaking compatibility with existing integrations, new functionality can always be added by following the same four steps as above.

After you have reached this step, every step should be followed again in the same order for new features.
