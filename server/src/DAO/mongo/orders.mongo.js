import CustomError from '../../services/errors/custom_error.js';
import ERR_DICT from '../../services/errors/enums.js';
import OrderDTO from '../DTO/order.dto.js';
import cartsModel from './models/carts.model.js';
import orderModel from './models/orders.model.js';
import productModel from './models/products.model.js';

export default class Order {
    getOrderByCode = async (code) => {
        const order = orderModel.find({ code });
        return order.purchaser === req.session.user._id
        ? order
        : { status: 401, message: 'Unauthorized' };
    }

    createOrder = async (order) => {
        try {
            !order && CustomError.createError(
                ERR_DICT.ORDER,
                'Order not found',
                'Order data not found',
                'User tried to create an order, but the order data was not found'
            );
            !order.purchaser && CustomError.createError(
                ERR_DICT.ORDER,
                'Unauthorized',
                'User not logged in',
                'User tried to create an order, but the user was not logged in'
            );

            const cart = await cartsModel.findById(order?.purchaser?.cart);
            if(!cart) {
                CustomError.createError(
                    ERR_DICT.CART,
                    'Cart not found',
                    `Cart with id ${order?.purchaser?.cart} not found`,
                    'User tried to create an order, but the cart was not found'
                );
            }

            order.products = []
            for(let prod of cart.products){
                const product = await productModel.findById(prod.product);
                if (!product) return { status: 404, message: 'Product not found' };
                order.products.push({...product._doc, quantity: prod.units})
            }

            order.amount = Math.floor(order.products.reduce((acc, prod) =>
            acc + (prod.price * prod.quantity) * 1.21, 0) * 100) / 100;

            const newOrder = new OrderDTO(order);
            const pids = cart.products.map(prod => prod.product);
            const products = await productModel.find({ _id: { $in: pids } });

            const productsNotAvailable = [];
            const productsAvailable = [];
            products.forEach(product => {
                const productInOrder = newOrder.products.find(
                    p => p._id.toString() === product._id.toString()
                );
                if (productInOrder && product.stock >= productInOrder.quantity) {
                    productsAvailable.push(product);
                } else {
                    productsNotAvailable.push(product);
                }
            });

            if (productsNotAvailable.length > 0) {
                return {
                    status: 400,
                    message: 'Products not available',
                    products: productsNotAvailable
                };
            }

            await orderModel.create(newOrder);
            const bulkOps = productsAvailable.map(product => {
                const newProduct = newOrder.products.find(
                    p => p._id.toString() === product._id.toString()
                );
                return {
                    updateOne: {
                        filter: { _id: product._id },
                        update: { $inc: { stock: -newProduct.quantity } }
                    }
                };
            });

            await productModel.bulkWrite(bulkOps);
            await cartsModel.updateOne(
                { _id: cart._id },
                { $set: { products: [] } }
            );
            return { status: 201, message: 'Order created', order: newOrder };
        } catch (error) {
            CustomError.createError(
                ERR_DICT.ORDER,
                'Error creating order',
                error,
                'User tried to create an order, but an error occurred'
            );
        }
    }

    getOrders = async () => await orderModel.find();
}