/**
 * Configuração de anexos (RF-009). Defaults do PRD, sujeitos à validação de Segurança/DPO.
 * Centralizado para virar configuração de painel sem espalhar no código.
 * A verificação antimalware e o upload em si dependem do backend (marcados como pendência).
 */

const MiB = 1024 * 1024

export const uploadConfig = {
  maxFiles: 5,
  maxFileSizeBytes: 25 * MiB,
  maxTotalBytes: 100 * MiB,
  /** Extensão (minúscula, sem ponto) → rótulo amigável. */
  acceptedExtensions: [
    "pdf",
    "doc",
    "docx",
    "xls",
    "xlsx",
    "jpg",
    "jpeg",
    "png",
    "webp",
    "mp3",
    "m4a",
    "wav",
    "mp4",
    "mov",
  ],
  acceptedMimeTypes: [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "application/vnd.ms-excel",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    "image/jpeg",
    "image/png",
    "image/webp",
    "audio/mpeg",
    "audio/mp4",
    "audio/x-m4a",
    "audio/wav",
    "audio/x-wav",
    "video/mp4",
    "video/quicktime",
  ],
} as const

/** Valor do atributo accept do input. */
export const acceptAttribute = [
  ...uploadConfig.acceptedExtensions.map((e) => `.${e}`),
  ...uploadConfig.acceptedMimeTypes,
].join(",")

export function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < MiB) return `${(bytes / 1024).toFixed(0)} KB`
  return `${(bytes / MiB).toFixed(1)} MB`
}

function extensionOf(name: string): string {
  const parts = name.toLowerCase().split(".")
  return parts.length > 1 ? parts[parts.length - 1] : ""
}

export type FileValidation = { ok: true } | { ok: false; reason: string }

/** Valida um arquivo isolado por extensão, MIME e tamanho (RF-009). */
export function validateFile(file: File): FileValidation {
  const ext = extensionOf(file.name)
  const extOk = (uploadConfig.acceptedExtensions as readonly string[]).includes(ext)
  // Alguns navegadores não informam o MIME; nesse caso confiamos na extensão.
  const mimeOk =
    !file.type || (uploadConfig.acceptedMimeTypes as readonly string[]).includes(file.type)

  if (!extOk || !mimeOk) {
    return { ok: false, reason: "Formato não permitido." }
  }
  if (file.size > uploadConfig.maxFileSizeBytes) {
    return {
      ok: false,
      reason: `Excede o limite de ${formatBytes(uploadConfig.maxFileSizeBytes)} por arquivo.`,
    }
  }
  return { ok: true }
}
