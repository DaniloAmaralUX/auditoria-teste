import { Suspense } from "react"
import { createBrowserRouter } from "react-router-dom"

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
import { RelatoStep } from "@/app/public/registration/relato-step"
import { QuandoOndeStep } from "@/app/public/registration/quando-onde-step"
import { PessoasStep } from "@/app/public/registration/pessoas-step"
import { MaisStep } from "@/app/public/registration/mais-step"
import { ModoStep } from "@/app/public/registration/modo-step"
import { DadosStep } from "@/app/public/registration/dados-step"
import { RelacaoStep } from "@/app/public/registration/relacao-step"
import { ContatoStep } from "@/app/public/registration/contato-step"
import { ReviewStep } from "@/app/public/registration/review-step"
import { SuccessStep } from "@/app/public/registration/success-step"
import { TrackingPage } from "@/app/public/tracking/tracking-page"

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
          { path: "relato", element: <RelatoStep /> },
          { path: "quando-onde", element: <QuandoOndeStep /> },
          { path: "pessoas", element: <PessoasStep /> },
          { path: "mais", element: <MaisStep /> },
          { path: "modo", element: <ModoStep /> },
          { path: "dados", element: <DadosStep /> },
          { path: "relacao", element: <RelacaoStep /> },
          { path: "contato", element: <ContatoStep /> },
          { path: "revisao", element: <ReviewStep /> },
          { path: "sucesso", element: <SuccessStep /> },
        ],
      },
      { path: "acompanhar", element: <TrackingPage /> },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
])
