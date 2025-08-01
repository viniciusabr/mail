# 📬 Mail CSAT — Sistema de Envio de E-mails com Fila e SMTP Outlook

Automatize o envio de e-mails de lembrete para que os clientes respondam à pesquisa de satisfação (CSAT), utilizando filas com Bull e Redis. Os e-mails são enviados via Outlook, usando autenticação SMTP com senha de aplicativo.

---

<details>
  <summary>📁 Índice</summary>

* [📌 Sobre o Projeto](#-sobre-o-projeto)
* [🚀 Tecnologias Utilizadas](#-tecnologias-utilizadas)
* [✅ Funcionalidades](#-funcionalidades)
* [📦 Estrutura de Pastas](#-estrutura-de-pastas)
* [💻 Instalação e Uso](#-instalação-e-uso)
* [🔐 Segurança](#-segurança)
* [🛠️ A Implementar](#-a-implementar)
* [📬 Contato](#-contato)

</details>

---

## 📌 Sobre o Projeto

O **Mail CSAT** é um sistema full stack criado para automatizar o envio de lembretes por e-mail com foco em pesquisas de satisfação (CSAT).

* O **Mail CSAT** é um sistema full stack criado para automatizar o envio de lembretes por e-mail com foco em pesquisas de satisfação (CSAT).

* No back-end, o envio é gerenciado de forma assíncrona por meio de **filas com Bull e Redis**, garantindo estabilidade e performance. Os e-mails são enviados via **Outlook**, utilizando **autenticação SMTP com senha de aplicativo**.

* O front-end da aplicação permite o disparo manual dos lembretes e pode ser acessado neste repositório: [mail-front](https://github.com/viniciusabr/mail-front)

* A estrutura do projeto já está preparada para suportar outros provedores de envio (como Outlook com OAuth2 ou Gmail), mas, por padrão, utiliza uma conta única Outlook via SMTP, conforme necessidade atual da empresa.

---

## 🚀 Tecnologias Utilizadas

### 📦 Back-end

* [Node.js](https://nodejs.org/)
* [Express](https://expressjs.com/)
* [Nodemailer](https://nodemailer.com/about/)
* [dotenv](https://www.npmjs.com/package/dotenv)

### ⏱️ Filas

* [Bull](https://github.com/OptimalBits/bull)
* [Bull Board](https://github.com/vcapretz/bull-board)
* [ioredis](https://github.com/luin/ioredis)

### 💄 Banco de Dados

* [MySQL](https://www.mysql.com/)
* [Sequelize ORM](https://sequelize.org/)
* [Sequelize CLI](https://sequelize.org/docs/v6/other-topics/migrations/)

### 🛠️ Outros

* [Handlebars](https://handlebarsjs.com/)
* [nodemon](https://www.npmjs.com/package/nodemon)

---

## ✅ Funcionalidades

* Disparo de e-mails de lembrete para CSAT
* Enfileiramento com Bull e Redis
* Monitoramento via Bull Board
* Envio via Outlook (SMTP)
* Templates de e-mail dinâmicos (Handlebars)
* Logs de envios e falhas
* Estrutura modularizada
* Integração com front-end para disparo manual

---

## 📦 Estrutura de Pastas


```txt
src/
├── app/                         # Lógica principal da aplicação
│   ├── controllers/             # Camada de controle (HTTP)
│   ├── services/                # Regras de negócio e envio de e-mails
│   ├── models/                  # Modelos do banco via Sequelize
│   ├── routes/                  # Definição das rotas da API
│   ├── middlewares/            # Middlewares customizados
│   └── utils/                   # Templates e funções auxiliares
│
├── assets/                      # Imagens usadas nos e-mails
│
├── config/                      # Configurações (DB, SMTP, etc)
│
├── jobs/                        # Definição e processamento de jobs
│
├── queue/                       # Instância do Bull (gerenciador de filas)
│
├── database/                    # Migrations do Sequelize
│
├── scripts/                     # Scripts auxiliares (ex: fix.to-esm.js)
│
├── app.js                       # Instância do Express
└── server.js                    # Ponto de entrada da aplicação
```


---

## 💻 Instalação e Uso

1. Clone o repositório:

```bash
git clone https://github.com/viniciusabr/mail.git
cd mail
```

2. Instale as dependências:

```bash
npm install
```

3. Configure o arquivo `.env` com suas credenciais:

```env
NODE_ENV=development        # Ambiente da aplicação
PORT=3000                   # Porta local para acesso à API

# Banco de Dados
DB_USERNAME_DEV=seu_usuario     # Usuário do banco
DB_PASSWORD_DEV=sua_senha       # Senha do banco
DB_DATABASE_DEV=CSAT            # Nome do banco de dados
DB_HOST_DEV=localhost           # Host (geralmente localhost ou "db" no Docker)
DB_DIALECT_DEV=mysql            # Dialeto do banco (MySQL)
DB_PORT=3306                    # Porta padrão do MySQL

# Outlook SMTP
OUTLOOK_USER=seuemail@seudominio.com        # E-mail usado para enviar
OUTLOOK_PASS=sua_senha_de_aplicativo        # Senha de aplicativo (veja abaixo)

# JWT
JWT_SECRET=sua_chave_jwt         # Segredo usado na geração de tokens JWT
```

> 🔐 **Sobre a senha de aplicativo do Outlook:**
> Para contas com autenticação em duas etapas ativada (recomendado), você precisa gerar uma senha específica para o aplicativo. Acesse:
> [https://account.live.com/proofs/Manage/additional](https://account.live.com/proofs/Manage/additional) → "Criar uma nova senha de aplicativo". Use essa senha no campo `OUTLOOK_PASS`.

> 🐳 **Nota:** Está em desenvolvimento um arquivo `docker-compose.yml` para facilitar a execução completa da aplicação com apenas um comando, incluindo banco de dados, redis e servidor.

4. Execute as migrations:

```bash
npx sequelize-cli db:migrate
```

5. Inicie a aplicação:

```bash
npm run dev
```

6. Acesse:

* API: [http://localhost:3000](http://localhost:3000)
* Bull Board: [http://localhost:3000/admin/queues](http://localhost:3000/admin/queues)

---

## 🔐 Segurança

- ✅ Credenciais sensíveis são lidas via `.env` e o arquivo está no `.gitignore`
- ✅ Envio de e-mails via Outlook é feito com **senha de aplicativo**, evitando expor a senha principal
- ✅ O projeto usa **JWT** para autenticação de usuários, com segredo configurado por variável de ambiente

> 🔒 Novas camadas de segurança estão sendo implementadas, incluindo:
> - Proteção do painel Bull Board com autenticação (JWT ou Basic Auth)
> - Configuração de senha no Redis e isolamento por rede Docker
> - Middleware de CORS com controle de origem
---

## 🛠️ A Implementar

Algumas funcionalidades e melhorias estão previstas para versões futuras do projeto:

- [ ] **Autenticação no painel Bull Board** — proteger o acesso com middleware (JWT ou Basic Auth)
- [ ] **Criação de arquivo `docker-compose.yml` definitivo** — com orquestração completa dos serviços (Node, Redis, MySQL) e variáveis de ambiente integradas
- [ ] **Endpoint de verificação de status da fila** — rota `/status` para retornar informações básicas sobre o serviço e a fila
- [ ] **Validações mais robustas no envio de e-mails** — evitar envios com campos incompletos ou inválidos
- [ ] **Log estruturado com Winston ou Pino** — padronizar os logs para facilitar monitoramento e debug
- [ ] **Configuração de CORS com lista branca de origens** — controle de quem pode acessar a API
- [ ] **Implementação de autenticação confiável via Outlook com suporte a dois fatores** — aguardando liberação do aplicativo seguro na Azure para uso em produção
- [ ] **Criação de testes automatizados (Jest ou Vitest)** — para garantir estabilidade nas principais rotas e funcionalidades
- [ ] **Documentação Swagger/OpenAPI** — para facilitar integração e testes dos endpoints da API

> 💡 Sugestões e contribuições são bem-vindas para priorizar e implementar os itens acima.

---

## 📬 Contato

* Silas Oliveira
  [silas.oliveira.dev@gmail.com](mailto:silas.oliveira.dev@gmail.com)
  [silas.oliveira@linx.com.br](mailto:silas.oliveira@linx.com.br)

* Vinicius Abreu
  [vinicius.abreu@linx.com.br](mailto:vinicius.abreu@linx.com.br)

  <sub>// Dedicated to T.S.</sub>

