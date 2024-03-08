import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { Button, Container, Nav, Navbar, NavDropdown  } from 'react-bootstrap'
import { TravelContext } from '../../Context/TravelsProvider';
import { deleteLocalStorage } from '../../utils/localStorageUtils';
import './navbar.scss'
import { ModalBasico } from '../ModalBasico/ModalBasico';
import { FormularioContacto } from '../FormularioContacto/FormularioContacto';
import { FormularioLogin } from '../FormularioLogin/FormularioLogin';
import { ModalBasico2 } from '../ModalBasico2/ModalBasico2';
import { FormularioCurso } from '../FormularioCurso/FormularioCurso';

export const NavBarApp= () => {

  const navigate = useNavigate();
  const {user, setUser, setToken}= useContext(TravelContext)
  const[show, setShow]=useState(false)
  const[show2, setShow2]=useState(false)
  const[show3, setShow3]=useState(false)

  const showModal =()=>{
    setShow(!show)
  }

  const showModal2 =()=>{
    setShow2(!show2)
  }
  const showModal3 =()=>{
    setShow3(!show3)
  }

  const LogOut=()=>{
    deleteLocalStorage("token")
    setUser()
    setToken()
    navigate("/")
  }
  return (
    <Navbar expand="lg" className="custom-navbar-bg">
      <Container fluid>
        <div className='nav-alinear1'>
          <Navbar.Brand href="/">
            <img src="/images/logo.png" alt="logotipo" className='logo-nav' />
            <span className='masala-text'>MASALA</span><span className='head-text'>HEAD</span>
          </Navbar.Brand>
        </div>
        <div className='d-flex justify-content-end nav-alinear2'>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll" >
            <Nav
              className="me-auto my-2 my-lg-0 dropdawn-menu"
              style={{ maxHeight: '100px' }}
              navbarScroll
            >
              {user?.type===2 ?
              <div className='d-flex'>
              <Nav.Link href="#action1" className='masala-text'>PORTFOLIO</Nav.Link>
              <Nav.Link href="/who" className='masala-text'>QUIENES SOMOS</Nav.Link>
              <Nav.Link href="/servicios" className='masala-text'>SERVICIOS</Nav.Link>
              <Nav.Link href="#action2" className='masala-text'>BLOG</Nav.Link>
              <Nav.Link onClick={showModal} className='masala-text'>CONTACTO</Nav.Link>
              </div> 
              :
              <div className='d-flex'>
              <Nav.Link href="/allUsers" className='masala-text'>USUARIOS</Nav.Link>
              <Nav.Link href="" className='masala-text'>CURSOS</Nav.Link>
              <Nav.Link href="" className='masala-text'>CREAR CURSOS</Nav.Link>
              </div>
              }
               
              {!user ? 
                <div>
                  <Button
                    onClick={showModal2}
                    className='ml-auto' >Iniciar sesión</Button>
                </div>
                :

                <div className='navbar-avatar'>
                  <NavDropdown id="navbarScrollingDropdown" title={user?.user_img 
                                ? 
                                <img src={`http://localhost:3000/images/users/${user?. user_img}`} alt="foto perfil" /> 
                                :
                                <span>{user?.name[0].toUpperCase()}</span>}
                  >

                  {user?.type===2 ? 
                  <div> 
                  <NavDropdown.Item as={Link} to="/profile">Perfil</NavDropdown.Item>
                  <NavDropdown.Item href="#action3">Todos los cursos</NavDropdown.Item>
                  <NavDropdown.Item onClick={showModal3}>Crear curso</NavDropdown.Item>
                  <NavDropdown.Item href="#action5">Calificaciones</NavDropdown.Item>
                  </div> 
                  :
                  <div>
                  <NavDropdown.Item as={Link} to="/profile">Perfil</NavDropdown.Item>
                  </div>
                  }
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action5">
                  <Button
                    onClick={LogOut}
                    className='ms-1 me-1'
                    variant="outline-success">
                  LogOut</Button>
                  </NavDropdown.Item>
                  </NavDropdown>
                </div>
                }

              <ModalBasico
              title="Contacto"
              show={show}
              handleClose={showModal}>
                <FormularioContacto
                handleClose={showModal}/>
              </ModalBasico>

              <ModalBasico2
              title="Login"
              show={show2}
              handleClose2={showModal2}>
                <FormularioLogin
                handleClose2={showModal2}/>
              </ModalBasico2>

              
              <ModalBasico2
              title="Creación Curso"
              show={show3}
              handleClose2={showModal3}>
                <FormularioCurso
                handleClose2={showModal3}/>
              </ModalBasico2>

            </Nav>
          </Navbar.Collapse>
        </div>
      </Container>
    </Navbar>

  )
}