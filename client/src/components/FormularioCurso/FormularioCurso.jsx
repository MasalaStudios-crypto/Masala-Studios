import axios from 'axios';
import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';




export const FormularioCurso = ({setCourses, courses, user_id, showModal3}) => {

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


  const handleFile = (e) =>{
    setFile(e.target.file);
  }

  const onSubmit=()=>{

    if (!newCourse.name || !newCourse.duration || !newCourse.price  || !newCourse.description) {
      setMessage("rellena algo por favor!!!");
      console.log("error en el if")
      const newFormData = new FormData()
      newFormData.append("CrCourse", JSON.stringify(newCourse));
      newFormData.append("file", file)
        
      
      axios
        .put("http://localhost:3000/course/createCourse", newFormData)
        .then((res)=>{
          refresh();
          handleClose()
        })
        .catch(err => console.log(err))
        console.log("error en el axios",newCourse.name, newCourse.duration, newCourse.price, newCourse.description, user_id)
        
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
      placeholder="Introduce duración del curso" />
    </Form.Group>

    <Form.Group className="mb-3" controlId="formBasicPrice">
      <Form.Label>Precio</Form.Label>
      <Form.Control 
      name="price"
      value={newCourse.price}
      onChange={handleChange}
      type="text" 
      placeholder="Introduce precio curso" />
    </Form.Group>

    <Form.Group className="mb-3" controlId="formBasicImg">
      <Form.Label>Imagen</Form.Label>
      <Form.Control 
      onChange={handleFile}
      type="file" 
      placeholder="Introduce imagen curso" />
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

