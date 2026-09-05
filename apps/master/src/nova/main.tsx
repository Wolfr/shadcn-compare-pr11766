import { StrictMode } from "react"
import { createRoot } from "react-dom/client"

import "./index.css"
import App from "./App.tsx"
import { installCompareBridge } from "@/compare-bridge.ts"
import { ThemeProvider } from "@/components/theme-provider.tsx"

installCompareBridge()

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </StrictMode>
)
