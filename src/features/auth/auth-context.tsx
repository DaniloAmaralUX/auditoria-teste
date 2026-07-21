/* eslint-disable react-refresh/only-export-components */
import * as React from "react"

import { mockUsers, type AdminUser, type Permission, can } from "./users"

/**
 * Autenticação MOCK do painel (RF-020). Simula o SSO corporativo (Microsoft) sem backend.
 * A sessão do painel (não conteúdo sensível) é guardada em sessionStorage e expira ao fechar a aba.
 *
 * Pendências de backend/infra: SSO real, sessão segura httpOnly, revalidação server-side,
 * expiração/refresh de sessão, e RBAC aplicado no servidor (a UI é apenas a primeira barreira).
 */

const STORAGE_KEY = "pitang-admin-session"

type AuthContextValue = {
  user: AdminUser | null
  isAuthenticated: boolean
  login: (userId: string) => void
  logout: () => void
  can: (permission: Permission) => boolean
}

const AuthContext = React.createContext<AuthContextValue | undefined>(undefined)

function readStoredUser(): AdminUser | null {
  try {
    const id = sessionStorage.getItem(STORAGE_KEY)
    if (!id) return null
    return mockUsers.find((u) => u.id === id) ?? null
  } catch {
    return null
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = React.useState<AdminUser | null>(() => readStoredUser())

  const login = React.useCallback((userId: string) => {
    const next = mockUsers.find((u) => u.id === userId) ?? null
    setUser(next)
    try {
      if (next) sessionStorage.setItem(STORAGE_KEY, next.id)
    } catch {
      // ignore storage failures (modo privado etc.)
    }
  }, [])

  const logout = React.useCallback(() => {
    setUser(null)
    try {
      sessionStorage.removeItem(STORAGE_KEY)
    } catch {
      // ignore
    }
  }, [])

  const value = React.useMemo<AuthContextValue>(
    () => ({
      user,
      isAuthenticated: user !== null,
      login,
      logout,
      can: (permission: Permission) => (user ? can(user.role, permission) : false),
    }),
    [user, login, logout]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth(): AuthContextValue {
  const context = React.useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth deve ser usado dentro de AuthProvider")
  }
  return context
}
