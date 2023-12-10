import { Router } from "express";
import { authentication } from "../middlewares/auth.js";
import { userService } from "../services/index.js";
const router = Router();

router.post('/premium', authentication, async (req, res) => {
    try {
        // Check if the user has all the required documents
        const user = await userService.getUserById(req.uid);
        if(user.premium) return res.status(403).send('You are already a premium user');

        if (
        user.documents.includes(req.uid + '-id_certificate.pdf')
        && user.documents.includes(req.uid + '-home_address.pdf')
        && user.documents.includes(req.uid + '-account_status.pdf')
        ) {
            const user = await userService.updateUser(req.uid, { premium: true });
            return res.status(200).send(user);
        } else {
            return res.status(403).send('You need to upload all the required documents');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
});

export default router;