import { promises as fs } from 'fs';
import crypto from 'crypto';

export default class CartsManager {
    constructor(path){
        this.path = path;
        this.id = crypto.randomBytes(8).toString("hex");
        this.products = [];
        this.carts = [];
        this.init();
    }

    async init() {
        // Get carts from file or create it if it doesn't exist
        try {
            await fs.access(this.path);
            const data = await fs.readFile(this.path, 'utf8');
            this.carts = data ? JSON.parse(data) : [];
        } catch (err) {
            if (err.code === 'ENOENT') {
                await fs.writeFile(this.path, '[]', 'utf8');
            } else {
                throw err;
            }
        }
    }
    
    async writeToFile() {
        // Write carts to file
        await fs.writeFile(this.path, JSON.stringify(this.carts, null, 4));
    }

    async newCart() {
        // Create new Cart
        try {
            const newCart = { "id": crypto.randomBytes(8).toString("hex"), "products": [] };
            this.carts.push(newCart);
            await this.writeToFile();
        } catch (err) {
            console.log(err);
            throw err;
        }
    }
    
    async addProduct(productId, id) {
        // Add product to products array and write to file
        try {
            let cart = this.carts.find(cart => cart.id === id);
            if (!cart) {
                cart = { id: this.id, products: [] };
                this.carts.push(cart);
            }
    
            let exist = false;
            cart.products.map(prod => {
                if (prod.id === productId) {
                    prod.quantity++;
                    exist = true;
                }
            });
    
            if (!exist) {
                const newProduct = { id: productId, quantity: 1 };
                cart.products.push(newProduct);
            }
    
            await this.writeToFile();
        } catch (err) {
            console.log(err);
            throw err;
        }
    }    

    getCart() {
        // Return this cart
        return { id: this.id, products: this.products };
    }

    getCarts() {
        // Return carts array
        return this.carts;
    }    

    getCartById(id) {
        // Return cart with given id
        return this.carts.find(cart => cart.id === id);
    }

    async deleteCart(id) {
        // Delete product with given id and write to file
        try {
            this.carts = this.carts.filter(cart => cart.id !== id);
            await this.writeToFile();
        } catch (err) {
            console.log(err);
            throw err;
        }
    }
}