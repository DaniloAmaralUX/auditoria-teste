import * as React from "react"
import { FileText, Lock, Upload } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Eyebrow } from "@/components/ui/eyebrow"
import { Separator } from "@/components/ui/separator"
import { useAuth } from "@/features/auth/auth-context"
import {
  getDocumentsVersion,
  listDocuments,
  replaceDocument,
  subscribeDocuments,
  type AdminDocument,
} from "@/features/admin/documents-store"

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  })
}

function DocumentCard({ doc }: { doc: AdminDocument }) {
  const { user, can } = useAuth()
  const inputRef = React.useRef<HTMLInputElement>(null)
  const canManage = can("manageDocuments")

  const onFileChosen = (files: FileList | null) => {
    const file = files?.[0]
    if (!file) return
    const nextVersion = doc.version + 1
    const ok = replaceDocument(doc.id, file.name, {
      name: user?.name ?? "—",
      role: user?.role ?? "—",
    })
    if (ok) {
      toast.success(
        `${doc.name} atualizado para a versão ${nextVersion}. Substituição simulada — sem upload real.`
      )
    }
    if (inputRef.current) inputRef.current.value = ""
  }

  return (
    <section className="bg-card space-y-4 rounded-xl border p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <span className="bg-muted flex size-10 shrink-0 items-center justify-center rounded-lg border">
            <FileText aria-hidden className="size-5" strokeWidth={1.75} />
          </span>
          <div className="space-y-0.5">
            <h2 className="font-heading text-sm font-semibold">{doc.name}</h2>
            <p className="text-muted-foreground text-sm">{doc.description}</p>
            <p className="text-muted-foreground text-xs">Onde aparece: {doc.publicUse}</p>
          </div>
        </div>
      </div>

      <div className="bg-muted/30 flex flex-col gap-2 rounded-lg border p-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <p className="truncate font-mono text-xs font-medium">{doc.fileName}</p>
          <p className="text-muted-foreground text-xs">
            Versão {doc.version} · publicada em {formatDate(doc.updatedAt)} por {doc.updatedBy}
          </p>
        </div>
        {canManage ? (
          <>
            <input
              ref={inputRef}
              type="file"
              accept="application/pdf"
              className="sr-only"
              aria-label={`Substituir arquivo de ${doc.name}`}
              onChange={(e) => onFileChosen(e.target.files)}
            />
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => inputRef.current?.click()}
            >
              <Upload aria-hidden className="size-4" />
              Substituir arquivo
            </Button>
          </>
        ) : null}
      </div>

      <details>
        <summary className="text-muted-foreground hover:text-foreground cursor-pointer text-xs font-medium">
          Histórico de versões ({doc.history.length})
        </summary>
        <ol className="mt-3 space-y-2">
          {doc.history.map((v) => (
            <li key={v.version} className="text-muted-foreground flex flex-wrap gap-x-2 text-xs">
              <span className="text-foreground font-mono font-medium">v{v.version}</span>
              <span className="font-mono">{v.fileName}</span>
              <span>
                · {formatDate(v.at)} · {v.by}
              </span>
            </li>
          ))}
        </ol>
      </details>
    </section>
  )
}

/**
 * Gestão de documentos institucionais (RF-028) — restrita à administração do
 * canal. A substituição é simulada (mock): registra nome do arquivo, versão e
 * histórico em memória; upload e publicação reais são de outro time.
 */
export function AdminDocumentosPage() {
  const { can } = useAuth()
  // A assinatura re-renderiza a página a cada substituição (leitura direta).
  React.useSyncExternalStore(subscribeDocuments, getDocumentsVersion)
  const docs = listDocuments()

  return (
    <div className="mx-auto w-full max-w-3xl space-y-6">
      <header className="space-y-1">
        <Eyebrow>Painel do Comitê</Eyebrow>
        <h1 className="font-heading text-2xl font-semibold tracking-tight sm:text-3xl">
          Documentos
        </h1>
        <p className="text-muted-foreground text-sm">
          Documentos institucionais exibidos no portal público, com versão e histórico.
        </p>
      </header>

      {!can("manageDocuments") ? (
        <p className="text-muted-foreground flex items-center gap-1.5 text-sm">
          <Lock aria-hidden className="size-4" />
          Seu papel consulta os documentos, mas a substituição é da administração do canal.
        </p>
      ) : null}

      <Separator />

      <div className="space-y-4">
        {docs.map((doc) => (
          <DocumentCard key={doc.id} doc={doc} />
        ))}
      </div>
    </div>
  )
}
