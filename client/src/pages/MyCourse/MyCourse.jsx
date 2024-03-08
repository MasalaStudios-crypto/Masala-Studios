import React, { useEffect, useState } from 'react';
import { Button, Col, Row } from 'react-bootstrap'
import './mycourse.scss'
import { useParams } from 'react-router-dom';
import axios from 'axios';

const handleResourceClick = (resourcePath) => {
  const visualizador = document.getElementById('visualizador');
  visualizador.innerHTML = `
    <iframe src="http://localhost:3000/images/course_img/${resourcePath}" width="100%" height="100%" className="iframe-resources">
    </iframe>
  `;
}

export const MyCourse = () => {
  const { course_id } = useParams()
  const [courseDetails, setCourseDetails] = useState();
  const [subjectDetails, setSubjectDetails] = useState();
  const [resourcetDetails, setResourceDetails] = useState();

  useEffect(() => {
    // Realiza una solicitud para obtener detalles del curso utilizando course_id
    axios.get(`http://localhost:3000/course/details/${course_id}`)
      .then((response) => {
        const {result1, result2, result3} = response.data
        console.log("CURSO", result1);
        console.log("TEMAS", result2);
        console.log("RECURSOS", result3);
        setCourseDetails(result1);
        setSubjectDetails(result2);
        setResourceDetails(result3);

      })
      .catch((error) => {
        console.error(error);
      });
  }, [course_id]);

  console.log("DATOS CURSO", courseDetails); //aquí tengo datos del curso
  console.log("DATOS TEMAS", subjectDetails); //datos de los temas del curso
  console.log("DATOS RECURSOS", resourcetDetails); //datos de los recursos del curso

  return (
    <section>
      <Row className='course-section'>
        {/* Columna izquierda */}
        <Col md={10} className='course-col'>
          <div className='visualizador' id='visualizador'>
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
              <h5>Temario del curso</h5>
                <img src="/icons/437886-200.png" alt="editar" className='course-edit' />
                <img src="/icons/subject.svg" alt="temario" className='course-edit' />
            </div>
            {/* Mapeo de subject */}
            {subjectDetails?.map((subject) => (
              <div key={subject.subject_id}>
                <p>{subject.name}</p>
                <p>{subject.file_name}</p> {/* enlace de lo que sea */}
                {/* Mapeo de recursos debajo de cada tema */}
                {resourcetDetails?.map((resource) => (
                  // Puedes ajustar la lógica de comparación según la estructura de tus datos
                  // Aquí estoy asumiendo que hay una relación entre subject y resource a través de algún identificador
                  resource.subject_id === subject.subject_id && (
                    <div key={resource.resource_id}>
                      <p>Recurso {resource.resource_id}:</p>
                      <Button onClick={() => handleResourceClick(resource.path)}>
                        Ver recurso
                      </Button>
                      {/* Agrega aquí la lógica para mostrar los detalles del recurso */}
                    </div>
                  )
                ))}
              </div>
            ))}
          </div>
        </Col>
      </Row>
    </section> 
  )
}
