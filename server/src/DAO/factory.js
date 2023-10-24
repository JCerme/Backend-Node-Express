import dotenv from 'dotenv'
import mongoose from 'mongoose'
import { logger } from '../helpers/logger.js'

dotenv.config();
export let User
export let Product
export let Cart
export let Message
export let Order
export let PwdCode

logger.debug(`Persistence with ${process.env.PERSISTENCE}`)

switch (process.env.PERSISTENCE) {
    case 'mongodb':
        mongoose.connect(process.env.DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            dbName: process.env.DB_NAME
        })

        const { default: UserMongo } = await import('./mongo/users.mongo.js')
        const { default: ProductMongo } = await import('./mongo/products.mongo.js')
        const { default: CartMongo } = await import('./mongo/carts.mongo.js')
        const { default: MessageMongo } = await import('./mongo/messages.mongo.js')
        const { default: OrderMongo } = await import('./mongo/orders.mongo.js')
        const { default: PwdCodeMongo } = await import('./mongo/pwd_codes.mongo.js')

        User = UserMongo
        Product = ProductMongo
        Cart = CartMongo
        Message = MessageMongo
        Order = OrderMongo
        PwdCode = PwdCodeMongo
        break;

    default:
        break;
}