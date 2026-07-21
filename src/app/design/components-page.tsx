import { Lock, ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { StatusBadge } from "@/components/public/status-badge"
import { TrustNotice } from "@/components/feedback/trust-notice"
import { statusConfig, type ManifestationStatus } from "@/lib/manifestation-status"
import { PageHeader, GuideSection, DemoPanel } from "./design-ui"

const statuses = Object.keys(statusConfig) as ManifestationStatus[]

export default function ComponentsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Componentes"
        title="Componentes"
        lede="Os primitivos do portal renderizados ao vivo, já calibrados pela direção: cantos de 8px, borda 1px, laranja apenas onde há ação ou estado."
      />

      <GuideSection title="Botões" description="rounded-lg, press scale no pointer-down. O primário é o único elemento laranja da tela.">
        <DemoPanel className="flex flex-wrap items-center gap-3">
          <Button>
            Registrar manifestação
            <ArrowRight aria-hidden className="size-4" />
          </Button>
          <Button variant="outline">Acompanhar</Button>
          <Button variant="secondary">Secundário</Button>
          <Button variant="ghost">Cancelar</Button>
          <Button variant="destructive">Excluir anexo</Button>
          <Button variant="link">Link de texto</Button>
        </DemoPanel>
      </GuideSection>

      <GuideSection title="Formulário">
        <DemoPanel className="max-w-md space-y-4">
          <div className="space-y-2">
            <Label htmlFor="demo-protocol">Número do protocolo</Label>
            <Input id="demo-protocol" placeholder="OUV-2026-000000" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="demo-report">Relato</Label>
            <Textarea
              id="demo-report"
              placeholder="Descreva a situação com o máximo de detalhes que se sentir confortável."
            />
          </div>
          <Button className="w-full">Consultar</Button>
        </DemoPanel>
      </GuideSection>

      <GuideSection title="Card" description="Borda 1px, radius xl, hover pela borda. Tile de ícone neutro — o laranja não decora.">
        <Card className="hover:border-foreground/20 max-w-sm transition-colors duration-[var(--motion-fast)]">
          <CardHeader>
            <div className="bg-muted flex size-10 items-center justify-center rounded-lg border">
              <Lock aria-hidden className="size-5" strokeWidth={1.75} />
            </div>
            <CardTitle className="mt-1">Sigilo</CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground text-sm leading-relaxed">
            O conteúdo da manifestação é acessado somente pelo Comitê de Ética, sob
            dever de confidencialidade.
          </CardContent>
        </Card>
      </GuideSection>

      <GuideSection
        title="Status"
        description="Pills mantidos (convenção de badge). Cor + rótulo, nunca cor sozinha (RNF-007)."
      >
        <DemoPanel className="flex flex-wrap gap-2">
          {statuses.map((s) => (
            <StatusBadge key={s} status={s} />
          ))}
          <StatusBadge status="recebida" flag="aguardando_informacoes" />
        </DemoPanel>
      </GuideSection>

      <GuideSection
        title="Progresso"
        description="Barra do fluxo de registro — laranja como estado de avanço (uso funcional)."
      >
        <DemoPanel>
          <Progress value={60} aria-label="Etapa 3 de 5" />
        </DemoPanel>
      </GuideSection>

      <GuideSection
        title="Trust notice"
        description="O aviso de confiança — presente no hero e no fluxo de registro. Acento pela régua esquerda + ícone."
      >
        <div className="space-y-3">
          <TrustNotice variant="anonymity" title="Sigilo e possibilidade de anonimato">
            Você pode registrar a manifestação sem informar seu nome. O e-mail será
            usado somente para confirmação e devolutivas do Comitê de Ética.
          </TrustNotice>
          <TrustNotice variant="info" title="Informação">
            Guarde o protocolo e o código de acesso para acompanhar o andamento.
          </TrustNotice>
          <TrustNotice variant="warning" title="Atenção">
            O Comitê solicitou informações complementares. Verifique as devolutivas.
          </TrustNotice>
        </div>
      </GuideSection>
    </>
  )
}
