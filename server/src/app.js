// Express
import express from 'express';
// Modules
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import passport from 'passport';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import compression from 'express-compression';
// Utils
import __dirname from '../utils.js';
import initializePassport from './config/passport.config.js';
import { logger } from './helpers/logger.js';

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
        'http://boatpump.jcerme.com',
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use('/static', express.static(__dirname + '/public'));
const PORT = process.env.PORT || 8080;
export const httpServer = app.listen(
    PORT, () => logger.debug('Server running on port ' + PORT)
);

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
app.use('/api/', viewsRouter);
app.use('/api/products', prodRouter);
app.use('/api/cart', cartsRouter);
app.use('/api/', sessionsRouter);
app.use('/auth', authRouter);
app.use('/api/checkout', orderRoute);
app.use('/api/', loggerRouter);

// Errors handler
import { errors_handler } from './middlewares/errors_handler.js';
app.use(errors_handler);

// WebSocket config
import http from 'http';
import sharedsession from "express-socket.io-session";
import { Server } from 'socket.io';
import { addMessage } from './controllers/messages.controller.js';

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: [
            'http://localhost:8080',
            'http://localhost:5173',
            'http://boatpump.jcerme.com',
        ],
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        credentials: true,
        allowedHeaders: ['Content-Type', 'Authorization']
    }
});

io.use(sharedsession(expressSession, {
    autoSave: true
}));

server.listen(8081, () => logger.debug('Socket.IO server running on port 8081'));
io.on('connection', (socket) => {
    // Listen to 'connection' event
    socket.on('new', user => logger.info(`${user} has connected`));
    // Listen to new messages
    socket.on('message', msg => {
        msg.createdAt = new Date();
        addMessage(socket.handshake.session, msg, socket); // Pasando el socket como tercer argumento
        io.emit('message', msg);
    });
});