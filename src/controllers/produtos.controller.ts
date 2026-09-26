import { type Request, type Response } from 'express';
import type { ProdutoService } from '../services/produtos.service.js';

export class ProdutoController {
  constructor(private service: ProdutoService) {}

  listar = async (req: Request, res: Response): Promise<void> => {
    const produtos = await this.service.listar();
    res.status(200).json(produtos);
  };

  buscarPorId = async (req: Request<{ id: string }>, res: Response): Promise<void> => {
    const produto = await this.service.buscarPorId(Number(req.params.id));
    if (!produto) {
      res.status(404).json({ mensagem: 'Produto não encontrado' });
      return;
    }
    res.status(200).json(produto);
  };

  criar = async (req: Request, res: Response): Promise<void> => {
    try {
      const produto = await this.service.criar(req.body);
      res.status(201).json(produto);
    } catch (error) {
      const mensagem = error instanceof Error ? error.message : 'Erro desconhecido';
      res.status(400).json({ mensagem });
    }
  };

  atualizar = async (req: Request<{ id: string }>, res: Response): Promise<void> => {
    try {
      const produto = await this.service.atualizar(Number(req.params.id), req.body);
      if (!produto) {
        res.status(404).json({ mensagem: 'Produto não encontrado' });
        return;
      }
      res.status(200).json(produto);
    } catch (error) {
      const mensagem = error instanceof Error ? error.message : 'Erro desconhecido';
      res.status(400).json({ mensagem });
    }
  };

  remover = async (req: Request<{ id: string }>, res: Response): Promise<void> => {
    const removido = await this.service.deletar(Number(req.params.id));
    if (!removido) {
      res.status(404).json({ mensagem: 'Produto não encontrado' });
      return;
    }
    res.status(204).send();
  };
}