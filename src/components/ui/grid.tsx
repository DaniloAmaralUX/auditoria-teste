import * as React from "react"

import { cn } from "@/lib/utils"

/* Réplica do Grid do Geist (vercel.com/geist/grid) sobre os tokens do projeto.
   Formaliza a assinatura do sistema: esqueleto hairline com crosshairs. */

type Responsive<T> = T | { sm?: T; md?: T; lg?: T }

const BREAKPOINTS = { sm: 640, md: 768, lg: 1024 } as const

/** Resolve um valor responsivo ({sm,md,lg}) pelo breakpoint ativo. */
function useResponsiveValue(value: Responsive<number>, fallback: number): number {
  const subscribe = React.useCallback((notify: () => void) => {
    const queries = Object.values(BREAKPOINTS).map((px) =>
      window.matchMedia(`(min-width: ${px}px)`)
    )
    queries.forEach((q) => q.addEventListener("change", notify))
    return () => queries.forEach((q) => q.removeEventListener("change", notify))
  }, [])

  const snapshot = React.useCallback(() => {
    if (typeof value === "number") return value
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

type GridContextValue = { columns: number; rows: number }
const GridContext = React.createContext<GridContextValue>({ columns: 1, rows: 1 })

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
    <GridContext.Provider value={{ columns: cols, rows: rws }}>
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
    </GridContext.Provider>
  )
}

type GridCellProps = React.HTMLAttributes<HTMLDivElement> & {
  /** Valor de grid-column (ex.: 1, "1 / 3", "2 / -1"). */
  column?: React.CSSProperties["gridColumn"]
  /** Valor de grid-row. */
  row?: React.CSSProperties["gridRow"]
  /** Fundo sólido — oculta as guias que passam por baixo. */
  solid?: boolean
}

function GridCell({ column, row, solid = false, className, style, ...props }: GridCellProps) {
  return (
    <div
      data-slot="grid-cell"
      className={cn(
        "relative z-10 flex items-center justify-center p-4 text-sm",
        solid && "bg-background",
        className
      )}
      style={{ gridColumn: column, gridRow: row, ...style }}
      {...props}
    />
  )
}

type GridCrossProps = React.HTMLAttributes<HTMLDivElement> & {
  /** Coluna do cruzamento (o "+" fica no canto superior esquerdo da célula [column, row]). */
  column: number
  row: number
}

function GridCross({ column, row, className, ...props }: GridCrossProps) {
  const { columns, rows } = React.useContext(GridContext)
  return (
    <div
      aria-hidden
      data-slot="grid-cross"
      className={cn(
        "pointer-events-none absolute z-20 -translate-x-1/2 -translate-y-1/2",
        className
      )}
      style={{
        left: `${(100 / columns) * (column - 1)}%`,
        top: `${(100 / rows) * (row - 1)}%`,
      }}
      {...props}
    >
      <svg
        width="15"
        height="15"
        viewBox="0 0 15 15"
        fill="none"
        shapeRendering="crispEdges"
        className="bg-background"
      >
        <line
          x1="7.5"
          y1="1.5"
          x2="7.5"
          y2="13.5"
          stroke="color-mix(in oklch, var(--foreground) 32%, var(--background))"
          strokeWidth="1"
        />
        <line
          x1="1.5"
          y1="7.5"
          x2="13.5"
          y2="7.5"
          stroke="color-mix(in oklch, var(--foreground) 32%, var(--background))"
          strokeWidth="1"
        />
      </svg>
    </div>
  )
}

export { Grid, GridCell, GridCross }
