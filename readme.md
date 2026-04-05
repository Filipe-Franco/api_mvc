📦 Sistema de Gestão de Produtos - API RESTful

API completa para gerenciamento de produtos com autenticação, upload de imagens, paginação e documentação Swagger

Características •
Arquitetura •
Instalação •
Documentação

🚀 Sobre o Projeto

Sistema de gestão de produtos desenvolvido com arquitetura MVC, demonstrando boas práticas de desenvolvimento. O projeto implementa um CRUD completo com autenticação JWT, upload de imagens, validações robustas, paginação e documentação interativa.

🎯 Objetivo

Demonstrar competências em:

    Arquitetura MVC organizada e escalável

    Autenticação segura com JWT em cookies httpOnly

    ORM com Sequelize e migrations

    Upload de arquivos com validação

    Segurança (Helmet, Rate Limiting, validação de entrada)

    Documentação com Swagger

    Boas práticas de código e versionamento

✨ Características

🔐 Autenticação

    Login com JWT armazenado em cookie httpOnly (protegido contra XSS)

    Senha criptografada com bcryptjs

    Rate limiting (5 tentativas em 15 minutos) contra brute force

    Logout com remoção do cookie

📦 CRUD de Produtos

    Listagem com paginação (5 itens/página)

    Busca por nome do produto

    Criação com upload de imagem (JPG, PNG, GIF até 2MB)

    Edição com substituição de imagem

    Exclusão física com remoção do arquivo de imagem

🛡️ Segurança (Hardening)

    Helmet para headers HTTP seguros

    Rate limiting global e específico

    Validação de entrada com express-validator

    Sanitização de dados

    Proteção contra SQL injection (Sequelize)

    Escape automático de saídas (EJS)

📝 Documentação

    Swagger UI interativa em /api-docs

    Documentação completa de todos os endpoints

    Esquemas de requisição/resposta documentados

🗄️ Banco de Dados

    SQLite com Sequelize ORM

    Migrations para versionamento do schema

    Seeds para dados iniciais

    Model com validações e timestamps automáticos

🏗️ Arquitetura


📁 projeto/
├── 📄 app.js                 # Ponto de entrada
├── 📄 swagger.js             # Configuração Swagger
├── 📄 .env                   # Variáveis de ambiente
├── 📄 .gitignore
├── 📄 package.json
│
├── 📁 config/
│   ├── database.js           # Conexão Sequelize(Banco de dados)
│   └── config.js             # Configuração CLI
│
├── 📁 migrations/            # Migrations do banco
│   └── XXXX-create-products-table.js
│
├── 📁 seeders/               # Seeds para dados iniciais
│   └── XXXX-demo-products.js
│
├── 📁 models/
│   ├── index.js              # Central de modelos
│   └── Product.js            # Modelo Produto
│
├── 📁 controllers/
│   ├── authController.js     # Lógica de autenticação
│   └── productController.js  # Lógica do CRUD
│
├── 📁 middleware/
│   ├── auth.js               # Autenticação JWT
│   ├── upload.js             # Configuração Multer
│   └── rateLimit.js          # Rate limiting
│
├── 📁 routes/
│   ├── authRoutes.js         # Rotas públicas
│   └── productRoutes.js      # Rotas protegidas
│
├── 📁 views/
│   ├── login.ejs
│   ├── products/
│   │   ├── index.ejs         # Lista com paginação
│   │   ├── new.ejs           # Formulário de criação
│   │   └── edit.ejs          # Formulário de edição
│   └── partials/
│       ├── header.ejs
│       └── footer.ejs
│
└── 📁 uploads/               # Imagens enviadas

🔧 Instalação

Pré-requisitos

    Node.js 20.x ou superior

    NPM ou Yarn

Passo a passo

    Clone o repositório

bash

git clone https://github.com/seu-usuario/seu_projeto.git

cd seu_projeto

    Instale as dependências

bash

npm install

    Configure as variáveis de ambiente
    Crie um arquivo .env na raiz:

env

PORT=3000
JWT_SECRET=(String Longa)
JWT_EXPIRES_IN=1d
DB_STORAGE=database.sqlite(Qualquer nome que quiser dar para o BD. Se trocar e necessario alterar nos arquivos de configuração do DB no /config e /models. No caso o nome que usei para o banco de dados e apimvc)
ADMIN_USERNAME=admin
ADMIN_PASSWORD_HASH=$2a$10$N9qo8uLOickgx2ZMRZoMy.MrqF6cDq3qH4qH4qH4qH4qH4qH4qH4q (Exemplo)

    ⚠️ Importante: Gere seu próprio hash de senha:
    bash

    node -e "console.log(require('bcryptjs').hashSync('sua_senha', 10))"

    Execute as migrations e seeds

bash

npm run migrate   # Cria a estrutura do banco
npm run seed      # Popula com dados de exemplo

    Inicie o servidor

bash

npm start          # Modo produção
npm run dev        # Modo desenvolvimento (nodemon)

    Acesse a aplicação

    Sistema: http://localhost:3000

    Documentação Swagger: http://localhost:3000/api-docs

    Credenciais: admin / sua_senha

📚 Documentação da API

Endpoints Principais

Método	Rota	Descrição	Autenticação
GET	/login	Página de login	Pública
POST	/login	Autenticação	Pública
GET	/logout	Logout	Pública
GET	/products	Lista produtos (paginado)	JWT
GET	/products/new	Formulário de criação	JWT
POST	/products	Cria produto + imagem	JWT
GET	/products/:id/edit	Formulário de edição	JWT
PUT	/products/:id	Atualiza produto	JWT
DELETE	/products/:id	Exclui produto	JWT
Parâmetros de Listagem
Parâmetro	Tipo	Padrão	Descrição
page	integer	1	Número da página
search	string	-	Busca por nome do produto
Exemplo de Resposta (Listagem)
json

{
  "products": [
    {
      "id": 1,
      "name": "Notebook Gamer",
      "price": 4599.99,
      "description": "RTX 3060, 16GB RAM",
      "imageUrl": "/uploads/prod-123456.jpg",
      "createdAt": "2025-01-01T00:00:00.000Z",
      "updatedAt": "2025-01-01T00:00:00.000Z"
    }
  ],
  "currentPage": 1,
  "totalPages": 3,
  "search": "notebook"
}

🛠️ Comandos Úteis

Banco de Dados

Comando	Descrição

npm run migrate	Aplica todas as migrations pendentes
npm run migrate:undo	Reverte a última migration
npm run seed	Popula o banco com dados iniciais
npm run seed:undo	Remove os dados da seed
npm run reset-db	Reseta o banco (migrate:undo + migrate + seed)

Desenvolvimento

Comando	Descrição

npm run dev	Inicia servidor com nodemon (auto-reload)
npm start	Inicia servidor em produção
npm test	Executa testes (a implementar)

🔒 Segurança Implementada

Medida	Implementação

JWT em cookie httpOnly	Previne XSS (cookie inacessível via JS)
Helmet	Headers HTTP seguros (CSP, HSTS, etc)
Rate Limiting	5 tentativas de login / 15 minutos
Validação de entrada	express-validator com sanitização
Upload seguro	Validação de tipo MIME, limite 2MB
Senhas criptografadas	bcryptjs (hash + salt)
Proteção CSRF	sameSite='strict' no cookie
SQL Injection	Sequelize prepared statements
XSS	EJS escapa automaticamente saídas

🧪 Testando a Aplicação

Fluxo completo

    Acesse http://localhost:3000

    Login com credenciais configuradas

    Crie um novo produto com imagem

    Edite o produto e substitua a imagem

    Busque produtos pelo nome

    Navegue pelas páginas da listagem

    Exclua um produto (imagem removida automaticamente)

Teste via Swagger

    Acesse http://localhost:3000/api-docs

    Faça login no sistema em uma aba separada

    Teste os endpoints diretamente pelo Swagger (cookie será enviado automaticamente)

📊 Tecnologias Utilizadas

Backend

    Node.js - Runtime JavaScript

    Express - Framework web

    Sequelize - ORM

    SQLite - Banco de dados

    JWT - Autenticação

    bcryptjs - Criptografia de senhas

Segurança

    Helmet - Headers HTTP seguros

    express-rate-limit - Rate limiting

    express-validator - Validação de entrada

    multer - Upload de arquivos

Frontend

    EJS - Template engine

    Bootstrap 5 - Estilização

Documentação

    swagger-jsdoc - Geração de especificação OpenAPI

    swagger-ui-express - Interface interativa

Ferramentas

    dotenv - Variáveis de ambiente

    nodemon - Auto-reload em desenvolvimento

    sequelize-cli - Gerenciamento de migrations

📁 Estrutura do Banco de Dados

Tabela products

Coluna	Tipo	Descrição

id	INTEGER	PK, auto incremento

name	VARCHAR(100)	Nome do produto (obrigatório)
price	DECIMAL(10,2)	Preço (obrigatório)
description	TEXT	Descrição (opcional)
image_url	VARCHAR(255)	Caminho da imagem (opcional)
created_at	DATETIME	Timestamp de criação
updated_at	DATETIME	Timestamp de atualização
