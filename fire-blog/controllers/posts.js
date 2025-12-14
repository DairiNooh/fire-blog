const express = require('express');
const router = express.Router();

const Post = require('../models/post');
const isSignedIn = require('../middleware/is-signed-in');

module.exports = router;

//
router.get('/', (req, res)=>{
    res.send("The route is working");
});

router.get('/new', isSignedIn,(req, res)=>{
    res.render('posts/new.ejs');
});

router.post('/', isSignedIn, async (req, res) => {
    try
    {
        req.body.creator_id = req.session.user._id;
        const newPost = await Post.create(req.body);
        res.redirect('/posts');
    }
    catch(err)
    {
        console.log(err);
    }
});