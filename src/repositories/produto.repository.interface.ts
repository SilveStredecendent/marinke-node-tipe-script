import type { Produto, IProduto } from '../models/produtos.model.js';

export interface IProdutoRepository {
  listar(): Promise<Produto[]>;
  buscarPorId(id: number): Promise<Produto | null>;
  criar(dados: IProduto): Promise<Produto>;
  atualizar(id: number, dados: Partial<IProduto>): Promise<Produto | null>;
  deletar(id: number): Promise<boolean>;
}