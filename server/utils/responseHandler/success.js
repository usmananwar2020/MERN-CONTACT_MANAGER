const Success = (res, error, message, data) => {
    return res.send({
        message,
        error,
        data
    })
}
exports.Success = Success;