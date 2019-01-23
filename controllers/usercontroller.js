var express = require('express');
var router = require('express').Router();
var sequelize = require('../db');
var User = sequelize.import('../models/user');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

router.get('/', (req, res) => {
    res.send("string");
})

router.post('/signup', function (req, res) {
    console.log("something");
    
    var username = req.body.user.username;
    var pass = req.body.user.password;
    var email = req.body.user.email;
    var isBand = req.body.user.isBand;

    User.create({
        username: username,
        passwordhash: bcrypt.hashSync(pass, 10),
        email: email,
        isBand: isBand

    }).then(

        function createSuccess(user) {
            var token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: 60*60*24});

            res.json({
                user: user,
                message: 'created',
                sessionToken: token
            });
        },
        function createError(err) {
            res.send(500, err.message);
        }
    );
});

router.post('/signin', function(req, res) {
    User.findOne( { where: { username: req.body.user.username } } ).then(
        function(user) {
            if(user) {
                bcrypt.compare(req.body.user.password, user.passwordhash, function(err, matches) {
                    if (matches) {
                        var token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: 60 * 60 * 24});
                        res.json({
                            user: user,
                            message: 'successfully authenticated',
                            sessionToken: token
                        });
                    } else {
                        res.status(502).send({ error: "You hath failed"});
                    }
                });
            } else {
                res.status(500).send({ error: "failed to authenticate" });
            }
        },
        function (err) {
            res.status(501).send({ error: "You hath failed" });
        }
    );
});

module.exports = router;
