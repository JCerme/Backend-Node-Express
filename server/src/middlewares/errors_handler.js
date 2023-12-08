import ERR_DICT from "../services/errors/enums.js"

export const errors_handler = (error, req, res, next) => {
    const errorExists = Object.values(ERR_DICT).includes(error.code);
    console.log(error)

    req.logger.error(error);
    if(errorExists) {
        return res.status(400).send({
            status: 400,
            code: error.code,
            name: error.name,
            message: error.message,
            cause: error.cause
        })
    } else {
        return res.status(500).send({
            status: 500,
            code: ERR_DICT.UNKNOWN_ERROR,
            name: "UnknownError",
            message: "Something went wrong, try again later or contact us",
            cause: error.message
        })
    }
}