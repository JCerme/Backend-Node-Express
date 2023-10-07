export default class CustomError {
    static createError(code, name="Error", message, cause) {
        const err = new Error(message ?? name, {cause})
        err.code = code
        err.name = name
        err.cause = cause
        throw err;
    }
}