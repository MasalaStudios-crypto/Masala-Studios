import React from 'react'
import { Button, Col, Row } from 'react-bootstrap'
import './tiposervicios.scss'

export const TipoServicios = () => {
  return (
    <Col className='tipoServicios-ppal'>

    <Row className='tipoServicios-h2'>
      <h1 style={{padding:"20px", marginTop:"20px"}}>Tipo de Servicios</h1>
      </Row>
      <Row className='tipoServ-ppal'>

      <Row className='section1' id='OC'>
        <h2  className='tipoServicios-h2'> Operador de Cámara </h2>
        <Col>
        <img className='img-fluid tipoServ-img' src="/images/eventos.jpg" alt="" />
        </Col>
        <Col className='col-md-6 tipoServ-p'>
          <Row className='row-6'>
        <p>Servicio de operador de cámara profesional, livestream  y grabado en todo tipo de eventos en vivo, producciones audiovisuales(cortometrajes, peliculas, conciertos, bandas...) transmisión remota, realización en directo. Manejo y configuración de mochilas LIVE-U y similares</p>
          </Row>
          <Row className='row-cols-md-4 tipoServ-button'>
        <Button>Contactar</Button>
          </Row>
        </Col>
      </Row>


      </Row>

    <Row className='tipoServ-ppal'>
      <Row className='section1' id='APE'>
        <h2  className='tipoServicios-h2'> Auxiliar de Producción de Eventos </h2>
        <Col>
        <img  className='tipoServ-img  img-fluid' src="/images/eventos.jpg" alt="" />
        </Col>
        <Col className='col-md-6-col-sm-6 tipoServ-p'>
          <Row className='row-6'>
        <p>Ofrecemos servicios de asistencia a la producción de eventos y montajes,, transporte y colocación de equipos audiovisuales. Stock, almacén, manejo de máquinas elevadoras autopropulsadas e instalación de equipos audiovisuales. </p>
          </Row>
          <Row className='row-cols-md-4 tipoServ-button'>
        <Button>Contactar</Button>
          </Row>
        </Col>


      </Row>
    </Row>
    <Row className='tipoServ-ppal'>
      <Row className='section1' id='EV'>
        <h2  className='tipoServicios-h2'> Editor de Video </h2>
        <Col>
        <img  className='tipoServ-img  img-fluid' src="/images/eventos.jpg" alt="" />
        </Col>
        <Col className='col-md-6 tipoServ-p'>
          <Row className='row-6'>
        <p>Servicios profesionales de Montaje y Postproducción Audiovisual, manejo de programas de la suite adobe (premiere pro, photoshop, media encoder, affter effects) Da Vinci, etc...</p>
          </Row>
          <Row className='row-cols-md-4 tipoServ-button'>
        <Button>Contactar</Button>
          </Row>
        </Col>


      </Row>
      </Row>

    <Row className='tipoServ-ppal'>
      <Row className='section1' id='TVE'>
        <h2  className='tipoServicios-h2'> Técnico de Video para Espectáculos  </h2>
        <Col>
        <img  className='tipoServ-img img-fluid' src="/images/eventos.jpg" alt="" />
        </Col>
        <Col className='col-md-6 tipoServ-p'>
          <Row className='row-6'>
        <p>Tenemos dentro de nuestra carrtera de servicios la sistencia comoTécnico Audiovisual con especialidad de Video de Espectáculos. Vídeo LED, proyectores, montaje y configuración (software novastar, watchout, control de equipos, resolución de incidencias técnicas...)</p>
          </Row>
          <Row className='row-cols-md-4 tipoServ-button'>
        <Button>Contactar</Button>
          </Row>
        </Col>


      </Row>
    </Row>
   
   
    </Col>
  )
}
