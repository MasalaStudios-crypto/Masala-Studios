import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'

const initalValue={
  nombre:"",
  duration:"",
  price:"",
  img:"",
  description:""
}

export const FormularioCurso = () => {

  const[curso, setCurso] = useState(initalValue);

  const handleChange=(elem)=>{
    const{name, value}=elem.target
    setCurso({...curso, [name]:value})
  }


  return (


    <Form>

    <Form.Group className="mb-3" controlId="formBasicName">
      <Form.Label>Nombre del Curso</Form.Label>
      <Form.Control 
      name="nombre"
      value={curso.name}
      onChange={handleChange}
      type="text" 
      placeholder="Introduce nombre curso" />
    </Form.Group>

    <Form.Group className="mb-3" controlId="formBasicDuration">
      <Form.Label>Duración</Form.Label>
      <Form.Control 
      name="duration"
      value={curso.duration}
      onChange={handleChange}
      type="text" 
      placeholder="Introduce duración del curso" />
    </Form.Group>

    <Form.Group className="mb-3" controlId="formBasicPrice">
      <Form.Label>Precio</Form.Label>
      <Form.Control 
      name="price"
      value={curso.price}
      onChange={handleChange}
      type="text" 
      placeholder="Introduce precio curso" />
    </Form.Group>

    <Form.Group className="mb-3" controlId="formBasicImg">
      <Form.Label>Imagen</Form.Label>
      <Form.Control 
      name="img"
      value={curso.img}
      onChange={handleChange}
      type="file" 
      placeholder="Introduce imagen curso" />
    </Form.Group>

    <Form.Group className="mb-3" controlId="formBasicDescription">
      <Form.Label>Descripción</Form.Label>
      <Form.Control className='inputTexto'
      maxLength="300" 
      name="description"
      value={curso.description}
      onChange={handleChange}
      as="textarea" rows={3} 
      placeholder="Introduce descripción" />
    </Form.Group>

    <div>
    <Button
    // onClick={Submit}
     className='ms-1 me-1' variant="primary">Crear</Button>
    <Button
    //  onClick={handleClose}  
     className='ms-1 me-1' variant="primary">Cancelar</Button>
    </div>
    
  </Form>
  )
}
