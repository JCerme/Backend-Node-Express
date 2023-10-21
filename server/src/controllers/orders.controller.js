import { orderService } from "../services/index.js";
import response from "../helpers/response.js";
import { uid } from 'uid';

export const createOrder = async (req, res, next) => {
    try {
        req.body.purchaser = req.session.user;
        req.body.code = uid(10);
        req.body.purchase_date = new Date();
        const result = await orderService.createOrder(req.body);
        const status = result.status === 201 ? 'success' : 'fail';
        res.send(await response(status, result, req.query))
    } catch (error) {
        req.logger.error(error);
        next(error);
    }
}

export const getOrders = async (req, res, next) => {
    try {
        const result = await orderService.getOrders();
        res.send(await response('success', result, req.query))
    } catch (error) {
        req.logger.error(error);
        next(error);
    }
}

export const getOrderByCode = async (req, res, next) => {
    try {
        const result = await orderService.getOrderByCode(req.params.code);
        res.send(await response('success', result, req.query))
    } catch (error) {
        req.logger.error(error);
        next(error);
    }
}