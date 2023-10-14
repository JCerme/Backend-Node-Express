import ERR_DICT from "../services/errors/enums.js"

export const errors_handler = (error, req, res, next) => {
    console.log(error)

    if (ERR_DICT.find(error.code)) {
        return res.status(400).send({
            status: error.code,
            name: error.name,
            message: error.message,
            cause: error.cause
        })
    } else {
        return res.status(500).send({
            status: 500,
            name: "UnknownError",
            message: "Something went wrong, try again later or contact us",
            cause: error.cause
        })
    }
}