import { createBrowserRouter, Navigate } from "react-router-dom"

import { PublicShell } from "@/components/public/public-shell"
import { HomePage } from "@/app/public/home-page"
import { LgpdPage } from "@/app/public/lgpd-page"
import { TermosPage } from "@/app/public/termos-page"
import { FaqPage } from "@/app/public/faq-page"
import { NotFoundPage } from "@/app/public/not-found-page"
import { RegistrationLayout } from "@/features/registration/registration-layout"
import { IdentificationStep } from "@/app/public/registration/identification-step"
import { AboutStep } from "@/app/public/registration/about-step"
import { ReportStep } from "@/app/public/registration/report-step"
import { ComplementaryStep } from "@/app/public/registration/complementary-step"
import { ExpectationStep } from "@/app/public/registration/expectation-step"
import { ReviewStep } from "@/app/public/registration/review-step"
import { SuccessStep } from "@/app/public/registration/success-step"
import { TrackingPage } from "@/app/public/tracking/tracking-page"

export const router = createBrowserRouter([
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
          { index: true, element: <Navigate to="/registrar/identificacao" replace /> },
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
