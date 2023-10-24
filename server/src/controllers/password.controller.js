import { uid } from "uid";
import { userService } from "../services/index.js";
import { pwdCodeService } from "../services/index.js";
import { sendMail } from "./mail.controller.js";
import { createHash } from "../../utils.js";

export const sendPwdCode = async (req, res, next) => {
    try {
        const code = uid(6);
        if (!req.body.to) return res.status(401).send({
            message: 'Missing email address',
        });

        const user = await userService.getUserByEmail(req.body.to);
        if(!user) return res.status(404).send({
            message: 'User not found',
        });

        const newCode = await pwdCodeService.createPwdCode(user._id, code);
        if(!newCode) return res.status(500).send({
            message: 'Error creating password code',
        });

        req.body.subject = 'Reset password code for BoatPump';
        req.body.html = `
            <h1>Reset password for BoatPump</h1>
            <p>Looks like you forgot your password. No worries! Click the button below to reset your password or <a href="http://localhost:5173/reset-password/${user._id}/${code}">click here</a>.<br/>
                It will expire in 1 hour. If you didn't request this, you can safely ignore this email.</p>
            <a href="http://localhost:5173/reset-password/${user._id}/${code}">
                <button style="background-color:#2563eb;font-weight:600;color:white;border:none;padding: 10px 30px;border-radius:5px;cursor:pointer;">
                    Reset password here
                </button>
            </a>
        `;
        await sendMail(req, res, next);
    } catch (error) {
        req.logger.error(error);
        next(error);
    }
}

export const checkPwdCode = async (req, res, next) => {
    try {
        const code = await pwdCodeService.checkPwdCode(req.params.uid, req.params.code);
        if(!code) return res.status(401).send({
            message: 'Invalid or expired code, try again. You will be redirected in 3 seconds.',
        });
        res.status(200).send({message: 'OK'});
    } catch (error) {
        req.logger.error(error);
        next(error);
    }
}

export const updatePwd = async (req, res, next) => {
    try {
        const code = await pwdCodeService.checkPwdCode(req.params.uid, req.params.code);
        if(!code) return res.status(401).send({
            message: 'Invalid or expired code, try again. You will be redirected in 3 seconds.',
        });
        const user = await userService.getUserById(req.body.uid);
        if(!user) return res.status(404).send({
            message: 'User not found',
        });
        if(!req.body.password) return res.status(401).send({
            message: 'Missing password',
        });

        await userService.updateUser(user._id, {password: createHash(req.body.password)});
        await pwdCodeService.deletePwdCode(code._id);
        res.status(200).send({message: 'OK'});
    } catch(error) {
        req.logger.error(error);
        next(error);
    }
}