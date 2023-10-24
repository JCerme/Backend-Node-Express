import Mail from "../DAO/mail.js";

export const sendMail = async (req, res, next) => {
    try {
        const mailService = new Mail();
        await mailService.sendMail(req.body);
        res.status(200).send({message: 'OK'});
    } catch (error) {
        req.logger.error(error);
        next(error);
    }
}