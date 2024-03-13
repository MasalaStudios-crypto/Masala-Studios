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
import { ListaCursosCreados } from './ListaCursosCreados';
import { ListaCursosApuntados } from './ListaCursosApuntados';


export const TableUser = () => {

  const [users, setUsers] = useState()
  const [reset, setReset] = useState(false)
  const [show, setShow]=useState(false)
  const [show2, setShow2]=useState(false)
  const [userId, setUserId]=useState()
  const [creators, setCreators]=useState([])
  const {token}= useContext(MasalaContext)
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
    setUserId(elem)
    setShow(!show)
  }

  const openRegCourse=(elem)=>{
    setUserId(elem)
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
          <TableCell align="right">Habilitado</TableCell>
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

            <TableCell align="right"><Button variant={elem.type===1?"primary":"success"} onClick={()=>onType(elem.user_id, elem.type)}>{elem.type===1?"Administrador":"Usuario"}</Button></TableCell>

            <TableCell align="right"><Button variant={elem.is_deleted===0?"success":"danger"} onClick={()=>onDeleted(elem.user_id, elem.is_deleted)}>{elem.is_deleted===0?"Activo":"Inactivo"}</Button></TableCell>

            <TableCell align="right"><Button variant={elem.is_disabled===0?"success":"danger"} onClick={()=>onDisabled(elem.user_id, elem.is_disabled)}>{elem.is_disabled===0?"Habilitado":"Deshabilitado"}</Button></TableCell>

            <TableCell onClick={()=>openCreatedCourse(elem.user_id)} align="right"><Button>Ver Cursos</Button></TableCell>
            <TableCell  onClick={()=>openRegCourse(elem.user_id)} align="right"><Button>Ver Cursos</Button></TableCell>

           
          </TableRow>
        ))}
      </TableBody>

          <ModalBasico
          user_id={userId}
          title={"Cursos creados"}
          handleClose={openCreatedCourse} 
          show={show}>
            <ListaCursosCreados
            user_id={userId}
            handleClose={openCreatedCourse} />
          </ModalBasico>

          <ModalBasico2
          user_id={userId}
          title={"Cursos apuntados"}
          handleClose2={openRegCourse} 
          show={show2}>
            <ListaCursosApuntados
            user_id={userId}
            handleClose2={openRegCourse} />
          </ModalBasico2>

    </Table>
  </TableContainer>

  )
}
