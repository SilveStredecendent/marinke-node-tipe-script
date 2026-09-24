import { Request, Response } from 'express';
import * as service from '../services/funcionarios.service';

export const listar = (req: Request, res: Response): void => {
  const funcionarios = service.listar();
  res.status(200).json(funcionarios);
};

export const buscarPorId = (req: Request, res: Response): Response | void => {
  const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const funcionario = service.buscarPorId(id);

  if (!funcionario) {
    return res.status(404).json({ mensagem: "Funcionário não encontrado" });
  }

  res.status(200).json(funcionario);
};

export const criar = (req: Request, res: Response): void => {
  try {
    const funcionario = service.criar(req.body);
    res.status(201).json(funcionario);
  } catch (error: any) {
    res.status(400).json({ mensagem: error.message });
  }
};      