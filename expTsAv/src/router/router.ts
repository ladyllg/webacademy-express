import { Router } from 'express';
import mainController from '../controllers/main';
import deptController from '../controllers/departamento';
import checkAuth from '../middlewares/checkAuth';
import { setLocals } from '../middlewares/setLocals';

const router = Router();

// Main controller
router.get('/', mainController.index);
router.get('/about', mainController.about);
router.get('/ui', mainController.ui);

// Departamento controller
router.get('/dept', checkAuth, setLocals, deptController.index);
router.get('/dept/create', checkAuth, setLocals, deptController.create);
router.post('/dept/create', checkAuth, setLocals, deptController.create);
router.get('/dept/update/:id', checkAuth, setLocals, deptController.update);
router.post('/dept/update/:id', checkAuth, setLocals, deptController.update);
router.get('/dept/:id', checkAuth, setLocals, deptController.read);

router.get('/dept/del/:id', checkAuth, setLocals, deptController.del);
router.post('/dept/del/:id', checkAuth, setLocals, deptController.del);

router.get('/create-cookie', mainController.createCookie);
router.get('/clear-cookie', mainController.clearCookie);

router.get('/login', mainController.login);
router.post('/login', mainController.login);
router.get('/logout', mainController.logout);

export default router;
