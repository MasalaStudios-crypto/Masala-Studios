import React, { useState } from 'react'
import { Container, Nav } from 'react-bootstrap';
import './footer.scss';
import { ModalBasico } from '../ModalBasico/ModalBasico';
import { FormularioContacto } from '../FormularioContacto/FormularioContacto';

export const Footer = () => {
  const[show, setShow]=useState(false)

  const showModal =()=>{
    setShow(!show)
  }

  return (
    <footer className="custom-footer-bg fixed-bottom">
      <Container fluid>
        <Nav className="justify-content-center">
          <Nav.Link href="#home">TAKE AWAY</Nav.Link>
          <Nav.Link onClick={showModal}>CONTACT</Nav.Link>
          <Nav.Link href="#pricing">LEGAL</Nav.Link>
          <Nav.Link href="#contact">SOCIAL</Nav.Link>
          <Nav.Link href="#contact">WORK WITH US</Nav.Link>
          <Nav.Link href="#contact">BLOG</Nav.Link>
        </Nav>
        <ModalBasico
              title="Contacto"
              show={show}
              handleClose={showModal}>
          <FormularioContacto
                handleClose={showModal}/>
        </ModalBasico>
      </Container>
    </footer>
  );
};