import React from 'react'
import './servicios.scss'
import { Button, Card, Col, Row } from 'react-bootstrap'
import { CoursesServices } from '../Cursos/CoursesServices'
import { TipoServicios } from './TipoServicios/TipoServicios'
import { useNavigate } from 'react-router-dom'

export const Servicios = () => {
  const navigate= useNavigate()
  return (
    <div className='service-ppal'>
    <Row className='service-title'>
      <h1>Servicios</h1>
    </Row>
        
    <Row className='serv-ppal'>
      <Col className='serv-div1'>
        <CoursesServices/>
      </Col>
      <Col className='serv-div2'>
       

        <Card className='serv-card'>
      <Card.Img variant="top" src="/images/image6.jpg" />
      <Card.Body>
        <p>Operador de Cámara</p>
        <Button 
        variant="primary" 
        href='#OC' 
        onClick={()=>{navigate('/tipoServicios')}}>
          Ver más
          </Button>
      </Card.Body>
    </Card>
        <Card className='serv-card'>
      <Card.Img 
      variant="top" 
      src="/images/eventos.jpg" />
      <Card.Body>
        <p>Auxiliar de Producción de Eventos</p>
   
         <Button 
        variant="primary" 
        href='#APE' 
        onClick={()=>{navigate('/tipoServicios')}}>
          Ver más
          </Button>
      </Card.Body>
      
    </Card>
        <Card className='serv-card'>
      <Card.Img variant="top" src="/images/image5.jpg" />
      <Card.Body>
        <p>Editor de Video</p>

        <Button 
        variant="primary" 
        href='#EV' 
        onClick={()=>{navigate('/tipoServicios')}}>
          Ver más
          </Button>
      </Card.Body>
    </Card>
        <Card className='serv-card'>
      <Card.Img variant="top" src="/images/equipo.jpg" />
      <Card.Body>
        <p>Técnico de Video para Espectáculos</p>
        
        <Button 
        variant="primary" 
        href='#TVE' 
        onClick={()=>{navigate('/tipoServicios')}}>
          Ver más
          </Button>
      </Card.Body>
    </Card>
      </Col>
    </Row>
    </div>
  )
}
