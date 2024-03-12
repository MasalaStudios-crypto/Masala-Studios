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

  allCoursesOneUserEnroll = (req, res) => {
    const { user_id } = req.params;
    //console.log(req.params);
  
    let sql = `
        SELECT course.*
        FROM course
        JOIN register ON course.course_id = register.course_id
        JOIN user ON user.user_id = register.user_id
        WHERE course.is_deleted = 0 AND course.is_visible = 1 AND course.is_disabled = 0 AND user.user_id = ${user_id}
    `;
  
    connection.query(sql, (err, result) => {
      if (err) {
        res.status(500).json(err);
      } else {
        // Extraer los IDs de los profesores
        const profesorIds = result.map((curso) => curso.creator_user_id);
  
        // Consultar todos los datos de los profesores asociados a los cursos
        let sql2 = `
          SELECT user.*
          FROM user
          WHERE user.user_id IN (${profesorIds.join(',')})
          GROUP BY user.user_id;
        `;
  
        connection.query(sql2, (err2, teachersResult) => {
          if (err2) {
            res.status(500).json(err2);
          } else {
            // Crear un objeto de respuesta que contenga la información de los cursos y profesores
            const response = {
              courses: result,
              teachers: teachersResult,
            };
  
            // Enviar la respuesta al cliente
            res.status(200).json(response);
            //console.log(response);
          }
        });
      }
    });
  };

  createCourse = (req, res) => {
    try {
      const { name, duration, price, description, creator_user_id } = JSON.parse(req.body.CrCourse);
      const courseImg = req.file ? req.file.filename : null;
  
      let sql;
      let values;
  
      if (courseImg) {
        // Si hay una imagen, incluir la columna course_img en la consulta
        sql = `INSERT INTO course (name, duration, price, description, creator_user_id, course_img) VALUES (?, ?, ?, ?, ?, ?)`;
        values = [name, duration, price, description, creator_user_id, courseImg];
      } else {
        // Si no hay imagen, omitir la columna course_img en la consulta
        sql = `INSERT INTO course (name, duration, price, description, creator_user_id) VALUES (?, ?, ?, ?, ?)`;
        values = [name, duration, price, description, creator_user_id];
      }
  
      // Ejecutar la consulta SQL
      connection.query(sql, values, (error, result) => {
        if (error) {
          console.error("Error al insertar curso:", error);
          res.status(500).json({ error: "Error interno del servidor" });
        } else {
          const courseId = result.insertId;
  
          if (courseImg) {
            // Si hay una imagen, insertarla en la base de datos
            let imgSql = `UPDATE course SET course_img = ? WHERE course_id = ?`;
            let imgValues = [courseImg, courseId];
            connection.query(imgSql, imgValues, (imgError, imgResult) => {
              if (imgError) {
                console.error("Error al actualizar imagen del curso:", imgError);
                res.status(500).json({ error: "Error interno del servidor" });
              } else {
                res.status(200).json({ course_id: courseId });
              }
            });
          } else {
            // Si no hay imagen, enviar respuesta directamente
            res.status(200).json({ course_id: courseId });
          }
        }
      });
    } catch (error) {
      console.error("Error en el controlador createCourse:", error);
      res.status(500).json({ error: "Error interno del servidor" });
    }


  };
  
  allCoursesOneUserCreate = (req, res) => {
    const { user_id } = req.params;
    //console.log(req.params);
  
    let sql = `
      SELECT course.*
        FROM course
        JOIN register ON course.course_id = register.course_id
        JOIN user ON user.user_id = register.user_id
        WHERE course.is_deleted = 0 AND course.is_visible = 1 AND course.is_disabled = 0 AND course.creator_user_id = ${user_id}
        GROUP BY course.course_id;
    `;
  
    connection.query(sql, (err, result) => {
      if (err) {
        res.status(500).json(err);
      } else {
        // Extraer el IDs de los cursos
        const cursosIds = result.map((curso) => curso.course_id);
  
        // Consultar todos los datos de los alumnos asociados a los cursos
        let sql2 = `
                SELECT user.*
                  FROM user
                  WHERE user.user_id IN (SELECT register.user_id
                  FROM register, user
                  WHERE user.user_id = register.user_id
                  AND register.course_id = 1)
        `;
  
        connection.query(sql2, (err2, studentsResult) => {
          if (err2) {
            res.status(500).json(err2);
          } else {
            // Crear un objeto de respuesta que contenga la información de los cursos y alumnos
            const response = {
              courses: result,
              students: studentsResult,
            };
            // Enviar la respuesta al cliente
            res.status(200).json(response);
            //console.log(response);
          }
        });
      }
    });
  };

  detailsCourse = async (req, res) => {
    try {
      const { course_id } = req.params;
  
      // Primera consulta SQL
      const sql1 = `SELECT * FROM course WHERE is_deleted = 0 AND is_disabled = 0 AND course_id = ${course_id}`;
      const result1 = await connection.promise().query(sql1);
  
      // Segunda consulta SQL
      const sql2 = `SELECT subject.* FROM subject, register WHERE register.course_id = subject.course_id AND register.course_id = ${course_id}`;
      const result2 = await connection.promise().query(sql2);
  
      // Tercera consulta SQL
      const sql3 = `SELECT resource.*
                      FROM resource, course
                      WHERE resource.course_id = course.course_id AND course.course_id = ${course_id}`;
      const result3 = await connection.promise().query(sql3);
  
      // Manipular los resultados según tus necesidades
      const response = {
        result1: result1[0][0], // solo la primera posición
        result2: result2[0],    // array completo de subjects
        result3: result3[0]     // array completo de resource
      };
  
      res.status(200).json(response);
    } catch (err) {
      res.status(500).json(err);
    }
  };
  

  getSubjects =(req,res)=>{
    const { course_id } = req.params;
   
    let sql=`SELECT c.name as course_name , s.*, u.name as profesor_name
    FROM subject s, course c, user u
      WHERE c.creator_user_id = u.user_id AND s.course_id = c.course_id AND s.course_id=${course_id};`
    
    connection.query(sql, (err, result)=>{
      console.log(result);

     err?res.status(500).json(err):res.status(200).json(result)
    })
  }

  addSubject=(req, res)=>{
    const {course_id} = req.params
    const {name, duration, subject_id}=req.body
    console.log(req.params)
    
    let sql=`INSERT into subject (course_id, subject_id, name, duration) VALUES (${course_id}, ${subject_id},"${name}", ${duration})`

    connection.query(sql, (err, result)=>{
      console.log("resultadoo",result);

     err?res.status(500).json(err):res.status(200).json(result)
    })
  }

  oneCourse = (req, res) =>{
    const {course_id} = req.params;
   
    
  
    const sql = `SELECT * FROM course WHERE is_deleted = 0 AND is_disabled = 0 AND course_id = ${course_id}`;
    connection.query(sql, (err,result)=>{
      err?res.status(500).json(err): res.status(200).json(result)
    })
  }

  allCoursesProfile = (req, res) =>{

    const {user_id} = req.params;
    
    // let sql = `SELECT *
    // FROM course
    // WHERE course_id NOT IN (
    //     SELECT register.course_id
    //     FROM register
    //     WHERE register.user_id = ${user_id}
    // ) AND course.is_deleted = 0 AND course.is_visible = 1 AND course.is_disabled = 0 AND course.creator_user_id != ${user_id};`

    let sql = 'SELECT * from course WHERE is_deleted = 0 and is_disabled = 0'
    
    connection.query(sql, (err, result)=>{
          console.log(result);
          console.log(err);
        err?res.status(500).json(err):res.status(200) .json(result)
   })
  }
  
}


module.exports = new courseControllers;