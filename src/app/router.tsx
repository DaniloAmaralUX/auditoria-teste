import { Suspense } from "react"
import { createBrowserRouter, Navigate, type RouteObject } from "react-router-dom"

import {
  DesignLayout,
  DesignIntroPage,
  DesignColorsPage,
  DesignTypographyPage,
  DesignMaterialsPage,
  DesignGridPage,
  DesignBrandPage,
  DesignContentPage,
  DesignMotionPage,
  DesignComponentsPage,
} from "@/app/design/lazy-pages"
import { PublicShell } from "@/components/public/public-shell"
import { HomePage } from "@/app/public/home-page"
import { LgpdPage } from "@/app/public/lgpd-page"
import { TermosPage } from "@/app/public/termos-page"
import { FaqPage } from "@/app/public/faq-page"
import { NotFoundPage } from "@/app/public/not-found-page"
import { RegistrationLayout } from "@/features/registration/registration-layout"
import { StartPage } from "@/app/public/registration/start-page"
import { IdentificacaoStep } from "@/app/public/registration/identificacao-step"
import { SobreStep } from "@/app/public/registration/sobre-step"
import { RelatoStep } from "@/app/public/registration/relato-step"
import { ComplementaresStep } from "@/app/public/registration/complementares-step"
import { ExpectativaStep } from "@/app/public/registration/expectativa-step"
import { ReviewStep } from "@/app/public/registration/review-step"
import { SuccessStep } from "@/app/public/registration/success-step"
import { TrackingPage } from "@/app/public/tracking/tracking-page"
import { AdminRoot } from "@/features/auth/admin-root"
import { RequireAuth } from "@/features/auth/require-auth"
import { AdminShell } from "@/components/admin/admin-shell"
import { LoginPage as AdminLoginPage } from "@/app/admin/login-page"
import { AdminDashboardPage } from "@/app/admin/dashboard-page"
import { AdminManifestacoesPage } from "@/app/admin/manifestacoes-page"
import { AdminManifestationDetailPage } from "@/app/admin/manifestation-detail-page"
import { AdminDocumentosPage } from "@/app/admin/documentos-page"

/**
 * Superfície do build (deploys separados por link):
 * - "portal": só o portal público + guia /design (sem NENHUM código do painel);
 * - "admin": só o painel do Comitê (/ redireciona para /admin);
 * - ausente (dev local): tudo junto.
 * O valor é substituído estaticamente no build (import.meta.env), então o
 * bundler elimina as rotas — e os imports — da superfície excluída.
 */
const SURFACE: string = import.meta.env.VITE_APP_SURFACE ?? "all"

const designRoutes: RouteObject = {
  path: "design",
  element: (
    <Suspense fallback={null}>
      <DesignLayout />
    </Suspense>
  ),
  children: [
    { index: true, element: <DesignIntroPage /> },
    { path: "cores", element: <DesignColorsPage /> },
    { path: "tipografia", element: <DesignTypographyPage /> },
    { path: "materiais", element: <DesignMaterialsPage /> },
    { path: "grid", element: <DesignGridPage /> },
    { path: "marca", element: <DesignBrandPage /> },
    { path: "conteudo", element: <DesignContentPage /> },
    { path: "motion", element: <DesignMotionPage /> },
    { path: "componentes", element: <DesignComponentsPage /> },
  ],
}

const adminRoutes: RouteObject = {
  path: "admin",
  element: <AdminRoot />,
  children: [
    { path: "login", element: <AdminLoginPage /> },
    {
      element: <RequireAuth />,
      children: [
        {
          element: <AdminShell />,
          children: [
            { index: true, element: <AdminDashboardPage /> },
            { path: "dashboard", element: <AdminDashboardPage /> },
            { path: "manifestacoes", element: <AdminManifestacoesPage /> },
            { path: "manifestacoes/:protocol", element: <AdminManifestationDetailPage /> },
            { path: "documentos", element: <AdminDocumentosPage /> },
          ],
        },
      ],
    },
  ],
}

const publicRoutes: RouteObject = {
  element: <PublicShell />,
  children: [
    { index: true, element: <HomePage /> },
    { path: "lgpd", element: <LgpdPage /> },
    { path: "termos", element: <TermosPage /> },
    { path: "faq", element: <FaqPage /> },
    {
      path: "registrar",
      element: <RegistrationLayout />,
      children: [
        { index: true, element: <StartPage /> },
        { path: "identificacao", element: <IdentificacaoStep /> },
        { path: "sobre-a-manifestacao", element: <SobreStep /> },
        { path: "relato", element: <RelatoStep /> },
        { path: "complementares", element: <ComplementaresStep /> },
        { path: "expectativa", element: <ExpectativaStep /> },
        { path: "revisao", element: <ReviewStep /> },
        { path: "sucesso", element: <SuccessStep /> },
      ],
    },
    { path: "acompanhar", element: <TrackingPage /> },
    { path: "*", element: <NotFoundPage /> },
  ],
}

/** No deploy do sistema, qualquer rota fora de /admin volta para o painel. */
const adminFallbackRoutes: RouteObject[] = [
  { path: "/", element: <Navigate to="/admin" replace /> },
  { path: "*", element: <Navigate to="/admin" replace /> },
]

export const router = createBrowserRouter([
  ...(SURFACE !== "admin" ? [designRoutes] : []),
  ...(SURFACE !== "portal" ? [adminRoutes] : []),
  ...(SURFACE !== "admin" ? [publicRoutes] : adminFallbackRoutes),
])
