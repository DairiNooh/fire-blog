const express = require('express');
const router = express.Router();

const Post = require('../models/post');
const isSignedIn = require('../middleware/is-signed-in');

module.exports = router;

//
router.get('/', async (req, res)=>{
    try
    {
        const getAllPosts = await Post.find().populate('creator_id');
        res.render('posts/index.ejs',{getAllPosts});
        
    }
    catch(err)
    {
        console.log(err);
        res.redirect('/');
    }
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