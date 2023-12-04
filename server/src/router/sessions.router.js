import { Router } from 'express';
const router = Router();
import PublicUserDTO from '../DAO/DTO/publicUser.dto.js';
import { authorization } from "../../utils.js";
import { authentication } from '../middlewares/auth.js';
import { userService } from '../services/index.js';

// Sessions
router.get('/current', authentication, authorization('user'), async(req, res) => (
    req.uid
    ? res.json({ valid: true, user: new PublicUserDTO(await userService.getUserById(req.uid))})
    : res.json({ valid: false, user: null })
))

router.get('/everyone', (req, res) => {
    res.send({ status: 'success', payload: req.user })
})

export default router;