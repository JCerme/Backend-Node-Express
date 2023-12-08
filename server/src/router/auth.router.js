import { Router } from "express";
const router = Router();
import passport from 'passport';
import UserDTO from "../DAO/DTO/users.dto.js"
import dotenv from 'dotenv';
import { userService, cartService } from "../services/index.js";
import { generateToken } from "../../utils.js";
import { createHash, isValidPassword } from "../../utils.js";
dotenv.config();

// Error
router.get('/error', (req, res) => {
    return res.send('<h1>Error to login</h1>');
});

// Login
router.post('/login', async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // Verify if user exists
        const user = await userService.getUserByEmail(email);
        if (!user || !isValidPassword(user, password)) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // JWT Token
        const token = generateToken(user);
        res.status(201).json({ token, logged: true });
    } catch (error) {
        req.logger.error(error);
        next(error);
    }
});

// Register
router.post('/register', async (req, res, next) => {
    try {
        const { email, password, first_name, last_name } = req.body;

        // Verify if user exists
        const existingUser = await userService.getUserByEmail(email);
        if (existingUser) return res.status(400).json({ message: 'User already exists' });

        // Create cart and user
        const cart = await cartService.addCart();
        const newUser = new UserDTO({
            first_name,
            last_name,
            email,
            password: createHash(password),
            cart: cart._id
        });
        const savedUser = await userService.addUser(newUser);

        // JWT Token
        const token = generateToken(savedUser);
        res.status(201).json({ token, logged: true });
    } catch (error) {
        req.logger.error(error);
        next(error);
    }
});

// GitHub
router.get(
    '/github',
    passport.authenticate('github', {scope: ['user:email'] }),
    async() => {}
)
router.get(
    '/githubcallback',
    passport.authenticate('github', { failureRedirect: '/error'}),
    async(req, res) => {
        try {
            const token = generateToken(req.user);
            return res.send(
                `<script>
                    window.opener.postMessage(
                        {
                            type: 'auth-token',
                            token: '${token}'
                        },
                        '${process.env.FRONTEND_URL}'
                    );
                    window.close();
                </script>`
            );
        } catch (error) {
            req.logger.error(error);
            next(error);
        }
    }
)

// Google
router.get(
    '/google',
    passport.authenticate('google', { scope: ['email', 'profile'] }),
    async() => {}
);
router.get(
    '/googlecallback',
    passport.authenticate( 'google', { failureRedirect: '/api/auth/error' }),
    async(req, res) => {
        try {
            const token = generateToken(req.user);
            return res.send(
                `<script>
                    window.opener.postMessage(
                        {
                            type: 'auth-token',
                            token: '${token}'
                        },
                        '${process.env.FRONTEND_URL}'
                    );
                    window.close();
                </script>`
            );
        } catch (error) {
            req.logger.error(error);
            next(error);
        }
    }
);

export default router;