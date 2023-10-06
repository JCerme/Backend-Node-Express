import { User, Product, Cart, Message, Order } from '../DAO/factory.js'
import UserRepository from './users.repository.js'
import ProductRepository from './products.repository.js'
import CartRepository from './carts.repository.js'
import MessageRepository from './messages.repository.js'
import OrderRepository from './orders.repository.js'

export const userService = new UserRepository(new User())
export const productService = new ProductRepository(new Product())
export const cartService = new CartRepository(new Cart())
export const messageService = new MessageRepository(new Message())
export const orderService = new OrderRepository(new Order())