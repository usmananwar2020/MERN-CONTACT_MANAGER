const Failuer = (res, error, statusCode, message, data) => {
    return res.status(statusCode).send({
        message,
        error,
        data
    })
}
exports.Failuer = Failuer;