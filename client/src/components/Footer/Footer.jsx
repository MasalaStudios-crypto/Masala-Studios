import React from 'react';
import { Container, Nav } from 'react-bootstrap';
import './footer.scss';

export const Footer = () => {
  return (
    <footer className="custom-footer-bg fixed-bottom">
      <Container fluid>
        <Nav className="justify-content-center">
          <Nav.Link href="#home">TAKE AWAY</Nav.Link>
          <Nav.Link href="#features">CONTACT</Nav.Link>
          <Nav.Link href="#pricing">LEGAL</Nav.Link>
          <Nav.Link href="#contact">SOCIAL</Nav.Link>
          <Nav.Link href="#contact">WORK WITH US</Nav.Link>
          <Nav.Link href="#contact">BLOG</Nav.Link>
        </Nav>
      </Container>
    </footer>
  );
};