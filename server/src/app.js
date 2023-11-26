// Express
import express from 'express';
// Modules
import cors from 'cors';
import dotenv from 'dotenv';
import passport from 'passport';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import compression from 'express-compression';
import path from 'path';
// Utils
import __dirname from '../utils.js';
import initializePassport from './passport/passport.config.js';
import { logger } from './helpers/logger.js';
import swaggerDocs from './helpers/swagger.js';

// App Init
const app = express();
dotenv.config();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.disable('x-powered-by');
app.use(compression(
    //{brotli: { enabled:true, zlib: {}}} // Enable brotli compression
));

// Sessions
app.use(cookieParser());
const expressSession = session({
    secret: process.env.SECRET,
    resave: true,               // Maintain session active
    saveUninitialized: true,    // Save session even if it's not initialized
    cookie: { secure: false, maxAge: 24 * 60 * 60 * 1000 } // 24 hours
});
app.use(expressSession);

// CORS
app.use(cors({
    origin: [
        'http://localhost:8080',
        'http://localhost:5173',
        'https://boatpump.jcerme.com',
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Passport config
initializePassport();
app.use(passport.initialize());
app.use(passport.session());

// Loggers
import { addLogger } from './middlewares/loggers.js';
app.use(addLogger);

// Router
import viewsRouter from './router/views.router.js';
import prodRouter from './router/prods.router.js';
import cartsRouter from './router/carts.router.js';
import authRouter from './router/auth.router.js'
import sessionsRouter from './router/sessions.router.js';
import orderRoute from './router/order.router.js';
import loggerRouter from './router/logger.router.js';
import resetPwdRouter from './router/reset_pwd.router.js';
import stripeRouter from './router/stripe.router.js';
app.use('/api', viewsRouter);
app.use('/api/products', prodRouter);
app.use('/api/cart', cartsRouter);
app.use('/api/sessions', sessionsRouter);
app.use('/api/auth', authRouter);
app.use('/api/checkout', orderRoute);
app.use('/api/logger', loggerRouter);
app.use('/api', resetPwdRouter);
app.use('/api/stripe', stripeRouter);

// Errors handler
import { errors_handler } from './middlewares/errors_handler.js';
app.use(errors_handler);

// Load front-end index
app.use('/', express.static('dist', { redirect: false }));
app.get('*', (req, res, next) => {
    return res.sendFile(path.resolve("dist/index.html"));
});

// WebSocket config
import sharedsession from "express-socket.io-session";
import { Server } from 'socket.io';
import { createServer } from 'node:http';
import { addMessage } from './controllers/messages.controller.js';

const server = createServer(app);
const io = new Server(server);
io.use(sharedsession(expressSession, {
    autoSave: true
}));

io.on('connection', (socket) => {
    // Listen to new messages
    socket.on('message', msg => {
        msg.createdAt = new Date();
        // Pasando el socket como tercer argumento
        addMessage(socket.handshake.session, msg, socket);
        io.emit('message', msg);
    });
});

// Server start
const PORT = process.env.SERVER_PORT || 8080;
server.listen(PORT, () => {
    logger.debug('Server running on port ' + PORT);
    swaggerDocs(app, PORT)
});

export default app;