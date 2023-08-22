const express = require('express');
const isLoggedIn = require('../../shared/auth/is-loggedin');
const { getBlogs, postBlogs, deleteBlog, addLike, getBlog } = require('./_controllers');

const cloudinary = require("cloudinary");
const fs =  require('fs');
const editBlog = require('./edit-blog');


cloudinary.config({
  cloud_name: 'dwtrvzpky',
  api_key: '221956492483197',
  api_secret: 'dq3SgsIFr-QObezDRdMPIXr5qVQ',
});

const router = express.Router();

router.get('/blogs'   , getBlogs );
router.get('/blogs/:id'  , isLoggedIn , getBlog );
router.post('/blogs'  ,  isLoggedIn , postBlogs );
router.patch('/blogs/:id'  ,  isLoggedIn , editBlog );
router.delete('/blogs/:id'  ,  isLoggedIn , deleteBlog );
router.put('/blogs/:id'  ,  isLoggedIn , addLike );

module.exports = router;
