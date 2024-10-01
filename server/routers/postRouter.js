const express = require('express')
const {register,login} = require('../controllers/authController')
const router = express.Router();
const {getPosts,createPost,updatePost,deletePost} = require('../controllers/postController.js')


router.get('/getPosts',getPosts)
router.post('/createPost',createPost)
router.patch('/updatePost/:id',updatePost)
router.delete('/deletePost/:id',deletePost)




module.exports= router