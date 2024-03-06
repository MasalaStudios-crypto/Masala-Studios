const bcrypt=require('bcrypt')
const connection = require('../config/db')
const jwt=require('jsonwebtoken')
require('dotenv').config()


class courseControllers{

  allCourses = (req, res) =>{
    let sql = 'SELECT * from course WHERE is_deleted = 0 and is_disabled = 0'
    
    connection.query(sql, (err, result)=>{
          console.log(result);
          console.log(err);
        err?res.status(500).json(err):res.status(200).json(result)
   })
  }




}


module.exports = new courseControllers;