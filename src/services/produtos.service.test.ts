import { ProdutoService } from './produtos.service.js';
import type { IProdutoRepository } from '../repositories/produto.repository.interface.js';
import { Produto } from '../models/produtos.model.js';

function criarRepositorioFalso(): jest.Mocked<IProdutoRepository> {
  return {
    listar: jest.fn(),
    buscarPorId: jest.fn(),
    criar: jest.fn(),
    atualizar: jest.fn(),
    deletar: jest.fn(),
  };
}

describe('ProdutoService', () => {
  it('lista produtos vindos do repositório', async () => {
    const repo = criarRepositorioFalso();
    repo.listar.mockResolvedValue([new Produto({ id: 1, nome: 'Mouse', preco: 100 })]);

    const service = new ProdutoService(repo);
    const resultado = await service.listar();

    expect(resultado).toHaveLength(1);
    expect(repo.listar).toHaveBeenCalledTimes(1);
  });

  it('busca produto por id', async () => {
    const repo = criarRepositorioFalso();
    repo.buscarPorId.mockResolvedValue(new Produto({ id: 1, nome: 'Mouse', preco: 100 }));

    const service = new ProdutoService(repo);
    const resultado = await service.buscarPorId(1);

    expect(resultado?.nome).toBe('Mouse');
  });

  it('cria produto válido', async () => {
    const repo = criarRepositorioFalso();
    repo.criar.mockResolvedValue(new Produto({ id: 1, nome: 'Teclado', preco: 200 }));

    const service = new ProdutoService(repo);
    const produto = await service.criar({ nome: 'Teclado', preco: 200 });

    expect(produto.id).toBe(1);
    expect(repo.criar).toHaveBeenCalledWith({ nome: 'Teclado', preco: 200 });
  });

  it('rejeita criação sem nome', async () => {
    const repo = criarRepositorioFalso();
    const service = new ProdutoService(repo);

    await expect(service.criar({ nome: '', preco: 100 })).rejects.toThrow(
      'nome e preco são obrigatórios'
    );
  });

  it('rejeita criação com preco negativo', async () => {
    const repo = criarRepositorioFalso();
    const service = new ProdutoService(repo);

    await expect(service.criar({ nome: 'Item', preco: -10 })).rejects.toThrow(
      'preco deve ser um número positivo'
    );
  });

  it('atualiza produto existente', async () => {
    const repo = criarRepositorioFalso();
    repo.atualizar.mockResolvedValue(new Produto({ id: 1, nome: 'Mouse Pro', preco: 150 }));

    const service = new ProdutoService(repo);
    const produto = await service.atualizar(1, { nome: 'Mouse Pro' });

    expect(produto?.nome).toBe('Mouse Pro');
  });

  it('retorna null ao atualizar produto inexistente', async () => {
    const repo = criarRepositorioFalso();
    repo.atualizar.mockResolvedValue(null);

    const service = new ProdutoService(repo);
    const produto = await service.atualizar(999, { nome: 'X' });

    expect(produto).toBeNull();
  });

  it('rejeita atualização com preco negativo', async () => {
    const repo = criarRepositorioFalso();
    const service = new ProdutoService(repo);

    await expect(service.atualizar(1, { preco: -5 })).rejects.toThrow(
      'preco deve ser um número positivo'
    );
  });

  it('deleta produto', async () => {
    const repo = criarRepositorioFalso();
    repo.deletar.mockResolvedValue(true);

    const service = new ProdutoService(repo);
    const resultado = await service.deletar(1);

    expect(resultado).toBe(true);
  });
});