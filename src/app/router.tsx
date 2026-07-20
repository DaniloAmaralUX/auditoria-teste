import { createBrowserRouter } from "react-router-dom"

import { PublicShell } from "@/components/public/public-shell"
import { HomePage } from "@/app/public/home-page"
import { LgpdPage } from "@/app/public/lgpd-page"
import { TermosPage } from "@/app/public/termos-page"
import { FaqPage } from "@/app/public/faq-page"
import { NotFoundPage } from "@/app/public/not-found-page"
import { ComingSoonPage } from "@/app/public/coming-soon-page"

export const router = createBrowserRouter([
  {
    element: <PublicShell />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "lgpd", element: <LgpdPage /> },
      { path: "termos", element: <TermosPage /> },
      { path: "faq", element: <FaqPage /> },
      {
        path: "registrar/*",
        element: (
          <ComingSoonPage
            title="Registrar manifestação"
            description="O formulário em cinco etapas está sendo implementado e ficará disponível em breve."
          />
        ),
      },
      {
        path: "acompanhar/*",
        element: (
          <ComingSoonPage
            title="Acompanhar manifestação"
            description="A consulta por protocolo e código de acesso está sendo implementada e ficará disponível em breve."
          />
        ),
      },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
])
