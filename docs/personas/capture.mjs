/**
 * Teste real dos fluxos + capturas para o roteiro de personas
 * (docs/personas/index.html). Dirige o Edge da máquina via puppeteer-core,
 * preenche o formulário de verdade, ASSEVERA cada navegação e fotografa
 * cada passo. Falha alto se o fluxo quebrar — é um E2E de verdade.
 *
 * Uso: com o dev server no ar (porta 5179):
 *   node docs/personas/capture.mjs
 */
import puppeteer from "puppeteer-core"
import { mkdirSync, existsSync } from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

const BASE = "http://localhost:5179"
const OUT = path.join(path.dirname(fileURLToPath(import.meta.url)), "prints")
mkdirSync(OUT, { recursive: true })

const EDGE_PATHS = [
  "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
  "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe",
]

const wait = (ms) => new Promise((r) => setTimeout(r, ms))

async function shoot(page, name) {
  await wait(500) // transições (250ms) + fontes assentarem
  await page.screenshot({ path: path.join(OUT, `${name}.png`) })
  console.log(`✓ ${name}.png`)
}

/** Clique via DOM (evaluate) — imune a hit-testing de overlays residuais. */
async function clickByText(page, selector, text) {
  const ok = await page.evaluate(
    (sel, t) => {
      const el = [...document.querySelectorAll(sel)].find((n) =>
        n.textContent?.includes(t)
      )
      if (!el) return false
      el.click()
      return true
    },
    selector,
    text
  )
  if (!ok) throw new Error(`não achei "${text}" em ${selector}`)
}

/** Submete a etapa e ASSEVERA a chegada na rota esperada. */
async function submitAndExpect(page, buttonText, expectedPath) {
  await clickByText(page, 'main button[type="submit"]', buttonText)
  await page.waitForFunction(
    (p) => window.location.pathname === p,
    { timeout: 8000 },
    expectedPath
  )
  await wait(450)
}

/** Escolhe a opção de um Select (Radix) pelo texto visível — cliques REAIS
    (CDP): o Radix abre com pointerdown de verdade; o synthetic não basta. */
async function pickSelectOption(page, triggerIndex, optionText) {
  const triggers = await page.$$(
    'main [data-slot="select-trigger"], main button[role="combobox"]'
  )
  await triggers[triggerIndex].click()
  await page.waitForSelector('[role="option"]', { timeout: 5000 })
  await wait(250)
  const options = await page.$$('[role="option"]')
  for (const o of options) {
    const t = await o.evaluate((el) => el.textContent)
    if (t?.includes(optionText)) {
      await o.click()
      await wait(400)
      return
    }
  }
  throw new Error(`opção "${optionText}" não encontrada`)
}

const edge = EDGE_PATHS.find((p) => existsSync(p))
if (!edge) throw new Error("Edge não encontrado")

const browser = await puppeteer.launch({
  executablePath: edge,
  headless: "shell",
  args: ["--no-first-run", "--disable-features=TranslateUI"],
  defaultViewport: { width: 1280, height: 860 },
})

try {
  const page = await browser.newPage()
  page.on("pageerror", (e) => console.error("pageerror:", e.message))
  await page.emulateMediaFeatures([
    { name: "prefers-color-scheme", value: "light" },
  ])

  /* ---------- Persona 1 · Ana — registro anônimo (desktop) ---------- */
  await page.goto(`${BASE}/`, { waitUntil: "networkidle0" })
  await shoot(page, "p1-01-home")

  await page.goto(`${BASE}/registrar`, { waitUntil: "networkidle0" })
  await shoot(page, "p1-02-antes-de-comecar")

  await clickByText(page, "main a", "Começar")
  await page.waitForFunction(() => location.pathname === "/registrar/identificacao")
  await wait(450)

  // Etapa 1 — Identificação: anônima + e-mail + relação
  await clickByText(page, "main label", "Anônima")
  await wait(250)
  await page.type('main input[type="email"]', "ana@exemplo.com")
  await pickSelectOption(page, 0, "Colaborador(a)")
  await shoot(page, "p1-03-etapa1-identificacao")
  await submitAndExpect(page, "Continuar", "/registrar/sobre-a-manifestacao")

  // Etapa 2 — Sobre: tipo + categoria
  await pickSelectOption(page, 0, "Denúncia")
  await pickSelectOption(page, 1, "Assédio moral")
  await shoot(page, "p1-04-etapa2-sobre")
  await submitAndExpect(page, "Continuar", "/registrar/relato")

  // Etapa 3 — Relato
  await page.type(
    'main input[placeholder^="Uma frase"]',
    "Comentários constrangedores em reuniões"
  )
  await page.type(
    "main textarea",
    "Desde março de 2026, em reuniões semanais da minha área, um gestor faz comentários constrangedores direcionados a mim na frente da equipe. Já aconteceu pelo menos cinco vezes."
  )
  await shoot(page, "p1-05-etapa3-relato")
  await submitAndExpect(page, "Continuar", "/registrar/complementares")

  // Etapa 4 — Complementares (opcional — segue direto)
  await shoot(page, "p1-06-etapa4-complementares")
  await submitAndExpect(page, "Continuar", "/registrar/expectativa")

  // Etapa 5 — Expectativa
  await page.type(
    "main textarea",
    "Espero que a conduta seja apurada e que as reuniões voltem a ser um ambiente respeitoso."
  )
  await shoot(page, "p1-07-etapa5-expectativa")
  await submitAndExpect(page, "Revisar", "/registrar/revisao")

  // Revisão + termos + envio
  await shoot(page, "p1-08-revisao")
  await page.evaluate(() => {
    document.querySelector('main [role="checkbox"]')?.click()
  })
  await wait(250)
  await clickByText(page, 'main button[type="submit"]', "Enviar manifestação")
  await page.waitForFunction(() => location.pathname === "/registrar/sucesso", {
    timeout: 10000,
  })
  await shoot(page, "p1-09-sucesso")

  /* ---------- Persona 2 · Carlos — acompanhamento (desktop) ---------- */
  await page.goto(`${BASE}/acompanhar`, { waitUntil: "networkidle0" })
  await shoot(page, "p2-01-acompanhar")

  // Cola o comprovante inteiro (o formulário extrai protocolo + código)
  await page.evaluate(() => {
    const receiptText =
      "Canal de Ética e Ouvidoria Pitang\nProtocolo: OUV-2026-DEMO01\nCódigo de acesso: DEMO-2026-PTNG"
    const target = document.querySelector("main input")
    const dt = new DataTransfer()
    dt.setData("text/plain", receiptText)
    const evt = new ClipboardEvent("paste", { bubbles: true, cancelable: true })
    Object.defineProperty(evt, "clipboardData", { value: dt })
    target.dispatchEvent(evt)
  })
  await wait(400)
  await shoot(page, "p2-02-comprovante-colado")

  await clickByText(page, 'main button[type="submit"]', "Consultar")
  await page.waitForFunction(
    () => !!document.querySelector("main h1")?.textContent?.includes("OUV-"),
    { timeout: 8000 }
  )
  await shoot(page, "p2-03-andamento")

  /* ---------- Responsivo (mobile 390×844) ---------- */
  await page.setViewport({ width: 390, height: 844 })
  await page.goto(`${BASE}/registrar/relato`, { waitUntil: "networkidle0" })
  await shoot(page, "m-01-relato-mobile")
  await page.goto(`${BASE}/acompanhar`, { waitUntil: "networkidle0" })
  await shoot(page, "m-02-acompanhar-mobile")
  await page.goto(`${BASE}/`, { waitUntil: "networkidle0" })
  await shoot(page, "m-03-home-mobile")

  console.log("Concluído — fluxo real percorrido e fotografado.")
} finally {
  await browser.close()
}
