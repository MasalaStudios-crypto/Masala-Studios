import React, { useContext, useEffect, useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import './editUser.scss';
import {TravelContext} from '../../Context/TravelsProvider'
import axios from 'axios';

const initialValue = {
  name: "",
  lastname: "",
  birth_date: "",
  dni: "",
  phone: "",
  address: "",
  zip_code: "",
  city: "",
  province: ""
}


export const EditUser = ({handleClose}) => {
  
  const [message, setMessage] = useState("");
  const {user, setUser} = useContext(TravelContext);
  const [edit, setEdit] = useState(initialValue);
  const [file, setFile] = useState()

  useEffect(() => {
    if(user){
      setEdit({...edit, name:user.name, lastname: user.lastname, birth_date: user.birth_date, dni: user.dni, phone: user.phone, address: user.address, zip_code: user.zip_code, city: user.city, province: user.province, user_id: user.user_id})
    }
  }, [user])

  const handleChange = (e) => {
    const {value, name} = e.target
    setEdit({...edit, [name]:value});

  }
  const navigate = useNavigate();

  const handleFile = (e) => {
    setFile(e.target.files[0]);
  }

  const onSubmit = () => {
    if(edit.name && edit.lastname && edit.birth_date && edit.dni && edit.phone && edit.address && edit.zip_code && edit.city && edit.province){

    const newFormData = new FormData();

    newFormData.append("editUser", JSON.stringify(edit))
    newFormData.append("file", file)

    axios 
      .put('http://localhost:3000/users/editUser', newFormData)
      .then((res) => {
        navigate('/profile')
        console.log(res)

        if(res.data.newImg){
          setUser({...user, ...edit, user_img: res.data.newImg})
        }
        else{
          setUser({...user, ...edit})
        }
      })
      .catch((err => console.log(err)))
    }
    else {
      setMessage("Debes rellenar todos los campos")
    }
  }

  return (
    <Row className='d-flex justify-content-center align-items-center edit-ppal'>
      <Col>
        <Form className='form-edit'>
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Nombre</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="Nombre"
                value={edit.name}
                onChange={handleChange}
                name="name"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicLastname">
              <Form.Label>Apellidos</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="Apellidos"
                value={edit.lastname === null ? "" : edit.lastname}
                onChange={handleChange}
                name="lastname"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicBirthDate">
              <Form.Label>Fecha nacimiento</Form.Label>
              <Form.Control 
                type="date" //AQUI POSIBLE ERROR
                placeholder="Fecha nacimiento"
                value={edit.birth_date === null ? "" : edit.birth_date}
                onChange={handleChange}
                name="birth_date"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicDni">
              <Form.Label>D.N.I.</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="D.N.I."
                value={edit.dni === null ? "" : edit.dni}
                onChange={handleChange}
                name="dni"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPhone">
              <Form.Label>Teléfono</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="Teléfono"
                value={edit.phone === null ? "" : edit.phone}
                onChange={handleChange}
                name="phone"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicAddress">
              <Form.Label>Dirección</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="Dirección"
                value={edit.address === null ? "" : edit.address}
                onChange={handleChange}
                name="address"
              />
            </Form.Group>
 
            <Form.Group className="mb-3" controlId="formBasicZipCode">
              <Form.Label>Código postal</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="Código postal"
                value={edit.zip_code === null ? "" : edit.zip_code}
                onChange={handleChange}
                name="zip_code"
              />
            </Form.Group>
 
            <Form.Group className="mb-3" controlId="formBasicCity">
              <Form.Label>Ciudad</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="Ciudad"
                value={edit.city === null ? "" : edit.city}
                onChange={handleChange}
                name="city"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicProvince">
              <Form.Label>Provincia</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="Provincia"
                value={edit.province === null ? "" : edit.province}
                onChange={handleChange}
                name="province"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicImg">
              <Form.Label>Sube una foto de perfil</Form.Label>
              <Form.Control 
                type="file" 
                onChange={handleFile} 
                hidden
              />
            </Form.Group>

            <span className='errorMessage'>{message}</span>

            <div>
              <Button 
                className='ms-1 me-1'
                variant="primary" 
                onClick={() => {
                  onSubmit();
                  handleClose();
                }}
              >Submit</Button>
              <Button 
                className='ms-1 me-1'
                variant="primary" 
                onClick={handleClose}
              >Cancel</Button>
            </div>
          </Form>
        </Col>
    </Row>
  )
}
