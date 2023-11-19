import { Router } from "express";
const router = Router();
import passport from 'passport';
import PublicUserDTO from "../DAO/DTO/publicUser.dto.js";

// Error
router.get('/error', (req, res) => {
    return res.send('<h1>Error to login</h1>');
});

// Login
router.post('/login', (req, res, next) => {
    passport.authenticate('login', (err, user, info) => {
        if (err) return next(err);
        if (!user) return res.status(401).json({ logged: false, message: info.message });

        req.session.user = user;
        return res.status(200).json({ logged: true, user: new PublicUserDTO(user).get() });
    })(req, res, next);
});

// Register
router.post('/register', (req, res, next) => {
    passport.authenticate('register', (err, user, info) => {
        if (err) return next(err);
        if (!user) return res.status(401).json({ message: info.message });

        req.session.user = user;
        return res.status(200).json({ logged: true, user: new PublicUserDTO(user).get() });
    })(req, res, next);
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
        req.session.user = req.user
        return res.send(
            `<script>
                window.opener.postMessage(
                    '${JSON.stringify(new PublicUserDTO(req.user).get())}',
                    '${process.env.BASE_URL}'
                    );
                window.close();
            </script>`
        )
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
        req.session.user = req.user
        return res.send(
            `<script>
                window.opener.postMessage(
                    '${JSON.stringify(new PublicUserDTO(req.user).get())}',
                    '${process.env.BASE_URL}'
                    );
                window.close();
            </script>`
        )
    }
)

export default router;