import { Suspense, lazy } from "react"
import { createBrowserRouter } from "react-router-dom"

import { PublicShell } from "@/components/public/public-shell"
import { HomePage } from "@/app/public/home-page"
import { LgpdPage } from "@/app/public/lgpd-page"
import { TermosPage } from "@/app/public/termos-page"
import { FaqPage } from "@/app/public/faq-page"
import { NotFoundPage } from "@/app/public/not-found-page"
import { RegistrationLayout } from "@/features/registration/registration-layout"
import { StartPage } from "@/app/public/registration/start-page"
import { IdentificationStep } from "@/app/public/registration/identification-step"
import { AboutStep } from "@/app/public/registration/about-step"
import { ReportStep } from "@/app/public/registration/report-step"
import { ComplementaryStep } from "@/app/public/registration/complementary-step"
import { ExpectationStep } from "@/app/public/registration/expectation-step"
import { ReviewStep } from "@/app/public/registration/review-step"
import { SuccessStep } from "@/app/public/registration/success-step"
import { TrackingPage } from "@/app/public/tracking/tracking-page"

/* Guia de design (branch direcao-visual) — lazy para não pesar no portal. */
const DesignLayout = lazy(() => import("@/app/design/design-layout"))
const DesignIntroPage = lazy(() => import("@/app/design/intro-page"))
const DesignColorsPage = lazy(() => import("@/app/design/colors-page"))
const DesignTypographyPage = lazy(() => import("@/app/design/typography-page"))
const DesignMaterialsPage = lazy(() => import("@/app/design/materials-page"))
const DesignGridPage = lazy(() => import("@/app/design/grid-page"))
const DesignBrandPage = lazy(() => import("@/app/design/brand-page"))
const DesignContentPage = lazy(() => import("@/app/design/content-page"))
const DesignMotionPage = lazy(() => import("@/app/design/motion-page"))
const DesignComponentsPage = lazy(() => import("@/app/design/components-page"))

export const router = createBrowserRouter([
  {
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
  },
  {
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
          { path: "identificacao", element: <IdentificationStep /> },
          { path: "sobre-a-manifestacao", element: <AboutStep /> },
          { path: "relato", element: <ReportStep /> },
          { path: "complementares", element: <ComplementaryStep /> },
          { path: "expectativa", element: <ExpectationStep /> },
          { path: "revisao", element: <ReviewStep /> },
          { path: "sucesso", element: <SuccessStep /> },
        ],
      },
      { path: "acompanhar", element: <TrackingPage /> },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
])
