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
          style: {
            background: "var(--card)",
            color: "var(--card-foreground)",
            border: "none",
            boxShadow: "var(--shadow-border-hover)",
          },
        }}
      />
    </>
  )
}

export default App
