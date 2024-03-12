import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import { Link, useParams } from 'react-router-dom'
import './cursos.scss'
import { FormularioContacto } from '../../components/FormularioContacto/FormularioContacto'
import { ModalBasico } from '../../components/ModalBasico/ModalBasico'


export const OneCourse = ({elem}) => {
  const [course, setCourse] = useState()
  const [imagenes, setImagenes] = useState([])
  const [show, setShow] = useState(false);
  const {course_id} = useParams();

  
  const showModal =()=>{
    setShow(!show)
  }
  



  useEffect(()=>{
    axios
    .get(`http://localhost:3000/course/oneCourse/${course_id}`)
    .then((res) => {
      console.log(res)
      setCourse(res.data)
    })
    .catch(err=>console.log(err))
  }, [course_id])

  console.log(imagenes);
  console.log(course);

  return (
    <>
    <div className='oneCourse-bckcolor'>
    {course ? 
    <div  className='oneCourse-ppal'>
      <h2>Nombre curso: {course[0].name}</h2>

      <div  className='oneCourse-Card'>

      <div>
          <img src={`http://localhost:3000/images/course_img/${course[0].course_img}`}/>
      </div>
      <div className='oneCourse-div'>
        <div className='oneCourse-h4'>
      <p>Duración: {course[0].duration}h.</p>
      <p>Precio: {course[0].price}€</p>
      <h5>Descripción: {course[0].description}</h5>
        </div>
      <div className='oneCourse-Button'>
      <Button style={{justifyContent:'end'}} variant="success" as={Link} to="/allCoursesProfile">Volver</Button>
      <Button style={{justifyContent:'end'}} variant="success" onClick={showModal}> Más info.</Button>

        <ModalBasico
        title="Contacto"
        handleClose={showModal}
        show={show}>
        <FormularioContacto
          handleClose={showModal}/>
        </ModalBasico>
      </div>
      </div>
      </div>
    </div>
    :
    <h2>No existe este Curso</h2>
  }
  </div>
    </>
  )
}
