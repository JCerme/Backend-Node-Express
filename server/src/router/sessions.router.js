import { Router } from 'express';
const router = Router();
import PublicUserDTO from '../DAO/DTO/publicUser.dto.js';

// Sessions
router.get('/current', async(req, res) => {
    return req.session.user
    ? res.json({ valid: true, user: new PublicUserDTO(req.session.user).get()})
    : res.json({ valid: false, user: null })
})

export default router;