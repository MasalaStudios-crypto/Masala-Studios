import React, { useEffect, useState, useContext } from 'react'
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import { MasalaContext } from '../../Context/MasalaProvider'
import axios from 'axios';
import './myGrades.scss'
import { Col, Row } from 'react-bootstrap';

export const MyGrades = () => {
  const {user} = useContext(MasalaContext);
  const [myGrades, setMyGrades] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/users/myGrades", {
        params: {
          user_id: user.user_id
        }
      })
      .then(res => {
        //console.log(res.data);
        setMyGrades(res.data)
      })
      .catch(err => console.log(err));
  }, []);

  //console.log(myGrades);

  return (
    <Row>
      <Col className='col-myGrades'>
        <section className='myGrades-ppal'>
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="center" className='text-grade' sx={{width: '33%'}}>Nombre del curso</TableCell>
                  <TableCell align="center" className='text-grade' sx={{width: '33%'}}>Duracion</    TableCell>
                  <TableCell align="center" className='text-grade' sx={{width: '33%'}}>Estado</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
              {myGrades.map((grade) => (
                <TableRow key={grade.course_id}>
                  <TableCell align="center">{grade.name}</    TableCell>
                  <TableCell align="center">{grade.duration}h</   TableCell>
                  <TableCell align="center">{grade.status ===     1 ? 'En curso' : grade.status === 2 ?     'Aprobado' : 'Suspenso'}</TableCell>
                </TableRow>
              ))}
              </TableBody>
            </Table>
          </TableContainer>
        </section>
      </Col>
    </Row>
  )
}
