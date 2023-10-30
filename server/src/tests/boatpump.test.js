import Product from '../DAO/mongo/products.mongo.js';
import User from '../DAO/mongo/users.mongo.js';
import Cart from '../DAO/mongo/carts.mongo.js';
import Assert from 'assert';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

before(done => {
    mongoose.connect(process.env.DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        dbName: process.env.DB_NAME
    }).then(() => {
        console.log('Connected to DB');
        done();
    }).catch(err => {
        console.log(err);
        done();
    });
});

const assert = Assert.strict;
describe('Testing for BoatPump', () => {
    describe('Product CRUD', () => {
        it('Should get products', async () => {
            const productDAO = new Product();
            const products = await productDAO.getProducts();
            assert.strictEqual(Array.isArray(products), true);
        });
        it('Should get products with limit', async () => {
            const productDAO = new Product();
            const products = await productDAO.getProducts(2);
            assert.strictEqual(Array.isArray(products), true);
            assert.strictEqual(products.length, 2);
        });
        it('Should get products with limit and page', async () => {
            const productDAO = new Product();
            const products = await productDAO.getProducts(2, 2);
            assert.strictEqual(products.length, 2);
        });
        it('Should get 0 products page', async () => {
            const productDAO = new Product();
            const products = await productDAO.getProducts(2, 100);
            assert.strictEqual(products.length, 0);
        });
        it('Should get products with limit, page and sort by price desc', async () => {
            const productDAO = new Product();
            const products = await productDAO.getProducts(5, 1, null, null, -1);
            assert.strictEqual(products[0].price > products[4].price, true);
        });
        it('Should get products with query and value', async () => {
            const productDAO = new Product();
            const products = await productDAO.getProducts(null, null, 'code', 'BP001');
            assert.strictEqual(products.length, 1);
            assert.strictEqual(products[0].code, 'BP001');
        });
        it('Should get product by ID', async () => {
            const productDAO = new Product();
            const products = await productDAO.getProducts();
            const product = await productDAO.getProductByID(products[0]._id);
            assert.strictEqual(product._id.toString(), products[0]._id.toString());
        });
        it('Should add product', async () => {
            const productDAO = new Product();
            const product = await productDAO.addProduct({
                code: 'TEST001',
                title: 'Test product',
                description: 'Test description',
                price: 100,
                thumbnail: 'test1.jpg',
                stock: 10
            });
            assert.strictEqual(product.code, 'TEST001');
        });
        it('Should update product', async () => {
            const productDAO = new Product();
            const product = await productDAO.getProducts(null, null, 'code', 'TEST001');
            const updatedProduct = await productDAO.updateProduct(product[0]._id, {
                stock: 9
            });
            assert.strictEqual(updatedProduct.modifiedCount, 1);
        })
        it('Should delete product', async () => {
            const productDAO = new Product();
            const product = await productDAO.getProducts(null, null, 'code', 'TEST001');
            const deletedProduct = await productDAO.deleteProduct(product[0]._id);
            assert.strictEqual(deletedProduct.deletedCount, 1);
        })
    });

    describe('User CRUD', () => {
        it('Should add user', async () => {
            const userDAO = new User();
            const user = await userDAO.addUser({
                first_name: 'Test',
                last_name: 'User',
                email: 'test@example.com',
                password: '123456',
                role: 'user',
                cart: null
            });
            assert.strictEqual(user.email, 'test@example.com');
        });
        it('Should get user by email', async () => {
            const userDAO = new User();
            const user = await userDAO.getUserByEmail('test@example.com');
            assert.strictEqual(user.email, 'test@example.com');
        });
        it('Should get user by ID', async () => {
            const userDAO = new User();
            const user = await userDAO.getUserByEmail('test@example.com');
            const userByID = await userDAO.getUserById(user._id);
            assert.strictEqual(userByID.email, 'test@example.com');
        });
        it('Should update user', async () => {
            const userDAO = new User();
            const user = await userDAO.getUserByEmail('test@example.com');
            const updatedUser = await userDAO.updateUser(user._id, {
                first_name: 'Test2'
            });
            assert.strictEqual(updatedUser.email, 'test@example.com');
        });
        it('Should delete user', async () => {
            const userDAO = new User();
            const user = await userDAO.getUserByEmail('test@example.com');
            const deletedUser = await userDAO.deleteUser(user._id);
            assert.strictEqual(deletedUser.email, 'test@example.com');
        });
    });

    describe('Cart CRUD', () => {
        it('Should add cart', async () => {
            const cartDAO = new Cart();
            const cart = await cartDAO.addCart({
                products: []
            });
            assert.strictEqual(cart.products.length, 0);
        });
        it('Should add product to cart', async () => {
            const cartDAO = new Cart();
            const productDAO = new Product();
            const products = await productDAO.getProducts();
            const carts = await cartDAO.getCarts();
            const cart = await cartDAO.addProductToCart(
                products[0]._id,
                carts[carts.length - 1]._id
            );
            assert.strictEqual(cart.modifiedCount, 1);
        });
        it('Should get carts', async () => {
            const cartDAO = new Cart();
            const carts = await cartDAO.getCarts();
            assert.strictEqual(Array.isArray(carts), true);
        });
        it('Should get cart by ID', async () => {
            const cartDAO = new Cart();
            const carts = await cartDAO.getCarts();
            const cart = await cartDAO.getCart(carts[carts.length - 1]._id);
            assert.strictEqual(cart._id.toString(), carts[carts.length - 1]._id.toString());
        });
        it('Should update product units', async () => {
            const cartDAO = new Cart();
            const productDAO = new Product();
            const products = await productDAO.getProducts();
            const carts = await cartDAO.getCarts();
            const cart = await cartDAO.updateProductUnits(
                products[0]._id,
                carts[carts.length - 1]._id, 2
            );
            assert.strictEqual(cart.products[0].units, 2);
        });
        it('Should delete product from cart', async () => {
            const cartDAO = new Cart();
            const productDAO = new Product();
            const products = await productDAO.getProducts();
            const carts = await cartDAO.getCarts();
            const cart = await cartDAO.deleteProductFromCart(
                products[0]._id,
                carts[carts.length - 1]._id
            );
            assert.strictEqual(cart.modifiedCount, 1);
        });
        it('Should clear cart', async () => {
            const cartDAO = new Cart();
            const carts = await cartDAO.getCarts();
            const cart = await cartDAO.clearCart(carts[carts.length - 1]._id);
            assert.deepStrictEqual(cart.products, []);
        });
        it('Should delete cart', async () => {
            const cartDAO = new Cart();
            const carts = await cartDAO.getCarts();
            const cart = await cartDAO.deleteCart(carts[carts.length - 1]._id);
            assert.strictEqual(cart.deletedCount, 1);
        });
    });
});