import axios from 'axios';
import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import { isAlphaNumericWithSpaces, isNumber, onEnter } from '../../utils/validation';
import './formularioCurso.scss'




export const FormularioCurso = ({setCourses, courses, user_id, showModal3 }) => {

  const initalValue={
    name:"",
    duration:"",
    price:"",
    description:"",
    creator_user_id: user_id
}

  const[newCourse, setNewCourse] = useState(initalValue);
  const [file, setFile] = useState();
  const[message, setMessage] = useState();


  const handleChange=(elem)=>{
    const{name, value}=elem.target
    setNewCourse({...newCourse, [name]:value})
  }


  const handleFile = (e) => {
    setFile(e.target.files[0]);
  };
  

  const onSubmit=()=>{

    if (newCourse.name && newCourse.duration && newCourse.price  && newCourse.description) {
      
      const newFormData = new FormData()
      newFormData.append("CrCourse", JSON.stringify(newCourse));
      newFormData.append("file", file)

      axios
        .post("http://localhost:3000/course/createCourse", newFormData)
        .then((res)=>{
          showModal3()
        })
        .catch(err => console.log(err))

      }
      else{
        setMessage("rellena algo por favor!!!");
      }
      }
    
      
  
  

  return (


    <Form>

    <Form.Group className="mb-3" controlId="formBasicName">
      <Form.Label>Nombre del Curso</Form.Label>
      <Form.Control 
      name="name"
      value={newCourse.name}
      onChange={handleChange}
      onKeyPress={isAlphaNumericWithSpaces}
      type="text" 
      placeholder="Introduce nombre curso" />
    </Form.Group>

    <Form.Group className="mb-3" controlId="formBasicDuration">
      <Form.Label>Duración</Form.Label>
      <Form.Control 
      name="duration"
      value={newCourse.duration}
      onChange={handleChange}
      type="text" 
      onKeyPress={isNumber}
      placeholder="Introduce duración del curso (Horas)" />
    </Form.Group>

    <Form.Group className="mb-3" controlId="formBasicPrice">
      <Form.Label>Precio</Form.Label>
      <Form.Control 
      name="price"
      value={newCourse.price}
      onChange={handleChange}
      type="isNumber" 
      onKeyPress={isNumber}
      placeholder="Introduce precio curso (€)" />
    </Form.Group>

    <Form.Group className="mb-3" controlId="formBasicImg">
      <Form.Label>Imagen</Form.Label>
      <Form.Control 
      onChange={handleFile}
      type="file"  />
    </Form.Group> 

    <Form.Group className="mb-3" controlId="formBasicDescription">
      <Form.Label>Descripción</Form.Label>
      <Form.Control className='inputTexto'
      maxLength="300" 
      name="description"
      value={newCourse.description}
      onChange={handleChange}
      as="textarea" rows={3} 
      placeholder="Introduce descripción" />
    </Form.Group>

    <div>
      <p>{message}</p>
    <Button
    onClick={onSubmit}
     className='ms-1 me-1' variant="primary">Crear</Button>
    <Button
     onClick={showModal3}  
     className='ms-1 me-1' variant="primary">Cancelar</Button>
    </div>
    
  </Form>
 )

}

