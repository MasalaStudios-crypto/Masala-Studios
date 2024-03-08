import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import {useEffect, useState, useContext} from 'react'
import { MasalaContext } from '../../../Context/MasalaProvider';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import { ModalBasico } from '../../../components/ModalBasico/ModalBasico';
import { ModalBasico2 } from '../../../components/ModalBasico2/ModalBasico2';
import { FormularioLogin } from '../../../components/FormularioLogin/FormularioLogin';
import { FormularioRegister } from '../../../components/FormularioRegister/FormularioRegister';

export const TableUser = () => {

  const [users, setUsers] = useState()
  const [reset, setReset] = useState(false)
  const [show, setShow]=useState(false)
  const [show2, setShow2]=useState(false)
  const [userId, setUserId]=useState()
  const [creators, setCreators]=useState([])
  const {token}= useContext(TravelContext)

  useEffect(()=>{
    if(token){
      axios.defaults.headers.common["Authorization"]=`Bearer ${token}`
    axios
      .get(`http://localhost:3000/users/allUsers`)
      .then((res)=>{
        setUsers(res.data)
      })
      .catch((err)=>{
        console.log(err);
      })
    }
},[reset, token])

  const onDeleted=(id, state)=>{
    let url="http://localhost:3000/users/activate"
    if(!state){
      url="http://localhost:3000/users/deactivate"
    }
    axios
      .put(url, {id})
      .then(()=>setReset(!reset))
      .catch((err)=>console.log(err))
  }

  const onType=(id, state)=>{
    let url="http://localhost:3000/users/typeAdmin"
    if(state===1){
      url="http://localhost:3000/users/typeUser"
    }
    axios
      .put(url, {id})
      .then(()=>setReset(!reset))
      .catch((err)=>console.log(err))
  }

  const onDisabled=(id, state)=>{
    let url="http://localhost:3000/users/enable"
    if(!state){
      url="http://localhost:3000/users/disable"
    }
    axios
      .put(url, {id})
      .then(()=>setReset(!reset))
      .catch((err)=>console.log(err))
  }

  const openCreatedCourse=(elem)=>{
    let url="http://localhost:3000/users/allCreatedCourse"
    axios
      .get(url, {elem})
      .then((res)=>{
        setCreators(res.data)
      })
      .catch((err)=>console.log(err))

  setShow(!show)
  }

  const openRegCourse=(elem)=>{
    let url="http://localhost:3000/users/allRegCourse"
    axios
      .get(url, {elem})
      .then()
      .catch((err)=>console.log(err))
    setShow2(!show2)
  }

  return (

    <TableContainer component={Paper}>
    <Table sx={{ minWidth: 650 }} aria-label="simple table">
      <TableHead>
        <TableRow>
          <TableCell>Nombre</TableCell>
          <TableCell align="right">Apellidos</TableCell>
          <TableCell align="right">Fecha Nacimiento</TableCell>
          <TableCell align="right">DNI</TableCell>
          <TableCell align="right">Telefono</TableCell>
          <TableCell align="right">Direccion</TableCell>
          <TableCell align="right">Codigo Postal</TableCell>
          <TableCell align="right">Ciudad</TableCell>
          <TableCell align="right">Provincia</TableCell>
          <TableCell align="right">Email</TableCell>
          <TableCell align="right">Tipo</TableCell>
          <TableCell align="right">Estado</TableCell>
          <TableCell align="right">Visibilidad</TableCell>
          <TableCell align="right">Cursos creados</TableCell>
          <TableCell align="right">Cursos apuntados</TableCell>

        </TableRow>

      </TableHead>
      <TableBody>
        {users?.map((elem) => (
          <TableRow
            key={elem.user_id}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
          >
            <TableCell component="th" scope="row">
              {elem.name} 
            </TableCell>
            <TableCell align="right">{elem.lastname}</TableCell>
            <TableCell align="right">{elem.birth_date}</TableCell>
            <TableCell align="right">{elem.dni}</TableCell>
            <TableCell align="right">{elem.phone}</TableCell>
            <TableCell align="right">{elem.address}</TableCell>
            <TableCell align="right">{elem.zip_code}</TableCell>
            <TableCell align="right">{elem.city}</TableCell>
            <TableCell align="right">{elem.province}</TableCell>
            <TableCell align="right">{elem.email}</TableCell>

            <TableCell align="right">
              <Dropdown as={ButtonGroup}>
                <Button variant="success">{elem.type===1?"Administrador":"Usuario"}</Button>
                <Dropdown.Toggle split variant="success" id="dropdown-split-basic" />
                <Dropdown.Menu>
                  <Dropdown.Item onClick={()=>onType(elem.user_id, elem.type)}>Administrador</Dropdown.Item>
                  <Dropdown.Item onClick={()=>onType(elem.user_id, elem.type)}>Usuario</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </TableCell>

             <TableCell align="right">    
              <Dropdown as={ButtonGroup}>
                <Button variant="success">{elem.is_deleted?"Inactivo":"Activo"}</Button>
                <Dropdown.Toggle split variant="success" id="dropdown-split-basic" />
                <Dropdown.Menu>
                  <Dropdown.Item onClick={()=>onDeleted(elem.user_id, elem.is_deleted)}>Activo</Dropdown.Item>
                  <Dropdown.Item onClick={()=>onDeleted(elem.user_id, elem.is_deleted)}>Inactivo</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </TableCell>

            <TableCell align="right">
            <Dropdown as={ButtonGroup}>
                <Button variant="success">{elem.is_disabled?"Deshabilitado":"Habilitado"}</Button>
                <Dropdown.Toggle split variant="success" id="dropdown-split-basic" />
                <Dropdown.Menu>
                  <Dropdown.Item onClick={()=>onDisabled(elem.user_id, elem.is_disabled)}>Habilitado</Dropdown.Item>
                  <Dropdown.Item onClick={()=>onDisabled(elem.user_id, elem.is_disabled)}>Deshabilitado</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </TableCell>

            <TableCell onClick={()=>openCreatedCourse(elem.user_id)} align="right"><Button>Ver Cursos</Button></TableCell>
            <TableCell  onClick={()=>openRegCourse(elem.user_id)} align="right"><Button>Ver Cursos</Button></TableCell>

           
          </TableRow>
        ))}
      </TableBody>

          <ModalBasico
          title={userId}
          handleClose={openCreatedCourse} 
          show={show}>
            <FormularioLogin/>
          </ModalBasico>

          <ModalBasico2
          title={userId}
          handleClose2={openRegCourse} 
          show={show2}>
            <FormularioRegister/>
          </ModalBasico2>

    </Table>
  </TableContainer>

  )
}
