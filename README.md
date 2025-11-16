<p align="center">
  <img src="https://imgur.com/qUuPPCn.png" width="100%" alt="ASZN Digital - Banner Oficial">
</p>

# ASZN Digital  
> Plataforma oficial da **Associação Sempre Zaki Narchi** – site institucional + intranet administrativa para gestão de voluntários e doações.

![Badge](https://img.shields.io/badge/Status-Em%20Desenvolvimento-yellow)
![Badge](https://img.shields.io/badge/React-18.0.0-blue)
![Badge](https://img.shields.io/badge/Vite-Frontend-brightgreen)
![Badge](https://img.shields.io/badge/SCSS-CSS%20Modules-red)
![Badge](https://img.shields.io/badge/License-MIT-lightgrey)

---

## 📌 Sobre o projeto  
O **ASZN Digital** é uma plataforma desenvolvida para modernizar a comunicação e gestão da **Associação Sempre Zaki Narchi**, ONG localizada na Zona Norte de São Paulo que atua com ações sociais de grande impacto (ballet, capoeira, futebol, cursos, reforço escolar, etc.).

A solução contempla:

- 🌐 **Site institucional completo**
- 🙋 **Página de Voluntariado** com formulário integrado à API
- 🎁 **Página de Doações**
- 🔐 **Intranet Administrativa** com login seguro (JWT)
- 🗂 **Gerenciamento de inscrições** (voluntários e doações)
- 🗑 **Exclusão otimista** com modal + função “desfazer”
- 📱 **Layout totalmente responsivo**
- 🎨 **Identidade visual oficial da ONG**

---

## 🎨 Identidade Visual  
Paleta de cores definida:

| Cor | Hex |
|-----|------|
| Vermelho Carmim | `#D50032` |
| Branco | `#FFFFFF` |
| Cinza | `#E0E0E0` |
| Preto | `#000000` |

Estilização usando **SCSS Modules** para isolamento e organização.

---

## 🧱 Arquitetura do Sistema

```mermaid
flowchart TD
A[Frontend React + Vite] -->|Axios| B[(API Flask)]
B --> C[(SQLite / PostgreSQL)]
A --> D[Intranet Admin]
D -->|CRUD| B

🛠 Tecnologias Utilizadas
Frontend

React 18

Vite

React Router

SCSS / CSS Modules

Axios

JWT Auth

Vercel (deploy)

Backend

Repositório: https://github.com/Audreysilverio/aszn-api

Flask

SQLAlchemy

SQLite / PostgreSQL

Render (deploy)

📁 Estrutura do Projeto
aszn-digital/
│
├── src/
│   ├── components/
│   ├── pages/
│   │   ├── Home/
│   │   ├── QuemSomos/
│   │   ├── NossasAtividades/
│   │   ├── Voluntariado/
│   │   ├── Doacoes/
│   │   └── Admin/
│   ├── services/
│   │   └── api.js
│   ├── styles/
│   ├── router/
│   ├── hooks/
│   └── App.jsx
│
└── public/

🚀 Como Rodar o Projeto Localmente

Clonar o repositório

git clone https://github.com/Audreysilverio/aszn-digital.git
cd aszn-digital


Instalar dependências

npm install


Criar arquivo .env

VITE_API_URL=https://sua-api-no-render.com


Rodar

npm run dev


Acessar:
👉 http://localhost:5173

📌 Funcionalidades
Público Geral

Home com feed do Instagram

Quem Somos

Nossas Atividades

Formulário de Voluntariado

Formulário de Doações

Intranet – Administrador

Tela de Login (JWT)

Listagem de voluntários

Listagem de doações

Exclusão com modal + “Desfazer”

Interface otimista (sem travar a tela)

🧭 Roadmap (Próximas Implementações)

Filtros (nome / data / status)

Exportação (CSV/PDF)

Dashboard com gráficos

Controle de aprovação

Melhorias de acessibilidade

Layout dark mode

👥 Contribuições

Faça um fork

Crie sua branch

git checkout -b feature-minha-feature


Commit

git commit -m "Minha contribuição"


Push

git push origin feature-minha-feature


Abra um Pull Request

