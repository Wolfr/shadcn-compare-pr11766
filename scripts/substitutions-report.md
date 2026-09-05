# PR #11766 style-token substitutions

## vega — 7 changed rule(s)
  ! cn-switch-aria: no base component uses this class — skipped
  ✓ button.tsx cn-button-variant-outline: dark:bg-input/30 -> dark:bg-background, dark:border-input -> dark:border-border, dark:hover:bg-input/50 -> dark:hover:bg-muted
  ✓ button-group.tsx cn-button-group-separator: bg-input -> bg-border
  - calendar.tsx cn-calendar-dropdown-root: none of [border-input] present in the installed component — skipped
  ✓ switch.tsx cn-switch: data-unchecked:bg-input -> data-unchecked:bg-muted, dark:data-unchecked:bg-input/80 -> dark:data-unchecked:bg-muted/80
  ✓ toggle.tsx cn-toggle-variant-outline: border-input -> border-border
  ! bubble.tsx: not installed in vega — skipped

## nova — 7 changed rule(s)
  ! cn-switch-aria: no base component uses this class — skipped
  ✓ button.tsx cn-button-variant-outline: dark:bg-input/30 -> dark:bg-background, dark:border-input -> dark:border-border, dark:hover:bg-input/50 -> dark:hover:bg-muted
  ✓ button-group.tsx cn-button-group-separator: bg-input -> bg-border
  - calendar.tsx cn-calendar-dropdown-root: none of [border-input] present in the installed component — skipped
  ✓ switch.tsx cn-switch: data-unchecked:bg-input -> data-unchecked:bg-muted, dark:data-unchecked:bg-input/80 -> dark:data-unchecked:bg-muted/80
  ✓ toggle.tsx cn-toggle-variant-outline: border-input -> border-border
  ! bubble.tsx: not installed in nova — skipped

## luma — 12 changed rule(s)
  ! cn-switch-aria: no base component uses this class — skipped
  ! cn-field-label-aria: no base component uses this class — skipped
  ! cn-drawer-popup: no base component uses this class — skipped
  ✓ slider.tsx cn-slider-track: bg-input/90 -> bg-muted
  ✓ switch.tsx cn-switch: data-unchecked:bg-input/90 -> data-unchecked:bg-muted
  ✓ button.tsx cn-button-variant-outline: dark:hover:bg-input/30 -> dark:hover:bg-muted
  ✓ button-group.tsx cn-button-group-separator: bg-input -> bg-border
  ~ field.tsx cn-field-label: has-data-checked:bg-input/30 -> has-data-checked:bg-muted/30 [not present locally: has-[>[data-slot=field]]:not-has-[:disabled,[data-disabled]]:hover:bg-input/40]
  ✓ kbd.tsx cn-kbd: in-data-[slot=input-group]:bg-input -> in-data-[slot=input-group]:bg-muted
  ✓ toggle.tsx cn-toggle-variant-outline: border-input -> border-border
  - calendar.tsx cn-calendar-dropdown-root: none of [border-input] present in the installed component — skipped
  ! bubble.tsx: not installed in luma — skipped

## rhea — 11 changed rule(s)
  ! cn-switch-aria: no base component uses this class — skipped
  ! cn-field-label-aria: no base component uses this class — skipped
  ! cn-drawer-popup: no base component uses this class — skipped
  ✓ slider.tsx cn-slider-track: bg-input/90 -> bg-muted
  ✓ switch.tsx cn-switch: data-unchecked:bg-input/90 -> data-unchecked:bg-muted
  ✓ button.tsx cn-button-variant-outline: dark:hover:bg-input/30 -> dark:hover:bg-muted
  ✓ button-group.tsx cn-button-group-separator: bg-input -> bg-border
  ~ field.tsx cn-field-label: has-data-checked:bg-input/30 -> has-data-checked:bg-muted/30 [not present locally: has-[>[data-slot=field]]:not-has-[:disabled,[data-disabled]]:hover:bg-input/40]
  ✓ kbd.tsx cn-kbd: in-data-[slot=input-group]:bg-input -> in-data-[slot=input-group]:bg-muted
  ✓ toggle.tsx cn-toggle-variant-outline: border-input -> border-border
  ! bubble.tsx: not installed in rhea — skipped

## lyra — 7 changed rule(s)
  ! cn-switch-aria: no base component uses this class — skipped
  ✓ button.tsx cn-button-variant-outline: dark:bg-input/30 -> dark:bg-background, dark:border-input -> dark:border-border, dark:hover:bg-input/50 -> dark:hover:bg-muted
  ✓ button-group.tsx cn-button-group-separator: bg-input -> bg-border
  - calendar.tsx cn-calendar-dropdown-root: none of [border-input] present in the installed component — skipped
  ✓ switch.tsx cn-switch: data-unchecked:bg-input -> data-unchecked:bg-muted, dark:data-unchecked:bg-input/80 -> dark:data-unchecked:bg-muted/80
  ✓ toggle.tsx cn-toggle-variant-outline: border-input -> border-border
  ! bubble.tsx: not installed in lyra — skipped

## maia — 10 changed rule(s)
  ! cn-drawer-popup: no base component uses this class — skipped
  ! cn-switch-aria: no base component uses this class — skipped
  ✓ badge.tsx cn-badge-variant-outline: bg-input/30 -> bg-muted/30
  ✓ button.tsx cn-button-variant-outline: bg-input/30 -> bg-background, hover:bg-input/50 -> hover:bg-muted
  ✓ button-group.tsx cn-button-group-separator: bg-input -> bg-border
  - calendar.tsx cn-calendar-dropdown-root: none of [border-input] present in the installed component — skipped
  - field.tsx cn-field-label: none of [has-[>[data-slot=field]]:not-has-[:disabled,[data-disabled]]:hover:bg-input/40] present in the installed component — skipped
  ✓ switch.tsx cn-switch: data-unchecked:bg-input -> data-unchecked:bg-muted, dark:data-unchecked:bg-input/80 -> dark:data-unchecked:bg-muted/80
  ✓ toggle.tsx cn-toggle-variant-outline: border-input -> border-border
  ! bubble.tsx: not installed in maia — skipped

## mira — 10 changed rule(s)
  ! cn-drawer-popup: no base component uses this class — skipped
  ! cn-switch-aria: no base component uses this class — skipped
  ✓ badge.tsx cn-badge-variant-outline: bg-input/20 -> bg-muted/20, dark:bg-input/30 -> dark:bg-muted/30
  ✓ button.tsx cn-button-variant-outline: dark:bg-input/30 -> (dropped), hover:bg-input/50 -> hover:bg-muted
  ✓ button-group.tsx cn-button-group-separator: bg-input -> bg-border
  - calendar.tsx cn-calendar-dropdown-root: none of [border-input] present in the installed component — skipped
  - field.tsx cn-field-label: none of [has-[>[data-slot=field]]:not-has-[:disabled,[data-disabled]]:hover:bg-input/40] present in the installed component — skipped
  ✓ switch.tsx cn-switch: data-unchecked:bg-input -> data-unchecked:bg-muted, dark:data-unchecked:bg-input/80 -> dark:data-unchecked:bg-muted/80
  ✓ toggle.tsx cn-toggle-variant-outline: border-input -> border-border
  ! bubble.tsx: not installed in mira — skipped

## sera — 10 changed rule(s)
  ! cn-switch-aria: no base component uses this class — skipped
  ✓ button.tsx cn-button-variant-outline: dark:hover:bg-input/30 -> dark:hover:bg-muted
  ✓ button-group.tsx cn-button-group-text: border-b-input -> border-b-border
  ✓ button-group.tsx cn-button-group-separator: bg-input -> bg-border
  - calendar.tsx cn-calendar-dropdown-root: none of [border-input] present in the installed component — skipped
  ✓ kbd.tsx cn-kbd: in-data-[slot=input-group]:bg-input -> in-data-[slot=input-group]:bg-muted
  ✓ slider.tsx cn-slider-track: bg-input/50 -> bg-muted
  ~ switch.tsx cn-switch: data-unchecked:bg-input -> data-unchecked:bg-muted, data-unchecked:border-input/50 -> data-unchecked:border-border/50 [not present locally: group-has-[:focus-visible]/field-label:data-unchecked:border-input/50]
  ✓ toggle.tsx cn-toggle-variant-outline: border-input -> border-border
  ! bubble.tsx: not installed in sera — skipped
