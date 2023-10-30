import chai from 'chai';
import supertest from 'supertest';
import app from '../app.js';
import User from '../DAO/mongo/users.mongo.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const expect = chai.expect;

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

describe('Integration Testing for BoatPump', () => {
    const agent = supertest.agent(app);

    const badUser = {
        email: 'test',
        role: 'admin',
        password: '123456',
    }

    const mockUser = {
        first_name: 'Test',
        last_name: 'User',
        email: 'test@example.com',
        password: 'password',
    };

    describe('Users & Sessions', function() {
        this.timeout(5000);
        after(async () => {
            const userDAO = new User();
            const user = await userDAO.getUserByEmail('test@example.com')
            await userDAO.deleteUser(user._id);
        });
        it('Should create an user', async () => {
            const response = await agent.post('/api/auth/register').send(mockUser);
            const { body } = response;
            expect(body.logged).to.equal(true);
        });
        it('Should not create an user', async () => {
            const response = await agent.post('/api/auth/register').send(badUser);
            const { status } = response;
            expect(status).to.not.equal(200);
        });
        it('Should login an user', async () => {
            const response = await agent.post('/api/auth/login').send(mockUser);
            const { status, body } = response;
            expect(status).to.equal(200);
            expect(body.logged).to.equal(true);
        });
    });

    describe('Products', () => {
        it('Should get products', async () => {
            const response = await agent.get('/api/');
            const { status, body } = response;
            expect(status).to.equal(200);
            expect(body.payload).to.be.an('array');
        });
        it('Should get products', async () => {
            const response = await agent.get('/api/products');
            const { status, body } = response;
            expect(status).to.equal(200);
            expect(body.payload).to.be.an('array');
        });
        it('Should get products with limit', async () => {
            const response = await agent.get('/api/products?limit=2');
            const { status, body } = response;
            expect(status).to.equal(200);
            expect(body.payload).to.be.an('array');
            expect(body.payload.length).to.equal(2);
        });
        it('Should get 0 products with filter', async () => {
            const response = await agent.get('/api/products?query=code&value==BP0001');
            const { body } = response;
            expect(body.payload.length).to.equal(0);
        });
    });

    describe('Cart', () => {
        let cart_id;
        it('Should create a cart', async () => {
            const response = await agent.post('/api/cart');
            const { status, body } = response;
            cart_id = body.payload._id;
            expect(status).to.equal(200);
            expect(body.payload).to.be.an('object');
            expect(body.payload).to.have.property('products');
        });
        it('Should get user cart', async () => {
            const response = await agent.get('/api/cart');
            const { status, body } = response;
            expect(status).to.equal(200);
            expect(body.payload).to.be.an('object');
            expect(body.payload).to.have.property('products');
        });
        if('Should get user cart by id', async () => {
            const response = await agent.get('/api/cart/' + cart_id);
            const { status, body } = response;
            expect(status).to.equal(200);
            expect(body.payload).to.be.an('object');
            expect(body.payload).to.have.property('products');
        });
        it('Should add a product to cart', async () => {
            const response = await agent.post('/api/cart/product/64bc46bfdb57c6d136327aaa');
            const { status, body } = response;
            expect(status).to.equal(200);
            expect(body.payload).to.be.an('object');
            expect(body.payload.modifiedCount).to.equal(1);
        });
        it('Should update product units', async () => {
            const response = await agent.put('/api/cart/product/64bc46bfdb57c6d136327aaa').send({ units: 2 });
            const { status, body } = response;
            expect(status).to.equal(200);
            expect(body.payload).to.be.an('object');
            expect(body.payload).to.have.property('products');
        });
        it('Should delete product from cart', async () => {
            const response = await agent.delete('/api/cart/product/64bc46bfdb57c6d136327aaa');
            const { status, body } = response;
            expect(status).to.equal(200);
            expect(body.payload).to.be.an('object');
            expect(body.payload.modifiedCount).to.equal(1);
        });
        it('Should update cart', async () => {
            const response = await agent.put('/api/cart/' + cart_id).send({ products: [] });
            const { status, body } = response;
            expect(status).to.equal(200);
            expect(body.payload).to.be.an('object');
            expect(body.payload).to.have.property('products');
            expect(body.payload.products.length).to.equal(0);
        });
        it('Should delete cart', async () => {
            const response = await agent.delete('/api/cart/' + cart_id);
            const { status, body } = response;
            expect(status).to.equal(200);
            expect(body.payload).to.be.an('object');
            expect(body.payload).to.have.property('products');
        });
    });
});