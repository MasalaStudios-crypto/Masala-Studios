import React, { useEffect, useState } from 'react';
import { Button, Col, Row } from 'react-bootstrap'
import './mycourse.scss'
import { useParams } from 'react-router-dom';
import axios from 'axios';

export const MyCourse = () => {
  const { course_id } = useParams()
  const [courseDetails, setCourseDetails] = useState(null);

  useEffect(() => {
    // Realiza una solicitud para obtener detalles del curso utilizando course_id
    axios.get(`http://localhost:3000/course/details/${course_id}`)
      .then((response) => {
        setCourseDetails(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [course_id]);

  console.log(courseDetails); //aquí tengo datos del curso
  console.log(course_id); //el id del curso

  return (
    <section>
      <Row className='course-section'>
        {/* Columna izquierda */}
        <Col md={10} className='course-col'>
          <div className='visualizador'>
            <p>VISUALIZADOR</p>
          </div>
          <div>
            <span>Nombre curso: </span>
            <span>{courseDetails?.name}</span>
            <br />
            <span>Descripción</span>
            <br />
            <span>{courseDetails?.description}</span>
          </div>
        </Col>

        {/* Columna derecha */}
        <Col md={2} className='course-col'>
          <div className='listado-temario'>
            <div className='d-flex'>
              <p>Temario del curso</p>
                <img src="/icons/437886-200.png" alt="editar" className='course-edit' />
                <img src="/icons/subject.svg" alt="temario" className='course-edit' />
            </div>
          </div>
        </Col>
      </Row>
    </section> 
  )
}
