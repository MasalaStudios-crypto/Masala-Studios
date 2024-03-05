import React, { useContext, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { saveLocalStorage } from '../../utils/localStorageUtils'
import { TravelContext } from '../../Context/TravelsProvider'
const initialValue = {
  email:"",
  password:""
}

export const FormularioLogin = () => {
  const navigate= useNavigate()
  const[message, setMessage]=useState("")
  const[login, setLogin]=useState(initialValue)

  const {setUser, setToken}=useContext(TravelContext);

  const handleChange=(elem)=>{
    const {name, value}= elem.target
    setLogin({...login, [name]:value})
  }
  const onSubmit=()=>{
    if(!login.email || !login.password){
      setMessage("Debes rellenar todos los campos")
    }
    else{
      axios
        .post('http://localhost:3000/users/login', login)
        .then((res)=>{
          if(res.data.user.type===1){
           navigate("/about") 
          }
          else{
            navigate("/about") 
          }
                    
          //guardar en el context
          setUser(res.data.user)

          //guardar el token en localstorage y decir a la app el user logueado
          saveLocalStorage("token", res.data.token)
          setToken(res.data.token) // como localstorage es asincrono se guarda en provider
        })
        .catch((err)=>{
          if (err.response.status === 500){
            setMessage("Error interno de servidor")
          }
          else{
            setMessage("Usuario no autorizado")
          }
        })
    }
  }

  return (
    <Form>
      <h2>Formulario Login</h2>
      <Form.Group 
      className="mb-3" 
      controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
        name="email"
        type="text"
        value={login.email}
        onChange={handleChange}
        placeholder="Enter email" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
        name="password"
        type="password"
        value={login.password}
        onChange={handleChange}  
        placeholder="Password" />
      </Form.Group>

      <p>Estas registrado,<Link to='/register'>Registro aqui</Link> </p>
      <span className='errorMessage'>{message}</span>

      <div>
      <Button 
      onClick={onSubmit}
      className='ms-1 me-1' 
      variant="primary">Submit</Button>
      <Button 
      onClick={()=>{navigate('/about')}} 
      className='ms-1 me-1' 
      variant="primary">Cancel</Button>
      </div>

    </Form>
  )
}
