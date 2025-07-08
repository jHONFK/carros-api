# Carros API

API RESTful de gerenciamento de usuários e seus carros.

---

## Tecnologias

- **Node.js 20.16.0**
- **TypeScript**
- **Express**
- **SQLite** (via **Prisma ORM**)
- **Zod** (validação de dados)
- **JSON Web Tokens** (autenticação/autorização)
- **bcryptjs** (hash de senhas)
- **dotenv** (variáveis de ambiente)

---

## Estrutura de Pastas

```
carros-api/
├── prisma/
│   ├── schema.prisma
│   └── migrations/
├── src/
│   ├── controllers/
│   ├── middlewares/
│   ├── repositories/
│   ├── routes/
│   ├── schemas/
│   ├── services/
│   ├── utils/
│   ├── app.ts
│   └── server.ts
├── .env
├── package.json
└── tsconfig.json
```

---

## Instalação

1. Clone este repositório:
   ```bash
   git clone https://github.com/seu-usuario/carros-api.git
   cd carros-api
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Crie um arquivo `.env` na raiz do projeto, copiando o modelo abaixo:

   ```dotenv
   # .env
   DATABASE_URL="file:./dev.db"
   JWT_SECRET="sua_chave_super_secreta_aqui"
   PORT=3000
   ```

---

## Banco de Dados

Este projeto usa **SQLite** como banco de dados. Para inicializar:

1. Gere a migração inicial e crie o arquivo `dev.db`:

   ```bash
   npx prisma migrate dev --name init
   ```

   Ou, se preferir sincronizar sem histórico de migrações:

   ```bash
   npx prisma db push
   ```

2. (Opcional) Abra o Prisma Studio para inspecionar e editar os dados:

   ```bash
   npx prisma studio
   ```

---

## Executando a API

- **Modo desenvolvimento** (reload automático):
  ```bash
  npm run dev
  ```

- **Compilar para produção**:
  ```bash
  npm run build
  node dist/server.js
  ```

Por padrão, o servidor roda em `http://localhost:3000` (ou na porta definida em `PORT`).

---

## Autenticação

- **Registro público**  
  `POST /register`  
  - Body JSON:  
    ```json
    { "name": "Seu Nome", "email": "you@example.com", "password": "senha123" }
    ```
  - Resposta:
    ```json
    {
      "status": "success",
      "data": {
        "id": 1,
        "name": "...",
        "email": "...",
        "role": "USER",
        "createdAt": "2025-07-08T..."
      }
    }
    ```

- **Login público**  
  `POST /login`  
  - Body JSON:  
    ```json
    { "email": "you@example.com", "password": "senha123" }
    ```
  - Resposta:
    ```json
    {
      "status": "success",
      "data": { "token": "<JWT_TOKEN>" }
    }
    ```

Use o token JWT retornado em todas as chamadas protegidas, no header:
```
Authorization: Bearer <JWT_TOKEN>
```

---

## Endpoints

### Usuários (apenas ADMIN)

> Rotas protegidas por `authMiddleware` + `ensureRole('ADMIN')`

- **POST** `/users`  
  Cria um novo usuário (ADMIN).

- **GET** `/users`  
  Lista todos os usuários.

- **GET** `/users/:id`  
  Busca usuário por ID.

- **PATCH** `/users/:id`  
  Atualiza dados de um usuário (name, email, password, role).

- **DELETE** `/users/:id`  
  Remove um usuário.

### Carros (usuário autenticado)

> Rotas protegidas por `authMiddleware`

- **POST** `/cars`  
  Cria um novo carro para o usuário logado.  
  Body:
  ```json
  { "brand": "Toyota", "model": "Corolla", "year": 2020 }
  ```

- **GET** `/cars`  
  Lista todos os carros do usuário logado.

- **GET** `/cars/:id`  
  Busca um carro por ID (apenas se pertencer ao usuário).

- **PATCH** `/cars/:id`  
  Atualiza um carro do usuário. Body com campos parciais.

- **DELETE** `/cars/:id`  
  Exclui um carro do usuário.

---
