import * as React from "react"
import { Outlet } from "react-router-dom"

import { AuthProvider } from "./auth-context"

/** Raiz de /admin: provê o contexto de autenticação e um limite de Suspense para o lazy-load. */
export function AdminRoot() {
  return (
    <AuthProvider>
      <React.Suspense
        fallback={
          <div className="text-muted-foreground flex min-h-svh items-center justify-center text-sm">
            Carregando…
          </div>
        }
      >
        <Outlet />
      </React.Suspense>
    </AuthProvider>
  )
}
