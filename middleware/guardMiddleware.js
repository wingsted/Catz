// a middleware that protects endpoints from not being logged in
function guardMiddleware(req, res, next) {
    if (req.session && req.session.userID) {
        return next();
    } else {
        return res.redirect('/');
    };
};

module.exports.guardMiddleware = guardMiddleware;
