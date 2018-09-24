var express = require('express');
var router = express.Router();
const UserController = require('../controllers/UserController');
const userPolicies = require("../policies/User")
const userValidation = require('../middlewares/User');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.send(req.session);
});
router.post('/registration', userValidation.registration, UserController.registration);
router.post('/login', userValidation.login, UserController.login);
router.get('/logout', UserController.logout);
router.get('/search', UserController.search);
module.exports = router;
