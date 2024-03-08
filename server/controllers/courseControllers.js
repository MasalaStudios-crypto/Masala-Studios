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

  saveCourseImg = async (course_img, course_id, res) =>{
   
      let sql = `INSERT INTO course (course_img, course_id) VALUES ('${course_img.filename}', '${course_id}')`
      connection.query(sql, (error,result)=>{
        if(error){
        
          res.status(500).json(error);
          // throw error
        }else{
          res.status(200).json(result);
        }
      })
  }



createCourse = (req, res) => {
  try {
    const { name, duration, price, description, creator_user_id } = JSON.parse(req.body.CrCourse);

    let sql = `INSERT INTO course (name, duration, price, description, creator_user_id) VALUES ('${name}', '${duration}', ${price}, '${description}', ${creator_user_id})`;

    connection.query(sql, (error, result) => {
      if (error) {
        res.status(500).json(console.log(error)); 
      } else{
        let course_id = result.insertId;
        try{
            this.saveCourseImg(req.file, course_id, res)
        }
        catch(err){
            console.log("Holaa");
        }
        res.status(200).json(course_id)
    }
    });
  } catch (error) {
    res.status(500).json({ error: error.message }); // Enviar mensaje de error al cliente
  }
};

  }
 






module.exports = new courseControllers;