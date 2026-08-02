# Arquitetura Global de Bases de Dados & RGPD — CD Aves

> **Documento de Especificação Técnica & Blueprint de Arquitetura de Dados**  
> **Clube:** Clube Desportivo das Aves (CD Aves)  
> **Motor de Base de Dados:** MongoDB (NoSQL)  
> **Padrão de Arquitetura:** Base de Dados Distribuída por Domínio / Encapsulamento RGPD / Módulo Dedicado de Design System (`cdaves_design`)

---

## 1. Visão Geral da Arquitetura Distribuída (4 Bases de Dados)

Para garantir a **máxima segurança, isolamento estético, conformidade com o RGPD e flexibilidade de design**, a arquitetura de dados do CD Aves é dividida em **4 Bases de Dados isoladas**:

```
                                  ┌─────────────────────────────────────────┐
                                  │           CLUSTER MONGODB               │
                                  └────────────────────┬────────────────────┘
                                                       │
         ┌──────────────────────┬──────────────────────┴──────────────────────┬──────────────────────┐
         ▼                      ▼                                             ▼                      ▼
┌──────────────────┐   ┌──────────────────┐                          ┌──────────────────┐   ┌──────────────────┐
│ 1. cdaves_portal │   │ 2. cdaves_design │                          │ 3. cdaves_socios │   │4.cdaves_security │
├──────────────────┤   ├──────────────────┤                          ├──────────────────┤   ├──────────────────┤
│ (Desporto &      │   │ (Tokens Visuais, │                          │ (Dados Sensíveis │   │ (RBAC, Auditoria │
│  Conteúdos)      │   │  Cores & Assets) │                          │  & Financeiros)  │   │  & RGPD)         │
│ • noticias       │   │ • design_tokens  │                          │ • socios         │   │ • admin_users    │
│ • jogos          │   │ • tipografia     │                          │ • categorias     │   │ • consentimentos │
│ • equipas        │   │ • assets_graficos│                          │ • pagamentos     │   │ • audit_logs     │
│ • modalidades    │   │ • botoes_estilos │                          │ • faturas        │   │ • esquecimento   │
│ • patrocinios    │   │ • temas_historico│                          └──────────────────┘   └──────────────────┘
└──────────────────┘   └──────────────────┘
```

### Vantagens da Separação em 4 Bases de Dados

1. **🎨 Base de Dados Dedicada ao Design (`cdaves_design`):**
   - **Independência Estética Total:** Permite alterar paletas de cores, fontes, estilos de botões, logótipos e imagens de capa sem risco de corromper ou tocar nos dados desportivos (notícias/jogos) ou nos dados sensíveis de sócios.
   - **Temas Sazonais & Reversão a 1-Clique:** Guarda o histórico de temas visuais (ex: "Tema Centenário", "Tema Época 2026/27", "Tema Modo Escuro"), permitindo mudar toda a estética do site instantaneamente no painel de administração.
   - **Caching de Alta Performance:** Como os tokens de design mudam raramente, a BD `cdaves_design` pode ser guardada em cache CDN ou `localStorage`, carregando o visual do site em milissegundos.

2. **🔒 Encapsulamento RGPD (`cdaves_socios` & `cdaves_security`):**
   - O site público acede apenas a `cdaves_portal` e `cdaves_design`. Em caso de hipotético ataque ao site público, os dados de NIF, morada e pagamentos dos sócios permanecem 100% inacessíveis e protegidos na BD `cdaves_socios`.

---

## 2. Detalhamento da Nova Base de Dados 2: `cdaves_design` (Design System & Estética)

#### 2.1 Coleção: `design_tokens` (Paleta de Cores e Superfícies)
*Define todas as variáveis de cor e tokens de design consumidos pelo CSS/Tailwind do site.*
```json
{
  "_id": ObjectId("64f1a2b3c4d5e6f7a8b9c401"),
  "nome_tema": "Tema Oficial Vermelho e Branco 2026",
  "activo": true,
  "cores_marca": {
    "primary": "#D90429",
    "accent": "#F77F00",
    "background": "#FFFFFF",
    "foreground": "#0F172A",
    "card_background": "#FFFFFF",
    "border": "#E2E8F0"
  },
  "cores_texto": {
    "text_main": "#0F172A",
    "text_muted": "#64748B",
    "heading": "#0F172A",
    "link": "#D90429",
    "link_hover": "#F77F00"
  },
  "cabecalho_e_navegacao": {
    "header_bg_scroll": "#FFFFFF",
    "header_text_scroll": "#0F172A",
    "header_hover_color": "#F77F00",
    "sidebar_bg": "#0F172A",
    "sidebar_text": "#FFFFFF"
  }
}
```

#### 2.2 Coleção: `tipografia` (Fontes e Estilos de Texto)
```json
{
  "_id": ObjectId("64f1a2b3c4d5e6f7a8b9c402"),
  "fonte_titulos": {
    "familia": "Outfit",
    "provider": "Google Fonts",
    "url_import": "https://fonts.googleapis.com/css2?family=Outfit:wght@700;800;900&display=swap",
    "transform": "uppercase"
  },
  "fonte_corpo": {
    "familia": "Inter",
    "provider": "Google Fonts",
    "url_import": "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
  }
}
```

#### 2.3 Coleção: `botoes_estilos` (Botões e Componentes de Ação)
```json
{
  "_id": ObjectId("64f1a2b3c4d5e6f7a8b9c403"),
  "btn_hero": {
    "bg_color": "#D90429",
    "text_color": "#FFFFFF",
    "hover_bg": "#B80320",
    "border_radius": "0.375rem"
  },
  "btn_gold": {
    "bg_color": "#F77F00",
    "text_color": "#000000",
    "hover_bg": "#E07300",
    "border_radius": "0.375rem"
  },
  "btn_primary": {
    "bg_color": "#D90429",
    "text_color": "#FFFFFF"
  },
  "btn_secondary": {
    "bg_color": "#F1F5F9",
    "text_color": "#0F172A"
  }
}
```

#### 2.4 Coleção: `assets_graficos` (Imagens de Marca e Capas Globais)
```json
{
  "_id": ObjectId("64f1a2b3c4d5e6f7a8b9c404"),
  "logo_principal_url": "/assets/logo-cd.png",
  "logo_alternativo_url": "/assets/logo-cd-white.png",
  "favicon_url": "/assets/favicon.ico",
  "hero_estadio_url": "/assets/hero-stadium.jpg",
  "marca_agua_url": "/assets/watermark-aves.png"
}
```

#### 2.5 Coleção: `temas_historico` (Snapshots para Alteração Rápida)
```json
{
  "_id": ObjectId("64f1a2b3c4d5e6f7a8b9c405"),
  "nome": "Tema Época 2025/2026",
  "data_criacao": "2025-07-01",
  "criado_por": "Ana Silva",
  "snapshot_tokens": { /* copia dos tokens do tema */ }
}
```

---

## 3. Respostas às Questões de Ambiente & Desenvolvimento

### Q1: É possível colocar tudo o que é estético numa outra base de dados?
**Sim, totalmente recomendado!** Criámos a BD `cdaves_design` especificamente para encapsular as paletas de cores, fontes, estilos de botões e logótipos. Assim, alterar a estética do site no Admin mexe apenas em `cdaves_design`, sem tocar no conteúdo de notícias, jogos ou dados de sócios.

### Q2: Como funciona o armazenamento de credenciais `.env`?
As credenciais do MongoDB Atlas (`MONGODB_URI`, `MONGODB_PASSWORD`) estão salvaguardadas no teu Mac. Adicionámos regras no [`.gitignore`](file:///Users/joaosmoreira/Documents/Code%20CTK/websites/cdaves/.gitignore) (`.env`, `.env.*`, `.env/`) para garantir que a password **nunca é enviada para o GitHub público**. Em produção (Vercel), a URI é configurada diretamente no painel do Vercel.

### Q3: É possível trabalhar no projeto sem estar a popular/conectar a base de dados?
**Sim, 100%!** O projeto opera em modo **"Offline / Mock First"** utilizando o Zustand (`src/admin/store.ts`) e o `localStorage`. Podes desenvolver páginas, gerir o editor de notícias drag & drop e alterar opções estéticas localmente sem qualquer dependência ou custos de base de dados.

### Q4: É possível criar uma base de dados local para desenvolvimento e usar o MongoDB Atlas em produção?
**Sim, é o padrão profissional!**
- **Desenvolvimento Local:** Instala-se o MongoDB localmente (`mongodb://localhost:27017`) no Mac ou Docker.
- **Produção:** O Vercel conecta-se ao teu cluster no **MongoDB Atlas** (`mongodb+srv://joaosmoreira86_db_user:...@cdaves.3blnbtc.mongodb.net`), mantendo a base de dados disponível 24/7 na nuvem.

---

## 4. Estrutura Completa de Bases de Dados

| Base de Dados | Função Principal | Acesso Público? |
|---|---|---|
| 🟢 **`cdaves_portal`** | Conteúdo Desportivo (Notícias, Jogos, Equipas, Atletas, Multimédia, Institucional) | Leitura Pública |
| 🎨 **`cdaves_design`** | Design System (Cores, Fontes, Botões, Banners, Logótipos, Temas) | Leitura Pública |
| 🔴 **`cdaves_socios`** | Gestão de Sócios (Dados Sensíveis NIF/Morada, Quotas, Faturas) | Restrito (Backoffice) |
| 🛡️ **`cdaves_security`** | Auditoria e Conformidade (Utilizadores Admin, Consentimentos e Logs RGPD) | Restrito (Segurança) |
