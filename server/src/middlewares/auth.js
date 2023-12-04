import passport from 'passport';

export function authentication(req, res, next) {
    passport.authenticate('jwt', { session: false }, (err, user, info) => {
        if (err || !user) return res.status(401).send('Unauthorized');
        req.uid = user._id;
        next();
    })(req, res, next);
}
