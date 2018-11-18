const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');
const PostController = require('../controllers/PostController');
const userValidation = require('../middlewares/User');
const UserPolicies = require("../policies/User");
router.get('/getUser', UserPolicies.isAuth, UserController.getUser);
router.get('/getUsers', UserController.getUsers);
router.get('/getAllPosts',UserPolicies.isAuth, UserController.getAllPosts);
router.post('/addPost', UserPolicies.isAuth, PostController.addPost);
router.post('/editPost', UserPolicies.isAuth, PostController.editPost);
router.get('/getPost', UserPolicies.isAuth, PostController.getPost);
router.get('/getAllPostsByUser', UserPolicies.isAuth, PostController.getAllPostsByUser);
router.get('/getSubscribers', UserPolicies.isAuth, UserController.getSubscribers)
router.get('/getSubscribes', UserPolicies.isAuth, UserController.getSubscribes)
router.delete('/removePost/:id', UserPolicies.isAuth, UserPolicies.isHis, PostController.removePost);
router.post('/changeinfo',  UserPolicies.isAuth, userValidation.changeInfo, UserController.changeInfo);
router.post('/changepassword', UserPolicies.isAuth, UserController.changePassword);
router.post('/comment', UserPolicies.isAuth, PostController.comment);
router.post('/removeComment', UserPolicies.isAuth, PostController.removeComment);

router.post('/subscribe', UserPolicies.isAuth, UserController.subscribe);
router.post('/unsubscribe', UserPolicies.isAuth, UserController.unsubscribe);

router.post('/like', UserPolicies.isAuth, PostController.like);
router.post('/dislike',UserPolicies.isAuth,  PostController.dislike);
router.post('/changeAvatar', UserPolicies.isAuth, UserController.changeAvatar);
router.post('/removeAvatar', UserPolicies.isAuth, UserController.removeAvatar);
module.exports = router;
