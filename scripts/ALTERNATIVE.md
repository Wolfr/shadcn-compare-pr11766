# An alternative to PR #11766

`alt-11766.diff` is a narrower version of
[#11766](https://github.com/shadcn-ui/ui/pull/11766). It applies cleanly to
`main@7c9eaba` and changes 22 rules instead of 74.

## The principle

`--input` is not just a grey. It marks an **interactive control affordance** —
the surface or border of something you type into, drag, or toggle — and it is
deliberately distinct from `--muted` (a passive surface) and `--border` (static
chrome).

So the rule is:

> Move genuinely non-interactive decoration off `--input`. Leave every control
> on it.

#11766 states this rule itself — it says it leaves "real form controls on
`input`" — and then moves switches, sliders, toggles, buttons and calendar
dropdowns anyway.

## Why that matters: `--muted` collapses controls into their container

A switch track set to `bg-muted` sitting on a `bg-muted` surface reads the
**same variable** as the surface behind it. They resolve to the same colour in
every theme, by construction — default tokens, a custom theme, any of the eight
styles. Contrast is 1:1, permanently, and the track disappears: what is left is
a floating thumb.

The slider is worse. Its unfilled track is what communicates *extent* — where
the value sits in the range, and how far the drag target goes. On a muted
surface #11766 leaves a filled bar ending in a dot, with no indication of the
range it belongs to.

That is a WCAG 1.4.11 failure, not only an aesthetic one: the vanished element
is the part that identifies the control and its state.

Both are reproducible side by side at
<https://shadcn-compare-pr11766.johan-457.workers.dev> — Switch or Slider, any
style, the `muted` row.

## What this diff keeps from #11766

Genuinely passive surfaces, where nothing is lost:

| Rule | Change | Why |
|---|---|---|
| `cn-button-group-separator` | `bg-input` → `bg-border` | a divider between buttons is chrome |
| `cn-button-group-text` | `border-b-input` → `border-b-border` | a static label's underline |
| `cn-badge-variant-outline` | `bg-input/20\|30` → `bg-muted/20\|30` | a badge is a passive label |
| `cn-kbd` | `in-[input-group]:bg-input` → `bg-muted` | a keycap glyph is not a control |
| `cn-bubble-variant-outline` | dark hover `bg-input/30` → `bg-muted` | matches the light hover already there |

## What this diff drops, and why

**Controls, which keep `--input`:**

- `cn-switch`, `cn-switch-aria`, `cn-slider-track` — the regressions above.
- `cn-toggle-variant-outline` — a toggle is a control.
- `cn-button-variant-outline` — a button is a control. #11766 also replaces its
  dark fill (`dark:bg-input/30` → `dark:bg-background`), which flattens the
  outline variant against the page in dark mode.
- `cn-calendar-dropdown-root` — a dropdown is a control.
- `cn-field-label`, `cn-field-label-aria` — the checked/selected tint on a field
  card. `bg-muted/30` on a muted surface loses the selection state the same way
  the switch loses its track.

**Out of scope:**

- `cn-drawer-popup` — #11766 changes `border-popover dark:border-border` to
  `border-border`, giving the drawer a visible border in light mode where it
  previously blended into the popover surface. This does not involve `--input`
  at all and looks like unrelated scope.

## The remaining question

Several of the dropped cases exist because these styles use `--input` as a
*neutral raised surface* in dark mode (`dark:bg-input/30` on an outline button).
That genuinely is a token-semantics smell — but the fix is a token that means
"neutral control surface", not redirecting controls at `--muted`. That is worth
a separate discussion rather than folding into this change.

## Applying it

```bash
git apply alt-11766.diff    # from the repo root, against main@7c9eaba
```
