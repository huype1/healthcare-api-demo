export const errorHandler = (err, req, res, _next) => {
    const status = err.status || 500;
    const message = err.message || 'Internal Server Error';
    res.status(status).json({ error: message });
};
export default errorHandler;
//# sourceMappingURL=errorHandler.js.map