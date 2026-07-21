import { Link } from "react-router-dom"
import { Pencil } from "lucide-react"

type ReviewRow = {
  label: string
  value: React.ReactNode
}

type ReviewSectionProps = {
  title: string
  /** Rota da etapa correspondente, para editar por seção (RF-013). */
  editHref: string
  rows: ReviewRow[]
}

/** Bloco de revisão editável (doc 15 — ReviewSection). */
export function ReviewSection({ title, editHref, rows }: ReviewSectionProps) {
  return (
    <section className="bg-card rounded-lg border p-4 sm:p-6">
      <div className="flex items-center justify-between gap-3">
        <h2 className="font-heading text-base font-semibold">{title}</h2>
        <Link
          to={editHref}
          className="text-primary-text hover:bg-muted/60 -m-2 inline-flex items-center gap-1.5 rounded-md p-2 text-sm transition-colors duration-[var(--motion-fast)] outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <Pencil aria-hidden className="size-3.5" />
          Editar
        </Link>
      </div>
      <dl className="mt-3 grid gap-x-6 gap-y-2 sm:grid-cols-[minmax(0,12rem)_1fr]">
        {rows.map((row, i) => (
          <div key={i} className="grid grid-cols-1 gap-0.5 sm:col-span-2 sm:grid-cols-subgrid">
            <dt className="text-muted-foreground text-sm">{row.label}</dt>
            <dd className="text-sm break-words whitespace-pre-wrap">{row.value || "—"}</dd>
          </div>
        ))}
      </dl>
    </section>
  )
}
