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
          /* Toast é overlay: elevação real via a escala de materiais (guia /design/materiais). */
          style: {
            background: "var(--popover)",
            color: "var(--popover-foreground)",
            border: "1px solid var(--border)",
            boxShadow: "var(--shadow-material-menu)",
          },
        }}
      />
    </>
  )
}

export default App
