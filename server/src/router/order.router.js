import { Router } from 'express';
const router = Router();
import { createOrder, getOrders, getOrderByCode } from '../controllers/orders.controller.js';
import { authentication } from '../middlewares/auth.js';
import { authorization } from '../../utils.js';

// ORDERS
router.post('/', authentication, createOrder);
router.get('/', authentication, authorization('admin'), getOrders);
router.get('/:code', authentication, getOrderByCode);

export default router;