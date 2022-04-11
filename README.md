# cultuurnet/apidocs

This repository contains all the API documentation hosted at https://docs.publiq.be.

The hosting is provided by https://stoplight.io, who provide a beautiful UI for our docs.

## Requirements

To contribute to our API documentation, some basic knowledge of [git](https://git-scm.com/) is required so you can commit your changes to a temporary branch and get them reviewed before they get published.

The following tools can also be helpful but are not strictly required:

- [Stoplight Studio](https://stoplight.io/studio/), a GUI editor for API documentation built by https://stoplight.io (where our documentation is hosted). However, any file editor is fine technically.
- [Node](https://nodejs.org/en/) and [Yarn](https://yarnpkg.com/getting-started/install) to run the automatic checks on your own machine, and to run the automatic fixer in case of problems. (Any recent version should be fine.) However, the automatic checks will also run in GitHub itself for every push and you can also run the automatic fixer manually on GitHub.

## Getting started

Clone this repository to your local machine.
```
git clone git@github.com:cultuurnet/apidocs.git
```

## Contribution guidelines

Anyone can contribute to our API documentation. To make the process as smooth as possible, please take the following guidelines into consideration:

*   Use [atomic commits](https://curiousprogrammer.dev/blog/why-i-create-atomic-commits-in-git/).
*   Use [good commit messages](https://cbea.ms/git-commit/). Avoid generic commit messages like `Updated example.md` or `PR remarks`.
*   Avoid big pull requests with a lot of changes that are not related to each other. If you need to add a lot of documentation, aim for incremental pull requests with small, specific scopes.    
*   Create a [draft pull request](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests#draft-pull-requests) if your changes are not ready for review yet but you want to open a pull request already.
*   Fill in the description of your pull request with the template that is automatically provided.

When your changes are ready, create a regular pull request or [mark your draft pull request as ready for review](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/changing-the-stage-of-a-pull-request#marking-a-pull-request-as-ready-for-review). One or more reviewers will automatically be assigned who will go over your changes and give feedback or approve them.

After the approval, the changes are usually expected to be merged by the pull request author (if they are in our organization). Pull requests from external forks will be merged by the reviewers.

## Adding a new project

Adding a new project involves multiple steps both in this git repository, as on https://docs.publiq.be.

Because some of these steps require special permissions, it is not possible to do this yourself. Instead, [create an issue](https://github.com/cultuurnet/apidocs/issues) with the following information:

*   **Human-readable name of your project.** This is the name that will appear in the menu on https://docs.publiq.be. For example `UiTdatabank`.
*   **A short tagline.** This will appear under the name of your project in the menu and must be under 35 characters to avoid an ellipsis. For example `Integrate with the UiTdatabank APIs`.
*   **A URL slug** for your project on https://docs.publiq.be. This will also be the name of your project's directory inside this repository. Avoid abbreviations, use lowercase characters, and `-` for spaces if needed. For example `uitdatabank`.
*   **A [fontawesome icon](https://fontawesome.com/icons) name** which will be displayed next to your project in the menu. For example `calendar-alt`.
*   **A hex color code** that will determine the color of your project's icon in the menu. For example `#EF1810`.

An admin will then add a new project for you.

## Project structure

Every project has its own space inside the `projects` directory with the same name as their URL slug on https://docs.publiq.be. For example:

```
projects/
├─ authentication/  # https://docs.publiq.be/docs/authentication
├─ errors/          # https://docs.publiq.be/docs/errors
├─ guidelines/      # https://docs.publiq.be/docs/guidelines
├─ uitdatabank/     # https://docs.publiq.be/docs/uitdatabank
├─ uitpas/          # https://docs.publiq.be/docs/uitpas
├─ widgets/         # https://docs.publiq.be/docs/widgets
├─ ...
```

Our documentation is hosted by [Stoplight](https://stoplight.io), which expects a specific directory structure:

```
projects/
├─ authentication/
│  ├─ assets/         # Contains all your static files
│  │  ├─ images/      # Contains all your images
│  ├─ docs/           # Contains all your .md files for guides
│  ├─ reference/      # Contains all your OpenAPI files (preferably .json)
│  ├─ toc.json        # Contains the config of your project's sidebar
├─ ...
```

It is important to adhere to this structure to avoid problems on the hosted version of our docs at https://docs.publiq.be or inside the Stoplight Studio editor.

## Images

All of your images **must** be stored inside the `assets/images` directory of your project. You may use subdirectories if you want.

Additionally, you should always use relative URLs to reference them inside your Markdown files. For example, if your file is `docs/introduction.md`:
```
![Your example alt text](../assets/images/example.png)
```

If you do not follow these guidelines, images may not appear on https://docs.publiq.be even if they do in Stoplight Studio.

## Automatic checks

To avoid common mistakes like dead links in how-to guides or violations of our [API design guidelines](https://docs.publiq.be/docs/guidelines) in OpenAPI files, automatic checks will run for every push or pull request.

You can also run these checks yourself on your local machine to spot issues early on, and even fix some of them automatically.

First, make sure you have node and yarn installed as per the requirements mentioned above.

Second, run `yarn install` to install all required packages for the checks to work.

Then, run any of the following commands:

*   `yarn docs:lint` to check the `.md` files (guides) for mistakes or syntax errors
*   `yarn docs:lint:fix` to automatically fix issues reported by the previous command (when possible)
*   `yarn api:lint` to check for syntax errors or design guidelines violations inside the OpenAPI files (always need to be fixed manually)

## 
