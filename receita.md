# Receita — Como o projeto foi construído

Este documento registra o passo a passo de construção da API, as decisões tomadas e o porquê de cada uma, incluindo a migração de JavaScript (CommonJS) para TypeScript (ES Modules).

---

## Passo 0: Instalação do Node.js (Ambiente Local)

*Caso utilize o GitHub Codespaces, pule este passo (o Node já vem instalado).*

1. Acesse o site oficial ([nodejs.org](https://nodejs.org)) e baixe a versão **LTS**.
2. Conclua a instalação padrão do instalador.
3. Valide a presença das ferramentas no terminal:

```bash
node -v
npm -v
```

---

## Passo 1: Inicialização do Projeto

Crie e abra a pasta do projeto no terminal e execute:

```bash
npm init -y
```

* **O que faz:** Gera o arquivo `package.json` com as configurações padrão.

---

## Passo 2: Instalação das Dependências

```bash
npm install express
npm install --save-dev typescript tsx @types/node @types/express
```

* **express:** Cria o servidor, middlewares e gerencia requisições HTTP.
* **typescript:** Adiciona tipagem estática ao projeto.
* **tsx:** Executa arquivos `.ts` diretamente e reinicia a aplicação automaticamente ao salvar (substitui o `nodemon` + `ts-node`, que exigiam duas ferramentas separadas para o mesmo trabalho).
* **@types/node** e **@types/express:** Fornecem as definições de tipo para o Node e o Express, já que essas bibliotecas são escritas originalmente em JavaScript puro.

### Por que TypeScript em vez de JavaScript puro

* Detecta erros de tipo (ex.: passar uma `string` onde se espera um `number`) ainda em tempo de desenvolvimento, antes de rodar o código.
* Interfaces (`ICliente`, `IProduto`, `IFuncionario`) documentam o formato esperado dos dados, servindo de contrato entre as camadas.
* Editor com autocomplete mais preciso, já que ele conhece a forma exata dos objetos.

### Por que ES Modules (`import`/`export`) em vez de CommonJS (`require`/`module.exports`)

* É o padrão moderno da linguagem JavaScript (não é exclusivo do Node).
* Permite `import { type X }`, separando tipos de valores na importação — mais claro sobre o que é apagado na compilação e o que vira código real.
* Exige a extensão `.js` nos imports relativos (mesmo em arquivos `.ts`), porque em runtime o Node já está lendo o arquivo compilado.

---

## Passo 3: Criação da Estrutura de Pastas e Arquivos

```text
marinke-node/
├── package.json
├── package-lock.json
├── tsconfig.json
├── README.md
├── receita.md
└── src/
    ├── app.ts
    ├── models/
    │   ├── cliente.model.ts
    │   ├── funcionario.model.ts
    │   └── produtos.model.ts
    ├── services/
    │   ├── clientes.service.ts
    │   ├── funcionarios.service.ts
    │   └── produtos.service.ts
    ├── controllers/
    │   ├── clientes.controller.ts
    │   ├── funcionarios.controller.ts
    │   └── produtos.controller.ts
    └── routes/
        ├── cliente.routes.ts
        ├── funcionario.routes.ts
        └── produto.routes.ts
```

### Papel de cada pasta

* **`models/`:** Classes e interfaces que definem a estrutura de cada entidade (dados) e seus comportamentos de domínio (ex.: `estaEmPromocao()`).
* **`services/`:** Centraliza regras de negócio, validações e a persistência (simulada com arrays em memória).
* **`controllers/`:** Converte requisições HTTP (`Request`) em chamadas ao Service e responde com status e JSON (`Response`).
* **`routes/`:** Liga os verbos HTTP (GET, POST) e as URLs aos métodos do Controller.
* **`app.ts`:** Ponto de entrada que registra as rotas e sobe o servidor Express na porta desejada.

### Por que separar em camadas (em vez de tudo em um arquivo só)

* Cada camada tem uma única responsabilidade: rota decide "qual URL", controller decide "o que responder", service decide "a regra", model decide "o formato dos dados".
* Facilita testar a regra de negócio (`service`) sem precisar simular uma requisição HTTP.
* Se um dia os dados saírem da memória para um banco real, só a camada `service` muda — `controllers` e `routes` continuam iguais.

---

## Passo 4: Configuração do Script de Execução

No `package.json`:

```json
"scripts": {
  "dev": "tsx watch src/app.ts",
  "build": "tsc",
  "start": "node dist/app.js"
}
```

* **`dev`:** roda o TypeScript diretamente, sem gerar arquivos, e reinicia sozinho a cada alteração salva.
* **`build`:** compila os `.ts` para `.js` puro (pasta `dist/`), usando as regras do `tsconfig.json`.
* **`start`:** roda a versão já compilada — o modo pensado para produção, sem depender do `tsx`.

---

## Passo 5: Implementação do Código (De Dentro para Fora)

A ordem de construção segue de dentro para fora: primeiro o formato do dado, depois a regra, depois a exposição HTTP.

### 1. O Model (`src/models/produtos.model.ts`)

```typescript
export interface IProduto {
  id?: number;
  nome: string;
  preco: number;
}

export class Produto {
  id?: number | undefined;
  nome: string;
  preco: number;

  constructor({ id, nome, preco }: IProduto) {
    this.id = id;
    this.nome = nome;
    this.preco = preco;
  }

  estaEmPromocao(): boolean {
    return this.preco < 100;
  }
}
```

A interface `IProduto` descreve o "formato de entrada" (o que chega, por exemplo, no corpo de um POST), e a classe `Produto` é a entidade real, com comportamento próprio (`estaEmPromocao`).

### 2. O Service (`src/services/produtos.service.ts`)

```typescript
import { Produto, type IProduto } from "../models/produtos.model.js";

const produtos: Produto[] = [
  new Produto({ id: 1, nome: "Notebook", preco: 3500 }),
  new Produto({ id: 2, nome: "Mouse", preco: 120 })
];

export function listar(): Produto[] {
  return produtos;
}

export function buscarPorId(id: string | number): Produto | undefined {
  return produtos.find(p => p.id === Number(id));
}

export function criar(dados: IProduto): Produto {
  if (!dados.nome || dados.preco == null) {
    throw new Error("nome e preco são obrigatórios");
  }

  const produto = new Produto({
    id: produtos.length + 1,
    nome: dados.nome,
    preco: dados.preco
  });

  produtos.push(produto);
  return produto;
}
```

O array `produtos` faz o papel de "banco de dados" enquanto o projeto não persiste em disco. `listar`, `buscarPorId` e `criar` concentram toda a regra: é aqui que a validação acontece, não no controller.

### 3. O Controller (`src/controllers/produtos.controller.ts`)

```typescript
import { type Request, type Response } from 'express';
import * as service from '../services/produtos.service.js';

export const listar = (req: Request, res: Response): void => {
  const produtos = service.listar();
  res.status(200).json(produtos);
};

export const buscarPorId = (req: Request<{ id: string }>, res: Response): void => {
  const produto = service.buscarPorId(req.params.id);

  if (!produto) {
    res.status(404).json({ mensagem: "Produto não encontrado" });
    return;
  }

  res.status(200).json(produto);
};

export const criar = (req: Request, res: Response): void => {
  try {
    const produto = service.criar(req.body);
    res.status(201).json(produto);
  } catch (error) {
    const mensagem = error instanceof Error ? error.message : "Erro desconhecido";
    res.status(400).json({ mensagem });
  }
};
```

O controller nunca acessa o array de produtos diretamente — só fala com o service. `Request<{ id: string }>` tipa explicitamente o parâmetro de rota, evitando o tipo genérico `string | string[]` que o Express 5 usa por padrão.

### 4. As Routes (`src/routes/produto.routes.ts`)

```typescript
import { Router } from 'express';
import * as controller from '../controllers/produtos.controller.js';

const router = Router();

router.get("/", controller.listar);
router.get("/:id", controller.buscarPorId);
router.post("/", controller.criar);

export default router;
```

### 5. O `app.ts`

```typescript
import express, { type Request, type Response } from 'express';
import produtoRoutes from './routes/produto.routes.js';
import funcionarioRoutes from './routes/funcionario.routes.js';
import clientesRouter from './routes/cliente.routes.js';

const app = express();

app.use(express.json());

app.use("/produtos", produtoRoutes);
app.use("/funcionarios", funcionarioRoutes);
app.use("/clientes", clientesRouter);

app.get("/", (req: Request, res: Response) => {
    res.send("API está rodando perfeitamente! Acesse /produtos, /funcionarios ou /clientes");
});

app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000!");
});
```

Os domínios de `funcionarios` e `clientes` seguem exatamente a mesma receita (model → service → controller → routes), só trocando os campos da entidade.

---

## Passo 6: Execução e Testes

1. No terminal do projeto, execute:

```bash
npm install
npm run dev
```

2. **Testar GET (Listagem):** abra no navegador `http://localhost:3000/produtos`.
3. **Testar GET por ID:** acesse `http://localhost:3000/produtos/1`.
4. **Testar POST (Criação):** no Thunder Client ou `curl`, envie um `POST` para `http://localhost:3000/produtos` com o corpo JSON:

```json
{
  "nome": "Monitor Gamer",
  "preco": 1350
}
```

*Retorno esperado: Status 201 Created com os dados do novo produto instanciado pelo Model.*

---

## Decisões e alternativas consideradas

| Decisão tomada | Alternativa possível | Por que não foi usada aqui |
| --- | --- | --- |
| `tsx` para dev | `nodemon` + `ts-node` | Duas dependências fazendo o trabalho de uma; `tsx` é mais rápido e mais simples de configurar |
| Dados em memória (array) | Banco real (SQLite/Postgres) | Fora do escopo da disciplina neste momento; troca isolada na camada `service` quando necessário |
| Validação manual (`if`) | Biblioteca como `zod` | Suficiente para o tamanho atual do projeto; pode evoluir se a validação ficar mais complexa |
| Arquitetura em camadas | Tudo em um arquivo `index.ts` | Facilita manutenção e é o padrão exigido pela disciplina |