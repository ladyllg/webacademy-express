import { Router } from 'express';
import checkAdmin from '../../middlewares/checkAdmin';
import produtoController from './produto.controller';
const router = Router();

// Produto controller
router.get('/', produtoController.index);
router.post('/', checkAdmin, produtoController.create);
router.get('/:id', produtoController.read);
router.put('/:id', checkAdmin, produtoController.update);
router.delete('/:id', checkAdmin, produtoController.remove);

export default router;