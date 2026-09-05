# CLAUDE.md

Working notes for this repo. It is a review aid for
[shadcn-ui/ui#11766](https://github.com/shadcn-ui/ui/pull/11766) and is meant to
be published on GitHub for the PR author and reviewers to open — so keep
comments, commit messages and UI copy accurate and public-appropriate, and do
not overstate what the comparison proves. See `README.md` for how the two sides
are produced.

## The thing you need to know before reviewing anything

All eight styles ship the *same* values for the three tokens the PR moves
between:

| | `--border` | `--input` | `--muted` |
|---|---|---|---|
| light | `oklch(0.922 0 0)` | `oklch(0.922 0 0)` | `oklch(0.97 0 0)` |
| dark | `oklch(1 0 0 / 10%)` | `oklch(1 0 0 / 15%)` | `oklch(0.269 0 0)` |

Consequences, which shape every claim this repo can make:

- **`input` → `border` is a no-op in light mode.** The values are identical. In
  dark it is a 15% → 10% white fade.
- **`input` → `muted` is the real change**, and mostly in *light* mode
  (0.922 → 0.97, a visibly lighter track). In dark the two land in nearly the
  same place: white/15% over the 0.145 background composites to ≈0.27, and
  `--muted` is 0.269.
- The swap also trades **translucent for opaque**, which is invisible on the
  page background and only shows up on a card or a muted panel.

So the default theme is the *worst case* for seeing this PR. A real consumer
theme that sets `--input` apart from `--border` is the condition the PR is
actually about. Both affordances below exist to work around that, and neither
should be described as "what shadcn ships".

## The two affordances added for this

**Token palette picker** (`compare.html` header, or `t` to cycle). Sends a
`{type: "tokens"}` postMessage to both iframes; handled by
`apps/*/src/compare-bridge.ts`, which injects a `<style>` overriding
`--border`/`--input`/`--muted`. Modes:

- `default` — as shipped.
- `contrast` — neutral, three separated lightnesses. A plausible consumer theme.
- `hue` — one hue per token (border red, input blue, muted amber), so every
  surface announces which token it reads. A diagnostic, not a real theme.

The override uses `:root:root` / `:root:root.dark` selectors so it outranks both
`:root` and `.dark` from the style sheet regardless of where Vite injects it.

**Surface rows** on the Switch and Slider views (`Surfaces` in `App.tsx`). The
same control on `background`, a real `Card`, and a `bg-muted` panel — this is
the only way to see the translucent → opaque consequence.

**Variables panel** (`vars` button). `compare-bridge.ts` reports the resolved
values of a curated token list to the shell on load, on palette change, and
whenever `documentElement`'s class list changes (a MutationObserver, since the
theme flip is asynchronous). Values are read with `getComputedStyle` plus a
hidden probe element, so translucent tokens report both their authored value and
what they actually paint as. Never hardcode these in the shell — the point is
that they are read live.

Only the master pane is asked; both panes always carry identical token values,
because the PR changes which token a component reads, not what the tokens are.

## Deployment

Static-assets-only Cloudflare Worker (`wrangler.jsonc`), deployed to
`shadcn-compare-pr11766.johan-457.workers.dev`.

```bash
npm run build && npm run deploy
```

`scripts/build-site.sh` builds each app with `--base=/master/` or `--base=/pr/`
into `dist/`, then copies the shell in. Two things depend on that layout:

- `compare.html` resolves iframe origins by hostname — dev servers on localhost,
  `/master` and `/pr` everywhere else.
- The apps' own `index.html` link to styles **relatively** (`vega.html`) so they
  work under the base prefix, but to the shell **absolutely** (`/compare.html`),
  which lives at the root. Don't "fix" either to match the other.

Workers serves assets with `.html` stripped, so `/master/vega.html` 307s to
`/master/vega`. Iframes follow it; it is not a problem.

## Editing App.tsx — read this first

The eight `src/<style>/App.tsx` files are **byte-identical apart from the
`@/<style>/` import prefix**, and `apps/pr` matches `apps/master`. That is 16
copies of one file.

Edit `apps/master/src/vega/App.tsx`, then propagate **via a temp file**:

```bash
cd apps
for s in nova luma rhea sera lyra mira maia vega; do
  sed "s|@/vega/|@/$s/|g" master/src/vega/App.tsx > /tmp/app-$s.tsx
done
for s in nova luma rhea sera lyra mira maia vega; do
  cp /tmp/app-$s.tsx master/src/$s/App.tsx
  cp /tmp/app-$s.tsx pr/src/$s/App.tsx
done
```

The temp file is not optional. Writing `sed ... master/src/vega/App.tsx >
master/src/vega/App.tsx` truncates the source before `sed` reads it and destroys
every copy in the loop. This has already happened once.

`App.tsx` imports `cn` from nowhere — it uses plain class strings and template
literals. Keep it that way rather than adding the import.

## What `apply-pr.ts` owns

`scripts/apply-pr.ts` rewrites **only** `apps/pr/src/<style>/components/ui/`.
Everything else in `apps/pr` — `App.tsx`, `compare-bridge.ts`, `index.css` — is
hand-maintained and must be kept in sync with `apps/master` manually. Editing
those files is safe; re-running the script will not clobber them.

## Verifying a change

There is no test suite. Check:

```bash
cd apps/master && npx tsc --noEmit -p tsconfig.app.json
cd apps/pr     && npx tsc --noEmit -p tsconfig.app.json
```

and that both dev servers still transform the entry, e.g.
`curl -s http://localhost:5290/src/vega/App.tsx | head`.

## Gaps the comparison cannot show

Listed in full in `scripts/substitutions-report.md`. The one worth repeating:
`cn-calendar-dropdown-root` (`border-input` → `border-border`) is skipped in all
seven styles that have it, because the installed calendars carry no such class —
**that change has zero coverage here** and must be reviewed by reading the diff.
The `cn-bubble-*` changes (16 diff lines, all eight styles) are likewise
invisible, as `bubble` is not installed in any style.
