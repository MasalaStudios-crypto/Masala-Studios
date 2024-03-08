var express = require('express');
var router = express.Router();
const userControllers = require('../controllers/userControllers');
const multer= require('../middlewares/multerSIngle');
const verify = require('../middlewares/TokenVerify');

router.post('/register', userControllers.register)

router.post('/login', userControllers.login)

router.get('/getOneUser/:id', userControllers.getOneUser);

//no es dinámica porque nos traemos el id del front
router.put('/editUser', multer("users"), userControllers.editUser);

router.get('/allUsers', userControllers.allUsers);

router.put('/activate', userControllers.activate)

router.put('/deactivate', userControllers.deactivate)

router.put('/typeAdmin', userControllers.typeAdmin)

router.put('/typeUser', userControllers.typeUser)

router.put('/enable', userControllers.enable)

router.put('/disable', userControllers.disable)

router.get('/allCreatedCourse', userControllers.allCreatedCourse)

router.get('/allCreatedCourse', userControllers.allRegCourse)


module.exports = router;
