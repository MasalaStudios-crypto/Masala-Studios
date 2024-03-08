import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import { useContext, useEffect, useState } from 'react'
import { MasalaContext } from '../../../Context/MasalaProvider'
import axios from 'axios'
import { Button } from 'react-bootstrap'
import { useParams } from 'react-router-dom'

export const TableSubject = () => {

  const [subjects, setSubjects]=useState()
  const [reset, setReset]=useState(false)
  const {token}= useContext(MasalaContext)
  const {course_id} = useParams()

  useEffect(()=>{
    if(token){
      axios.defaults.headers.common["Authorization"]=`Bearer ${token}`
      axios
        .get(`http://localhost:3000/course/subjects/${course_id}`)
        .then((res)=>{
          setSubjects(res.data)    
        })
        .catch((err)=>{
          console.log(err)
        })
    }
  },[reset, token])

  return (
    <div>
      {subjects?.map((elem)=>
        <div key={elem.coruse_id}>
        <h2>Nombre del curso: {elem.course_name}</h2>
        <h3>Profesor: {elem.profesor_name}</h3>
        </div>
      )}


    <TableContainer component={Paper}>
    <Table sx={{ minWidth: 650 }} aria-label="simple table">
      <TableHead>
        <TableRow>
          <TableCell>Nombre</TableCell>
          <TableCell align="right">Duracion</TableCell>
          <TableCell align="right">Fecha Creacion</TableCell>
          <TableCell align="right">Documento</TableCell>

        </TableRow>
      </TableHead>
      <TableBody>
        {subjects?.map((elem)=>
          <TableRow
          key={elem.subject_id}
          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
          >
            <TableCell align="right">{elem.name}</TableCell>
            <TableCell align="right">{elem.duration}</TableCell>
            <TableCell align="right">{elem.creation_date}</TableCell>
            <TableCell ><Button>Temario</Button></TableCell>
          </TableRow>
        )}

      </TableBody>

</Table>
</TableContainer>

</div>
  )
}
