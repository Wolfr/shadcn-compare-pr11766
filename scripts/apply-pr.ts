/**
 * Rebuilds `apps/pr` component sources from `apps/master` + the two style sheets.
 *
 * The shadcn registry build inlines the `@apply` body of each `.cn-*` rule in
 * `apps/v4/registry/styles/style-<style>.css` into whichever component carries
 * that class, so an installed component is really "base component + style map".
 * PR #11766 only edits those `@apply` bodies, which means the PR flavour of an
 * installed component is the master one with the utilities that changed swapped
 * in place — no registry build required.
 *
 * Usage: cd scripts && bun apply-pr.ts [variant]
 *
 * `variant` selects which style sheets to diff master against and which app to
 * write: "pr" (default, PR #11766) or "alt" (the narrower alternative).
 */
import {
  existsSync,
  mkdirSync,
  readFileSync,
  writeFileSync,
} from "node:fs"
import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"
import { Node, Project, ScriptKind } from "ts-morph"

import { createStyleMap } from "./create-style-map"

const here = dirname(fileURLToPath(import.meta.url))
const root = join(here, "..")
const STYLES = ["vega", "nova", "luma", "rhea", "lyra", "maia", "mira", "sera"]

const variant = process.argv[2] ?? "pr"
if (!["pr", "alt"].includes(variant)) {
  throw new Error(`unknown variant "${variant}" — expected "pr" or "alt"`)
}

const cnClassFiles: Record<string, string[]> = JSON.parse(
  readFileSync(join(here, "cn-class-files.json"), "utf8")
)

function commonPrefix(a: string, b: string) {
  let index = 0
  while (index < a.length && index < b.length && a[index] === b[index]) index++
  return index
}

const report: string[] = []
let changeCount = 0

for (const style of STYLES) {
  const master = createStyleMap(
    readFileSync(join(here, "styles/master", `style-${style}.css`), "utf8")
  )
  const pr = createStyleMap(
    readFileSync(join(here, `styles/${variant}`, `style-${style}.css`), "utf8")
  )

  const changed = Object.keys(pr).filter((key) => master[key] !== pr[key])
  report.push(`\n## ${style} — ${changed.length} changed rule(s)`)

  type Edit = {
    cnClass: string
    old: string[]
    removed: string[]
    added: string[]
  }
  const edits = new Map<string, Edit[]>()

  for (const cnClass of changed) {
    const oldTokens = master[cnClass].split(/\s+/).filter(Boolean)
    const newTokens = pr[cnClass].split(/\s+/).filter(Boolean)
    const files = cnClassFiles[cnClass] ?? []

    if (files.length === 0) {
      report.push(`  ! ${cnClass}: no base component uses this class — skipped`)
      continue
    }

    for (const file of files) {
      if (!edits.has(file)) edits.set(file, [])
      edits.get(file)!.push({
        cnClass,
        old: oldTokens,
        removed: oldTokens.filter((token) => !newTokens.includes(token)),
        added: newTokens.filter((token) => !oldTokens.includes(token)),
      })
    }
  }

  const fromDir = join(root, "apps/master/src", style, "components/ui")
  const toDir = join(root, `apps/${variant}/src`, style, "components/ui")
  mkdirSync(toDir, { recursive: true })

  for (const [file, fileEdits] of edits) {
    const fromPath = join(fromDir, file)
    if (!existsSync(fromPath)) {
      report.push(`  ! ${file}: not installed in ${style} — skipped`)
      continue
    }

    const project = new Project({ useInMemoryFileSystem: true })
    const sourceFile = project.createSourceFile(
      file,
      readFileSync(fromPath, "utf8"),
      { scriptKind: ScriptKind.TSX }
    )

    const literals: Array<{ node: any; tokens: string[] }> = []
    sourceFile.forEachDescendant((node) => {
      if (
        Node.isStringLiteral(node) ||
        Node.isNoSubstitutionTemplateLiteral(node)
      ) {
        literals.push({
          node,
          tokens: node.getLiteralText().split(/\s+/).filter(Boolean),
        })
      }
    })

    for (const edit of fileEdits) {
      // Pair each removed utility with the added one that replaces it, by
      // longest common prefix — every change in this PR keeps the variant
      // prefix (`dark:hover:bg-input/30` -> `dark:hover:bg-muted`).
      const pairs = new Map<string, string | null>()
      const takenAdds = new Set<string>()
      const scored = edit.removed
        .flatMap((removed) =>
          edit.added.map((added) => ({
            removed,
            added,
            lcp: commonPrefix(removed, added),
          }))
        )
        .sort((a, b) => b.lcp - a.lcp)

      for (const { removed, added, lcp } of scored) {
        if (lcp === 0 || pairs.has(removed) || takenAdds.has(added)) continue
        pairs.set(removed, added)
        takenAdds.add(added)
      }
      for (const removed of edit.removed) {
        if (!pairs.has(removed)) pairs.set(removed, null)
      }
      const orphanAdds = edit.added.filter((added) => !takenAdds.has(added))

      // The installed components were generated from an earlier master, so a
      // rule's utilities are matched partially: pick the literal that overlaps
      // the master rule most, and only rewrite the tokens actually there.
      const candidates = literals
        .map((literal) => ({
          ...literal,
          present: edit.removed.filter((token) =>
            literal.tokens.includes(token)
          ),
          score: literal.tokens.filter((token) => edit.old.includes(token))
            .length,
        }))
        .filter((literal) => literal.present.length > 0)
        .sort((a, b) => b.score - a.score)

      if (candidates.length === 0) {
        report.push(
          `  - ${file} ${edit.cnClass}: none of [${edit.removed.join(" ")}] present in the installed component — skipped`
        )
        continue
      }
      if (candidates.length > 1 && candidates[0].score === candidates[1].score) {
        report.push(
          `  ! ${file} ${edit.cnClass}: ambiguous (tie at score ${candidates[0].score}) — skipped`
        )
        continue
      }

      const target = candidates[0]
      const next: string[] = []
      for (const token of target.tokens) {
        if (pairs.has(token)) {
          const replacement = pairs.get(token)
          if (replacement) next.push(replacement)
          continue
        }
        next.push(token)
      }
      next.push(...orphanAdds)

      const deduped = next.filter((token, index) => next.indexOf(token) === index)
      target.node.setLiteralValue(deduped.join(" "))
      target.tokens = deduped
      changeCount++

      const missed = edit.removed.filter(
        (token) => !target.present.includes(token)
      )
      report.push(
        `  ${missed.length ? "~" : "✓"} ${file} ${edit.cnClass}: ` +
          target.present
            .map((token) => `${token} -> ${pairs.get(token) ?? "(dropped)"}`)
            .join(", ") +
          (missed.length ? ` [not present locally: ${missed.join(" ")}]` : "")
      )
    }

    writeFileSync(join(toDir, file), sourceFile.getFullText())
  }
}

const title =
  variant === "pr"
    ? "PR #11766 style-token substitutions"
    : "Alternative patch style-token substitutions"
writeFileSync(
  join(here, `substitutions-report${variant === "pr" ? "" : `-${variant}`}.md`),
  `# ${title}\n${report.join("\n")}\n`
)
console.log(`applied ${changeCount} substitutions`)
