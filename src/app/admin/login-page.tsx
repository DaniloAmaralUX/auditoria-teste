import * as React from "react"
import { Navigate, useNavigate } from "react-router-dom"
import { ShieldCheck, Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { useAuth } from "@/features/auth/auth-context"
import { mockUsers, roleLabels } from "@/features/auth/users"

/** Logotipo da Microsoft (4 quadrados) — usado apenas no botão de SSO simulado. */
function MicrosoftLogo() {
  return (
    <svg aria-hidden viewBox="0 0 21 21" className="size-4">
      <rect x="1" y="1" width="9" height="9" fill="#F25022" />
      <rect x="11" y="1" width="9" height="9" fill="#7FBA00" />
      <rect x="1" y="11" width="9" height="9" fill="#00A4EF" />
      <rect x="11" y="11" width="9" height="9" fill="#FFB900" />
    </svg>
  )
}

type Phase = "idle" | "redirecting" | "choosing"

/** Login do painel (RF-020) — SSO Microsoft SIMULADO, sem backend. */
export function LoginPage() {
  const { isAuthenticated, login } = useAuth()
  const navigate = useNavigate()
  const [phase, setPhase] = React.useState<Phase>("idle")
  const timer = React.useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

  React.useEffect(() => () => clearTimeout(timer.current), [])

  if (isAuthenticated) {
    return <Navigate to="/admin/dashboard" replace />
  }

  const startSignIn = () => {
    setPhase("redirecting")
    timer.current = setTimeout(() => setPhase("choosing"), 900)
  }

  const chooseAccount = (userId: string) => {
    login(userId)
    navigate("/admin/dashboard", { replace: true })
  }

  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      {/* Painel institucional dark (sempre escuro, via classe `dark` — usa tokens) */}
      <aside className="dark bg-background text-foreground relative hidden flex-col justify-between border-r p-10 lg:flex">
        <div className="flex items-center gap-2.5">
          <ShieldCheck aria-hidden className="text-primary size-6" />
          <div className="leading-tight">
            <p className="font-heading text-sm">Canal de Ética e Ouvidoria</p>
            <p className="text-muted-foreground text-xs">Painel do Comitê de Ética</p>
          </div>
        </div>
        <blockquote className="max-w-md space-y-4">
          <p className="font-heading text-2xl leading-snug text-balance">
            “Toda manifestação é tratada com sigilo, imparcialidade e sem retaliação a quem se
            manifesta de boa-fé.”
          </p>
          <footer className="text-muted-foreground text-sm">
            Compromisso do Comitê de Ética · Pitang
          </footer>
        </blockquote>
        <p className="text-muted-foreground text-xs">
          Acesso restrito aos membros autorizados do Comitê.
        </p>
      </aside>

      {/* Formulário */}
      <div className="flex items-center justify-center px-6 py-12 sm:px-10">
        <div className="w-full max-w-sm">
          <div className="mb-8 flex items-center gap-2.5 lg:hidden">
            <ShieldCheck aria-hidden className="text-primary size-6" />
            <div className="leading-tight">
              <p className="font-heading text-sm">Canal de Ética e Ouvidoria</p>
              <p className="text-muted-foreground text-xs">Painel do Comitê de Ética</p>
            </div>
          </div>

          <h1 className="font-heading text-2xl sm:text-3xl">Acesso restrito</h1>
          <p className="text-muted-foreground mt-2 text-sm">
            Entre com sua conta corporativa para acessar o painel.
          </p>

          {phase !== "choosing" ? (
            <Button
              type="button"
              variant="outline"
              className="mt-8 w-full"
              onClick={startSignIn}
              disabled={phase === "redirecting"}
            >
              {phase === "redirecting" ? (
                <Loader2 aria-hidden className="size-4 animate-spin" />
              ) : (
                <MicrosoftLogo />
              )}
              {phase === "redirecting" ? "Conectando…" : "Entrar com Microsoft"}
            </Button>
          ) : (
            <div className="mt-8">
              <p className="text-sm">Escolha uma conta</p>
              <p className="text-muted-foreground text-xs">Contas de demonstração</p>
              <ul className="mt-3 space-y-2">
                {mockUsers.map((user) => (
                  <li key={user.id}>
                    <button
                      type="button"
                      onClick={() => chooseAccount(user.id)}
                      className="hover:bg-muted focus-visible:ring-ring flex w-full items-center gap-3 rounded-lg border p-3 text-left outline-none transition-colors focus-visible:ring-2"
                    >
                      <span className="bg-primary/10 text-primary-text flex size-9 shrink-0 items-center justify-center rounded-full text-sm">
                        {user.initials}
                      </span>
                      <span className="min-w-0">
                        <span className="block truncate text-sm">{user.name}</span>
                        <span className="text-muted-foreground block truncate text-xs">
                          {user.email} · {roleLabels[user.role]}
                        </span>
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <Separator className="my-6" />
          <p className="text-muted-foreground text-xs leading-relaxed">
            <strong className="text-foreground">Ambiente de demonstração.</strong> Este login com
            Microsoft é simulado e não realiza autenticação real. Em produção, o acesso usará o SSO
            corporativo da Pitang com sessão segura.
          </p>
        </div>
      </div>
    </div>
  )
}
