# Arquitetura Global de Bases de Dados & RGPD — CD Aves

> **Documento de Especificação Técnica & Blueprint de Arquitetura**  
> **Clube:** Clube Desportivo das Aves (CD Aves)  
> **Motor de Base de Dados:** MongoDB (NoSQL)  
> **Padrão de Arquitetura:** Base de Dados Distribuída por Domínio / Encapsulamento RGPD

---

## 1. Visão Geral da Arquitetura & Encapsulamento RGPD

Para garantir a **máxima segurança, conformidade com o RGPD (Regulamento Geral sobre a Proteção de Dados) e escalabilidade**, a arquitetura de dados do CD Aves é dividida em **3 Bases de Dados isoladas**:

```
                                  ┌─────────────────────────────────────────┐
                                  │           CLUSTER MONGODB               │
                                  └────────────────────┬────────────────────┘
                                                       │
         ┌─────────────────────────────────────────────┼─────────────────────────────────────────────┐
         ▼                                             ▼                                             ▼
┌─────────────────────────────────┐       ┌─────────────────────────────────┐       ┌─────────────────────────────────┐
│     1. DATABASE: cdaves_portal  │       │    2. DATABASE: cdaves_socios    │       │   3. DATABASE: cdaves_security  │
├─────────────────────────────────┤       ├─────────────────────────────────┤       ├─────────────────────────────────┤
│ (Dados Públicos & Desportivos)  │       │ (Dados Sensíveis & Financeiros) │       │ (Acessos, Auditoria & RGPD)     │
│ • modalidades                   │       │ • socios                        │       │ • utilizadores_admin            │
│ • epocas                        │       │ • categorias_socio              │       │ • consentimentos_rgpd           │
│ • equipas                       │       │ • pagamentos_cotas              │       │ • audit_logs (Registos de acesso│
│ • atletas                       │       │ • recibos_faturas               │       │   a dados sensíveis)            │
│ • equipa_tecnica                │       │ • cartoes_socio                 │       │ • pedidosisquecimento_rgpd     │
│ • jogos                         │       └─────────────────────────────────┘       └─────────────────────────────────┘
│ • noticias                      │
│ • patrocinadores                │
│ • instalacoes                   │
└─────────────────────────────────┘
```

### Porquê 3 Bases de Dados Distintas?
1. **Encapsulamento RGPD (Isolamento do Risco):** O site público e as aplicações móveis dos adeptos apenas têm credenciais de leitura para a BD `cdaves_portal`. Em caso de ataque ao site público, os dados de NIF, morada, pagamentos e contactos dos sócios permanecem inatingíveis na BD `cdaves_socios`.
2. **Separação de Privilégios (RBAC):** Os treinadores ou gestores de redes sociais apenas acedem à BD de Conteúdos/Jogos; a secretaria/tesouraria acede à BD de Sócios.
3. **Auditabilidade Estrita:** A BD `cdaves_security` regista cada ação de leitura ou alteração de dados pessoais sensíveis para efeitos de fiscalização da CNPD/RGPD.

---

## 2. Detalhamento das Bases de Dados e Coleções

---

### 🟢 BASE DE DADOS 1: `cdaves_portal` (Pública / Conteúdo Desportivo)

#### 1.1 Coleção: `epocas`
*Permite manter o histórico do clube desorganizado por anos.*
```json
{
  "_id": ObjectId("64f1a2b3c4d5e6f7a8b9c100"),
  "nome": "Época 2026/2027",
  "data_inicio": "2026-07-01",
  "data_fim": "2027-06-30",
  "ativa": true
}
```

#### 1.2 Coleção: `modalidades`
```json
{
  "_id": ObjectId("64f1a2b3c4d5e6f7a8b9c101"),
  "nome": "Futebol",
  "slug": "futebol",
  "descricao": "Futebol de 11 masculino e feminino",
  "icone_url": "/assets/icons/futebol.svg",
  "ordem_exibicao": 1,
  "activa": true
}
```

#### 1.3 Coleção: `equipas`
```json
{
  "_id": ObjectId("64f1a2b3c4d5e6f7a8b9c102"),
  "modalidade_id": ObjectId("64f1a2b3c4d5e6f7a8b9c101"),
  "epoca_id": ObjectId("64f1a2b3c4d5e6f7a8b9c100"),
  "nome": "Equipa Principal",
  "escalao": "Sénior",
  "genero": "Masculino",
  "competicao": "Campeonato Portugal",
  "foto_plantel_url": "/media/equipas/futebol-senior-2026.jpg"
}
```

#### 1.4 Coleção: `atletas`
*Nota RGPD: Para atletas menores de idade, a exibição pública de foto/nome exige consentimento assinado pelos encarregados de educação (gerido na BD `cdaves_security`).*
```json
{
  "_id": ObjectId("64f1a2b3c4d5e6f7a8b9c103"),
  "equipa_id": ObjectId("64f1a2b3c4d5e6f7a8b9c102"),
  "nome_desportivo": "Joãozinho",
  "nome_completo": "João Pedro Santos",
  "numero_camisola": 10,
  "posicao": "Extremo Esquerdo",
  "data_nascimento": "2002-05-14",
  "nacionalidade": "Portuguesa",
  "foto_oficial_url": "/media/atletas/joaozinho.jpg",
  "biografia": "Formado nas escolas do CD Aves...",
  "estatisticas_epoca": {
    "jogos_realizados": 18,
    "minutos_jogados": 1420,
    "golos": 7,
    "assistencias": 4,
    "cartoes_amarelos": 2,
    "cartoes_vermelhos": 0
  },
  "activo": true
}
```

#### 1.5 Coleção: `equipa_tecnica`
```json
{
  "_id": ObjectId("64f1a2b3c4d5e6f7a8b9c104"),
  "equipa_id": ObjectId("64f1a2b3c4d5e6f7a8b9c102"),
  "nome": "Manuel Oliveira",
  "cargo": "Treinador Principal",
  "foto_url": "/media/staff/manuel-oliveira.jpg"
}
```

#### 1.6 Coleção: `jogos`
```json
{
  "_id": ObjectId("64f1a2b3c4d5e6f7a8b9c105"),
  "modalidade_id": ObjectId("64f1a2b3c4d5e6f7a8b9c101"),
  "equipa_id": ObjectId("64f1a2b3c4d5e6f7a8b9c102"),
  "epoca_id": ObjectId("64f1a2b3c4d5e6f7a8b9c100"),
  "competicao": "Campeonato Portugal - Jornada 12",
  "data_hora": "2026-09-20T16:00:00Z",
  "instalacao_id": ObjectId("64f1a2b3c4d5e6f7a8b9c108"),
  "estado": "FINALIZADO",
  "equipa_casa": {
    "nome": "CD Aves",
    "emblema_url": "/assets/emblema-aves.png",
    "resultado": 2,
    "e_equipa_clube": true
  },
  "equipa_fora": {
    "nome": "Vitória SC B",
    "emblema_url": "/media/adversarios/vitoria-sc.png",
    "resultado": 1,
    "e_equipa_clube": false
  },
  "eventos_jogo": [
    { "minuto": 23, "tipo": "GOLO", "equipa": "CASA", "atleta_nome": "Joãozinho" },
    { "minuto": 67, "tipo": "CARTAO_AMARELO", "equipa": "CASA", "atleta_nome": "Joãozinho" }
  ],
  "transmissao_tv_link": "https://youtube.com/live/..."
}
```

#### 1.7 Coleção: `noticias`
*Nota de Arquitetura: Suporta publicação multiusuário com rasto de auditoria completo (quem criou, quem aprovou, quem editou e quando).*
```json
{
  "_id": ObjectId("64f1a2b3c4d5e6f7a8b9c106"),
  "titulo": "CD Aves Garante Vitória Notável no Pavilhão",
  "slug": "cd-aves-garante-vitoria-notavel-no-pavilhao",
  "categoria": "Modalidades",
  "resumo": "Excelente exibição da equipa de Futsal sénior...",
  "corpo_markdown": "# Vitória Convincente\n\nO CD Aves venceu este sábado...",
  "imagem_capa_url": "/media/noticias/vitoria-futsal.jpg",
  "galeria_fotos": [
    "/media/noticias/foto1.jpg",
    "/media/noticias/foto2.jpg"
  ],
  "modalidade_id": ObjectId("64f1a2b3c4d5e6f7a8b9c0d1"),
  "tags": ["futsal", "campeonato", "vitoria"],
  "destaque_homepage": true,
  "estado": "PUBLICADO",
  "criado_por": {
    "user_id": ObjectId("64f1a2b3c4d5e6f7a8b9c300"),
    "nome": "Ana Silva",
    "role": "EDITOR"
  },
  "ultimo_editor": {
    "user_id": ObjectId("64f1a2b3c4d5e6f7a8b9c305"),
    "nome": "Carlos Mendes",
    "role": "REDATOR"
  },
  "criado_em": "2026-08-01T14:20:00Z",
  "atualizado_em": "2026-08-01T17:45:00Z",
  "publicado_em": "2026-08-01T18:00:00Z",
  "historico_revisoes": [
    {
      "versao": 1,
      "user_id": ObjectId("64f1a2b3c4d5e6f7a8b9c300"),
      "user_nome": "Ana Silva",
      "acao": "CRIACAO_RASCUNHO",
      "data": "2026-08-01T14:20:00Z"
    },
    {
      "versao": 2,
      "user_id": ObjectId("64f1a2b3c4d5e6f7a8b9c305"),
      "user_nome": "Carlos Mendes",
      "acao": "EDIÇÃO_TEXTO",
      "data": "2026-08-01T17:45:00Z"
    }
  ]
}
```

#### 1.8 Coleção: `instalacoes`
```json
{
  "_id": ObjectId("64f1a2b3c4d5e6f7a8b9c108"),
  "nome": "Estádio do CD Aves",
  "tipo": "Estádio de Futebol",
  "morada": "Rua do Estádio, Vila das Aves",
  "capacidade": 8500,
  "localizacao_gps": {
    "lat": 41.3611,
    "lng": -8.4053
  }
}
```

#### 1.9 Coleção: `patrocinadores`
```json
{
  "_id": ObjectId("64f1a2b3c4d5e6f7a8b9c109"),
  "nome": "Patrocinador Oficial X",
  "logotipo_url": "/media/sponsors/sponsor-x.png",
  "website_url": "https://sponsor.pt",
  "categoria": "MAIN_SPONSOR",
  "ordem": 1,
  "activo": true
}
```

---

### 🔴 BASE DE DADOS 2: `cdaves_socios` (Administrativa / Sensível / Financeira)

> ⚠️ **REGRAS DE SEGURANÇA RGPD:**  
> - Acesso restrito via IP e autenticação com certificado mTLS/JWT Administrativo.  
> - Campos sensíveis como NIF, IBAN e Morada devem ser encriptados em repouso (*Encryption at Rest* / Field Level Encryption).

#### 2.1 Coleção: `categorias_socio`
```json
{
  "_id": ObjectId("64f1a2b3c4d5e6f7a8b9c200"),
  "nome": "Sócio Efetivo",
  "quota_mensal_valor": 10.00,
  "desconto_bilheteira_percentagem": 50,
  "direito_a_voto": true,
  "idade_minima": 18
}
```

#### 2.2 Coleção: `socios`
*Nota de Arquitetura: Não existe qualquer ligação ou referência a ObjectIds da BD de conteúdos/atletas. O isolamento entre as bases de dados é 100% total. Para efeitos de identificação interna ou benefícios, o sócio possui apenas o campo informativo `e_atleta`.*
```json
{
  "_id": ObjectId("64f1a2b3c4d5e6f7a8b9c201"),
  "numero_socio": 1042,
  "auth_account_id": "auth_usr_99887766",
  "categoria_id": ObjectId("64f1a2b3c4d5e6f7a8b9c200"),
  "e_atleta": true,
  "modalidades_praticadas": ["Futebol", "Futsal"],
  "dados_pessoais": {
    "nome_completo": "Carlos Alberto Mendes",
    "nif": "123456789",
    "data_nascimento": "1985-03-22",
    "email": "carlos.mendes@email.com",
    "telemovel": "+351 912 345 678",
    "morada": {
      "rua": "Avenida Principal, 123",
      "codigo_postal": "4795-000",
      "localidade": "Vila das Aves"
    }
  },
  "estado_conta": "ATIVO",
  "data_adesao": "2015-06-10",
  "metodo_pagamento_preferencial": "MBWAY"
}
```

#### 2.3 Coleção: `pagamentos_cotas`
```json
{
  "_id": ObjectId("64f1a2b3c4d5e6f7a8b9c202"),
  "socio_id": ObjectId("64f1a2b3c4d5e6f7a8b9c201"),
  "numero_socio": 1042,
  "ano": 2026,
  "mes": 8,
  "valor_pago": 10.00,
  "estado": "PAGO",
  "metodo_pagamento": "MBWAY",
  "transacao_gateway_id": "MBWAY_TX_99881122",
  "data_pagamento": "2026-08-01T10:15:30Z",
  "recibo_id": ObjectId("64f1a2b3c4d5e6f7a8b9c203")
}
```

#### 2.4 Coleção: `recibos_faturas`
```json
{
  "_id": ObjectId("64f1a2b3c4d5e6f7a8b9c203"),
  "numero_fatura_recibo": "FR 2026/04812",
  "socio_id": ObjectId("64f1a2b3c4d5e6f7a8b9c201"),
  "nif_cliente": "123456789",
  "valor_total": 10.00,
  "valor_iva": 0.00,
  "isenção_iva_artigo": "Artigo 9º do CIVA",
  "url_pdf_recibo": "/private/recibos/FR202604812.pdf",
  "emitido_em": "2026-08-01T10:15:31Z"
}
```

---

### 🛡️ BASE DE DADOS 3: `cdaves_security` (Auditoria, RGPD e Controlo de Acessos)

> **Esta base de dados é indispensável para o cumprimento estrito do RGPD.**

#### 3.1 Coleção: `utilizadores_admin`
*Controlo de acessos ao Backoffice do Clube (RBAC).*
```json
{
  "_id": ObjectId("64f1a2b3c4d5e6f7a8b9c300"),
  "nome": "Ana Secretaria",
  "email": "secretaria@cdaves.pt",
  "password_hash": "$2b$12$e...",
  "role": "SECRETARIA_SOCIOS",
  "permissoes": [
    "READ_SOCIOS",
    "WRITE_COTAS",
    "EMITIR_RECIBOS"
  ],
  "activo": true
}
```

#### 3.2 Coleção: `consentimentos_rgpd`
*Regista expressamente as autorizações de tratamento de dados.*
```json
{
  "_id": ObjectId("64f1a2b3c4d5e6f7a8b9c301"),
  "socio_id": ObjectId("64f1a2b3c4d5e6f7a8b9c201"),
  "ip_registo": "85.240.12.44",
  "termos_condicoes_aceites": true,
  "politica_privacidade_aceite": true,
  "consentimento_marketing_email": false,
  "consentimento_cedencia_imagem": true,
  "versao_termos": "v2.1_2026",
  "data_consentimento": "2026-01-10T14:22:00Z"
}
```

#### 3.3 Coleção: `audit_logs` (Registos de Auditoria RGPD)
*Obrigatório por lei para provar à CNPD quem consultou ou alterou dados sensíveis.*
```json
{
  "_id": ObjectId("64f1a2b3c4d5e6f7a8b9c302"),
  "admin_id": ObjectId("64f1a2b3c4d5e6f7a8b9c300"),
  "admin_email": "secretaria@cdaves.pt",
  "acao": "CONSULTA_DADOS_PESSOAIS",
  "recurso_afetado": "Socio #1042",
  "campos_consultados": ["nif", "morada", "historico_cotas"],
  "ip_origem": "194.65.2.10",
  "timestamp": "2026-08-01T15:10:05Z"
}
```

#### 3.4 Coleção: `pedidos_esquecimento_rgpd`
*Trata os pedidos de encerramento de conta e eliminação/anonimização de dados (Direito ao Esquecimento).*
```json
{
  "_id": ObjectId("64f1a2b3c4d5e6f7a8b9c303"),
  "socio_id_original": ObjectId("64f1a2b3c4d5e6f7a8b9c201"),
  "estado": "CONCLUIDO",
  "data_pedido": "2026-05-01T10:00:00Z",
  "data_anonimizacao": "2026-05-15T10:00:00Z",
  "nota_retencao_legal": "Dados fiscais mantidos por 10 anos conforme Lei Fiscal Portuguesa em ficheiro selado."
}
```

---

## 3. Elementos em Falta & Recomendações Adicionais

Ao analisar os requisitos de um clube desportivo completo, **identificamos e já incluímos nesta arquitetura** os seguintes elementos críticos que inicialmente faltavam:

1. **Épocas Desportivas (`epocas`):** Sem o conceito de época, não é possível saber quem jogava em que equipa em anos anteriores.
2. **Instalações (`instalacoes`):** Mapeamento do Estádio, Pavilhão e Campos de Treino para associar aos Jogos e Treinos.
3. **Patrocinadores (`patrocinadores`):** Essencial para o portal do clube exibir parceiros oficiais por modalidade.
4. **Equipa Técnica (`equipa_tecnica`):** Registo de Treinadores, Fisioterapeutas e Diretores de Modalidade.
5. **Consentimentos e Logs RGPD (`consentimentos_rgpd` & `audit_logs`):** Fundamentais para evitar coimas da CNPD e garantir compliance legal em Portugal.
6. **Controlo de Época e Categorias de Sócio (`categorias_socio`):** Permite mudar o valor da cota ou criar categorias (Sócio Atleta, Sócio Correspondente, Sócio Infantil) sem alterar o código da aplicação.

---

## 4. Guia de Implementação Futura (Passo a Passo)

Quando a equipa/programador for implementar esta solução:

1. **Criar Cluster MongoDB Atlas:** Configurar 3 databases (`cdaves_portal`, `cdaves_socios`, `cdaves_security`).
2. **Configurar Credenciais de Acesso (Database Users):**
   * `db_user_website`: Acesso apenas de **leitura** a `cdaves_portal`.
   * `db_user_admin_backend`: Acesso a `cdaves_socios` e `cdaves_security` restrito por IPs da API privada.
3. **Indexação Obrigatória para Performance:**
   * `jogos`: Índice composto por `(modalidade_id, data_hora)`
   * `noticias`: Índice único por `slug` e índice por `publicado_em`
   * `socios`: Índice único por `numero_socio` e `dados_pessoais.nif`
   * `pagamentos_cotas`: Índice composto por `(socio_id, ano, mes)`

---
*Documento gerado para o projeto CD Aves — Guardar para referência de desenvolvimento futuro.*
