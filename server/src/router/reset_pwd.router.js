import { Router } from 'express';
import { sendPwdCode, updatePwd, checkPwdCode } from '../controllers/password.controller.js';
const router = Router();

// RESET PASSWORD
router.post('/reset-password', sendPwdCode);
router.post('/update-password/:uid/:code', updatePwd);
router.post('/check-pwd-code/:uid/:code', checkPwdCode);
export default router;
