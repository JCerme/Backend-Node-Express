// Express
import express from 'express';
// Modules
import cors from 'cors';
import dotenv from 'dotenv';
import passport from 'passport';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import compression from 'express-compression';
import { Server } from 'socket.io';
// Utils
import __dirname from '../utils.js';
import initializePassport from './config/passport.config.js';

// App Init
const app = express();
dotenv.config();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(compression(
    //{brotli: { enabled:true, zlib: {}}} // Enable brotli compression
));

// Sessions
app.use(cookieParser());
app.use(session({
    secret: process.env.SECRET,
    resave: true,               // Maintain session active
    saveUninitialized: true,    // Save session even if it's not initialized
    cookie: { secure: false, maxAge: 24 * 60 * 60 * 1000 } // 24 hours
}));

// CORS
app.use(cors({
    origin: [
        'http://localhost:8080',
        'http://localhost:5173',
        'http://boatpump.jcerme.com',
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization']
}));

import { errors_handler } from './helpers/errors_handler.js';
app.use(errors_handler);
app.use('/static', express.static(__dirname + '/public'));
const PORT = process.env.PORT || 8080;
export const httpServer = app.listen(
    PORT, () => console.log('Server running on port ' + PORT)
);

// Passport config
initializePassport();
app.use(passport.initialize());
app.use(passport.session());

// Router
import viewsRouter from './router/views.router.js';
import prodRouter from './router/prods.router.js';
import cartsRouter from './router/carts.router.js';
import authRouter from './router/auth.router.js'
import sessionsRouter from './router/sessions.router.js';
import orderRoute from './router/order.router.js';
import bodyParser from 'body-parser';
app.use('/api/', viewsRouter);
app.use('/api/products', prodRouter);
app.use('/api/cart', cartsRouter);
app.use('/api/', sessionsRouter);
app.use('/auth', authRouter);
app.use('/api/checkout', orderRoute);

// // WebSocket config
// const io = new Server(httpServer);
// io.on('connection', (socket) => {
//     DB.getMessages().then((messages) => {
//         socket.emit('loadMessages', messages);
//     });

//     // Listen to 'connection' event
//     socket.on('new', user => {
//         console.log(`${user} has connected`);
//     });

//     // Listen to new messages
//     socket.on('message', msg => {
//         DB.addMessage(msg);
//         io.emit('message', msg);
//     });

//     // Listen to 'newProduct' event and add the received product to the list
//     socket.on('newProduct', data => {
//         DB.addProduct(data);
//         console.log("Product added")
//         // Emit event when product is added
//         io.emit('productAdded', data);
//     });

//     // Listen to 'addToCart' event and add the received product to the list
//     socket.on('addToCart', data => {
//         try{
//             DB.addProductToCart(data.pid, data.cid);
//             // Emit event when product is added to cart
//             io.emit('productAddedToCart');
//         } catch (error) {
//             console.log(error);
//         }
//     });

//     // Listen to 'removeFromCart' event and remove the received product from the list
//     socket.on('removeFromCart', data => {
//         try{
//             DB.deleteProductFromCart(data.pid, data.cid);
//             // Emit event when product is removed from cart
//             io.emit('productRemovedFromCart', data);
//         } catch (error) {
//             console.log(error);
//         }
//     })
// });
