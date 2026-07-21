import { Navigate, Outlet, useLocation } from "react-router-dom"

import { useAuth } from "./auth-context"

/**
 * Guarda das rotas do painel (RF-020): sem sessão → redireciona ao login.
 * A verificação real de acesso é do servidor; esta é a primeira barreira de interface.
 */
export function RequireAuth() {
  const { isAuthenticated } = useAuth()
  const location = useLocation()

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace state={{ from: location.pathname }} />
  }

  return <Outlet />
}
