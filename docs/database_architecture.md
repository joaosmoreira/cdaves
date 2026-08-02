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
│ • atletas        │   │ • temas_historico│                          └──────────────────┘   └──────────────────┘
│ • patrocinios    │   └──────────────────┘
└──────────────────┘
```

---

## 2. Estrutura da Base de Dados para Atletas & Modalidades (BD `cdaves_portal`)

### 2.1 Coleção: `modalidades`
*Contém todas as modalidades desportivas com a flag de controlo dinâmico `activa`. Se `activa: false`, a modalidade deixa automaticamente de surgir no menu de navegação do site público.*

```json
{
  "_id": ObjectId("64f1a2b3c4d5e6f7a8b9c101"),
  "slug": "futsal-masculino",
  "nome": "Futsal Masculino",
  "descricao": "Equipa sénior masculina e escalões de formação competitivos.",
  "treinador": "Ricardo Bastos",
  "competicao": "Campeonato Nacional de Futsal",
  "recinto": "Pavilhão Municipal do CD Aves",
  "activa": true,
  "criado_em": "2026-08-01T10:00:00Z"
}
```

*Exemplo de Modalidade Inativa (Futebol Profissional):*
```json
{
  "_id": ObjectId("64f1a2b3c4d5e6f7a8b9c102"),
  "slug": "futebol",
  "nome": "Futebol Profissional",
  "descricao": "Futebol profissional atualmente inativo/sem competição oficial sénior.",
  "treinador": "Inativo",
  "competicao": "Inativo",
  "recinto": "Estádio Municipal do CD Aves",
  "activa": false,
  "criado_em": "2026-08-01T10:00:00Z"
}
```

### 2.2 Coleção: `atletas` (Jogadores & Atletas do Clube)
*Armazena as fichas de atletas de todas as modalidades (Futsal Masculino, Futsal Feminino, Basquetebol, Ciclismo, Walking Football e Futebol).*

```json
{
  "_id": ObjectId("64f1a2b3c4d5e6f7a8b9c103"),
  "slug": "andre-faria",
  "nome_completo": "André Miguel Faria",
  "nome_camisola": "André Faria",
  "numero_camisola": 1,
  "posicao": "Guarda-redes",
  "modalidade_slug": "futsal-masculino",
  "modalidade_nome": "Futsal Masculino",
  "equipa": "Futsal Masculino — Seniores",
  "idade": 29,
  "nacionalidade": "Portugal",
  "altura": "1,82 m",
  "desde_ano": "2021",
  "foto_url": "/assets/player-1.jpg",
  "biografia": "André Faria representa o CD Aves no Futsal Masculino e é um dos guarda-redes de referência do plantel.",
  "estatisticas": {
    "jogos": 22,
    "golos": 0,
    "assistencias": 2,
    "minutos": 880
  },
  "activo": true
}
```

---

## 3. Base de Dados de Design: `cdaves_design` (Tokens & Estética)

#### 3.1 Coleção: `design_tokens` (Paleta de Cores e Superfícies)
```json
{
  "_id": ObjectId("64f1a2b3c4d5e6f7a8b9c401"),
  "nome_tema": "Tema Oficial Vermelho e Branco 2026",
  "activo": true,
  "cores_marca": {
    "primary": "#D90429",
    "accent": "#F77F00",
    "background": "#FFFFFF",
    "foreground": "#0F172A"
  }
}
```

---

## 4. Resumo da Estrutura das 4 Bases de Dados

| Base de Dados | Função Principal | Acesso Público? |
|---|---|---|
| 🟢 **`cdaves_portal`** | Conteúdo Desportivo (Notícias, Jogos, Equipas, Atletas, Modalidades Ativas) | Leitura Pública |
| 🎨 **`cdaves_design`** | Design System (Cores, Fontes, Botões, Banners, Logótipos, Temas) | Leitura Pública |
| 🔴 **`cdaves_socios`** | Gestão de Sócios (Dados Sensíveis NIF/Morada, Quotas, Faturas) | Restrito (Secretaria) |
| 🛡️ **`cdaves_security`** | Auditoria e Conformidade (Utilizadores Admin, Consentimentos e Logs RGPD) | Restrito (Segurança) |
