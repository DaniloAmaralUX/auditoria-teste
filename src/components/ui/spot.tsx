import * as React from "react"

import { cn } from "@/lib/utils"

/**
 * Spot illustrations — "blueprint hairline".
 *
 * Estendem a assinatura do sistema (o esqueleto hairline com crosshairs, ver
 * /design/materiais) para a ilustração: cada spot é um diagrama de registro de
 * engenharia — painel com dot-grid recortado por borda, uma marca de registro
 * "+" no canto, e o assunto desenhado em contorno de 1,5px. Monocromáticos
 * (herdam currentColor); o laranja só aparece onde marca um estado ativo.
 *
 * Uso pelo filtro de motion: momentos raros / primeira vez (404, sucesso do
 * protocolo, estado inicial do acompanhamento) — nunca decoração repetida.
 * Estáticos por design: a personalidade está na existência do diagrama, não
 * em animá-lo.
 */
type SpotName = "empty" | "sealed" | "track"

type SpotProps = React.SVGProps<SVGSVGElement> & {
  name: SpotName
  /** Rótulo acessível; omita (padrão) para tratar como decorativo. */
  label?: string
}

const GRAPHITE = "color-mix(in oklch, var(--foreground) 30%, var(--background))"

export function Spot({ name, label, className, ...props }: SpotProps) {
  const dotId = React.useId()

  return (
    <svg
      viewBox="0 0 200 150"
      role={label ? "img" : undefined}
      aria-label={label ?? undefined}
      aria-hidden={label ? undefined : true}
      className={cn("text-foreground/65 h-auto w-full", className)}
      fill="none"
      {...props}
    >
      <defs>
        <pattern id={dotId} width="10" height="10" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="0.75" fill="var(--border)" />
        </pattern>
      </defs>

      {/* Painel com dot-grid recortado por borda (regra de material) */}
      <rect x="16" y="14" width="168" height="122" rx="10" fill={`url(#${dotId})`} />
      <rect
        x="16"
        y="14"
        width="168"
        height="122"
        rx="10"
        stroke="var(--border)"
        strokeWidth="1"
      />

      {/* Marca de registro "+" no canto superior esquerdo (echo de .corner-marks) */}
      <g stroke={GRAPHITE} strokeWidth="1">
        <line x1="10" y1="14" x2="22" y2="14" />
        <line x1="16" y1="8" x2="16" y2="20" />
      </g>

      <g
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {name === "empty" ? <EmptySpot /> : null}
        {name === "sealed" ? <SealedSpot /> : null}
        {name === "track" ? <TrackSpot /> : null}
      </g>
    </svg>
  )
}

/** 404 / nada encontrado: retículo de mira com o centro vazio. */
function EmptySpot() {
  return (
    <>
      <circle cx="100" cy="75" r="30" />
      <circle cx="100" cy="75" r="17" stroke="var(--border)" />
      {/* ticks cardeais do retículo */}
      <line x1="100" y1="37" x2="100" y2="45" />
      <line x1="100" y1="105" x2="100" y2="113" />
      <line x1="62" y1="75" x2="70" y2="75" />
      <line x1="130" y1="75" x2="138" y2="75" />
      {/* o item procurado, fora do alvo */}
      <circle cx="150" cy="120" r="3" stroke="var(--border)" />
    </>
  )
}

/** Sucesso do protocolo: documento com selo de registro. */
function SealedSpot() {
  return (
    <>
      <rect x="64" y="38" width="60" height="74" rx="6" />
      {/* linhas de conteúdo (construção) */}
      <g stroke="var(--border)">
        <line x1="74" y1="54" x2="114" y2="54" />
        <line x1="74" y1="64" x2="114" y2="64" />
        <line x1="74" y1="74" x2="102" y2="74" />
      </g>
      {/* selo sobreposto ao canto */}
      <circle cx="128" cy="96" r="18" fill="var(--background)" />
      <circle cx="128" cy="96" r="18" />
      <circle cx="128" cy="96" r="11" stroke="var(--border)" />
      <path d="M122 96l4 4 8-9" />
    </>
  )
}

/** Acompanhamento: linha do tempo com lupa; o nó atual em laranja (estado ativo). */
function TrackSpot() {
  return (
    <>
      <line x1="72" y1="46" x2="72" y2="114" stroke="var(--border)" />
      {/* nó concluído */}
      <circle cx="72" cy="52" r="4" />
      <line x1="82" y1="52" x2="104" y2="52" stroke="var(--border)" />
      {/* nó atual (estado ativo → laranja) */}
      <circle cx="72" cy="80" r="5" fill="var(--primary)" stroke="var(--primary)" />
      <line x1="82" y1="80" x2="100" y2="80" stroke="var(--border)" />
      {/* nó pendente */}
      <circle cx="72" cy="108" r="4" stroke="var(--border)" />
      <line x1="82" y1="108" x2="98" y2="108" stroke="var(--border)" />
      {/* lupa sobre o nó atual */}
      <circle cx="126" cy="78" r="16" fill="var(--background)" />
      <circle cx="126" cy="78" r="16" />
      <line x1="138" y1="90" x2="150" y2="102" />
    </>
  )
}
