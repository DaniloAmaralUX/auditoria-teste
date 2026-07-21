import { RouterProvider } from "react-router-dom"
import { Toaster } from "sonner"

import { router } from "@/app/router"

export function App() {
  return (
    <>
      <RouterProvider router={router} />
      {/* Toasts sóbrios, não-bloqueantes (doc 10 prevê Sonner). Nunca para erros de validação. */}
      <Toaster
        position="bottom-right"
        gap={8}
        toastOptions={{
          /* Toast é overlay: elevação real — sombra profunda + hairline (guia /design/materiais). */
          style: {
            background: "var(--popover)",
            color: "var(--popover-foreground)",
            border: "1px solid var(--border)",
            boxShadow:
              "0 8px 24px -8px color-mix(in oklch, var(--foreground) 25%, transparent)",
          },
        }}
      />
    </>
  )
}

export default App
