import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import { useContext, useEffect, useState } from 'react'
import { MasalaContext } from '../../../Context/MasalaProvider'
import axios from 'axios'
import { Button } from 'react-bootstrap'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { ModalBasico } from '../../../components/ModalBasico/ModalBasico'
import { FormularioCurso } from '../../../components/FormularioCurso/FormularioCurso'
import { FormularioTema } from '../../../components/FormularioTema/FormularioTema'

export const TableSubject = () => {

  const [subjects, setSubjects]=useState()
  const[show, setShow]=useState(false)
  const {token}= useContext(MasalaContext)
  const {course_id} = useParams()
  const {user}=useContext(MasalaContext)
  const navigate =useNavigate();

  const showModal=()=>{
    setShow(!show) 
  }

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
  },[token, show])

  return (
    <div>
  
      <div>
        <Button onClick={showModal}>Añadir tema</Button>
        <Button onClick={() => { user?.type === 1 ? navigate("/allCourses") : navigate("/") }}>Atrás</Button>

      </div>
      {subjects ?
      <div>dsad
      <h2>Nombre del curso: {subjects[0]?.course_name}</h2>
      <h3>Profesor: {subjects[0]?.profesor_name}</h3>
      </div>
      :
      <p></p>
      }


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
            <TableCell align="right">{elem.duration}h</TableCell>
            <TableCell align="right">{elem.creation_date}</TableCell>
            <TableCell ><Button>Temario</Button></TableCell>
          </TableRow>
        )}

      </TableBody>

</Table>
</TableContainer>

<ModalBasico
handleClose={showModal}
show={show}
title="Añadir tema">
  <FormularioTema
  course_id={course_id}
  handleClose={showModal}/>
</ModalBasico>

</div>
  )
}
