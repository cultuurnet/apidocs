// Local remark plugin, used by `yarn docs:lint` (see .remarkrc).
//
// Checks offline, against the files in this repository, the links that remark-validate-links does not understand:
//
// 1. Links into a JSON file with a JSON pointer, as Stoplight uses them for OpenAPI operations and models:
//    `../reference/entry.json/paths/~1events/get` (relative) or `/reference/entry.json/paths/~1events/get`
//    (relative to the project root). The file must exist and the pointer must resolve inside it.
// 2. Other links relative to the project root, like `/models/event.json`: the file must exist.
// 3. Links to docs.publiq.be, as used between projects: `https://docs.publiq.be/docs/<project>/<slug>`
//    (or `/docs/<project>/<slug>`). The project must exist, and the slug must be in its toc.json.
//    Not checked, because Stoplight generates them and they cannot be derived from the files:
//    * links with a Stoplight id (`.../7d8d9b4653fc1-terms`, `.../ZG9jOjMyMzA0Mw-errors`)
//    * operation slugs inside an API reference (`.../entry-api/reference/operations/...`); the
//      `entry-api/reference` part is checked
//    * anchors (`#...`)

import fs from 'node:fs'
import path from 'node:path'

const ORIGIN = 'remark-lint-publiq-links'
const PROJECTS_DIR = path.resolve('projects')
const DOCS_HOST = /^https?:\/\/docs\.publiq\.be(?=\/|$)/
const STOPLIGHT_ID = /^([0-9a-f]{13}|ZG9j[A-Za-z0-9+=]*)-/
const JSON_POINTER_LINK = /^(.*?\.(?:json|ya?ml))\/(.+)$/

const cache = new Map()
const cached = (key, load) => {
  if (!cache.has(key)) cache.set(key, load())
  return cache.get(key)
}

const projects = () => cached('projects', () =>
  new Set(fs.readdirSync(PROJECTS_DIR, { withFileTypes: true }).filter((d) => d.isDirectory()).map((d) => d.name)))

const tocSlugs = (project) => cached(`toc:${project}`, () => {
  const slugs = new Set()
  const walk = (items = []) => items.forEach((item) => {
    if (item.slug) slugs.add(item.slug)
    walk(item.items)
  })
  try {
    walk(JSON.parse(fs.readFileSync(path.join(PROJECTS_DIR, project, 'toc.json'), 'utf8')).items)
  } catch {
    // No toc.json: every slug is unknown.
  }
  return slugs
})

const readJson = (file) => cached(`json:${file}`, () => {
  try {
    return JSON.parse(fs.readFileSync(file, 'utf8'))
  } catch {
    return undefined
  }
})

const decodeSegment = (segment) => {
  let decoded = segment
  try {
    decoded = decodeURIComponent(segment)
  } catch {
    // Keep the raw segment.
  }
  return decoded.replace(/~1/g, '/').replace(/~0/g, '~')
}

// Returns the first pointer segment that cannot be resolved, or undefined when the whole pointer resolves.
const missingSegment = (document, pointer) => {
  let node = document
  for (const segment of pointer.split('/').filter(Boolean).map(decodeSegment)) {
    if (node === null || typeof node !== 'object' || !(segment in node)) return segment
    node = node[segment]
  }
  return undefined
}

const projectRootOf = (file) => {
  const relative = path.relative(PROJECTS_DIR, file)
  if (relative.startsWith('..')) return undefined
  return path.join(PROJECTS_DIR, relative.split(path.sep)[0])
}

const checkDocsLink = (url, report) => {
  let pathname = url.replace(DOCS_HOST, '').split(/[?#]/)[0]
  try {
    pathname = decodeURIComponent(pathname)
  } catch {
    // Keep the raw path.
  }
  const match = pathname.match(/^\/docs\/([^/]+)(?:\/(.*?))?\/?$/)
  if (!match) return
  const [, project, slug] = match

  if (!projects().has(project)) {
    report(`Link to unknown docs.publiq.be project \`${project}\` (no \`projects/${project}\` directory)`, 'unknown-project')
    return
  }
  if (!slug || STOPLIGHT_ID.test(slug)) return

  const slugs = tocSlugs(project)
  if (slugs.has(slug)) return
  const reference = slug.match(/^(.+?\/reference)\//)
  if (reference && slugs.has(reference[1])) return

  report(`Link to unknown page \`${slug}\` in docs.publiq.be project \`${project}\` (not a slug in \`projects/${project}/toc.json\`)`, 'unknown-slug')
}

const checkFileLink = (url, file, report) => {
  const target = url.split(/[?#]/)[0]
  const rootRelative = target.startsWith('/')
  const projectRoot = projectRootOf(file)
  if (rootRelative && !projectRoot) return
  const base = rootRelative ? projectRoot : path.dirname(file)

  const pointerMatch = target.match(JSON_POINTER_LINK)
  if (pointerMatch) {
    const [, filePart, pointer] = pointerMatch
    const resolved = path.join(base, filePart)
    const shown = path.relative(process.cwd(), resolved)
    if (!fs.existsSync(resolved)) {
      report(`Link to unknown file: \`${shown}\``, 'missing-file')
      return
    }
    const document = readJson(resolved)
    if (document === undefined) return // YAML or invalid JSON: only the file is checked.
    const missing = missingSegment(document, pointer)
    if (missing !== undefined) report(`Link to unknown \`${missing}\` in \`${shown}\` (pointer \`/${pointer}\`)`, 'missing-pointer')
    return
  }

  // Plain relative links are checked by remark-validate-links.
  if (!rootRelative) return
  const resolved = path.join(base, decodeURI(target))
  if (!fs.existsSync(resolved)) {
    report(`Link to unknown file: \`${path.relative(process.cwd(), resolved)}\` (links starting with \`/\` are relative to the project root)`, 'missing-file')
  }
}

export default function remarkLintPubliqLinks() {
  return (tree, file) => {
    const filePath = path.resolve(file.cwd, file.path)
    const visit = (node) => {
      if ((node.type === 'link' || node.type === 'definition') && typeof node.url === 'string') {
        const report = (reason, rule) => file.message(reason, node.position, `${ORIGIN}:${rule}`)
        const url = node.url.trim()
        if (DOCS_HOST.test(url) || url.startsWith('/docs/')) checkDocsLink(url, report)
        else if (!/^[a-z][a-z0-9+.-]*:/i.test(url) && !url.startsWith('#') && !url.startsWith('//')) checkFileLink(url, filePath, report)
      }
      node.children?.forEach(visit)
    }
    visit(tree)
  }
}
