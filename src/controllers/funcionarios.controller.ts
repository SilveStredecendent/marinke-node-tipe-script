import { type Request, type Response } from 'express';
import * as service from '../services/funcionarios.service.js';

export const listar = (req: Request, res: Response): void => {
  const funcionarios = service.listar();
  res.status(200).json(funcionarios);
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
    const funcionario = service.criar(req.body);
    res.status(201).json(funcionario);
  } catch (error: any) {
    res.status(400).json({ mensagem: error.message });
  }
};      