import { cartsModel, messagesModel, productsModel, usersModel } from './models/mongoose.js';
import mongoose from 'mongoose';

export default class DBManager{
    constructor(){
        const dbName = process.env.DB_NAME;
        this.users, this.products, this.carts, this.messages = [];
        this.conn = false;

        // Database connection
        mongoose.connect(process.env.DB_URL, {dbName: dbName})
        .then(() => {
            console.log('Connected to database!');
            this.conn = true;
        }).catch(error => console.log('Database error: ', error));
    }

    connect(){ return this.conn }

    // PRODUCTS
    async getProducts(limit = 20, page = 1, query = null, value = null, sort){
        try {
            const filter = query && value ? { [query]: value } : {};
            const products = await productsModel.find(filter).limit(limit).skip((limit * page) - limit).sort({"price": sort || 1}).lean();
            return products;
        } catch(err) {
            throw new Error(err);
        }
    }
    async getProductByID(pid){
        try {
            const product = await productsModel.find({"_id": pid}).lean();
            return product;
        } catch(err) {
            throw new Error(err);
        }
    }
    async addProduct(product){
        try {
            await productsModel.create(product);
            return product;
        } catch(err) {
            throw new Error(err);
        }
    }
    async updateProduct(pid, updatedProduct) {
        try {
            await productsModel.updateOne(
                {"_id": pid},
                {$set: updatedProduct}
            )
        } catch (err) {
            throw new Error(err);
        }
    }
    async deleteProduct(pid) {
        try {
            await productsModel.deleteOne({"_id": pid})
        } catch (err) {
            throw new Error(err);
        }
    }

    // CARTS
    async getCarts(){
        try {
            const carts = await cartsModel.find().lean();
            return carts;
        } catch(err) {
            throw new Error(err);
        }
    }
    async addCart(cart){
        try {
            await cartsModel.create(cart);
            return cart;
        } catch(err) {
            throw new Error(err);
        }
    }
    async getCartByID(cid){
        try {
            const cart = await cartsModel.findById(cid).populate('products.product').exec();
            return cart;
        } catch(err) {
            throw new Error(err);
        }
    }
    async getCartByEmail(cemail){
        try {
            let cart = await cartsModel.findOne({'user':cemail}).populate('products.product').exec();
            if(!cart) cart = await cartsModel.create({'user':cemail});
            return cart;
        } catch(err) {
            throw new Error(err);
        }
    }
    async addProductToCart(pid, cid) {
        try {
            const product = await productsModel.findOne({"_id": pid}).lean();
            const cart = await cartsModel.findOne({"_id": cid}).lean();
    
            if (!product || !cart) {
                throw new Error('Product or Cart not found');
            }

            const cartProduct = cart.products.find(
                p => p.product.toString() === product._id.toString()
            );

            if (cartProduct) {
                cartProduct.units += 1;
                await cartsModel.updateOne(
                    { "_id": cid, "products.product": cartProduct.product },
                    { $set: { "products.$.units": cartProduct.units } }
                );
            } else {
                await cartsModel.updateOne(
                    { "_id": cid },
                    { $push: { "products": { product: product._id, units: 1 } } }
                );
            }
        } catch (err) {
            throw new Error(err);
        }
    }
    async deleteProductFromCart(pid, cid) {
        try {
            await cartsModel.updateOne(
                { "_id": cid },
                { $pull: { "products": { product: pid } } }
            );
        } catch (err) {
            throw new Error(err);
        }
    }
    async updateCart(cid, updatedCart) {
        try {
            await cartsModel.updateOne(
                { "_id": cid },
                { $set: updatedCart }
            )
        } catch (err) {
            throw new Error(err);
        }
    }
    async updateProductUnits(pid, cid, units) {
        try {
            await cartsModel.findOneAndUpdate(
                { "_id": cid, "products.product": pid },
                { $set: { "products.$.units" : units } }
            );
        } catch (err) {
            throw new Error(err);
        }
    }
    async clearCart(cid) {
        try {
            await cartsModel.findOneAndUpdate(
                { "_id": cid },
                { "products": [] }
            );
        } catch (err) {
            throw new Error(err);
        }
    }
    
    // MESSAGES
    async getMessages(){
        try {
            const messages = await messagesModel.find().lean();
            return messages;
        } catch(err) {
            throw new Error(err);
        }
    }
    async addMessage(msg){
        try {
            await messagesModel.create(msg);
            return msg;
        } catch(err) {
            throw new Error(err);
        }
    }

    // USERS
    async addUser(user){
        try {
            await usersModel.create(user);
            return user;
        } catch(err) {
            throw new Error(err);
        }
    }
    async getUserByEmail(uemail){
        try {
            const user = await usersModel.findOne({"email": uemail}).lean();
            return user;
        } catch(err) {
            throw new Error(err);
        }
    }
}
