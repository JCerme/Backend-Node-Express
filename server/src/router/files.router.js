import { Router } from 'express';
import { multerAvatars, multerDocs, multerProducts } from '../middlewares/multerMiddleware.js';
import { userService } from '../services/index.js';
import { authentication } from '../middlewares/auth.js';
const router = Router();

router.post('/avatar', authentication, multerAvatars, async (req, res) => {
    try {
        // Update user avatar
        await userService.updateUser(req.uid, { avatar: req.file.filename });
        res.status(200).send(req.file.filename);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.post('/documents', authentication, multerDocs, async (req, res) => {
    try {
        // Update user documents
        const user = await userService.getUserById(req.uid);
        await userService.updateUser(req.uid, { documents: [...user.documents, req.file.filename] });
        res.status(200).send(req.file.filename);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.post('/products', authentication, multerProducts, (req, res) => {
    res.send(req.files);
});

export default router;