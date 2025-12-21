const express = require('express');
const router = express.Router();

const Post = require('../models/post');
const Comment = require('../models/comment');
const isSignedIn = require('../middleware/is-signed-in');

module.exports = router;


router.post('/', isSignedIn, async (req, res) => {
try {
    req.body.creator_id = req.session.user._id;

    const newComment = await Comment.create(req.body);

    res.redirect(`/posts/${req.body.post_id}`); // go back to the post page
  } catch (err) {
    
    res.redirect('/');
  }
});

router.get('/:id/edit', isSignedIn, async (req, res) => {
  try {

    const comment = await Comment.findById(req.params.id);


    res.render('comments/edit.ejs', {comment});
  } catch (error) {
    
    res.redirect('/');
  }
});

router.put('/:id', isSignedIn, async (req,res)=>{
    try
    {
      const comment = await Comment.findById(req.params.id);
      const isOwner = comment.creator_id.equals(req.session.user._id);
      if(isOwner)
      {
          await comment.updateOne(req.body);
          res.redirect(`/posts/${comment.post_id}`);
      }
      else
      {
          res.redirect(`/posts/${req.params.id}`);
      }
    }
    catch(err)
    {
      res.redirect('/');
    }
});

router.delete('/:id', async(req,res)=>{
    try
    {
        const comment = await Comment.findById(req.params.id);
        const isOwner = comment.creator_id.equals(req.session.user._id)
        if(isOwner)
        {
            await comment.deleteOne();
            res.redirect(`/posts/${comment.post_id}`);
        }
        else
        {
            throw new Error("Permission Denied to delete");
        }
    }
    catch(err)
    {
        
        res.redirect('/');
    }
});

router.post('/:id/like', isSignedIn, async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);

    if (!comment) return res.redirect('/');

    const userId = req.session.user._id;

    // check if user already liked the comment
    const alreadyLiked = comment.likes.some(like => like.user_id.equals(userId));

    if (alreadyLiked) {
      // unlike
      comment.likes = comment.likes.filter(like => !like.user_id.equals(userId));
    } else {
      // like
      comment.likes.push({ user_id: userId });
    }

    await comment.save();
    res.redirect(`/posts/${comment.post_id}`);
  } catch (err) {
    
    res.redirect('/');
  }
});
