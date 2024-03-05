import React from 'react'
import { Button, Container, Nav, Navbar, NavDropdown  } from 'react-bootstrap'
import './navbar.scss'

export const NavBarApp= () => {


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
              <NavDropdown title="Link" id="navbarScrollingDropdown">
                <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action4">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action5">
                  Something else here
                </NavDropdown.Item>
              </NavDropdown>
              <Button className='ml-auto'>Iniciar sesión</Button>
            </Nav>
          </Navbar.Collapse>
        </div>
      </Container>
    </Navbar>
  )
}