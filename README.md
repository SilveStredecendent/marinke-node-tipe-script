# API REST — marinke-node

API REST simples desenvolvida para a disciplina de Projeto Integrador, aplicando arquitetura em camadas com manipulação de dados em memória.

---

## 🛠️ Tecnologias

- **Node.js**
- **TypeScript** (ES Modules)
- **Express 5**
- **tsx** (execução e recarregamento automático em ambiente de desenvolvimento)

---

## 📁 Estrutura de Pastas

```text
marinke-node/
├── package.json
├── package-lock.json
├── tsconfig.json
├── README.md
└── src/
    ├── app.ts
    ├── models/
    │   ├── cliente.model.ts
    │   ├── funcionario.model.ts
    │   └── produtos.model.ts
    ├── controllers/
    │   ├── clientes.controller.ts
    │   ├── funcionarios.controller.ts
    │   └── produtos.controller.ts
    ├── services/
    │   ├── clientes.service.ts
    │   ├── funcionarios.service.ts
    │   └── produtos.service.ts
    └── routes/
        ├── cliente.routes.ts
        ├── funcionario.routes.ts
        └── produto.routes.ts
```

### Papel de Cada Camada

* **`models/`**: Define as classes `Cliente`, `Funcionario` e `Produto` (estrutura dos dados, tipagem e regras do domínio).
* **`services/`**: Concentra a regra de negócio, validações e dados em memória.
* **`controllers/`**: Recebe a requisição HTTP, aciona o Service e define status e resposta.
* **`routes/`**: Mapeia as URLs e verbos HTTP para as funções do Controller.
* **`app.ts`**: Ponto de entrada que inicializa o servidor Express.

---

## 🚀 Como Executar o Projeto

1. Instale as dependências:

```bash
npm install
```

2. Inicie o servidor em modo de desenvolvimento:

```bash
npm run dev
```

O servidor estará ativo em: `http://localhost:3000`.

---

## 📡 Rotas da API

### Produtos

| Método | Endpoint | Descrição | Status de Retorno |
| --- | --- | --- | --- |
| `GET` | `/produtos` | Retorna a lista de todos os produtos | `200 OK` |
| `GET` | `/produtos/:id` | Busca um produto pelo ID | `200 OK` ou `404 Not Found` |
| `POST` | `/produtos` | Cadastra um novo produto | `201 Created` ou `400 Bad Request` |

### Funcionários

| Método | Endpoint | Descrição | Status de Retorno |
| --- | --- | --- | --- |
| `GET` | `/funcionarios` | Retorna a lista de todos os funcionários | `200 OK` |
| `GET` | `/funcionarios/:id` | Busca um funcionário pelo ID | `200 OK` ou `404 Not Found` |
| `POST` | `/funcionarios` | Cadastra um novo funcionário | `201 Created` ou `400 Bad Request` |

### Clientes

| Método | Endpoint | Descrição | Status de Retorno |
| --- | --- | --- | --- |
| `GET` | `/clientes` | Retorna a lista de todos os clientes | `200 OK` |
| `GET` | `/clientes/:id` | Busca um cliente pelo ID | `200 OK` ou `404 Not Found` |
| `POST` | `/clientes` | Cadastra um novo cliente | `201 Created` ou `400 Bad Request` |

---

## 🧪 Exemplos de Requisição

### `POST /produtos`

**Corpo da requisição (JSON):**

```json
{
  "nome": "Teclado Mecânico",
  "preco": 250
}
```

**Resposta de sucesso (`201 Created`):**

```json
{
  "id": 3,
  "nome": "Teclado Mecânico",
  "preco": 250
}
```

### `POST /funcionarios`

**Corpo da requisição (JSON):**

```json
{
  "nome": "Pedro",
  "cargo": "Analista de Sistemas",
  "salario": 3800
}
```

**Resposta de sucesso (`201 Created`):**

```json
{
  "id": 3,
  "nome": "Pedro",
  "cargo": "Analista de Sistemas",
  "salario": 3800
}
```

### `POST /clientes`

**Corpo da requisição (JSON):**

```json
{
  "nome": "Ana",
  "email": "ana@example.com"
}
```

**Resposta de sucesso (`201 Created`):**

```json
{
  "id": 3,
  "nome": "Ana",
  "email": "ana@example.com"
}
```