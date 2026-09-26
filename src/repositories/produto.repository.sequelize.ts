import type { IProdutoRepository } from './produto.repository.interface.js';
import { ProdutoOrm } from '../models/produto.orm.js';
import { Produto, type IProduto } from '../models/produtos.model.js';

function paraDominio(registro: ProdutoOrm): Produto {
  return new Produto({ id: registro.id, nome: registro.nome, preco: registro.preco });
}

export class ProdutoRepositorySequelize implements IProdutoRepository {
  async listar(): Promise<Produto[]> {
    const registros = await ProdutoOrm.findAll();
    return registros.map(paraDominio);
  }

  async buscarPorId(id: number): Promise<Produto | null> {
    const registro = await ProdutoOrm.findByPk(id);
    return registro ? paraDominio(registro) : null;
  }

  async criar(dados: IProduto): Promise<Produto> {
    const registro = await ProdutoOrm.create({ nome: dados.nome, preco: dados.preco });
    return paraDominio(registro);
  }

  async atualizar(id: number, dados: Partial<IProduto>): Promise<Produto | null> {
    const registro = await ProdutoOrm.findByPk(id);
    if (!registro) return null;
    await registro.update(dados);
    return paraDominio(registro);
  }

  async deletar(id: number): Promise<boolean> {
    const linhasApagadas = await ProdutoOrm.destroy({ where: { id } });
    return linhasApagadas > 0;
  }
}