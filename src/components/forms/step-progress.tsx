import { Check } from "lucide-react"

import { cn } from "@/lib/utils"
import { registrationSteps, totalSteps } from "@/features/registration/steps"

type StepProgressProps = {
  currentIndex: number
}

/**
 * Indicador de progresso do formulário (RF-006: "Etapa X de 5").
 * Não depende só de cor — usa texto, número e ícone de concluído (RNF-007).
 */
export function StepProgress({ currentIndex }: StepProgressProps) {
  const current = currentIndex + 1
  const pct = Math.round((current / totalSteps) * 100)

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium tabular-nums">
          Etapa {current} de {totalSteps}
        </p>
        <p className="text-muted-foreground text-sm">{registrationSteps[currentIndex]?.label}</p>
      </div>

      <div
        className="bg-muted h-1.5 w-full overflow-hidden rounded-full"
        role="progressbar"
        aria-valuenow={current}
        aria-valuemin={1}
        aria-valuemax={totalSteps}
        aria-valuetext={`Etapa ${current} de ${totalSteps}: ${registrationSteps[currentIndex]?.title}`}
      >
        <div
          className="bg-primary h-full rounded-full transition-[width] duration-[var(--motion-slow)] ease-[var(--ease-standard)] motion-reduce:transition-none"
          style={{ width: `${pct}%` }}
        />
      </div>

      <ol className="hidden items-center gap-2 sm:flex" aria-hidden>
        {registrationSteps.map((step, index) => {
          const done = index < currentIndex
          const active = index === currentIndex
          const isLast = index === registrationSteps.length - 1
          return (
            <li key={step.key} className={cn("flex items-center gap-2", !isLast && "flex-1")}>
              <span
                className={cn(
                  "flex size-6 shrink-0 items-center justify-center rounded-full border text-xs font-medium tabular-nums transition-colors duration-[var(--motion-fast)]",
                  done && "bg-primary border-primary text-primary-foreground",
                  active && "border-primary text-primary-text",
                  !done && !active && "border-border text-muted-foreground"
                )}
              >
                {done ? (
                  <Check className="motion-safe:animate-in motion-safe:zoom-in-75 motion-safe:fade-in size-3.5 duration-[var(--motion-fast)] ease-[var(--ease-out-strong)]" />
                ) : (
                  index + 1
                )}
              </span>
              <span
                className={cn(
                  "text-xs whitespace-nowrap",
                  active ? "text-foreground font-medium" : "text-muted-foreground"
                )}
              >
                {step.label}
              </span>
              {!isLast ? (
                <span
                  className={cn(
                    "h-px flex-1 rounded-full transition-colors duration-[var(--motion-fast)]",
                    done ? "bg-primary/40" : "bg-border"
                  )}
                />
              ) : null}
            </li>
          )
        })}
      </ol>
    </div>
  )
}
