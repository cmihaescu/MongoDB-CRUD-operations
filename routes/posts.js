const express = require('express');
const { Mongoose } = require('mongoose');
const router = express.Router();
const Post = require('../models/post');

const populateDb = async function() {
    const posts = await Post.find();
    return posts; 
}

const data = {
    posts: populateDb()
}


// GET ALL POSTS FROM DB

router.get('/', async (req, res) => {
    try {
        const posts = await Post.find()
        res.render('./pages/home', {posts});
    } catch(err){
        res.send('Error ' + err)
    }
})

// GET POST FROM DB

router.get('/post/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        res.render('pages/single', {post});
    } catch(err){
        res.send('Error ' + err)
    }
})

// CREATE POST TO DB

router.get('/CreatePostPage', (req, res) => {
    console.log('creating post')
    res.render('pages/CreatePostPage', {});
});


router.post('/CreatePostPage/createPost', async (req,res)=>{
    const post = new Post ({
        title: req.body.title,
        content: req.body.content,
        slug: req.body.slug
    });

    try {
       const p1 = await post.save();
       res.render('pages/postCreated', {p1});
    } catch(err) {
        res.send('Error'+ err);
    }
})

// EDIT POST TO DB

router.get('/post/edit/:id', async (req, res) => {
    const post = await Post.findById(req.params.id)
    console.log('creating post')
    res.render('pages/EditPostPage', {post});
});

router.post('/post/edit/:id', async (req, res)=> {
    try {
        let Updatedpost = await Post.findById(req.params.id)
        let { title, content, slug } =req.body;

    if(title) Updatedpost.title = title;
    if(content) Updatedpost.content = content;
    if(slug) Updatedpost.slug = slug;

        const p1 = await Updatedpost.save();
        res.render('pages/postUdated', {p1});
    } catch (err){
        res.send ('Error '+err);
    }
})

// DELETE POST FROM DB

router.get('/post/delete/:id', async (req, res)=> {
    try {
        const post = await Post.findById(req.params.id)
        res.render('pages/DeletePage', {})
        const p1 = await post.remove();
    } catch (err){
        res.send ('Error '+err);
    }
})

// DELETE ALL POST FROM DB

router.get('/confirmDeleteAllPage', (req, res) => {
    res.render('pages/confirmDeleteAllPage', {})
})

router.get('/confirmDeleteAllPage/deleteAllPage', async (req, res) => {
    const posts = Post.find()
    await posts.remove();
    res.render('pages/deleteAllPage', {})
})

module.exports = router