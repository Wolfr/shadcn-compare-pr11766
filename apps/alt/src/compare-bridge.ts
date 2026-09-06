/**
 * Lets the compare shell drive this iframe's theme and its token palette.
 *
 * ThemeProvider already reacts to `storage` events, so re-dispatching one after
 * writing the key keeps the two panes in sync without touching the provider.
 */

/**
 * Palettes that pull `--border`, `--input` and `--muted` apart.
 *
 * The shipped styles give all three the same or near-same value — `--border`
 * and `--input` are byte-identical in light mode — so most of PR #11766's
 * substitutions render as a no-op. These overrides restore the distinction a
 * real consumer theme would have, which is the condition the PR is about.
 */
const PALETTES: Record<string, { light: Record<string, string>; dark: Record<string, string> }> = {
  // Neutral, but with the three tokens clearly separated in lightness — the
  // way a theme that actually styles its form controls would set them.
  contrast: {
    light: {
      "--border": "oklch(0.80 0 0)",
      "--input": "oklch(0.55 0 0)",
      "--muted": "oklch(0.93 0 0)",
    },
    dark: {
      "--border": "oklch(0.40 0 0)",
      "--input": "oklch(0.68 0 0)",
      "--muted": "oklch(0.30 0 0)",
    },
  },
  // One hue per token, so every surface announces which token it is reading.
  // Not a plausible theme — a diagnostic.
  hue: {
    light: {
      "--border": "oklch(0.62 0.24 27)",
      "--input": "oklch(0.62 0.20 255)",
      "--muted": "oklch(0.88 0.14 95)",
    },
    dark: {
      "--border": "oklch(0.65 0.22 27)",
      "--input": "oklch(0.65 0.18 255)",
      "--muted": "oklch(0.45 0.12 95)",
    },
  },
}

const STYLE_ID = "compare-token-override"

function declarations(tokens: Record<string, string>) {
  return Object.entries(tokens)
    .map(([name, value]) => `${name}: ${value};`)
    .join(" ")
}

function applyPalette(name: string) {
  document.getElementById(STYLE_ID)?.remove()

  const palette = PALETTES[name]
  if (!palette) return

  const element = document.createElement("style")
  element.id = STYLE_ID
  // `:root:root` outranks both `:root` and `.dark` from the style sheet, so the
  // override wins regardless of where Vite injects the sheet.
  element.textContent =
    `:root:root { ${declarations(palette.light)} }\n` +
    `:root:root.dark { ${declarations(palette.dark)} }`
  document.head.append(element)
}

/**
 * Tokens worth showing in the shell's variables panel — the three the PR moves
 * between first, then the surfaces you need in order to judge them.
 */
const REPORTED_TOKENS = [
  "--border",
  "--input",
  "--muted",
  "--background",
  "--card",
  "--foreground",
  "--muted-foreground",
  "--primary",
  "--ring",
]

/**
 * Reads each token twice: the authored value (`oklch(...)`, possibly with an
 * alpha) and what it actually paints as, resolved through a probe element so
 * translucent tokens report the colour you really see.
 */
function readTokens() {
  const computed = getComputedStyle(document.documentElement)
  const probe = document.createElement("div")
  probe.style.display = "none"
  document.body.append(probe)

  const tokens = REPORTED_TOKENS.map((name) => {
    const declared = computed.getPropertyValue(name).trim()
    probe.style.color = ""
    probe.style.color = `var(${name})`
    const resolved = getComputedStyle(probe).color
    return { name, declared, resolved }
  })

  probe.remove()
  return tokens
}

function reportTokens() {
  if (window.parent === window) return
  window.parent.postMessage(
    {
      type: "vars",
      theme: document.documentElement.classList.contains("dark")
        ? "dark"
        : "light",
      tokens: readTokens(),
    },
    "*"
  )
}

export function installCompareBridge(storageKey = "theme") {
  // The class flip and the injected palette both land asynchronously, so report
  // on the next frame rather than inline.
  const scheduleReport = () => requestAnimationFrame(() => reportTokens())

  const observer = new MutationObserver(scheduleReport)
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class"],
  })

  window.addEventListener("message", (event) => {
    const data = event.data
    if (!data || typeof data !== "object") return

    if (data.type === "tokens" && typeof data.value === "string") {
      applyPalette(data.value)
      scheduleReport()
      return
    }

    if (data.type === "vars:request") {
      scheduleReport()
      return
    }

    if (data.type !== "theme" || typeof data.value !== "string") return

    localStorage.setItem(storageKey, data.value)
    window.dispatchEvent(
      new StorageEvent("storage", {
        key: storageKey,
        newValue: data.value,
        storageArea: localStorage,
      })
    )
  })

  scheduleReport()
}
