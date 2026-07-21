import { cn } from "@/lib/utils"

type MotionCollapseProps = {
  open: boolean
  children: React.ReactNode
  className?: string
}

/**
 * Colapso animado para campos condicionais (doc 16 §5.2 / §21 — ConditionalField).
 * Técnica grid-template-rows: o conteúdo permanece montado (react-hook-form preserva o valor),
 * anima altura+opacidade em 180ms e vira `inert` quando fechado (sem foco por teclado).
 * Reduced motion é coberto pela media query global (durações → ~0).
 */
export function MotionCollapse({ open, children, className }: MotionCollapseProps) {
  return (
    <div
      className={cn(
        "grid transition-[grid-template-rows,opacity] duration-[var(--motion-base)] ease-[var(--ease-enter)]",
        open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
        className
      )}
      aria-hidden={!open}
      inert={!open}
    >
      <div className="overflow-hidden">
        {/* padding interno evita clipe do focus ring durante a transição */}
        <div className="p-0.5 -m-0.5">{children}</div>
      </div>
    </div>
  )
}
