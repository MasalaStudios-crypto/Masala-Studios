import React, { useState } from 'react'
import { Button, Card } from 'react-bootstrap'
import './cardCursos.scss'

export const CardCursos = ({elem}) => {

  

  return (
    
   
    <Card style={{backgroundColor:"rgba(255, 255, 255, 0.243)"}} className='serv-card'>
    <Card.Img variant="top" src={`http://localhost:3000/images/course_img/${elem?.course_img}`} />
    <Card.Body>
      <Card.Title>{elem?.name}</Card.Title>
    <p>Descripción: {elem?.description}</p>
    <p>{elem?.duration}h.</p>
    <p>{elem?.price}€</p>
      
    <Button variant="primary">Ver más</Button>
    </Card.Body>
    </Card>
    
  )
}
