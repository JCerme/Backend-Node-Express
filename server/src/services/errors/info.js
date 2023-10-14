export const generateErrorInfo = (err) => {
    const errInfo = {
        code: err?.code,
        name: err?.name,
        message: err?.message,
        stack: err?.stack
    }
    return errInfo
}