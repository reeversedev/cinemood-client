const router = require('express').Router();

const authCheck = (req, res, next) => {
    if (!req.user) {
        // if user is not logged in
        res.render('login', {
            info: 'You gotta login first in order to continue'
        });
    } else {
        // if user is logged in
        next();
    }
};

router.get('/', authCheck, (req, res) => {
    res.render('profile', {name: req.user.username})    
});

module.exports = router;