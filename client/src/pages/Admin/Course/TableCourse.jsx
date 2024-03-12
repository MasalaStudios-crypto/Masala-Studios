import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { MasalaContext } from '../../../Context/MasalaProvider'
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { Button, ButtonGroup, Dropdown } from 'react-bootstrap'

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

        })
        .catch((err)=>{
          console.log(err)
        })
    }
  },[reset, token])

  const onDeleted=(id, state)=>{
    let url="http://localhost:3000/course/activate"
    if(!state){
      url="http://localhost:3000/course/deactivate"
    }
    axios
      .put(url, {id})
      .then(()=>setReset(!reset))
      .catch((err)=>console.log(err))
  }

  const onVisible=(id, state)=>{
    let url="http://localhost:3000/course/visible"
    if(!state){
      url="http://localhost:3000/course/invisible"
    }
    axios
      .put(url, {id})
      .then(()=>setReset(!reset))
      .catch((err)=>console.log(err))
  }

  const onDisabled=(id, state)=>{
    let url="http://localhost:3000/course/enable"
    if(!state){
      url="http://localhost:3000/course/disable"
    }
    axios
      .put(url, {id})
      .then(()=>setReset(!reset))
      .catch((err)=>console.log(err))
  }

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

              <TableCell align="right"><Button variant={elem.is_deleted===0?"success":"danger"} onClick={()=>onDeleted(elem.course_id, elem.is_deleted)}>{elem.is_deleted===0?"Activo":"Inactivo"}</Button></TableCell>

              <TableCell align="right"><Button variant={elem.is_visible===1?"success":"danger"} onClick={()=>onVisible(elem.course_id, elem.is_visible)}>{elem.is_visible===1?"Visible":"No visible"}</Button></TableCell>

              <TableCell align="right"><Button variant={elem.is_disabled===0?"success":"danger"} onClick={()=>onDisabled(elem.course_id, elem.is_disabled)}>{elem.is_disabled===0?"Habilitado":"Deshabilitado"}</Button></TableCell>

              <TableCell onClick={()=>{navigate(`/subjects/${elem.course_id}`)}}><Button>Ver temas</Button></TableCell>
           
            </TableRow>
          ))}
        </TableBody>

  </Table>
  </TableContainer>
  )
}
