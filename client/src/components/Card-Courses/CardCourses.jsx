import React, { useState } from 'react'
import { Button, Card } from 'react-bootstrap'
import './cardCourses.scss'

export const CardCourses = ({elem}) => {

  return (
    
 

    <Card style={{backgroundColor:`rgba(250, 192, 32, 0.854)`}} className='allcourses-card'>
    <Card.Img variant="top" src={`http://localhost:3000/images/course_img/${elem?.course_img}`} />
    <Card.Body style={{textAlign:'center'}}>
      <Card.Title>{elem?.name}</Card.Title>
    <p>{elem?.duration}h.</p>
    <p>{elem?.price}€</p>
      
    <Button variant="primary">Agregar</Button>
    <br/><br />
    <Button variant="primary">Más info.</Button>
    </Card.Body>
    </Card>

    
  )
}
