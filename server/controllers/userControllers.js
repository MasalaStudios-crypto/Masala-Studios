const bcrypt=require('bcrypt')
const connection = require('../config/db')
const jwt=require('jsonwebtoken')
require('dotenv').config()




class UserControllers{

  register = (req, res)=>{
    const {name, email, password}= req.body
    console.log(email)
    console.log(password)
    let saltRounds=8;
    bcrypt.genSalt(saltRounds, function(err, salt) {
      bcrypt.hash(password, salt, function(err, hash) {
          // Store hash in your password DB.
          if(err){
            res.status(500).json(err)
          }
          let sql=`INSERT INTO user (name, email, password) VALUES ("${name}", "${email}", "${hash}")`

          connection.query(sql, (error, result)=>{
            if(error){
              res.status (500).json(error)
            }else{ 
            
              res.status(200).json(result);
            }
          })
      });
  });

  }
  

  login = (req, res)=>{
    const {email, password}= req.body
    let sql = `SELECT * FROM user WHERE email ="${email}" AND is_deleted=0`
    connection.query(sql, (err, result)=>{
      if(err){
        res.status(500).json(err)
      }
      else if(!result || !result.length || result[0].is_deleted==1){
        res.status (401).json("Usuario no autorizado")
      }
      else{
        const hash = result[0].password;
        bcrypt.compare(password, hash, (errHash, response)=>{
          if(errHash){
            res.status(500).json(errHash)
          }
          if(response){
            //mandar token
            const token=jwt.sign({
              user: {
                id:result[0].user_id,
                // type:result[0].type
              }
            }, 
            process.env.SECRET,
            {expiresIn: "5d"})
            res.status(200).json({token, user:result[0]})
          }
          else{
            res.status(401).json("Usuario no autorizado")
          }
        })
      }
    })
  }

  getOneUser = (req, res) => {
    const {id} = req.params;

    let sql = `SELECT * FROM user WHERE user_id = ${id} AND is_deleted = 0 AND is_disabled = 0`;

    connection.query(sql, (err, result) => {
      if(err){
        res.status(500).json(err)
      }
      else{
        res.status(200).json(result[0])
      }
    })
  }

  editUser = (req, res) => {
    const {name, lastname, birth_date, dni, phone, address, zip_code, city, province, user_id} = JSON.parse(req.body.editUser)

    
    let img = ""
    console.log(birth_date);
    if(req.file != undefined){
      img = `, user_img = "${req.file.filename}"`
    } 
    
    let sql = `UPDATE user SET name = "${name}", lastname = "${lastname}", birth_date = "${birth_date}", dni = "${dni}", phone = "${phone}", address = "${address}", zip_code = "${zip_code}", city = "${city}", province = "${province}" ${img} WHERE user_id = ${user_id}`;
  
    console.log(sql);
  
    connection.query(sql, (err, result) => {
      if (err) {
        res.status(500).json(err);
      } else {
        res.status(200).json({result, newImg: req.file?.filename});
      } 
    });
    
  }

  allUsers= (req, res)=>{
    let sql = `SELECT * FROM user`
    connection.query(sql, (err, result)=>{
      console.log(result);

     err?res.status(500).json(err):res.status(200).json(result)
    })
  }

  activate=(req, res)=>{
    const {id}=req.body
    let sql =`UPDATE user SET is_deleted=0 where user_id=${id}`
   connection.query(sql, (err, result)=>{
     err?res.status(500).json(err):res.status(200).json(result)
   })
   
  }

  deactivate=(req, res)=>{
    const {id}=req.body
    let sql =`UPDATE user SET is_deleted=1 where user_id=${id}`
    connection.query(sql, (err, result)=>{
      err?res.status(500).json(err):res.status(200).json(result)
    })
  }

  typeAdmin=(req, res)=>{
    const {id}=req.body
    let sql =`UPDATE user SET type=1 where user_id=${id}`
   connection.query(sql, (err, result)=>{
     err?res.status(500).json(err):res.status(200).json(result)
   })
  }

  typeUser=(req, res)=>{
    const {id}=req.body
    let sql =`UPDATE user SET type=2 where user_id=${id}`
   connection.query(sql, (err, result)=>{
     err?res.status(500).json(err):res.status(200).json(result)
   })
  }

  enable=(req, res)=>{
    const {id}=req.body
    let sql =`UPDATE user SET is_disabled=0 where user_id=${id}`
   connection.query(sql, (err, result)=>{
     err?res.status(500).json(err):res.status(200).json(result)
   })
   
  }

  disable=(req, res)=>{
    const {id}=req.body
    let sql =`UPDATE user SET is_disabled=1 where user_id=${id}`
   connection.query(sql, (err, result)=>{
     err?res.status(500).json(err):res.status(200).json(result)
   })
   
  }

  allCreatedCourse=(req, res)=>{
    const {user_id}=req.params
    let sql = `SELECT name FROM course  WHERE creator_user_id = ${user_id};`
    connection.query(sql, (err, result)=>{
      err?res.status(500).json(err):res.status(200).json(result)
    })
  }

  allCourses=(req, res)=>{
    const {user_id}=req.params
    let sql = `

    SELECT c.*, u.name as user_name, u.lastname as user_lastname FROM course c, user u WHERE c.creator_user_id !=${user_id} AND u.user_id=${user_id} AND c.is_deleted=0 AND c.is_visible=1 AND c.is_disabled=0;
   `;

    connection.query(sql, (err, result)=>{
      err?res.status(500).json(err):res.status(200).json(result)
    })
  }

  adminReg =(req, res)=>{
    const {user_id}=req.params
    const {course_id}=req.body
    let sql=`INSERT INTO register (user_id, course_id) VALUES (${user_id}, ${course_id});`
    connection.query(sql, (err, result)=>{
      err?res.status(500).json(err):res.status(200).json(result)
    })
  }
  adminDereg =(req, res)=>{
    const {user_id}=req.params
    const {course_id}=req.body
    let sql=`DELETE FROM register WHERE user_id=${user_id} AND course_id=${course_id};`
    connection.query(sql, (err, result)=>{
      err?res.status(500).json(err):res.status(200).json(result)
    })
  }
  getRegCourses = (req, res)=>{
    const user_id = req.params.user_id;
    const coursesSign = req.body;
    console.log('Courses recibidos:', coursesSign);
  }

  changePassword=(req, res)=>{
    const email=req.body.elem
    const password=req.body.newPass
    console.log(email)
    console.log(password)
    sendMyMail("balcaza4@gmail.com", "body", "asunto");

    let saltRounds=8;
    bcrypt.genSalt(saltRounds, function(err, salt) {
      bcrypt.hash(password, salt, function(err, hash) {
          // Store hash in your password DB.
          if(err){
            res.status(500).json(err)
          }
          let sql=`UPDATE user SET password="${hash}" WHERE email="${email}"; `

          connection.query(sql, (error, result)=>{
            error?
              res.status (500).json(error)
              : res.status(200).json(result)
          })
      });
  });
    
    
 
  }

  deleteUser = (req,res)=>{
    const{user_id} = req.body
    //console.log(user_id);

     let sql = `UPDATE user SET is_deleted = 1 WHERE user_id = ${user_id}`;

    connection.query(sql, (err, result)=>{
      err?res.status(500).json(err):res.status(200).json(result)
    }) 
  }

}


module.exports = new UserControllers()