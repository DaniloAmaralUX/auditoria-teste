/* eslint-disable react-refresh/only-export-components */
import * as React from "react"

import type {
  RelatoValues,
  QuandoOndeValues,
  PessoasValues,
  MaisValues,
  ModoValues,
  DadosValues,
  RelacaoValues,
  ContatoValues,
} from "@/schemas/registration"

/**
 * Estado do registro mantido EM MEMÓRIA durante a sessão de preenchimento.
 * Decisão (ADR): não persistimos o conteúdo do relato em storage do navegador
 * para preservar o anonimato técnico em máquinas compartilhadas (RNF-002).
 * A perda acidental é prevenida por um aviso de saída (beforeunload) enquanto
 * houver dados não enviados (RF-006 "não apaga silenciosamente").
 */

export type AttachmentStatus = "valid" | "rejected"

export type AttachmentItem = {
  id: string
  file: File
  name: string
  size: number
  mimeType: string
  status: AttachmentStatus
  error?: string
}

export type RegistrationData = {
  relato?: RelatoValues
  quandoOnde?: QuandoOndeValues
  pessoas?: PessoasValues
  mais?: MaisValues
  modo?: ModoValues
  dados?: DadosValues
  relacao?: RelacaoValues
  contato?: ContatoValues
}

export type SubmissionResult = {
  protocol: string
  accessCode: string
  submittedAt: string
}

type RegistrationContextValue = {
  data: RegistrationData
  attachments: AttachmentItem[]
  isDirty: boolean
  result: SubmissionResult | null
  updateStep: <K extends keyof RegistrationData>(key: K, values: RegistrationData[K]) => void
  setAttachments: React.Dispatch<React.SetStateAction<AttachmentItem[]>>
  setResult: (result: SubmissionResult) => void
  reset: () => void
}

const RegistrationContext = React.createContext<RegistrationContextValue | undefined>(undefined)

export function RegistrationProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = React.useState<RegistrationData>({})
  const [attachments, setAttachments] = React.useState<AttachmentItem[]>([])
  const [result, setResultState] = React.useState<SubmissionResult | null>(null)

  const updateStep = React.useCallback(
    <K extends keyof RegistrationData>(key: K, values: RegistrationData[K]) => {
      setData((prev) => ({ ...prev, [key]: values }))
    },
    []
  )

  const setResult = React.useCallback((next: SubmissionResult) => setResultState(next), [])

  const reset = React.useCallback(() => {
    setData({})
    setAttachments([])
    setResultState(null)
  }, [])

  const isDirty =
    !result && (Object.keys(data).length > 0 || attachments.length > 0)

  const value = React.useMemo<RegistrationContextValue>(
    () => ({ data, attachments, isDirty, result, updateStep, setAttachments, setResult, reset }),
    [data, attachments, isDirty, result, updateStep, setResult, reset]
  )

  return <RegistrationContext.Provider value={value}>{children}</RegistrationContext.Provider>
}

export function useRegistration(): RegistrationContextValue {
  const context = React.useContext(RegistrationContext)
  if (context === undefined) {
    throw new Error("useRegistration deve ser usado dentro de RegistrationProvider")
  }
  return context
}
