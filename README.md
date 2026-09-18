# API de Produtos - Node.js com Express

API REST simples desenvolvida para a disciplina de Projeto Integrador, aplicando arquitetura em camadas com manipulação de dados em memória.

---

## 🛠️ Tecnologias

- **Node.js**
- **Express**
- **Nodemon** (reinicialização automática em ambiente de desenvolvimento)

---

## 📁 Estrutura de Pastas

```text
marinke-node/
├── package.json
├── package-lock.json
├── README.md
└── src/
    ├── index.js
    ├── models/
    │   └── produto.model.js
    ├── controllers/
    │   └── produto.controller.js
    ├── services/
    │   └── produtos.service.js
    └── routes/
        └── produto.routes.js

```

### Papel de Cada Camada

* **`models/`**: Define a classe `Produto` (estrutura dos dados e regras do domínio).
* **`services/`**: Concentra a regra de negócio, validações e dados em memória.
* **`controllers/`**: Recebe a requisição HTTP, aciona o Service e define status e resposta.
* **`routes/`**: Mapeia as URLs e verbos HTTP para as funções do Controller.
* **`index.js`**: Ponto de entrada que inicializa o servidor Express.

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

| Método | Endpoint | Descrição | Status de Retorno |
| --- | --- | --- | --- |
| `GET` | `/produtos` | Retorna a lista de todos os produtos | `200 OK` |
| `GET` | `/produtos/:id` | Busca um produto pelo ID | `200 OK` ou `404 Not Found` |
| `POST` | `/produtos` | Cadastra um novo produto | `201 Created` ou `400 Bad Request` |

---

## 🧪 Exemplo de Requisição (POST `/produtos`)

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
