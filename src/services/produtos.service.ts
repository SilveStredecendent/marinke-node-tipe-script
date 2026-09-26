import type { IProdutoRepository } from '../repositories/produto.repository.interface.js';
import type { Produto, IProduto } from '../models/produtos.model.js';

export class ProdutoService {
  constructor(private repository: IProdutoRepository) {}

  listar(): Promise<Produto[]> {
    return this.repository.listar();
  }

  buscarPorId(id: number): Promise<Produto | null> {
    return this.repository.buscarPorId(id);
  }

  async criar(dados: IProduto): Promise<Produto> {
    if (!dados.nome || dados.preco == null) {
      throw new Error('nome e preco são obrigatórios');
    }
    if (dados.preco < 0) {
      throw new Error('preco deve ser um número positivo');
    }
    return this.repository.criar(dados);
  }

  async atualizar(id: number, dados: Partial<IProduto>): Promise<Produto | null> {
    if (dados.preco != null && dados.preco < 0) {
      throw new Error('preco deve ser um número positivo');
    }
    return this.repository.atualizar(id, dados);
  }

  deletar(id: number): Promise<boolean> {
    return this.repository.deletar(id);
  }
}