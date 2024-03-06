import React, { useContext, useEffect } from 'react'
import { TravelContext } from '../../Context/TravelsProvider'
import { Button, Col, Row } from 'react-bootstrap'
import './userProfile.scss'
import { ModalBasico } from '../../components/ModalBasico/ModalBasico'
import { useState } from 'react'
import { EditUser } from '../EditUser/EditUser'
//import axios from 'axios'


export const UserProfile = () => {
  const [show, setShow] = useState(false);
  const [travels, setTravels] = useState([]);
  const {user} = useContext(TravelContext);

/*    useEffect(() => {
    //pedir todos los viajes de user
    if(user){
      axios
      .get(`http://localhost:3000/travels/travelsOneUser/${user.user_id}`)
      .then((res) => {
        //console.log(res.data);
        setTravels(res.data)
      })
      .catch((err) => {
        console.log(err);
      })
    }
    
  }, [user])  */

  const showModal = () => {
    setShow(!show)
  }

  return (
    <Row>
      <Col>
      <Row>
        <Col md={4}>
          <div className='use-profile-ppal'>
            <div className='d-flex justify-content-between profile-img-cont'>
              <img src={user?.user_img ? `http://localhost:3000/images/users/$  {user?.user_img}` : '/images/user.png'} alt="foto perfil" className='profile-img' />
              <img src="/icons/437886-200.png" alt="editar" className='profile-edit' onClick={showModal} />
            </div>
            <h3>Nombre: <span className='profile-gold-text'>{user?.name}</span></h3>
            <h3>Apellidos: <span className='profile-gold-text'>{user?.lastname}</span></h3>
            <h3>D.N.I.: <span className='profile-gold-text'>{user?.dni}</span></h3>
            <h3>Fecha nacimiento: <span className='profile-gold-text'>{user?.birth_date}</span></h3>
            <h3>Email: <span className='profile-gold-text'>{user?.email}</span></h3>
            <h3>Teléfono: <span className='profile-gold-text'>{user?.phone}</span></h3>
            <h3>Dirección: <span className='profile-gold-text'>{user?.address}</span></h3>
            <h3>Código postal: <span className='profile-gold-text'>{user?.zip_code}</span></h3>
            <h3>Ciudad: <span className='profile-gold-text'>{user?.city}</span></h3>
            <h3>Provincia: <span className='profile-gold-text'>{user?.province}</span></h3>
          </div>
          <div className='text-center'>
          </div>
        </Col>
        <Col md={8}>
          <ModalBasico show={show} handleClose={showModal} title="Edición usuario">
            <EditUser handleClose={showModal} user_id={user?.user_id} />
          </ModalBasico>
        </Col>
      </Row>
      <Row>
        <Col>
          {/* <TravelsGallery travels={travels} setTravels={setTravels} /> */}
        </Col>
      </Row>
      </Col>
    </Row>
  )
}
