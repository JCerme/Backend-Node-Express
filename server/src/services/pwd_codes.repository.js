export default class PwdCodesRepository {
    constructor(dao) {
        this.dao = dao;
    }

    createPwdCode = async (uid, code) => await this.dao.createPwdCode(uid, code)
    checkPwdCode = async (uid, code) => await this.dao.checkPwdCode(uid, code)
    deletePwdCode = async (cid) => await this.dao.deletePwdCode(cid)
}