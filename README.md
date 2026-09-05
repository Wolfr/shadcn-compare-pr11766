# shadcn/ui — PR #11766 vs master

Side-by-side comparison of [shadcn-ui/ui#11766](https://github.com/shadcn-ui/ui/pull/11766)
(*fix(styles): align input token usage with control semantics*) against `main`.

Left pane is master, right pane is master + the PR, for the same style and the
same component. Built from the same compare shell as
[`shadcn-compare`](../shadcn-compare).

**Live demo: <https://shadcn-compare-pr11766.johan-457.workers.dev>**

Or locally:

```bash
npm run install:apps   # first time only
npm run dev            # master :5290, pr :5291, shell :5292
npm run open           # http://localhost:5292/compare.html
```

Style picker, component picker (`↑`/`↓` to step), light/dark toggle (`d`), token
palette picker (`t`), variables drawer (`v`), synced scrolling. Components the PR actually touches are
marked with `●` and hoisted to the top of the component picker.

## What the PR does

It replaces non-input uses of the `input` design token in the eight authored
style sheets (`apps/v4/registry/styles/style-*.css`) with role-matched `border`
or `muted` tokens, leaving real form controls on `input`. The affected surfaces
are outline **button**, **button group** separator, **toggle** outline,
**switch** track, **slider** track, **badge** outline, **kbd** inside an input
group, and the **field** label.

Several of the changes are `dark:`-only — flip the theme toggle, or you will see
two identical panes.

## Why the default theme hides most of this

All eight styles ship the *same* values for the three tokens the PR moves
between:

| | `--border` | `--input` | `--muted` |
|---|---|---|---|
| light | `oklch(0.922 0 0)` | `oklch(0.922 0 0)` | `oklch(0.97 0 0)` |
| dark | `oklch(1 0 0 / 10%)` | `oklch(1 0 0 / 15%)` | `oklch(0.269 0 0)` |

Which means:

- **`input` → `border` is a no-op in light mode** — the values are identical. In
  dark it is a 15% → 10% white fade.
- **`input` → `muted` is the substantive change**, and mostly in *light* mode
  (0.922 → 0.97, a visibly lighter track). In dark the two land in nearly the
  same place: white/15% over the 0.145 background composites to ≈0.27, and
  `--muted` is 0.269.
- The swap also trades **translucent for opaque**, which is invisible on the
  page background and only shows up on a card or a muted panel.

So the shipped theme is the *worst case* for seeing this PR, and a pane that
looks unchanged is not evidence that nothing changed. Two affordances exist to
get around that.

### Token palette picker (`t`)

Overrides `--border`/`--input`/`--muted` in both panes at once so they pull
apart:

- `default` — as shipped.
- `contrast` — neutral, three separated lightnesses. Approximates a real
  consumer theme that styles its form controls distinctly, which is the
  condition the PR is about.
- `hue` — one hue per token (border red, input blue, muted amber), so every
  surface announces which token it reads. A diagnostic, not a plausible theme.

Neither override is anything shadcn ships; they are review aids.

### Variables drawer

The **vars** button (or `v`) opens a drawer on the right showing the live theme
variables, read out of the master pane with `getComputedStyle` rather than
hardcoded — so it always reflects what is actually painting. It is a drawer, not
a popover: it takes layout space and shrinks the panes rather than covering the
components you are comparing, and it stays open until you dismiss it. `--border`, `--input` and `--muted` are
listed first and highlighted, since those are the three the PR moves between;
the rest of the surfaces follow.

Each row shows the authored value (hover for what it resolves to), and the
swatch sits on a checkerboard so a translucent token reads as translucent —
which is the whole point of the `bg-input/90` → `bg-muted` cases. The three key
swatches are also mirrored on the button itself, so at `default` you can see at
a glance that `--border` and `--input` are the same colour in light mode.

### Surface rows

The **switch** and **slider** views render each control three times — on the
page background, in a `Card`, and on a `bg-muted` panel. This is the only way to
see the translucent → opaque consequence, which is invisible on the default
background. Sera's slider (`bg-input/50` → `bg-muted`) is the sharpest case.

## Suggested review path

1. **Switch, off state, light mode, every style.** The largest visual delta:
   `data-unchecked:bg-input` → `bg-muted` takes the track from `#e5e5e5` to
   `#f5f5f5` on white.
2. **Slider track, light mode — `luma`, `rhea`, `sera`.** Same direction, and
   the PR additionally drops the alpha modifier (`bg-input/90` → `bg-muted`,
   `bg-input/50` → `bg-muted`), which the token swap does not itself require.
3. **Switch and slider on the card and muted surfaces** (see above).
4. **Button-group separator, dark mode.** `bg-input` → `bg-border` is 15% → 10%
   white; check it stays visible.
5. **Outline button, dark mode**, which differs per style — `nova`/`vega`/`lyra`
   lose their lift off the background, `mira` drops the dark fill outright, and
   `maia` changes in light mode too.
6. **Toggle and badge outline**, then the asymmetries: `sera` alone gets
   `cn-button-group-text`, `maia`/`mira` alone get badge changes.

Flip the token picker to `contrast` or `hue` for anything in 4–6; at `default`
several of them are provably identical.

## How the two sides are produced

The shadcn registry build inlines the `@apply` body of each `.cn-*` rule in
`style-<style>.css` into whichever component carries that class, so an installed
component is really *base component + style map*. This PR only edits those
`@apply` bodies, which means the PR flavour of an installed component is the
master one with the changed utilities swapped in place — no registry build
needed.

- `apps/master/src/<style>/components/ui/*` — components as installed today
  (copied from the `shadcn-compare` variants).
- `apps/pr/src/<style>/components/ui/*` — the same files with the substitutions
  applied by `scripts/apply-pr.ts`.
- `scripts/styles/master/` and `scripts/styles/pr/` — the eight authored style
  sheets at `main@7c9eaba`, and the same files with `scripts/pr-11766.diff`
  applied (it applies cleanly).
- `scripts/substitutions-report.md` — every substitution the script made, per
  style, and everything it skipped.

Regenerate the PR side with:

```bash
cd scripts && bun apply-pr.ts
```

`scripts/create-style-map.ts` is vendored verbatim from
`packages/shadcn/src/styles/create-style-map.ts`; `scripts/cn-class-files.json`
maps each `cn-*` class to the base component that carries it, read off
`apps/v4/registry/bases/radix/ui`.

### Known gaps

The installed components in `shadcn-compare` were generated from an earlier
master, so a few rules the PR touches have no counterpart locally and are
skipped (they are listed in the report):

- `cn-calendar-dropdown-root` (`border-input` → `border-border`) — the installed
  calendar has no dropdown-root border class at all, in every style.
- `cn-field-label` hover state in `maia`/`mira`, and part of it in `luma`/`rhea`.
- `cn-switch` focus-visible border in `sera` (the base swap still applies).
- `cn-switch-aria`, `cn-field-label-aria`, `cn-drawer-popup` and `cn-bubble-*` —
  these belong to the `aria`/`base` bases or to components that are not
  installed here, so they are not applicable to this comparison.

## Deploying

```bash
npm run build    # builds both apps into dist/{master,pr} and copies the shell
npm run deploy   # wrangler deploy (static-assets-only Worker)
```

`compare.html` picks its iframe origins from the hostname: the two dev servers
on localhost, and `/master` + `/pr` anywhere else. Each app is built with a
matching `--base` so its assets resolve under that prefix.

## Layout

```
compare.html            two-pane shell (style + component + theme)
apps/master             vite app, one HTML entry per style, port 5290
apps/pr                 same, with the PR-derived components, port 5291
scripts/apply-pr.ts     regenerates apps/pr from apps/master + the style sheets
```

Each app keeps every style in its own folder (`src/<style>/`) with its own
`index.css`, `App.tsx` and `components/ui`, and one HTML entry per style, so a
single Vite dev server serves all eight and only compiles the one you open.

## An alternative patch

`scripts/alt-11766.diff` is a narrower version of the PR — 22 rules instead of
74 — that moves only genuinely non-interactive surfaces off `--input` and leaves
every control on it. `scripts/ALTERNATIVE.md` has the reasoning and the
per-rule decisions; `scripts/styles/alt/` holds the resulting style sheets.

## Attribution

The components under `apps/*/src/*/components/ui`, the style sheets under
`scripts/styles`, and `scripts/create-style-map.ts` (vendored verbatim from
`packages/shadcn/src/styles/create-style-map.ts`) are from
[shadcn-ui/ui](https://github.com/shadcn-ui/ui), MIT licensed, copyright (c)
2023 shadcn. `scripts/pr-11766.diff` is the diff of
[PR #11766](https://github.com/shadcn-ui/ui/pull/11766) against `main@7c9eaba`.

The compare shell, the token palette override and the surface rows are the only
original parts, and exist purely to review that PR.

This is an independent project and is not officially affiliated with, endorsed
by, or sponsored by shadcn.
