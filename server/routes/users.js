var express = require('express');
var router = express.Router();
const userControllers = require('../controllers/userControllers');
const multer= require('../middlewares/multerSIngle');
const verify = require('../middlewares/TokenVerify');

router.post('/register', userControllers.register)

router.post('/login', userControllers.login)

router.get('/getOneUser/:id', userControllers.getOneUser)

module.exports = router;
