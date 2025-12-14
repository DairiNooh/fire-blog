const express = require('express');
const router = express.Router();

const Post = require('../models/post');
const Comment = require('../models/comment');
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

router.get('/:id/edit', isSignedIn, async (req, res) => {
  try {

    const post = await Post.findById(req.params.id);


    res.render('posts/edit.ejs', {post});
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});

router.put('/:id', isSignedIn, async (req,res)=>{
    const post = await Post.findById(req.params.id);
    const isOwner = post.creator_id.equals(req.session.user._id);
    if(isOwner)
    {
        await post.updateOne(req.body);
        res.redirect(`/posts/${req.params.id}`);
    }
    else
    {
        res.redirect(`/posts/${req.params.id}`);
    }
});

router.delete('/:id', async(req,res)=>{
    try
    {
        const post = await Post.findById(req.params.id);
        const isOwner = post.creator_id.equals(req.session.user._id)
        if(isOwner)
        {
            await post.deleteOne();
            res.redirect('/posts');
        }
        else
        {
            throw new Error("Permission Denied to delete"); // this triggers the catch block
        }
    }
    catch(err)
    {
        console.log(err);
        res.redirect('/');
    }
});

router.get('/:id', async (req, res) => {
    try
    {
        const post = await Post.findById(req.params.id).populate('creator_id');
        const postComments = await Comment.find({ post_id: post._id }).populate('creator_id');
        res.render('posts/show.ejs', {post, postComments});
    }
    catch(err)
    {
        console.log(err);
        res.redirect('/posts');
    }
});