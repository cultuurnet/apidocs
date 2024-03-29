# cultuurnet/apidocs

This repository contains all the API documentation available at <https://docs.publiq.be>, hosted by [Stoplight.io](https://stoplight.io) who provide a beautiful interface to browse them.

## Table of contents

* [Requirements](#requirements-)
* [Getting started](#getting-started-)
* [Contribution guidelines](#contribution-guidelines-)
* [Adding a new project](#adding-a-new-project-)
* [Project structure](#project-structure-)
* [OpenAPI files](#openapi-files-)
* [Docs](#docs-)
* [Sidebar](#sidebar-)
* [Pretty page URLs](#pretty-page-urls-)
* [Images](#images-)
* [Links](#links-)
* [Automatic checks](#automatic-checks-)
* [Automatically fixing (some) errors](#automatically-fixing-some-errors-)
* [Publishing your changes to Stoplight](#publishing-your-changes-to-stoplight-)
* [Removing outdated branches from Stoplight](#removing-outdated-branches-from-stoplight-)
* [Useful tools and resource](#useful-tools-and-resources-)

## Requirements 🐙

To contribute to our API documentation, some basic knowledge of [git](https://git-scm.com/) is required so you can commit your changes to a temporary branch and get them reviewed before they get published.

The following tools can also be helpful but are not strictly required:

* [Stoplight Studio](https://stoplight.io/studio/), a GUI editor for API documentation built by <https://stoplight.io> (where our documentation is hosted). However technically any file editor is fine.
* [Node](https://nodejs.org/en/) and [Yarn](https://yarnpkg.com/getting-started/install) to run the [automatic checks](#automatic-checks-) on your own machine, and to run the [automatic fixer](#automatically-fixing-some-errors-) in case of problems. (Any recent version should be fine.) However, the automatic checks will also run in GitHub itself for every push, and you can also [run the automatic fixer online via GitHub Actions](https://github.com/cultuurnet/apidocs/actions/workflows/docs-linting-fix.yml).

## Getting started 🚀

Clone this repository to your local machine.

```
git clone git@github.com:cultuurnet/apidocs.git
```

## Contribution guidelines ✨

Anyone can contribute to our API documentation. To make the process as smooth as possible, please take the following guidelines into consideration:

* Make your changes on a branch separate from `main` first. (Pushes to `main` will automatically be rejected!) Use a branch name that is prefixed with your project's name. For example `uitdatabank/your-branch-name` or `widgets/your-branch-name`. Branches that change/fix the tooling across all projects should be prefixed with `platform/`.
* Do not edit multiple projects in the same branch unless the changes are related to each other.
* Avoid branches with a lot of changes that are not related, even within the same project. If you need to add a lot of documentation, aim for small incremental steps so the review process stays manageable and you get feedback early on.
* Use [atomic commits](https://curiousprogrammer.dev/blog/why-i-create-atomic-commits-in-git/).
* Use [good commit messages](https://cbea.ms/git-commit/). Avoid generic commit messages like `Updated example.md` or `PR remarks`.
* Create a [draft pull request](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests#draft-pull-requests) if your changes are not ready for review yet but you want to open a pull request already.
* Fill in the description of your pull request with the template that is automatically provided.

When your changes are ready create a pull request if you haven't done so yet, or [mark your draft pull request as ready for review](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/changing-the-stage-of-a-pull-request#marking-a-pull-request-as-ready-for-review). One or more reviewers will automatically be assigned to go over your changes and give feedback or their approval.

After approval, it is up to you to merge your changes (if you are a member of our organization). Pull requests from external forks will be merged by the reviewers.

If a reviewer has approved but there are still open comments (from the same reviewer or another one), please be considerate and resolve those first before merging.

## Adding a new project 🐣

Adding a new project involves multiple steps both in this git repository and on <https://docs.publiq.be>.

Because some of these steps require special permissions, it is not possible to do this yourself. Instead, [create an issue with the "New project" template](https://github.com/cultuurnet/apidocs/issues/new?assignees=JonasVHG\&labels=project\&template=new-project.md\&title=New+project%3A+YOUR+PROJECT+NAME+HERE) and fill out all required info.

An admin will then automatically be assigned to add the new project for you.

## Project structure 🌿

Every project has its own space inside the `projects` directory with the same name as their URL slug on <https://docs.publiq.be>. For example:

```
projects/
├─ authentication/  # https://docs.publiq.be/docs/authentication
├─ errors/          # https://docs.publiq.be/docs/errors
├─ guidelines/      # https://docs.publiq.be/docs/guidelines
├─ uitdatabank/     # https://docs.publiq.be/docs/uitdatabank
├─ uitpas/          # https://docs.publiq.be/docs/uitpas
├─ widgets/         # https://docs.publiq.be/docs/widgets/inleiding
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

It is important to adhere to this structure to avoid problems on the hosted version of our docs at <https://docs.publiq.be> or inside the Stoplight Studio editor.

## OpenAPI file(s) 🔌

**Directory: `reference`**

The complete technical overview of your API's endpoints must be documented in an [OpenAPI](https://www.openapis.org/) file (previously called "Swagger"). If you have multiple APIs inside your project, your project may have multiple OpenAPI files.

An OpenAPI file allows you to describe your entire API (endpoints, operations, authentication, contact information, ...) in a structured format. This results in a consistent overview of all your endpoints on <https://docs.publiq.be>, and can also be used in other automated tools like <https://postman.publiq.be> to  discover your API's features. Additionally your OpenAPI file can be used *inside your API itself*, for example for automatic request validation (depending on the technologies used to build your API).

Every OpenAPI file must follow version 3.x of the OpenAPI spec, preferably [3.1.0](https://spec.openapis.org/oas/latest.html) or later when possible.

Preferably the OpenAPI files are formatted as JSON, but YAML is also allowed if necessary.

[Stoplight Studio](https://stoplight.io/studio/) offers an easy-to-use interface to edit and preview OpenAPI files, and also includes a live report of the automatic checks that we run for OpenAPI files. But you can also add or edit OpenAPI files using any other JSON/YAML editor that you prefer.

## Docs 👩‍🏫

**Directory: `docs`**

How-to guides and other pages outside of the OpenAPI files all live inside the `docs` directory of your project. These guides are often written to provide more context (for example a terminology page), and/or to explain complicated workflows that use multiple of your API's endpoints. For example registering ticket sales in UiTPAS which requires you to have an UiTdatabank event, fetch the UiTPAS prices for that event, and finally when the ticket is sold and paid for register said ticket sale in UiTPAS. If you want to document a single endpoint, it should be added/edited in an OpenAPI file instead (or both).

Every page is a Markdown (`.md`) file, which you can edit with a Markdown editor. However, Stoplight supports some [special syntax](https://meta.stoplight.io/docs/platform/b591e6d161539-stoplight-flavored-markdown-smd) that allows you to for example embed YouTube and Vimeo videos or to add info/warning/danger/success messages.
This "Stoplight Flavored Markdown" syntax is usually not supported in every Markdown editor.
Therefore it is advised to use [Stoplight Studio](https://stoplight.io/studio/) to edit the Markdown files, especially if you want to see a nice preview of how your pages will look on <https://docs.publiq.be>.

## Sidebar 🔎

**File: `toc.json`**

When you add or remove OpenAPI or Markdown files, your project's sidebar will not automatically be updated to add/remove links for them. Instead, you have to manage the sidebar links manually inside the `toc.json` file of your project. The exact syntax and options are described in [Stoplight's documentation](https://meta.stoplight.io/docs/platform/ZG9jOjIxOTkxNTkz-project-sidebar#project-sidebar).

## Pretty page URLs 💄

By default, Stoplight will give your Markdown files a URL that looks like `https://docs.publiq.be/docs/<project>/docs/v9osatdfgk007-<slug>`. The hash (`v9osatdfgk007` in the example) will be generated by Stoplight based on multiple factors. For new files, it will also be set inside the file as the `stoplight-id`.

While these so-called "stable ids" allow you to rename files while keeping links working, they make the URLs harder to read and ugly to share. While the stable id can be customized per file, URLs will still follow the `/<stable-id>-<slug>` structure (where the "slug" is generated by Stoplight), so the URLs are not entirely customizable this way.

Instead, a better way to customize your page URLs is by setting a `slug` property in your `toc.json` file (see [Sidebar](#sidebar-) for more info about `toc.json`).

For example:

```
{
    "items": [
        {
            "type": "item",
            "title": "Introduction", // Visible name of the sidebar menu item
            "uri": "docs/introduction.md", // Link to the Markdown file
            "slug": "introduction" // Custom URL path you want to use
        },
        {
            "type": "item",
            "title": "Example page",
            "uri": "docs/example.md",
            "slug": "example"
        },
        {
            "type": "item",
            "title": "Example page in subdirectory",
            "uri": "docs/subdirectory/example.md",
            "slug": "subdirectory/example"
        }
    ]
}
```

This will result in the following URLs for the sidebar links:

* `https://docs.publiq.be/docs/<project>/introduction`
* `https://docs.publiq.be/docs/<project>/example`
* `https://docs.publiq.be/docs/<project>/subdirectory/example`

If you have sidebar links that did not have a custom `slug` initially, you can always add one at any point. The old URLs with the "stable id" will then redirect to the new URL when visited. (For example if you shared links to the URL with the "stable id" before, or other projects link to it.)

Avoid changing an existing slug later if possible, because the old slug will stop working. If you *need* to change an existing slug, contact [a Stoplight tool owner](https://confluence.uitdatabank.be/display/PMO/Stoplight.io+-+toolfiche) to add a redirect for your old slug to your new slug.

## Images 👨‍🎨

**Directory: `assets/images`**

To ensure that all of your images display correctly on <https://docs.publiq.be> they must be stored inside the `assets/images` directory of your project.
You may use subdirectories if you want.

When referencing images inside your Markdown files, you should always use relative URLs.
For example, if your file is `docs/introduction.md`:

```
![Your example alt text](../assets/images/example.png)
```

If you do not follow these guidelines images may not appear on <https://docs.publiq.be> even if they display in Stoplight Studio's preview.

## Links 🌐

✅ Always use relative URLs as much as possible when linking to Markdown files or OpenAPI operations inside the same project.

⚠️ Avoid absolute URLs (for example `https://docs.publiq.be/docs/project/file.md`) when linking to docs or OpenAPI operations inside the same project.
They will always point to a specific branch (or the default one), and you either won't be able to link to new docs or OpenAPI operations added in your new branch (because they won't exist yet on the default branch), or you will need to link to them with a URL with your branch name and that URL will break once your branch gets merged and deleted.

👉 When linking **to a Markdown file** from **another Markdown file**, use `[Your link text](./your-file.md)`.

👉 When linking **to a Markdown file** from **an OpenAPI file**, use `[Your link text](../docs/your-file.md)`.

👉 When linking **to an OpenAPI operation** from **a Markdown file**, use `[Your link text](../reference/api.json/paths/~1your~1path~1here/get)`. Slashes in the API path are encoded as `~1`. (This example will link to the `GET /your/path/here` operation inside `api.json`.)

👉 When linking **to an OpenAPI operation** from **an OpenAPI file**, use `[Your link text](./api.json/paths/~1your~1path~1here/get)`. (This example will link to the `GET /your/path/here` operation inside `api.json`.)

️👉 When linking **to Markdown files or OpenAPI operations** in **other projects**, only absolute URLs can be used.

## Automatic checks 🔁

To avoid common mistakes like dead links in how-to guides or violations of our [API design guidelines](./projects/api-design-guidelines/docs/introduction.md) in OpenAPI files, automatic checks will run for every push to a branch.

If you create a pull request for your branch and some checks are failing, your pull request cannot be merged until the reported errors are fixed.

If you want you can run these checks yourself on your local machine to spot issues early on, and even fix some of them automatically.

First, make sure you have node and yarn installed as per the [requirements](#requirements-) mentioned above.

Second, run `yarn install` in the root of your local clone of this repository to install all required packages for the checks to work.

Then, run any of the following commands in the root of the cloned repository:

* `yarn api:lint` to check for syntax errors or design guidelines violations inside the OpenAPI files
* `yarn docs:lint` to check the `.md` files (guides) for mistakes or syntax errors

If you want to automatically run these checks on your local machine for every new commit, you can execute the following command in the root of your cloned repository (once) to install a [`pre-commit` hook](https://git-scm.com/book/en/v2/Customizing-Git-Git-Hooks):

```
cp pre-commit .git/hooks/pre-commit
```

You can uninstall the pre-commit hook by running:

```
rm .git/hooks/pre-commit
```

In any case the checks will also run on GitHub and you should receive an email if they fail.
If you open a pull request it will also include the status of the checks.

## Automatically fixing (some) errors 🧹

Warnings or errors reported by `yarn api:lint` (a.k.a. the `Linting / openapi` check on GitHub) always need to be fixed manually in the OpenAPI file(s) of your project.

Warnings or errors reported by `yarn docs:lint` (a.k.a. the `Linting / docs` check on GitHub) can sometimes be fixed automatically, depending on the exact issue. For example formatting issues can be fixed automatically, but dead links not.

If you have `node` and `yarn` installed locally and ran `yarn install` to install all required packages, you can run `yarn docs:lint:fix` to try to fix the linting issues. Any issues that can be fixed will be fixed, and you can then commit them.

You can also run the same script on GitHub itself.
First, navigate to the ["Linting docs fix"](https://github.com/cultuurnet/apidocs/actions/workflows/linting-docs-fix.yml) Action. Then click "Run workflow" and select the branch you are working on.
Finally, hit the green "Run workflow" button.

![](readme-images/run-workflow.png)

Note that this workflow can only fix errors in changes that you have already pushed to GitHub.

If the workflow fixed any errors, it will automatically commit them back to your branch.
Make sure to pull these changes in your local copy of the docs before making more changes to avoid merge conflicts!

## Publishing your changes to Stoplight 🚢

Any branches you create will automatically be published as extra versions on <https://docs.publiq.be> in the relevant projects that you made changes to, but as unlisted so they will only be visible to logged-in users.

When your branch gets merged to `main`, the changes will automatically be published to the `Unreleased` version of the project you made changes to on <https://docs.publiq.be> (visible to any visitor).

![](readme-images/stoplight-branches.png)

When you have implemented and deployed all the new features to your API, you can publish all the changes in the `Unreleased` version by manually running the ["Publish {your project name} documentation" workflow](https://github.com/cultuurnet/apidocs/actions) for the `main` branch.

The workflow will detect that you have run it manually, and push the changes to the `Stable` version on Stoplight instead of the `Unreleased` version.

## Removing outdated branches from Stoplight 🚮

When a branch is deleted from GitHub (for example, after merging a pull request) the ["Clean Stoplight Branches"](https://github.com/cultuurnet/apidocs/actions/workflows/clean-stoplight-branches.yml) actions runs automatically.
This action uses the (reverse-engineered) Stoplight API to go over all branches in all Stoplight projects and removes those that do not exist in GitHub anymore.

Because the Stoplight API is not officially supported for 3rd-party integrations, the job can sometimes run into issues (and even still be marked as green because the issue did not necessarily cause a crash).
Follow these steps to troubleshoot any issues:

* Keep in mind that "published" branches (i.e. visible to anonymous users, like `Stable` and `Unreleased`) are never removed automatically. Ask a Stoplight admin to remove those manually when needed.
* If only a few deleted branches are still listed on Stoplight, first try to remove them by running the ["Clean Stoplight Branches"](https://github.com/cultuurnet/apidocs/actions/workflows/clean-stoplight-branches.yml) job manually in the same way that you would run the "Linting docs fix" action (see ["Automatically fixing (some) errors"](#automatically-fixing-some-errors-)). This sometimes fixes any temporary issues that occurred previously.
* If deleted branches are never removed from a specific project, double check that the project's id is included in [the list of projects to clean](https://github.com/cultuurnet/apidocs/blob/main/.github/workflows/clean-stoplight-branches.yml#L10). (You can find a project's id by going to its settings page in Stoplight.)
* If deleted branches are never removed from any project, the username and password used to authenticate with Stoplight's API might be outdated. Update the `STOPLIGHT_USERNAME` and `STOPLIGHT_PASSWORD` secrets [in the repository settings](https://github.com/cultuurnet/apidocs/settings/secrets/actions) (make sure to use the credentials of a user that is admin of the publiq Stoplight workspace).
* If the other troubleshooting steps do not resolve the issue, the Stoplight API might have been updated with breaking changes. Check the action's logs and try to fix [the bash script](https://github.com/cultuurnet/apidocs/blob/main/.github/actions/stoplight-clean-branches/action.sh) that is used by the action.

## Useful tools and resources 📚

While not required, you can use the following links to help you write excellent documentation:

* hemingwayapp.com for writing clearly by avoiding passive voice, long sentences, and so on.
