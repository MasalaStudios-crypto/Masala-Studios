import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { MasalaContext } from '../../../Context/MasalaProvider'
import { Button } from 'react-bootstrap'
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'

export const ListaCursosApuntados = ({user_id, handleClose2}) => {

  const [reset, setReset] = useState(false)
  const [coursesSign, setCoursesSign]=useState([])
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
    if (window.confirm("¿Estás seguro de que quieres dar de alta en este curso al usuario?")) {
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
  }
  const onDereg=(course_id)=>{
    if (window.confirm("¿Estás seguro de que quieres dar de baja del curso al usuario?")) {
    axios
    .put(`http://localhost:3000/users/adminDereg/${user_id}`,{course_id})
    .then(()=>
    setReset(!reset),
    setMessage("Usuario "+coursesSign[0].user_name+" "+coursesSign[0].user_lastname+" desapuntado correctamente"))
    .catch((err)=>console.log(err))
  }
  }      

  console.log(coursesSign)

  return (

    <TableContainer component={Paper}>
      <Table  aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Nombre Cursos</TableCell>
            <TableCell align="right">Calificacion</TableCell>
            <TableCell align="right">Registrar</TableCell>
            <TableCell align="right">Borrar</TableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {coursesSign?.map((elem, index)=>(
            <TableRow
            key={index}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
          >
              <TableCell component="th" scope="row">{elem.name}</TableCell>
              <TableCell align="right">{elem.grade}</TableCell>
              <TableCell align="right"><Button onClick={() => {onReg(elem.course_id)}}>Registrar</Button></TableCell>

              <TableCell align="right"><Button onClick={() => {onDereg(elem.course_id)}}>Borrar</Button></TableCell>
            </TableRow>
            ))}
        </TableBody>
      </Table>
      <span>{message}</span>
    </TableContainer>
    
 
  )
}
