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