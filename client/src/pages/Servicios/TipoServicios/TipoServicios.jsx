import React from 'react'
import { Col, Row } from 'react-bootstrap'
import './tiposervicios.scss'

export const TipoServicios = () => {
  return (
    <Col className='tipoServicios-ppal'>
      <Row className='section1' id='OC'>
        <h2> Operador de Cámara </h2>

      </Row>
   
      <Row className='section2' id='APE'>
      <h2> Auxiliar de Producción de Eventos </h2>

      </Row>
      <Row className='section3' id='EV'>
      <h2> Editor de Video </h2>

      </Row>
      <Row className='section4' id='TVE'>
      <h2> Técnico de Video para Espectáculos </h2>
      </Row>
   
    </Col>
  )
}
