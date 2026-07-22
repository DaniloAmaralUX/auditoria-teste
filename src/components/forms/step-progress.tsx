type StepProgressProps = {
  /** Posição atual (1-based) na lista visível de perguntas. */
  current: number
  /** Total de perguntas visíveis (dinâmico — depende das respostas). */
  total: number
  /** Rótulo curto da parada atual. */
  label?: string
}

/**
 * Indicador de progresso do fluxo conversacional ("Pergunta X de Y").
 * O total é dinâmico (caveat GOV.UK de comprimento variável), por isso a
 * barra sem marcadores fixos. Não depende só de cor (RNF-007).
 */
export function StepProgress({ current, total, label }: StepProgressProps) {
  const pct = Math.round((current / total) * 100)

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium tabular-nums">
          Pergunta {current} de {total}
        </p>
        {label ? <p className="text-muted-foreground text-sm">{label}</p> : null}
      </div>

      <div
        className="bg-muted h-1.5 w-full overflow-hidden rounded-full"
        role="progressbar"
        aria-valuenow={current}
        aria-valuemin={1}
        aria-valuemax={total}
        aria-valuetext={`Pergunta ${current} de ${total}${label ? `: ${label}` : ""}`}
      >
        <div
          className="bg-primary h-full rounded-full transition-[width] duration-[var(--motion-slow)] ease-[var(--ease-standard)] motion-reduce:transition-none"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  )
}
