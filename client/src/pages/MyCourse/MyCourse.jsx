import React, { useContext, useEffect, useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap'
import './mycourse.scss'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import {MasalaContext} from '../../Context/MasalaProvider'
import { useNavigate } from 'react-router-dom'
import { FormEditCourse } from '../../components/FormEditCourse/FormEditCourse';
import { ModalBasico } from '../../components/ModalBasico/ModalBasico'
import { extractNumberFromName } from '../../utils/orderBy'

const handleResourceClick = (resourcePath) => {
  const visualizador = document.getElementById('visualizador');
  visualizador.innerHTML = `
    <iframe src="http://localhost:3000/resource/${resourcePath}" width="100%" height="100%" className="iframe-resources">
    </iframe>
  `;
}

export const MyCourse = () => {
  const { course_id } = useParams()
  const [courseDetails, setCourseDetails] = useState();
  const [subjectDetails, setSubjectDetails] = useState();
  const [resourcetDetails, setResourceDetails] = useState();
  const {user} = useContext(MasalaContext);
  const {token} = useContext(MasalaContext);
  const [show, setShow] = useState(false);
  const [exam, setExam] =useState()

  useEffect(() => {
      // Realiza una solicitud para obtener detalles del curso utilizando course_id
      axios.get(`http://localhost:3000/course/details/${course_id}`)
      .then((response) => {
        const {result1, result2, result3} = response.data
        //console.log("CURSO", result1);
        //console.log("TEMAS", result2);
        //console.log("RECURSOS", result3);
        setCourseDetails(result1);
        setSubjectDetails(result2);
        setResourceDetails(result3);

      })
      .catch((error) => {
        console.error(error);
      });

  }, [course_id]);

  //console.log("DATOS CURSO", courseDetails); //aquí tengo datos del curso
  //console.log("DATOS TEMAS", subjectDetails); //datos de los temas del curso
  //console.log("DATOS RECURSOS", resourcetDetails); //datos de los recursos del curso

  const navigate = useNavigate();

  const navigateToSubjects = () => {
    navigate(`/subjects/${courseDetails?.course_id}`);
  };

  const showModal = () => {
    setShow(!show)
  }

  const contact =()=>{

    const body = ``;
    
    const mailtoLink = `mailto:${courseDetails?.email}?subject=&body=`;
    window.location.href = mailtoLink;
  }

  const downloadExam =()=>{
    axios
      .get()
      .then()
      .catch()
  }


  const subirArchivo=()=> {
    const archivoInput = document.getElementById('file');
    const file = archivoInput.files[0];

    if (!file) {
        alert('Por favor selecciona un file PDF.');
        return;
    }

    const formData = new FormData();
    formData.append('file', file);

    const confirmacion = confirm('¿Estás seguro de que deseas subir este archivo?');

    if (confirmacion) {
        axios.put(`http://localhost:3000/users/upExam/${user.user_id}/${course_id}`, formData)
        .then(response => {
            console.log('Archivo subido exitosamente', response);
            alert('Archivo subido exitosamente.');
        })
        .catch(error => {
            console.error('Error al subir archivo', error);
            alert('Error al subir el archivo. Por favor, inténtalo de nuevo.');
        });
    }
}

//console.log(user?.user_id, courseDetails?.creator_user_id);
  return (
    <section className='myCourse-ppal'>
      <Row className='course-section'>
        {/* Columna izquierda */}
        <Col md={10} className='course-col'>
          <div className='visualizador' id='visualizador'>
            <p>VISUALIZADOR</p>
          </div>
          <div className='descript-div'>
            <span>Nombre curso: </span>
            <span>{courseDetails?.name}</span>
            <br />
            <span>Descripción:</span>
            <br />
            <span>{courseDetails?.description}</span>
            <br />
          </div>
        </Col>

        {/* Columna derecha */}
        <Col md={2} className='course-col'>
          <div className='listado-temario'>
            <div className='d-flex justify-content-between'>
              <div className='d-flex flex-column'>
                  <Button onClick={contact}>Contacto Profesor</Button>
              <h5>Temario del curso</h5>
              </div>
                {user?.user_id === courseDetails?.creator_user_id
                  ?
                    <div>
                      <img src="/icons/437886-200.png" alt="editar" className='course-edit' onClick={showModal} />
                      <img src="/icons/subject.svg" alt="temario" className='course-edit' onClick={navigateToSubjects} />
                      <img src="/icons/download.png" alt="examen" className='course-edit' onClick={downloadExam}/>
                    </div>
                  :
                  <form id="formulario" enctype="multipart/form-data">
                    <label for="file">Selecciona un archivo PDF:</label>
                    <input type="file" id="file" name="file" accept=".pdf"/>
                    <button type="button" onClick={()=>subirArchivo()}>Subir archivo PDF</button>
                  </form>
                }
            </div>
             {/* Mapeo de subject ordenado por tema */}
             {subjectDetails
              ?.slice()
              .sort((a, b) => extractNumberFromName(a.name) - extractNumberFromName(b.name))
              .map((subject) => (
                <div key={subject.subject_id}>
                  <p>{subject.name}</p>
                  {/* Mapeo de recursos debajo de cada tema */}
                  {resourcetDetails?.map((resource) => (
                    // Relación entre subject y resource
                    resource.subject_id === subject.subject_id && (
                      <div key={resource.resource_id}>
                        <p>Recurso:</p>
                        <Button onClick={() => handleResourceClick(resource.path)}>
                          Ver recurso
                        </Button>
                      </div>
                    )
                  ))}
                </div>
              ))}
          </div>
          {/* edit course */}
          <ModalBasico show={show} handleClose={showModal} title="Edición curso">
            <FormEditCourse handleClose={showModal} courseDetails={courseDetails} />
          </ModalBasico>
        </Col>
      </Row>
    </section> 
  )
}
