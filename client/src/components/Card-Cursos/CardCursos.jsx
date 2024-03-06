import React from 'react'
import { Button, Card } from 'react-bootstrap'
import './cardCursos.scss'

export const CardCursos = () => {
  return (
    
      <Card className='serv-card'>
      <Card.Img variant="top" src="/images/image5.jpg" />
      <Card.Body>
        <p>Editor de Video</p>

        <Button variant="primary">Ver más</Button>
      </Card.Body>
    </Card>
  )
}
