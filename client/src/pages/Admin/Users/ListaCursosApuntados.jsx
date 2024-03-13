import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { MasalaContext } from '../../../Context/MasalaProvider'
import { Button } from 'react-bootstrap'

export const ListaCursosApuntados = ({user_id, handleClose2}) => {

  const [reset, setReset] = useState(false)
  const [coursesSign, setCoursesSign]=useState()
  const [message, setMessage]=useState("")

  const {token}= useContext(MasalaContext)
  useEffect(()=>{
    if(token){
      axios.defaults.headers.common["Authorization"]=`Bearer ${token}`
      axios
      .get(`http://localhost:3000/users/allCourses/${user_id}`)
      .then((res)=>{setCoursesSign(res.data)})
      .catch((err)=>console.log(err))
    }
  },[token])

  const onReg=(course_id)=>{
    axios
    .put(`http://localhost:3000/users/adminReg/${user_id}`,{course_id})
    .then(()=>
    setReset(!reset),
    setMessage("Usuario "+coursesSign[0].user_name+" "+coursesSign[0].user_lastname+" registrado correctamente"))
    .catch((err)=>{
      if (err.response.status === 500){
        setMessage("Usuario ya registrado")
        console.log(err)
      }
    })} 
  const onDereg=(course_id)=>{
    axios
    .put(`http://localhost:3000/users/adminDereg/${user_id}`,{course_id})
    .then(()=>
    setReset(!reset),
    setMessage("Usuario "+coursesSign[0].user_name+" "+coursesSign[0].user_lastname+" desapuntado correctamente"))
    .catch((err)=>console.log(err))
  }      
  console.log(coursesSign)

  return (
    <div>
      {coursesSign?.map((elem)=>(
        <div className='d-flex'>
          <h3>{elem.name}</h3>
          <div >
        
          <Button onClick={() => {onReg(elem.course_id)}}>Registrar</Button>
          
          <Button onClick={() => {onDereg(elem.course_id)}}>Borrar</Button>    

          </div>
        </div>
      ))}
       <span>{message}</span>
    </div>
  )
}
