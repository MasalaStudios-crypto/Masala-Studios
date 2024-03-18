import React from 'react'
import Modal from 'react-bootstrap/Modal';
import './modalBasico.scss'

export const ModalBasico = ({show, handleClose, title="Modal Basico", children}) => {

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title className='tituloModal'>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body className='tituloModal'>{children}</Modal.Body>
    </Modal>
  )
}
