module.exports = function (access_level) {
    return function (req, res, next) {
    	console.log('access_level', access_level);
    	console.log('req.isAuthenticated()', req.isAuthenticated());
        if (access_level == 'admin' && req.isAuthenticated()) {
            return next();
        } else if (access_level == 'cashier' && req.isAuthenticated()) {
            return next();
        } else {
            res.redirect('/');
        }
    }
}