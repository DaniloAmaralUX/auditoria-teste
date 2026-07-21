import { RadioGroupItem } from "@/components/ui/radio-group"
import { cn } from "@/lib/utils"

type RadioCardProps = {
  value: string
  title: string
  description?: string
  className?: string
}

/**
 * Opção de RadioGroup em cartão selecionável via :has() — o rótulo inteiro é
 * clicável; o laranja marca o estado selecionado (estado ativo, uso permitido).
 * Promovido da etapa de identificação (censo em /design/componentes).
 */
export function RadioCard({ value, title, description, className }: RadioCardProps) {
  return (
    <label
      className={cn(
        "border-input hover:bg-muted/40 has-[:checked]:border-primary has-[:checked]:bg-primary/5 has-[:checked]:ring-1 has-[:checked]:ring-primary has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-ring has-[:focus-visible]:ring-offset-2 has-[:focus-visible]:ring-offset-background flex cursor-pointer items-start gap-3 rounded-lg border p-4 transition-colors duration-[var(--motion-fast)] ease-[var(--ease-standard)]",
        className
      )}
    >
      <RadioGroupItem value={value} className="mt-0.5" />
      <span className="space-y-1">
        <span className="block text-sm font-medium">{title}</span>
        {description ? (
          <span className="text-muted-foreground block text-sm">{description}</span>
        ) : null}
      </span>
    </label>
  )
}
