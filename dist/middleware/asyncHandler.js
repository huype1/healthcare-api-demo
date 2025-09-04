export const asyncHandler = (handler) => {
    return (req, res, next) => {
        handler(req, res, next).catch(next);
    };
};
export default asyncHandler;
//# sourceMappingURL=asyncHandler.js.map