import React, { useContext, useEffect } from 'react'
import { TravelContext } from '../../Context/TravelsProvider'
import { Button, Col, Row } from 'react-bootstrap'
import './userProfile.scss'
import { ModalBasico } from '../../components/ModalBasico/ModalBasico'
import { useState } from 'react'
import { EditUser } from '../EditUser/EditUser'
import { invertirFecha } from '../../utils/reverseDate';

export const UserProfile = () => {
  const [show, setShow] = useState(false);
  const [travels, setTravels] = useState([]);
  const {user} = useContext(TravelContext);

  const showModal = () => {
    setShow(!show)
  }

  return (
    <section>
      <Row className='profile-section'>
        <Col md={4} className='profile-col'>
          <div className='use-profile-ppal'>
            <div className='d-flex justify-content-between profile-img-cont'>
              <img src={user?.user_img ? `http://localhost:3000/images/users/${user?.user_img}` : '/images/user.png'} alt="foto perfil" className='profile-img' />
              <img src="/icons/437886-200.png" alt="editar" className='profile-edit' onClick={showModal} />
            </div>
            <span className='profile-text'>Nombre: </span>
            <span className='profile-gold-text'>{user?.name}</span>
            <br />
            <span className='profile-text'>Apellidos: </span>
            <span className='profile-gold-text'>{user?.lastname}</span>
            <br />
            <span className='profile-text'>D.N.I.: </span>
            <span className='profile-gold-text'>{user?.dni}</span>
            <br />
            <span className='profile-text'>Fecha nacimiento: </span>
            <span className='profile-gold-text'>{invertirFecha(user?.birth_date)}</span>
            <br />
            <span className='profile-text'>Email: </span>
            <span className='profile-gold-text'>{user?.email}</span>
            <br />
            <span className='profile-text'>Teléfono: </span>
            <span className='profile-gold-text'>{user?.phone}</span>
            <br />
            <span className='profile-text'>Dirección: </span>
            <span className='profile-gold-text'>{user?.address}</span>
            <br />
            <span className='profile-text'>Código postal: </span>
            <span className='profile-gold-text'>{user?.zip_code}</span>
            <br />
            <span className='profile-text'>Ciudad: </span>
            <span className='profile-gold-text'>{user?.city}</span>
            <br />
            <span className='profile-text'>Provincia: </span>
            <span className='profile-gold-text'>{user?.province}</span>
          </div>
          <div className='text-center'>
          </div>
        </Col>
        <Col md={8} className='profile-col'>
          <ModalBasico show={show} handleClose={showModal} title="Edición usuario">
            <EditUser handleClose={showModal} user_id={user?.user_id} />
          </ModalBasico>
        </Col>
      </Row>
    </section> 
  )
}
