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
        await Post.updateOne(req.body);
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
        const listing = await Listing.findById(req.params.id);
        const isOwner = listing.owner.equals(req.session.user._id)
        if(isOwner)
        {
            await listing.deleteOne();
            res.redirect('/listings');
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