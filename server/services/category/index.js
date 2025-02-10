const category404 = (res) => {
    return res.status(404).send({
        message: 'Category doesnot exist',
        error: true,
        data: []
    })
}
exports.category404 = category404;