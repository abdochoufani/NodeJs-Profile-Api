const router = require('express').Router()
const mongoose = require('mongoose')
const passport = require('passport')

//Load Models
const Profile = require('../../models/Profile')
const User = require('../../models/User')
const Post = require('../../models/Posts')


//load validation 
const validatePostInput = require('../../validation/posts')


//@Route GET  api/posts/test
//@description test posts request
//@access Public
router.get('/test', (req, res) => {
    res.json({ msg: 'test posts works' })
})


//@Route GET  api/posts
//@description get posts 
//@access Public

router.get('/', (req, res) => {
    Post.find().sort({ date: -1 }).then(posts => res.json(posts)).catch(err => res.status(404).json({ nopost: "no posts  found" }))
})


//@Route GET  api/posts/:id
//@description get  one post 
//@access Public
router.get('/:id', (req, res) => {
    Post.findById(req.params.id)
        .then(post => res.json(post))
        .catch(err => res.status(404).json({ nopost: "no post found with that id" }))
})


//@Route POST  api/posts
//@description create posts 
//@access Private
router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    const { errors, isValid } = validatePostInput(req.body)

    if (!isValid) { res.status(400).json(errors) }

    const newPost = new Post({
        user: req.user.id,
        text: req.body.text,
        name: req.body.name,
        avatar: req.body.avatar,
    })
    newPost.save().then(post => {
        res.json(post)
    })
})


//@Route Delete  api/posts/:id
//@description delete one post 
//@access Private

router.delete('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
        Post.findById(req.params.id).then(post => {
            //check if post is for owner
            if (post.user.toString() !== req.user.id) {
                return res.status(401).json({ notauthorized: 'user not authorized' })
            }
            //delete post
            post.remove()
                .then(() => res.json({ success: true }))
                .catch(err => {
                    res.status(404).json({ nopostfound: 'no post found' })

                })
        }).catch(err => { res.status(404).json({ noprofile: "Profile not found" }) })
    })

})

//@Route POST  api/posts/like/:id
//@description like post with id 
//@access Private

router.post('/like/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
        Post.findById(req.params.id).then(post => {
            //check if user already liked the post
            if (post.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
                return res.status(400).json({ alreadyliked: "User already liked this post" })
            }
            //Add the user id to likes array
            post.likes.unshift({ user: req.user.id })
            post.save().then(post => {
                res.json(post)
            }).catch(err => res.status(400).json({ postnotsaved: 'Your post was not save please retry' }))
        }).catch(err => { res.status(404).json({ noprofile: "Profile not found" }) })
    })

})

//@Route POST  api/posts/unlike/:id
//@description unlike post with id 
//@access Private

router.post('/unlike/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
        Post.findById(req.params.id).then(post => {
            //check if user already liked the post
            if (post.likes.filter(like => like.user.toString() === req.user.id).length === 0) {
                return res.status(400).json({ notlikedyet: "You have not liked this post" })
            }


            //get index of item to remove
            const removeItem = post.likes.map(item => {
                item.user.toString()
            }).indexOf(req.user.id)

            //splice out like from array
            post.likes.splice(removeItem, 1)
            //save post
            post.save().then(post => {
                res.json(post)
            }).catch(err => { res.status(400).json({ unlikeerror: 'The post did not save' }) })

        }).catch(err => { res.status(404).json({ noprofile: "Profile not found" }) })
    })

})

//@Route POST  api/posts/comment/:id
//@description add comment to post with id 
//@access Private

router.post('/comment/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
        Post.findById(req.params.id).then(post => {
            const { errors, isValid } = validatePostInput(req.body)

            if (!isValid) { res.status(400).json(errors) }
            const newComment = {
                user: req.user.id,
                text: req.body.text,
                name: req.body.name,
                avatar: req.body.avatar
            }
            //Add the text to comment array
            post.comment.unshift(newComment)
            //save
            post.save().then(post => {
                res.json(post)
            }).catch(err => res.status(400).json({ postnotsaved: 'Your post was not save please retry' }))
        }).catch(err => { res.status(404).json({ noposts: "Post not found" }) })
    }).catch(err => { res.status(404).json({ noprofile: "Profile not found" }) })

})

//@Route DELETE  api/posts/comment/:id
//@description unlike post with id 
//@access Private

router.delete('/comment/:id/:comment_id', passport.authenticate('jwt', { session: false }), (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
        Post.findById(req.params.id).then(post => {
            //check if comment exists
            if (post.comments.filter(comment => comment._id.toString() === req.params.comment_id).length === 0) {
                res.status(404).json({ commentdoesnotexists: "Comment does not exist" })
            }
            //get index of item to remove
            const removeItem = post.comments.map(item => {
                item._id.toString();
            }).indexOf(req.params.comment_id)
            //splice out comment from array
            post.comments.splice(removeItem, 1)
            //save post
            post.save().then(post => {
                res.json(post)
            }).catch(err => { res.status(400).json({ commentserror: 'The post with the new comment did not save' }) })

        }).catch(err => { res.status(404).json({ noprofile: "Profile not found" }) })
    })
})





module.exports = router