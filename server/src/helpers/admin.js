export function isAdmin(req, res, next) {
    req.session.user?.role === 'admin'
    ? next()
    : res.status(401).send({ message: 'Unauthorized' });
}
export function isUser(req, res, next) {
    req.session.user?.role === 'user'
    ? next()
    : res.status(401).send({ message: 'Unauthorized' });
}