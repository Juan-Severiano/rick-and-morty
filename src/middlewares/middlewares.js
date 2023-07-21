exports.yourMiddleware = (req, res, next) => {
    res.send('agr fudeo')
}
exports.loaderMiddleware = (req, res, next) => {
    res.locals.showLoader = true;
    next();
};