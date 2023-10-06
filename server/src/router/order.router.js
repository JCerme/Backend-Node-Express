import { Router } from 'express';
const router = Router();
import { createOrder, getOrders, getOrderByCode } from '../controllers/orders.controller.js';
import { isAdmin } from '../helpers/admin.js';

// ORDERS
router.post('/', createOrder);
router.get('/', isAdmin, getOrders);
router.get('/:code', getOrderByCode);

export default router;