import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios"
const initialValue = {
  name:"",
  email:"",
  password:"",
  password2:""
}

export const FormularioRegister = ({handleClose}) => {

  const [register, setRegister]=useState(initialValue)
  const [errorMessage, setErrorMessage]=useState()
  const navigate= useNavigate()

  const handleChange =(elem)=>{
    const {name, value}= elem.target
    setRegister({...register, [name]:value})
  }

  const onSubmit =()=>{
    if(!register.name || !register.email || !register.password){
      setErrorMessage("Debes rellenar todos los campos")
    }
    else if (register.password.length < 2){
      setErrorMessage("La contraseña minima debe contener mas de 8 caracteres")
    }
    else if(register.password!=register.password2){
      setErrorMessage("Las contraseñas no coinciden")
    }
    else{
      axios
      .post("http://localhost:3000/users/register", register)
      .then((res)=>{
        console.log(res)
        handleClose();
        navigate("/")
      })
      .catch((err)=>{
        console.log(err)
        if(err.response.data.errno===1062){
          setErrorMessage("Email duplicado")
        }
      })
    }
    
  }

  console.log(register)
  
  return (
    <Form>

      <Form.Group className="mb-3" controlId="formBasicName">
        <Form.Label>Nombre</Form.Label>
        <Form.Control 
        name="name"
        value={register.name}
        onChange={handleChange}
        type="text" 
        placeholder="Introduce tu nombre" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control 
        name="email"
        value={register.email}
        onChange={handleChange}
        type="text" 
        placeholder="Introduce tu Email" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control 
        name="password"
        value={register.password}
        onChange={handleChange}
        type="password" 
        placeholder="Introduce tu contraseña" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword2">
        <Form.Label>Repetir Password</Form.Label>
        <Form.Control 
        name="password2"
        value={register.password2}
        onChange={handleChange}
        type="password" 
        placeholder="Repite tu contraseña" />
      </Form.Group>

      <span className='errorMessage'>{errorMessage}</span>

      <div>
      <Button onClick={onSubmit} className='ms-1 me-1' variant="primary">Aceptar</Button>
      <Button onClick={handleClose} className='ms-1 me-1' variant="primary">Cancelar</Button>
      </div>
      
    </Form>
  )
}


