import * as React from "react"
import { Upload, File as FileIcon, X, AlertCircle, CheckCircle2 } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  uploadConfig,
  acceptAttribute,
  formatBytes,
  validateFile,
} from "@/lib/upload-config"
import type { AttachmentItem } from "@/features/registration/registration-context"

type FileUploadProps = {
  value: AttachmentItem[]
  onChange: React.Dispatch<React.SetStateAction<AttachmentItem[]>>
}

let counter = 0
const nextId = () => `att-${Date.now().toString(36)}-${counter++}`

/**
 * Upload de anexos (RF-009 / doc 15 — FileUpload).
 * Acessível por teclado (não depende de drag-and-drop), valida por arquivo (MIME/extensão/tamanho),
 * informa limites antes do envio; a falha de um arquivo não remove os demais.
 * O envio real e a varredura antimalware dependem do backend (pendência).
 */
export function FileUpload({ value, onChange }: FileUploadProps) {
  const inputRef = React.useRef<HTMLInputElement>(null)
  const [dragOver, setDragOver] = React.useState(false)
  const [globalError, setGlobalError] = React.useState<string | null>(null)

  const totalBytes = value.reduce((sum, a) => sum + a.size, 0)

  const addFiles = (fileList: FileList | null) => {
    if (!fileList || fileList.length === 0) return
    setGlobalError(null)

    const incoming = Array.from(fileList)
    const accepted: AttachmentItem[] = []
    let runningTotal = totalBytes
    let count = value.length

    for (const file of incoming) {
      if (count >= uploadConfig.maxFiles) {
        setGlobalError(`Você pode anexar no máximo ${uploadConfig.maxFiles} arquivos.`)
        break
      }
      const validation = validateFile(file)
      const base = {
        id: nextId(),
        file,
        name: file.name,
        size: file.size,
        mimeType: file.type,
      }
      if (!validation.ok) {
        accepted.push({ ...base, status: "rejected", error: validation.reason })
        continue
      }
      if (runningTotal + file.size > uploadConfig.maxTotalBytes) {
        accepted.push({
          ...base,
          status: "rejected",
          error: `Excede o limite total de ${formatBytes(uploadConfig.maxTotalBytes)}.`,
        })
        continue
      }
      accepted.push({ ...base, status: "valid" })
      runningTotal += file.size
      count += 1
    }

    onChange((prev) => [...prev, ...accepted])
  }

  const removeItem = (id: string) => {
    onChange((prev) => prev.filter((a) => a.id !== id))
    setGlobalError(null)
  }

  const onDrop = (event: React.DragEvent) => {
    event.preventDefault()
    setDragOver(false)
    addFiles(event.dataTransfer.files)
  }

  return (
    <div className="space-y-3">
      <div
        onDragOver={(e) => {
          e.preventDefault()
          setDragOver(true)
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={onDrop}
        className={cn(
          "border-input rounded-lg border border-dashed p-6 text-center transition-colors",
          dragOver && "border-primary bg-primary/5"
        )}
      >
        <Upload aria-hidden className="text-muted-foreground mx-auto size-6" />
        <p className="mt-2 text-sm font-medium">Anexar evidências (opcional)</p>
        <p className="text-muted-foreground mt-1 text-xs">
          Até {uploadConfig.maxFiles} arquivos, {formatBytes(uploadConfig.maxFileSizeBytes)} por
          arquivo, {formatBytes(uploadConfig.maxTotalBytes)} no total.
        </p>
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="mt-3"
          onClick={() => inputRef.current?.click()}
        >
          Escolher arquivos
        </Button>
        <input
          ref={inputRef}
          type="file"
          multiple
          accept={acceptAttribute}
          className="sr-only"
          aria-label="Escolher arquivos para anexar"
          onChange={(e) => {
            addFiles(e.target.files)
            e.target.value = ""
          }}
        />
      </div>

      {globalError ? (
        <p role="alert" className="text-destructive flex items-center gap-2 text-sm">
          <AlertCircle aria-hidden className="size-4" />
          {globalError}
        </p>
      ) : null}

      {value.length > 0 ? (
        <ul className="space-y-2">
          {value.map((item) => {
            const rejected = item.status === "rejected"
            return (
              <li
                key={item.id}
                className={cn(
                  "flex items-center gap-3 rounded-lg border p-3",
                  rejected ? "border-destructive/40 bg-destructive/5" : "border-input"
                )}
              >
                {rejected ? (
                  <AlertCircle aria-hidden className="text-destructive size-5 shrink-0" />
                ) : (
                  <CheckCircle2 aria-hidden className="text-status-completed size-5 shrink-0" />
                )}
                <FileIcon aria-hidden className="text-muted-foreground size-4 shrink-0" />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">{item.name}</p>
                  <p
                    className={cn(
                      "text-xs",
                      rejected ? "text-destructive" : "text-muted-foreground"
                    )}
                  >
                    {rejected ? item.error : formatBytes(item.size)}
                  </p>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="shrink-0"
                  aria-label={`Remover ${item.name}`}
                  onClick={() => removeItem(item.id)}
                >
                  <X aria-hidden className="size-4" />
                </Button>
              </li>
            )
          })}
        </ul>
      ) : null}

      {value.length > 0 ? (
        <p className="text-muted-foreground text-xs">
          {value.filter((a) => a.status === "valid").length} de {uploadConfig.maxFiles} arquivos ·{" "}
          {formatBytes(totalBytes)} de {formatBytes(uploadConfig.maxTotalBytes)}
        </p>
      ) : null}
    </div>
  )
}
