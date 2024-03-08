import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { MasalaContext } from '../../../Context/MasalaProvider'
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { Button } from 'react-bootstrap'

export const TableCourse = () => {

  const [courses, setCourses]=useState()
  const [reset, setReset]=useState(false)
  const {token}= useContext(MasalaContext)
  const navigate = useNavigate();

  useEffect(()=>{
    if(token){
      axios.defaults.headers.common["Authorization"]=`Bearer ${token}`
      axios
        .get(`http://localhost:3000/course/allCourses`)
        .then((res)=>{
          setCourses(res.data)    
          console.log(res.data)

        })
        .catch((err)=>{
          console.log(err)
        })
    }
  },[reset, token])

  return (

    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Nombre</TableCell>
            <TableCell align="right">Duracion</TableCell>
            <TableCell align="right">Precio</TableCell>
            <TableCell align="right">Fecha Creacion</TableCell>
            <TableCell align="right">Profesor</TableCell>
            <TableCell align="right">Descripcion</TableCell>
            <TableCell align="right">Estado</TableCell>
            <TableCell align="right">Visibilidad</TableCell>
            <TableCell align="right">Habilitado</TableCell>
            <TableCell align="right">Temas</TableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {courses?.map((elem)=>(
            <TableRow
            key={elem.course_id}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {elem.course_name}
              </TableCell>
              <TableCell align="right">{elem.duration}</TableCell>
              <TableCell align="right">{elem.price}</TableCell>
              <TableCell align="right">{elem.register_date}</TableCell>
              <TableCell align="right">{elem.profesor_name}</TableCell>
              <TableCell align="right">{elem.description}</TableCell>
              <TableCell align="right">{elem.is_deleted}</TableCell>
              <TableCell align="right">{elem.is_visible}</TableCell>
              <TableCell align="right">{elem.is_disabled}</TableCell>
              <TableCell onClick={()=>{navigate(`/subjects/${elem.course_id}`)}}><Button>Temario</Button></TableCell>
           
            </TableRow>
          ))}
        </TableBody>

  </Table>
  </TableContainer>
  )
}
