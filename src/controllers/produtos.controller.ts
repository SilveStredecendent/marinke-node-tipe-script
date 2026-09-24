import { Request, Response } from 'express';
import * as service from '../services/produtos.service';

export const listar = (req: Request, res: Response): void => {
  const produtos = service.listar();
  res.status(200).json(produtos);
};

export const buscarPorId = (req: Request, res: Response): Response | void => {
  const id = String(req.params.id);

  const produto = service.buscarPorId(id);

  if (!produto) {
    return res.status(404).json({ mensagem: "Produto não encontrado" });
  }

  res.status(200).json(produto);
};

export const criar = (req: Request, res: Response): void => {
  try {
    const produto = service.criar(req.body);
    res.status(201).json(produto);
  } catch (error: any) {
    res.status(400).json({ mensagem: error.message });
  }
};