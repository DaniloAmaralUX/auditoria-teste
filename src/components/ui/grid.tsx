import * as React from "react"

import { cn } from "@/lib/utils"

/* Réplica do Grid do Geist (vercel.com/geist/grid) sobre os tokens do projeto:
   primitiva de layout hairline para quadros editoriais. */

type Responsive<T> = T | { sm?: T; md?: T; lg?: T }

const BREAKPOINTS = { sm: 640, md: 768, lg: 1024 } as const

/** Detecta valor responsivo por objeto (o oposto de valor primitivo/undefined). */
function isResponsiveObject<T>(v: Responsive<T> | undefined): v is { sm?: T; md?: T; lg?: T } {
  return typeof v === "object" && v !== null && ("sm" in v || "md" in v || "lg" in v)
}

/** Resolve um valor responsivo ({sm,md,lg}) pelo breakpoint ativo. Genérico
 *  para servir tanto às dimensões da grade (números) quanto às posições de célula. */
function useResponsiveValue<T>(value: Responsive<T>, fallback: T): T {
  const subscribe = React.useCallback((notify: () => void) => {
    const queries = Object.values(BREAKPOINTS).map((px) =>
      window.matchMedia(`(min-width: ${px}px)`)
    )
    queries.forEach((q) => q.addEventListener("change", notify))
    return () => queries.forEach((q) => q.removeEventListener("change", notify))
  }, [])

  const snapshot = React.useCallback(() => {
    if (!isResponsiveObject(value)) return value
    const matches = (px: number) => window.matchMedia(`(min-width: ${px}px)`).matches
    const active =
      (matches(BREAKPOINTS.lg) ? value.lg : undefined) ??
      (matches(BREAKPOINTS.md) ? value.md : undefined) ??
      (matches(BREAKPOINTS.sm) ? value.sm : undefined) ??
      value.sm ??
      value.md ??
      value.lg
    return active ?? fallback
  }, [value, fallback])

  return React.useSyncExternalStore(subscribe, snapshot)
}

type GridProps = React.HTMLAttributes<HTMLDivElement> & {
  columns: Responsive<number>
  rows: Responsive<number>
  /** Guias tracejadas (padrão: sólidas). */
  dashedGuides?: boolean
  /** Oculta as guias de uma direção: "row" (horizontais) ou "column" (verticais). */
  hideGuides?: "row" | "column"
}

function Grid({
  columns,
  rows,
  dashedGuides = false,
  hideGuides,
  className,
  children,
  ...props
}: GridProps) {
  const cols = useResponsiveValue(columns, 1)
  const rws = useResponsiveValue(rows, 1)

  const verticals = hideGuides === "column" ? [] : Array.from({ length: cols - 1 }, (_, i) => i + 1)
  const horizontals = hideGuides === "row" ? [] : Array.from({ length: rws - 1 }, (_, i) => i + 1)

  return (
    <div
      data-slot="grid"
      className={cn("bg-background relative grid border", className)}
      style={{
        gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
        gridTemplateRows: `repeat(${rws}, minmax(2.5rem, auto))`,
      }}
      {...props}
    >
      {/* Guias — decorativas (aria-hidden), abaixo das células. */}
      <svg
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 size-full"
        shapeRendering="crispEdges"
      >
        {verticals.map((i) => (
          <line
            key={`v${i}`}
            x1={`${(100 / cols) * i}%`}
            y1="0"
            x2={`${(100 / cols) * i}%`}
            y2="100%"
            stroke="var(--border)"
            strokeWidth="1"
            strokeDasharray={dashedGuides ? "4 4" : undefined}
          />
        ))}
        {horizontals.map((i) => (
          <line
            key={`h${i}`}
            x1="0"
            y1={`${(100 / rws) * i}%`}
            x2="100%"
            y2={`${(100 / rws) * i}%`}
            stroke="var(--border)"
            strokeWidth="1"
            strokeDasharray={dashedGuides ? "4 4" : undefined}
          />
        ))}
      </svg>
      {children}
    </div>
  )
}

type GridCellValue = React.CSSProperties["gridColumn"]
type GridCellProps = React.HTMLAttributes<HTMLDivElement> & {
  /** Valor de grid-column (ex.: 1, "1 / 3", "2 / -1"). Aceita objeto por breakpoint. */
  column?: Responsive<GridCellValue>
  /** Valor de grid-row. Aceita objeto por breakpoint. */
  row?: Responsive<GridCellValue>
  /** Fundo sólido — oculta as guias que passam por baixo. */
  solid?: boolean
}

function GridCell({ column, row, solid = false, className, style, ...props }: GridCellProps) {
  const col = useResponsiveValue<GridCellValue>(column, undefined)
  const rw = useResponsiveValue<GridCellValue>(row, undefined)
  return (
    <div
      data-slot="grid-cell"
      className={cn(
        "relative z-10 flex items-center justify-center p-4 text-sm",
        solid && "bg-background",
        className
      )}
      style={{ gridColumn: col, gridRow: rw, ...style }}
      {...props}
    />
  )
}

export { Grid, GridCell }
