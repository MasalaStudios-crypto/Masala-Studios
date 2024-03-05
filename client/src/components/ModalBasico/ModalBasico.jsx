import React from 'react'
import Modal from 'react-bootstrap/Modal';

export const ModalBasico = ({show, handleClose, title="Modal Basico", children}) => {

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
    </Modal>
  )
}
