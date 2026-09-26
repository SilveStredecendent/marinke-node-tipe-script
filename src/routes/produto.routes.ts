import { Router } from 'express';
import { ProdutoController } from '../controllers/produtos.controller.js';
import { ProdutoService } from '../services/produtos.service.js';
import { ProdutoRepositorySequelize } from '../repositories/produto.repository.sequelize.js';

const repository = new ProdutoRepositorySequelize();
const service = new ProdutoService(repository);
const controller = new ProdutoController(service);

const router = Router();

router.get('/', controller.listar);
router.get('/:id', controller.buscarPorId);
router.post('/', controller.criar);
router.put('/:id', controller.atualizar);
router.delete('/:id', controller.remover);

export default router;