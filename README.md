# LP Gestão — Gestão Financeira & Contábil

Site institucional estático (HTML + CSS + JS puro, sem build), focado em gerar contatos pelo WhatsApp.

## Arquivos

| Arquivo | Função |
| --- | --- |
| `index.html` | Conteúdo, SEO (meta tags + schema.org) e estrutura |
| `styles.css` | Design system (azul-marinho, dourado, marfim), seções e responsivo |
| `script.js` | WhatsApp por serviço, formulário → WhatsApp, menu mobile, animações, FAQ |
| `assets/favicon.svg` | Selo "LP" |

## Rodar localmente

Qualquer servidor estático na pasta, por exemplo:

```bash
python -m http.server 4173
```

Abrir http://localhost:4173

## Seções

Hero · Faixa de especialidades · Sobre · Serviços (Gestão Administrativa e Financeira, Auditoria,
Assessoria e Suporte, Suporte Contábil e Segurança Fiscal, Parcerias) · Destaque · Como trabalhamos ·
Diferenciais · Dúvidas · Contato com formulário.

## WhatsApp

- Número em `WHATSAPP` no topo do `script.js` e como fallback nos `href="https://wa.me/557199919749"` do `index.html`
  (e no `tel:` do contato). Para trocar, buscar e substituir `557199919749`.
- Links com `data-wa="Serviço"` abrem o WhatsApp com mensagem sobre aquele serviço; `data-wa=""` usa uma mensagem genérica.
- O formulário valida os campos e abre o WhatsApp com as respostas preenchidas.

## Google Tag Manager / Google Ads

Colar os snippets do GTM nos comentários marcados no `index.html`. Eventos enviados ao `dataLayer`:
`whatsapp_click` (`service`) e `generate_lead` (`form`, `service`).

## Pendências

- Logo em alta resolução (hoje o selo "LP" é feito em CSS/SVG) e fotos, se houver.
- E-mail de contato e @ do Instagram (cortados no print do perfil).
- Endereço/cidade, se a empresa quiser exibir.
- Validar a lista de atividades de cada serviço — foram escritas a partir do perfil do WhatsApp Business.
- Domínio: preencher `<link rel="canonical">`, adicionar `og:image` e `sitemap.xml`.
