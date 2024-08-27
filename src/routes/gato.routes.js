import { Router } from 'express';
import { getGatos, createGato, getGato, registro} from '../controller/gato.controller.js';

const router = Router();

router.get('/', getGatos);
router.post('/', createGato);
router.get('/:id', getGato);
router.post('/registro', registro);



export default router;