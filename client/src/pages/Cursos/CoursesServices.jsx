import React, { useEffect, useState } from 'react'
import { Button, Card, Carousel } from 'react-bootstrap'
import './cursos.scss'
import axios from 'axios'
import { FormularioContacto } from '../../components/FormularioContacto/FormularioContacto'
import { ModalBasico } from '../../components/ModalBasico/ModalBasico'

export const CoursesServices = () => {
  const [cursos, setCursos] = useState([])
  const[show, setShow] = useState(false);

  const showModal =()=>{
    setShow(!show)
  }
  useEffect(()=>{
    axios
        .get("http://localhost:3000/course/allCoursesService")
        .then((res)=>{
        setCursos(res.data)
      })
        .catch((err)=>console.log(err))

  },[])

  return (
    <>

        
      <Carousel  className='Carousel-ppal'>

      {cursos.map((elem)=>(
        
        <Carousel.Item key={elem.course_id} className='Carousel-ppal'>

      <Card style={{backgroundColor:"rgba(255, 255, 255, 0.243)"}} className='serv-card'>
        <Card.Title style={{textAlign:"center"}}>{elem?.name}</Card.Title>
    
      <Card.Img  variant="top" src={`http://localhost:3000/images/course_img/${elem?.course_img}`} />
      <Card.Body>
      <p>Descripción: {elem?.description}</p>
      <p>{elem?.duration}h.</p>
      <p>{elem?.price}€</p>
             
        <Button style={{justifyContent:'end'}} variant="success" onClick={showModal}> Más info.</Button>

      </Card.Body>
      </Card>

      </Carousel.Item>
        ))}

      </Carousel>
        
        <ModalBasico
        name={cursos.name}
        title="Contacto"
        handleClose={showModal}
        show={show}>
        <FormularioContacto
          name={cursos.name}
          handleClose={showModal}/>
        </ModalBasico>
    
    </>
  )
}
