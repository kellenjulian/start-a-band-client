var express = require('express');
var router = require('express').Router();
var sequelize = require('../db');
let Post = require('../db').import('../models/post')

router.get('/post', function (req, res) {

    Post
        .findAll({
            where: { owner: req.user.id}
        })
        .then(
            function findAllSuccess(data) {
                res.status(200).json({
                    logdata: data,
                    message: "Data fetched."
                })
            },
            function findAllError(err) {
                res.send(500, err.message);
            }
        );
});

router.get('/:id', (req, res) => {
    Post.findAll({ where: { owner_id: req.params.id } })
        .then(
            function findSuccess(post) {
                res.status(200).json({
                    post: post
                })
            },

            function findFail(err) {
                res.status(500).json({
                    message: "Data not found."
                })
            }
        )
})

router.post('/createpost', function(req, res) {
    console.log("create post")
    var postData = req.body.postdata.item;

    Post
        .create({
            bandname: req.body.postdata.bandname,
            location: req.body.postdata.location,
            influentialartists: req.body.postdata.influentialartists,
            lookingfor: req.body.postdata.lookingfor,
            instrumentsskills: req.body.postdata.instrumentsskills,
            owner_id: req.user.id
        })
        .then(
            function createSuccess(postdata) {
                res.json({
                    postdata: postdata
                });
            },
            function createError(err) {
                res.send(500, err.message);
            }
        );
});

router.put('/update/:id', (req, res) => {
    Post.update({
        bandname: req.body.postdata.bandname,
        location: req.body.postdata.location,
        influentialartists: req.body.postdata.influentialartists,
        lookingfor: req.body.postdata.lookingfor,
        instrumentsskills: req.body.postdata.instrumentsskills
    },
        {
            where: {
                id: req.params.id,     //targets specific item
                owner_id: req.user.id     //makes sure it is specific user
            }
        })
        .then(
            function updateSuccess(post) {
                res.status(200).json({
                    post: post,
                    message: "Successfully updated."
                })
            },

            function updateFail(err) {
                res.status(500).json({
                    message: err.message
                })
            }
        )
    
})

router.delete('/remove', (req, res) => {
    Post.destroy({
        where: {
            id: req.body.id,
            owner_id: req.user.id
        }
    })
    .then(
        function deleteSuccess(post) {
            res.status(200).json({
                post: post,
                message: "Successfully deleted"
            })
        },

        function deleteFail(err) {
            res.status(500).json({
                error: err.message
            })
        }
    )
})

module.exports = router;