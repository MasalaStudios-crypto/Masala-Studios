import React, { useState } from 'react'
import { Button, Card } from 'react-bootstrap'
import './cardCursos.scss'

export const CardCursos = ({elem}) => {

  

  return (
    
   
    <Card style={{backgroundColor:"rgba(255, 255, 255, 0.243)"}} className='serv-card'>
    <Card.Img variant="top" src="" />
    <Card.Body>
    <p>{elem.description}</p>
      
    <Button variant="primary">Ver más</Button>
    </Card.Body>
    </Card>
    
  )
}
