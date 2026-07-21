import type { FieldErrors, FieldValues } from "react-hook-form"

/** Converte os erros do React Hook Form em itens para o ErrorSummary, na ordem dos campos. */
export function toErrorItems<T extends FieldValues>(
  errors: FieldErrors<T>,
  order: (keyof T)[]
): { fieldId: string; message: string }[] {
  return order
    .filter((name) => errors[name])
    .map((name) => ({
      fieldId: String(name),
      message: String(errors[name]?.message ?? "Campo inválido."),
    }))
}
