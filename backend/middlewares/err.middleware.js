export function errorHandler(error, req, res, next) {
    const errStatus = error.status || 500;
    const errMsg = error.message || 'Internal Server Error';
    res.status(errStatus).send({
        error: errMsg,
        stack: error.stack
    })
}