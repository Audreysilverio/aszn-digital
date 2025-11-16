<p align="center">
  <img src="https://imgur.com/qUuPPCn.png" width="80%" alt="ASZN Digital - Banner Oficial">
</p>

# ASZN Digital 🚀
> Plataforma oficial da **Associação Sempre Zaki Narchi** – site institucional + intranet administrativa para gestão de voluntários e doações.

---

## 📋 Status e Tecnologias Principais
![Status](https://img.shields.io/badge/Status-Em%20Desenvolvimento-yellow)
![React](https://img.shields.io/badge/React-18.x-blue)
![Vite](https://img.shields.io/badge/Vite-Frontend-brightgreen)
![Flask](https://img.shields.io/badge/Flask-API-red)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-DB-blueviolet)
![License](https://img.shields.io/badge/License-MIT-lightgrey)

---

## 📌 Sobre o Projeto
O **ASZN Digital** é uma plataforma desenvolvida para modernizar a comunicação e gestão da **Associação Sempre Zaki Narchi**, ONG localizada na Zona Norte de São Paulo que atua com ações sociais de grande impacto (ballet, capoeira, futebol, cursos, reforço escolar, etc.).

A solução contempla:

* 🌐 **Site institucional completo**
* 🙋 **Página de Voluntariado** com formulário integrado à API
* 🎁 **Página de Doações**
* 🔐 **Intranet Administrativa** com login seguro (**JWT**)
* 🗂 **Gerenciamento de inscrições** (voluntários e doações)
* 🗑 **Exclusão otimista** com modal + função “desfazer”
* 📱 **Layout totalmente responsivo**
* 🎨 **Identidade visual oficial da ONG**

---

## 🎨 Identidade Visual
Paleta de cores principal:

| Cor | Hex | Uso |
|:-----|:------|:-----|
| Vermelho Carmim | `#D50032` | Primária (Botões, Destaques) |
| Branco | `#FFFFFF` | Fundo Principal |
| Cinza Claro | `#E0E0E0` | Divisórias e Elementos Secundários |
| Preto | `#000000` | Textos e Ícones |

Estilização utilizando **SCSS Modules** para isolamento e organização de classes.

---

## 🧱 Arquitetura e Tecnologias

### Fluxo do Sistema
```mermaid
flowchart TD
    A[Frontend React + Vite] -->|Axios (GET)| B(API Flask)
    A --> D[Intranet Admin]
    D -->|Axios (CRUD)| B
    B -->|SQLAlchemy| C[(DB PostgreSQL / SQLite)]
    C --> B

    🛠 Tecnologias Utilizadas

    Camada	Tecnologia	Detalhes
Frontend	React 18 / Vite	Interface rápida, moderna e responsiva.
Roteamento	React Router	Navegação SPA (Single Page Application).
Estilização	SCSS / CSS Modules	Layout organizado e limpo.
Requisições	Axios	Cliente HTTP para comunicação com a API.
Autenticação	JWT Auth	Segurança do Login na Intranet.
Backend	Flask	API simples, leve e eficiente.
ORM	SQLAlchemy	Mapeamento Objeto-Relacional.
Banco de Dados	PostgreSQL / SQLite	SQLite para desenvolvimento, PostgreSQL para produção.
Deploy Front	Vercel	Hospedagem do frontend: deploy rápido e estável.
Deploy Back	Render	Hospedagem da API e DB em nuvem.

Backend Repositório: https://github.com/Audreysilverio/aszn-api

📁 Estrutura do Projeto

aszn-digital/
│
├── src/
│   ├── components/       # Componentes reutilizáveis (Header, Footer, Cards)
│   ├── pages/            # Páginas principais da aplicação
│   │   ├── Home/
│   │   ├── QuemSomos/
│   │   ├── NossasAtividades/
│   │   ├── Voluntariado/
│   │   ├── Doacoes/
│   │   └── Admin/
│   ├── services/         # Funções de acesso a dados (e.g., api.js)
│   ├── styles/           # Arquivos SCSS globais
│   ├── router/           # Configurações de roteamento
│   ├── hooks/            # Hooks customizados
│   └── App.jsx
│
└── public/

🚀 Como Rodar o Projeto Localmente
1. Clonar o repositório:

git clone [https://github.com/Audreysilverio/aszn-digital.git](https://github.com/Audreysilverio/aszn-digital.git)
cd aszn-digital

2. Instalar dependências:
npm install

3. Criar arquivo .env: Crie um arquivo .env na raiz do projeto, apontando para a sua API de backend:
VITE_API_URL=[https://sua-api-no-render.com](https://sua-api-no-render.com)

4. Rodar:
npm run dev

5. Acessar:
 👉 http://localhost:5173

 📌 Funcionalidades
Público Geral
Home com feed do Instagram

Quem Somos

Nossas Atividades

Formulário de Voluntariado (integrado)

Formulário de Doações (integrado)

Intranet – Administrador
Tela de Login (JWT)

Listagem e visualização de voluntários

Listagem e visualização de doações

Funcionalidade de Exclusão com modal + “Desfazer”

Interface otimista (rápida, sem travar a tela)

🧭 Roadmap (Próximas Implementações)
Filtros (nome / data / status) nas listas

Exportação de dados (CSV/PDF)

Dashboard com gráficos

Controle de aprovação de voluntários/doações

Melhorias de acessibilidade

Layout dark mode

