// Express
import express from 'express';
// Modules
import cors from 'cors';
import dotenv from 'dotenv';
import passport from 'passport';
import compression from 'express-compression';
import session from 'express-session';
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
    {brotli: { enabled:true, zlib: {}}} // Enable brotli compression
));

// Session
app.use(session({
    secret: 'tu_secreto',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
}));

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
import filesRouter from './router/files.router.js';
import usersRouter from './router/users.router.js';
app.use('/api', viewsRouter);
app.use('/api/products', prodRouter);
app.use('/api/cart', cartsRouter);
app.use('/api/sessions', sessionsRouter);
app.use('/api/auth', authRouter);
app.use('/api/checkout', orderRoute);
app.use('/api/logger', loggerRouter);
app.use('/api', resetPwdRouter);
app.use('/api/stripe', stripeRouter);
app.use('/api/files', filesRouter);
app.use('/api/users', usersRouter);

// Errors handler
import { errors_handler } from './middlewares/errors_handler.js';
app.use(errors_handler);

// Load front-end index
app.use('/', express.static('dist', { redirect: false }));
app.get('*', (req, res, next) => {
    return res.sendFile(path.resolve("dist/index.html"));
});

// WebSocket config
import { Server } from 'socket.io';
import { createServer } from 'node:http';
import { addMessage } from './controllers/messages.controller.js';

const server = createServer(app);
const io = new Server(server);

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