import ERR_DICT from "../../services/errors/enums.js";
import pwd_codesModel from "./models/pwd_codes.model.js";
import CustomError from "../../services/errors/custom_error.js";

export default class PwdCode {
    createPwdCode = async (uid, code) => {
        try {
            const pwdCode = new pwd_codesModel({uid: uid, code: code});
            await pwdCode.save();
            return pwdCode;
        } catch(err) {
            CustomError.createError(
                ERR_DICT.PWD_CODE,
                'Error creating password code',
                err,
                'User tried to create password code, but an error occurred'
            );
        }
    }

    checkPwdCode = async (uid, code) => {
        try {
            // code expires in 1 hour
            const expiresAt = new Date();
            expiresAt.setHours(expiresAt.getHours() - 1);
            const validCode = await pwd_codesModel.find({uid: uid, code: code, createdAt: { $gt: expiresAt}}).lean();
            return validCode;
        } catch(err) {
            CustomError.createError(
                ERR_DICT.PWD_CODE,
                'Error getting password code',
                err,
                'User tried to get password code, but an error occurred'
            );
        }
    }

    deletePwdCode = async (cid) => {
        try {
            await pwd_codesModel.findByIdAndDelete(cid);
        } catch(err) {
            CustomError.createError(
                ERR_DICT.PWD_CODE,
                'Error deleting password code',
                err,
                'User tried to delete password code, but an error occurred'
            );
        }
    }
}