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
        <p className="text-sm font-medium">
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
          className="bg-primary h-full rounded-full transition-[width] duration-200"
          style={{ width: `${pct}%` }}
        />
      </div>

      <ol className="hidden gap-2 sm:flex" aria-hidden>
        {registrationSteps.map((step, index) => {
          const done = index < currentIndex
          const active = index === currentIndex
          return (
            <li key={step.key} className="flex flex-1 items-center gap-2">
              <span
                className={cn(
                  "flex size-6 shrink-0 items-center justify-center rounded-full border text-xs font-medium",
                  done && "bg-primary border-primary text-primary-foreground",
                  active && "border-primary text-primary",
                  !done && !active && "border-border text-muted-foreground"
                )}
              >
                {done ? <Check className="size-3.5" /> : index + 1}
              </span>
              <span
                className={cn(
                  "truncate text-xs",
                  active ? "text-foreground font-medium" : "text-muted-foreground"
                )}
              >
                {step.label}
              </span>
            </li>
          )
        })}
      </ol>
    </div>
  )
}
