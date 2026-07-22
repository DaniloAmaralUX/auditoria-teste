import { lazy } from "react"

/* Guia de design (branch direcao-visual) — lazy para não pesar no portal. */
export const DesignLayout = lazy(() => import("@/app/design/design-layout"))
export const DesignIntroPage = lazy(() => import("@/app/design/intro-page"))
export const DesignColorsPage = lazy(() => import("@/app/design/colors-page"))
export const DesignTypographyPage = lazy(
  () => import("@/app/design/typography-page"),
)
export const DesignMaterialsPage = lazy(
  () => import("@/app/design/materials-page"),
)
export const DesignGridPage = lazy(() => import("@/app/design/grid-page"))
export const DesignBrandPage = lazy(() => import("@/app/design/brand-page"))
export const DesignContentPage = lazy(() => import("@/app/design/content-page"))
export const DesignMotionPage = lazy(() => import("@/app/design/motion-page"))
export const DesignComponentsPage = lazy(
  () => import("@/app/design/components-page"),
)
