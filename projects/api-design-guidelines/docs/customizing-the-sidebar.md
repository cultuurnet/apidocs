# Customizing the sidebar

You can customize the sidebar of your project, for example to change the order of pages, by adding a `toc.json` file to your project to describe the intended structure of your sidebar.

See Stoplight's documentation for more information: <https://meta.stoplight.io/docs/platform/4.-documentation/d.table-of-contents.md>

<!-- theme: warning -->

> Make sure that your `toc.json` file is in the **root** of your project files, not inside `docs` or another directory.

Here's how the `toc.json` for this project looks like (partially):

```json
{
  "items": [
    {
      "type": "item",
      "title": "Introduction",
      "uri": "docs/introduction.md"
    },
    {
      "type": "item",
      "title": "How we work",
      "uri": "docs/how-we-work.md"
    },
    {
      "type": "divider",
      "title": "API design"
    },
    {
      "type": "item",
      "title": "Endpoint names",
      "uri": "docs/endpoint-names.md"
    },
    {
      "type": "item",
      "title": "Error responses",
      "uri": "docs/error-responses.md"
    },
    {
      "type": "item",
      "title": "Sorting",
      "uri": "docs/sorting.md"
    },
    {
      "type": "divider",
      "title": "Writing guides"
    },
    {
      "type": "item",
      "title": "File management",
      "uri": "docs/file-management.md"
    },
    {
      "type": "item",
      "title": "Customizing the sidebar",
      "uri": "docs/customizing-the-sidebar.md"
    },
    {
      "type": "item",
      "title": "Documenting HTTP examples",
      "uri": "docs/http-examples.md"
    },
    {
      "type": "divider",
      "title": "Stoplight Management"
    },
    {
      "type": "item",
      "title": "Creating a Stoplight project",
      "uri": "docs/creating-a-stoplight-project.md"
    }
  ]
}
```
