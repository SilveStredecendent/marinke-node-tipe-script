import { ProdutoController } from './produtos.controller.js';
import type { ProdutoService } from '../services/produtos.service.js';
import { Produto } from '../models/produtos.model.js';
import type { Request, Response } from 'express';

function criarResposta(): Response {
  const res = {} as Response;
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  res.send = jest.fn().mockReturnValue(res);
  return res;
}

function criarServicoFalso(): jest.Mocked<ProdutoService> {
  return {
    listar: jest.fn(),
    buscarPorId: jest.fn(),
    criar: jest.fn(),
    atualizar: jest.fn(),
    deletar: jest.fn(),
  } as unknown as jest.Mocked<ProdutoService>;
}

describe('ProdutoController', () => {
  it('GET / retorna 200 com a lista', async () => {
    const service = criarServicoFalso();
    service.listar.mockResolvedValue([new Produto({ id: 1, nome: 'Mouse', preco: 100 })]);
    const controller = new ProdutoController(service);
    const res = criarResposta();

    await controller.listar({} as Request, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalled();
  });

  it('GET /:id retorna 404 se não encontrar', async () => {
    const service = criarServicoFalso();
    service.buscarPorId.mockResolvedValue(null);
    const controller = new ProdutoController(service);
    const res = criarResposta();

    await controller.buscarPorId({ params: { id: '99' } } as any, res);

    expect(res.status).toHaveBeenCalledWith(404);
  });

  it('GET /:id retorna 200 se encontrar', async () => {
    const service = criarServicoFalso();
    service.buscarPorId.mockResolvedValue(new Produto({ id: 1, nome: 'Mouse', preco: 100 }));
    const controller = new ProdutoController(service);
    const res = criarResposta();

    await controller.buscarPorId({ params: { id: '1' } } as any, res);

    expect(res.status).toHaveBeenCalledWith(200);
  });

  it('POST / retorna 201 ao criar', async () => {
    const service = criarServicoFalso();
    service.criar.mockResolvedValue(new Produto({ id: 1, nome: 'Mouse', preco: 100 }));
    const controller = new ProdutoController(service);
    const res = criarResposta();

    await controller.criar({ body: { nome: 'Mouse', preco: 100 } } as Request, res);

    expect(res.status).toHaveBeenCalledWith(201);
  });

  it('POST / retorna 400 em erro de validação', async () => {
    const service = criarServicoFalso();
    service.criar.mockRejectedValue(new Error('nome e preco são obrigatórios'));
    const controller = new ProdutoController(service);
    const res = criarResposta();

    await controller.criar({ body: {} } as Request, res);

    expect(res.status).toHaveBeenCalledWith(400);
  });

  it('PUT /:id retorna 200 ao atualizar', async () => {
    const service = criarServicoFalso();
    service.atualizar.mockResolvedValue(new Produto({ id: 1, nome: 'Mouse Pro', preco: 150 }));
    const controller = new ProdutoController(service);
    const res = criarResposta();

    await controller.atualizar({ params: { id: '1' }, body: { nome: 'Mouse Pro' } } as any, res);

    expect(res.status).toHaveBeenCalledWith(200);
  });

  it('PUT /:id retorna 404 se não encontrar', async () => {
    const service = criarServicoFalso();
    service.atualizar.mockResolvedValue(null);
    const controller = new ProdutoController(service);
    const res = criarResposta();

    await controller.atualizar({ params: { id: '99' }, body: {} } as any, res);

    expect(res.status).toHaveBeenCalledWith(404);
  });

  it('PUT /:id retorna 400 em erro de validação', async () => {
    const service = criarServicoFalso();
    service.atualizar.mockRejectedValue(new Error('preco deve ser um número positivo'));
    const controller = new ProdutoController(service);
    const res = criarResposta();

    await controller.atualizar({ params: { id: '1' }, body: { preco: -5 } } as any, res);

    expect(res.status).toHaveBeenCalledWith(400);
  });

  it('DELETE /:id retorna 204 ao remover', async () => {
    const service = criarServicoFalso();
    service.deletar.mockResolvedValue(true);
    const controller = new ProdutoController(service);
    const res = criarResposta();

    await controller.remover({ params: { id: '1' } } as any, res);

    expect(res.status).toHaveBeenCalledWith(204);
  });

  it('DELETE /:id retorna 404 se não encontrar', async () => {
    const service = criarServicoFalso();
    service.deletar.mockResolvedValue(false);
    const controller = new ProdutoController(service);
    const res = criarResposta();

    await controller.remover({ params: { id: '99' } } as any, res);

    expect(res.status).toHaveBeenCalledWith(404);
  });
});