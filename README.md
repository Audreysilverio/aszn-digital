# ASZN Digital

> Plataforma oficial da **Associação Sempre Zaki Narchi** -- site
> institucional + intranet administrativa para gestão de voluntários e
> doações.

![Badge](https://img.shields.io/badge/Status-Em%20Desenvolvimento-yellow)
![Badge](https://img.shields.io/badge/React-18.0.0-blue)
![Badge](https://img.shields.io/badge/Vite-Frontend-brightgreen)
![Badge](https://img.shields.io/badge/SCSS-CSS%20Modules-red)
![Badge](https://img.shields.io/badge/License-MIT-lightgrey)

------------------------------------------------------------------------

## 📌 Sobre o projeto

O **ASZN Digital** é uma plataforma desenvolvida para modernizar a
comunicação e gestão da **Associação Sempre Zaki Narchi**, ONG
localizada na Zona Norte de São Paulo que atua com ações sociais de
grande impacto.

A solução contempla:

-   🌐 **Site institucional completo**
-   🙋 **Página de Voluntariado**
-   🎁 **Página de Doações**
-   🔐 **Intranet Administrativa** com login seguro (JWT)
-   🗂 **Gerenciamento de inscrições**
-   🗑 **Exclusão otimista** com modal + "desfazer"
-   📱 **Responsividade total**

------------------------------------------------------------------------

## 🎨 Identidade Visual

  Cor               Hex
  ----------------- -----------
  Vermelho Carmim   `#D50032`
  Branco            `#FFFFFF`
  Cinza             `#E0E0E0`
  Preto             `#000000`

------------------------------------------------------------------------

## 🧱 Arquitetura

``` mermaid
flowchart TD
A[Frontend React + Vite] -->|Axios| B[(API Flask)]
B --> C[(SQLite / PostgreSQL)]
A --> D[Intranet Admin]
D -->|CRUD| B
```

------------------------------------------------------------------------

## 🛠 Tecnologias

### Frontend

-   React\
-   Vite\
-   SCSS Modules\
-   React Router\
-   Axios\
-   Vercel deploy

### Backend

-   Flask\
-   SQLAlchemy\
-   PostgreSQL\
-   Render deploy

------------------------------------------------------------------------

## 🚀 Rodando localmente

1.  Clone o repositório\
2.  Instale dependências\
3.  Crie arquivo `.env`\
4.  `npm run dev`

------------------------------------------------------------------------

## 📁 Estrutura

    src/
      components/
      pages/
      services/
      styles/
      router/
      App.jsx

------------------------------------------------------------------------

## 📄 Licença

MIT License

------------------------------------------------------------------------

## 📞 Contato

**Audrey Silvério**\
GitHub: https://github.com/Audreysilverio

