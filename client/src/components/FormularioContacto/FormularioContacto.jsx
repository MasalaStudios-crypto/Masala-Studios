import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import './formularioContacto.scss'
const initalValue={
  nombre:"",
  asunto:"",
  email:"",
  mensaje:""
}

export const FormularioContacto = ({handleClose, elem}) => {

  const[contacto, setContacto]=useState(initalValue)

  const handleChange=(elem)=>{
    const{name, value}=elem.target
    setContacto({...contacto, [name]:value})
  }

  const Submit = (elem) => {
    elem.preventDefault();

    const body = `${contacto.mensaje}`;

    const mailtoLink = `mailto:masalahead.av@pm.me?subject=${contacto.asunto}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoLink;
    handleClose();
    handleChange()
  }

  return (
    <Form>

      <Form.Group className="mb-3" controlId="formBasicName">
        <Form.Label>Nombre</Form.Label>
        <Form.Control 
        name="nombre"
        value={contacto.nombre}
        onChange={handleChange}
        type="text" 
        placeholder="Introduce tu nombre" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicAsunto">
        <Form.Label>Asunto</Form.Label>
        <Form.Control 
        name="asunto"
        value={elem ? elem.name : contacto.asunto}
        onChange={handleChange}
        type="text" 
        placeholder="Introduce el asunto"/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control 
        name="email"
        value={contacto.email}
        onChange={handleChange}
        type="email" 
        placeholder="Introduce tu Email" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicMensaje">
        <Form.Label>Mensaje</Form.Label>
        <Form.Control className='inputTexto'
        maxLength="300" 
        name="mensaje"
        value={contacto.mensaje}
        onChange={handleChange}
        as="textarea" rows={3} 
        placeholder="Introduce el mensaje" />
      </Form.Group>

      <div>
      <Button onClick={Submit} className='ms-1 me-1' variant="primary">Enviar</Button>
      <Button onClick={handleClose}  className='ms-1 me-1' variant="primary">Cancelar</Button>
      </div>
      
    </Form>
  )
}
