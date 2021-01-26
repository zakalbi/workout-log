const router = require('express').Router();
const User = require('../db').import('../models/user');

/**************************
        REGISTER
**************************/
router.post('/register', (req, res) => {

    User.create({
        email: req.body.user.email,
        password: req.body.user.password
    })
    .then(
        function createSuccess(user) {
            res.json({
                user:user
            });
        }
    )
    .catch(err => res.status(500).json({ error: err}))
});

/**************************
        LOGIN
**************************/
router.post('/login', function(req, res) {

    User.findOne({
        where: {
            email: req.body.user.email
        }
    })
    .then(function loginSuccess(user) {
        if (user) {
            bcrypt.compare(req.body.user.password, user.password, function (err, matches) {
                if (matches) {
                    
                    let token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: 60 * 60 *24})

                    res.status(200).json({
                        user: user,
                        messsage: "User successfully logged in!",
                        sessionToken: token,
                    })
                } else {
                    res.status(502).send({ error: "Login Failed" });
                }
            });
        } else {
            res.status(500).json({ error: 'User does not exist.'})
        }
    })
    .catch(err => res.status(500).json({ error: err }))
});

module.exports = router