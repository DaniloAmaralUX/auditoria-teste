import * as React from "react"
import { Check, Copy, Download } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import type { SubmissionResult } from "@/features/registration/registration-context"
import { siteConfig } from "@/lib/site-config"

type CopyFieldProps = {
  label: string
  value: string
}

function CopyField({ label, value }: CopyFieldProps) {
  const [copied, setCopied] = React.useState(false)
  const [failed, setFailed] = React.useState(false)
  const timeout = React.useRef<ReturnType<typeof setTimeout> | undefined>(undefined)
  const valueRef = React.useRef<HTMLParagraphElement>(null)

  React.useEffect(() => () => clearTimeout(timeout.current), [])

  const selectValue = () => {
    const el = valueRef.current
    if (!el) return
    const range = document.createRange()
    range.selectNodeContents(el)
    const selection = window.getSelection()
    selection?.removeAllRanges()
    selection?.addRange(range)
  }

  const onCopy = async () => {
    setFailed(false)
    try {
      await navigator.clipboard.writeText(value)
      setCopied(true)
      clearTimeout(timeout.current)
      timeout.current = setTimeout(() => setCopied(false), 1800)
    } catch {
      setCopied(false)
      setFailed(true)
      selectValue()
    }
  }

  return (
    <div className="bg-background rounded-lg border p-4">
      <p className="text-muted-foreground text-xs font-medium tracking-wide uppercase">{label}</p>
      <div className="mt-1 flex items-center justify-between gap-3">
        <p ref={valueRef} className="font-mono text-lg font-semibold break-all tabular-nums">
          {value}
        </p>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={onCopy}
          className="shrink-0"
          aria-label={`Copiar ${label.toLowerCase()}`}
        >
          {/* crossfade dos ícones (ambos no DOM, um absoluto) — sem dependência de motion */}
          <span className="relative inline-flex size-4 items-center justify-center">
            <Check
              aria-hidden
              className={cn(
                "absolute size-4 transition-[opacity,scale,filter] duration-[var(--motion-fast)] ease-[var(--ease-standard)]",
                copied ? "scale-100 opacity-100 blur-0" : "scale-[0.25] opacity-0 blur-[4px]"
              )}
            />
            <Copy
              aria-hidden
              className={cn(
                "size-4 transition-[opacity,scale,filter] duration-[var(--motion-fast)] ease-[var(--ease-standard)]",
                copied ? "scale-[0.25] opacity-0 blur-[4px]" : "scale-100 opacity-100 blur-0"
              )}
            />
          </span>
          {copied ? "Copiado" : "Copiar"}
        </Button>
      </div>
      <span aria-live="polite" className="sr-only">
        {copied ? `${label} copiado.` : ""}
        {failed ? "Não foi possível copiar. Selecionamos o valor para você copiar manualmente." : ""}
      </span>
    </div>
  )
}

function buildReceipt(result: SubmissionResult): string {
  const date = new Date(result.submittedAt).toLocaleString("pt-BR")
  return [
    "Canal de Ética e Ouvidoria Pitang",
    "Comprovante de registro de manifestação",
    "",
    `Protocolo: ${result.protocol}`,
    `Código de acesso: ${result.accessCode}`,
    `Data do registro: ${date}`,
    "",
    "Guarde este comprovante. O protocolo e o código de acesso são necessários",
    "para acompanhar sua manifestação. O código de acesso não pode ser recuperado.",
    "",
    `Acompanhamento: use a página “Acompanhar manifestação”.`,
    `Contato: ${siteConfig.contact.email} · ${siteConfig.contact.phone}`,
  ].join("\n")
}

type ProtocolCardProps = {
  result: SubmissionResult
  className?: string
}

/** Cartão de protocolo e código de acesso (RF-010 / doc 15 — ProtocolCard). */
export function ProtocolCard({ result, className }: ProtocolCardProps) {
  const onDownload = () => {
    const blob = new Blob([buildReceipt(result)], { type: "text/plain;charset=utf-8" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = `comprovante-${result.protocol}.txt`
    document.body.appendChild(link)
    link.click()
    link.remove()
    URL.revokeObjectURL(url)
  }

  return (
    <div className={cn("space-y-3", className)}>
      <CopyField label="Protocolo" value={result.protocol} />
      <CopyField label="Código de acesso" value={result.accessCode} />
      <Button type="button" variant="secondary" onClick={onDownload} className="w-full sm:w-auto">
        <Download aria-hidden className="size-4" />
        Baixar comprovante
      </Button>
    </div>
  )
}
