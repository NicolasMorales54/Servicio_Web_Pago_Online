import { Router } from 'express';
import { getGatos, createGato, getGato } from '../controller/gato.controller.js';

const router = Router();

router.get('/', getGatos);
router.post('/', createGato);
router.get('/:id', getGato);



export default router;