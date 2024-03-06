import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { Button, Container, Nav, Navbar, NavDropdown  } from 'react-bootstrap'
import { TravelContext } from '../../Context/TravelsProvider';
import { deleteLocalStorage } from '../../utils/localStorageUtils';
import './navbar.scss'

export const NavBarApp= () => {

  const navigate = useNavigate();

  const {user, setUser, setToken}= useContext(TravelContext)


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
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: '100px' }}
              navbarScroll
            >
              <Nav.Link href="#action1">PORTFOLIO</Nav.Link>
              <Nav.Link href="/who">QUIENES SOMOS</Nav.Link>
              <Nav.Link href="#action2">SERVICIOS</Nav.Link>
              <Nav.Link href="#action2">BLOG</Nav.Link>
              <Nav.Link href="#action2">CONTACTO</Nav.Link>
            
              {!user ? 
                <div>
                  <Button
                    onClick={()=>{navigate("/login")}}
                    className='ml-auto' >Iniciar sesión</Button>
                </div>
                :
                <div className='d-flex'>
                  <div className='navbar-avatar'>
                  <NavDropdown title={user?.user_img ? <img src={`http://localhost:3000/images/users/${user?.user_img}`} alt="perfil" /> :
                    <span>{user?.name[0].toUpperCase()}</span>} id="navbarScrollingDropdown">
                <NavDropdown.Item as={Link} to="/profile">Perfil</NavDropdown.Item>
                <NavDropdown.Item href="#action3">Todos los cursos</NavDropdown.Item>
                <NavDropdown.Item href="#action4">Crear curso</NavDropdown.Item>
                <NavDropdown.Item href="#action5">Calificaciones</NavDropdown.Item>
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

                  

          </div> 
                }
              
            </Nav>
          </Navbar.Collapse>
        </div>
      </Container>
    </Navbar>
  )
}