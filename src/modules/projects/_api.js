const express = require('express');
const isLoggedIn = require('../../shared/auth/is-loggedin');
const { getBlogs, postBlogs, deleteBlog, addLike, getBlog, getProjects, postProject, editProject, deleteProject } = require('./_controllers');

const cloudinary = require("cloudinary");
const fs =  require('fs');
const editBlog = require('./edit-project');


cloudinary.config({
  cloud_name: 'dwtrvzpky',
  api_key: '221956492483197',
  api_secret: 'dq3SgsIFr-QObezDRdMPIXr5qVQ',
});

const router = express.Router();

router.get('/projects'   , getProjects );
router.post('/projects'  ,  isLoggedIn , postProject );
router.patch('/projects/:id'  ,  isLoggedIn , editProject );
router.delete('/projects/:id'  ,  isLoggedIn , deleteProject );

module.exports = router;
