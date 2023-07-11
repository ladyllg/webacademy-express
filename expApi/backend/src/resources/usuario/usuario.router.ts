import { Router } from 'express';
import usuarioController from './usuario.controller';
import checkAdmin from '../../middlewares/checkAdmin';
const router = Router();

// usuario controller
router.get('/', usuarioController.index);
router.post('/', checkAdmin, usuarioController.create);
router.get('/:id', usuarioController.read);
router.put('/:id', usuarioController.update);
router.delete('/:id', checkAdmin, usuarioController.remove);

export default router;