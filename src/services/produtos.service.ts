import { Produto, IProduto } from "../models/produto.model";

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