import { type Request, type Response } from 'express';
import * as service from '../services/clientes.service.js';

export const listar = (req: Request, res: Response): void => {
    const clientes = service.listar();
    res.status(200).json(clientes);
};

export const buscarPorId = (req: Request, res: Response): Response | void => {
  
  const id = String(req.params.id); 
    
    const cliente = service.buscarPorId(id);

    if (!cliente) {
        return res.status(404).json({ mensagem: "Cliente não encontrado" });
    }

    res.status(200).json(cliente);
};

export const criar = (req: Request, res: Response): void => {
    try {
        const cliente = service.criar(req.body);
        res.status(201).json(cliente);
    } catch (error: any) {
        res.status(400).json({ mensagem: error.message });
    }
};