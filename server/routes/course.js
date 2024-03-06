var express = require('express');
const courseControllers = require('../controllers/courseControllers');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/allCourses', courseControllers.allCourses)

module.exports = router;
