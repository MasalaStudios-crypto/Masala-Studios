import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios"
const initialValue = {
  name:"",
  email:"",
  password:""
}

export const FormularioRegister = () => {

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
    else{
      axios
      .post("http://localhost:3000/users/register", register)
      .then((res)=>{
        console.log(res)
        navigate("/login")
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
      <h2>Formulario Register</h2>

      <Form.Group className="mb-3" controlId="formBasicName">
        <Form.Label>Nombre</Form.Label>
        <Form.Control 
        name="name"
        value={register.name}
        onChange={handleChange}
        type="text" 
        placeholder="Enter name" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control 
        name="email"
        value={register.email}
        onChange={handleChange}
        type="text" 
        placeholder="Enter Email" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control 
        name="password"
        value={register.password}
        onChange={handleChange}
        type="password" 
        placeholder="Enter Password" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Repeat Password</Form.Label>
        <Form.Control 
        name="password"
        value={register.password}
        onChange={handleChange}
        type="password" 
        placeholder="Repeat another Password" />
      </Form.Group>

      <span className='errorMessage'>{errorMessage}</span>
      <p>Estas registrado,<Link to='/login'>Login aqui</Link> </p>
      
      <div>
      <Button onClick={onSubmit} className='ms-1 me-1' variant="primary">Submit</Button>
      <Button onClick={()=>{navigate('/login')}} className='ms-1 me-1' variant="primary">Cancel</Button>
      </div>
      
    </Form>
  )
}
