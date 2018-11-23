// a middleware
function guardMiddleware(req, res, next) {
    if (req.session && req.session.userID) {
        return next();
    } else {
        return res.redirect('/');
    };
};

module.exports.guardMiddleware = guardMiddleware;
