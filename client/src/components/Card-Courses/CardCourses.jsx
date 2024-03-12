import React, { useState } from 'react'
import { Button, Card } from 'react-bootstrap'
import './cardCourses.scss'
import { Link } from 'react-router-dom'
import { ModalBasico } from '../ModalBasico/ModalBasico'
import { FormularioContacto } from '../FormularioContacto/FormularioContacto'

export const CardCourses = ({elem}) => {
  const[show, setShow] = useState(false);

  const showModal =()=>{
    setShow(!show)
  }

  return (
    
 

    <Card style={{backgroundColor:`rgba(250, 192, 32, 0.854)`}} className='allcourses-card'>
    <Card.Img variant="top" src={`http://localhost:3000/images/course_img/${elem?.course_img}`} />
    <Card.Body style={{textAlign:'center'}}>
      <Card.Title>{elem?.name}</Card.Title>
    <p>{elem?.duration}h.</p>
    <p>{elem?.price}€</p>
      
    <Button variant="primary" onClick={showModal} >Apuntarse</Button>
    <Button variant="primary" as={Link} to={`/oneCourse/${elem.course_id}`} elem={elem} >Más info.</Button>
    </Card.Body>
    <ModalBasico
        title="Contacto"
        handleClose={showModal}
        show={show}>
        <FormularioContacto
          elem = {elem}
          handleClose={showModal}/>
        </ModalBasico>
    </Card>

    
  )
}
