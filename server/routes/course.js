var express = require('express');
const courseControllers = require('../controllers/courseControllers');
var router = express.Router();
const multer = require('../middlewares/multerSingle')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/allCourses', courseControllers.allCourses)

router.get('/allCoursesOneUserEnroll/:user_id', courseControllers.allCoursesOneUserEnroll)

router.get('/allCoursesOneUserCreate/:user_id', courseControllers.allCoursesOneUserCreate)

router.post('/createCourse',multer("course_img"), courseControllers.createCourse)

router.get('/details/:course_id', courseControllers.detailsCourse)

router.get('/subjects/:course_id', courseControllers.getSubjects)

router.post('/addSubject/:course_id', courseControllers.addSubject)

module.exports = router;
