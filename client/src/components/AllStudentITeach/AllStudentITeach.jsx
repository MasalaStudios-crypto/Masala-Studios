import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import './allStudentITeach.scss'
import { useNavigate } from 'react-router-dom';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

export const AllStudentITeach = ({ allStudents, courseId }) => {
  const [allStatus, setAllStatus] = useState({});
  const [exam, setExam]=useState({})
  const navigate=useNavigate
  useEffect(() => {
    const fetchData = async () => {
      if (allStudents && allStudents.length > 0) {
        const tempStatus = {};
        const tempExam={};

        for (const student of allStudents) {
          const { user_id } = student;

          try {
            const res = await axios.get(`http://localhost:3000/course/grades/${user_id}/${courseId}`);
            const { status, exam_path } = res.data[0];
            
            tempStatus[user_id] = status;
            tempExam[user_id]= exam_path;
          } catch (error) {
            console.error(error);
          }
        }

        setAllStatus(tempStatus);
        setExam(tempExam);
      }
    };

    fetchData();
  }, [allStudents]);



  const handleStatusChange = async (user_id, newStatus) => {
    try {
      // Realiza la actualización en la base de datos o servicio API
      await axios.put(`http://localhost:3000/course/grades/${user_id}/${courseId}`, {
        status: newStatus
        
      });
      
      // Actualiza el estado local después de la actualización exitosa
      setAllStatus({ ...allStatus, [user_id]: newStatus });
    } catch (error) {
      console.error(error);
    }
  };
  console.log(exam)
  
  return (
//     <div className='d-flex justify-content-between'>
//       <div className='d-flex flex-column'>
//         <span>Nombre</span>
//         {allStudents.map((student) => (
//           <span key={student.user_id} className='text-stud'>{student.name}</span>
//         ))}
//       </div>
//       <div className='d-flex flex-column'>
//         <span>Apellido</span>
//         {allStudents.map((student) => (
//           <span key={student.user_id} className='text-stud'>{student.lastname}</span>
//         ))}
//       </div>
//       <div className='d-flex flex-column'>
//         <span>Email</span>
//         {allStudents.map((student) => (
//           <span key={student.user_id} className='text-stud'>{student.email}</span>
//         ))}
//       </div>
//       <div className='d-flex flex-column'>
//         <span>Teléfono</span>
//         {allStudents.map((student) => (
//           <span key={student.user_id} className='text-stud'>{student.phone}</span>
//         ))}
//       </div>

//       <div className='d-flex flex-column'>
//         <span>Examen</span>
//         {Object.entries(exam).map(([user_id, exam_path]) => (
//           exam_path !== null ? (
//           <span key={user_id} className='text-stud'><a href={`http://localhost:3000/resource/${exam_path}`}  target="_blank">Ver</a></span>       ) : (<span>-</span>)  
//         ))}
//       </div>

//       <div>
//         <span>Estado</span>
//         {Object.entries(allStatus).map(([user_id, status]) => (
//           <div key={user_id}>
//             <select
//               className='text-stud'
//               value={status}
//               onChange={(e) => handleStatusChange(user_id, e.target.value)}
//             >
//               <option value="1">En curso</option> {/* VER QUE VALORES LE DAMOS */}
//               <option value="2">Aprobado</option>
//               <option value="3">Suspenso</option>
//             </select>
//           </div>
//         ))}
//       </div>
// </div>
<TableContainer component={Paper} className='d-flex flex-row'>
    <Table sx={{ minWidth: 650 }} aria-label="simple table"> 
        <TableHead>
            <TableRow>
                <TableCell align="center"><b>Nombre</b></TableCell>
                <TableCell align="center"><b>Apellidos</b></TableCell>
                <TableCell align="center"><b>Email</b></TableCell>
                <TableCell align="center"><b>Telefono</b></TableCell>
                <TableCell align="center"><b>Examen</b></TableCell>              
                <TableCell align="center"><b>Estado</b></TableCell>
            </TableRow>
        </TableHead>
        <TableBody>
            {allStudents?.map((student) => (
                <TableRow key={student.user_id}>
                    <TableCell align="center">{student.name}</TableCell>
                    <TableCell align="center">{student.lastname}</TableCell>
                    <TableCell align="center">{student.email}</TableCell>
                    <TableCell align="center">{student.phone}</TableCell>
                    <TableCell align="center">
                        {exam[student.user_id] !== null ? (
                            <a href={`http://localhost:3000/resource/${exam[student.user_id]}`} target="_blank">Ver</a>
                        ) : (
                            "-"
                        )}
                    </TableCell>
                    <TableCell align="center">
                        <select
                            className='text-stud'
                            value={allStatus[student.user_id]}
                            onChange={(e) => handleStatusChange(student.user_id, e.target.value)}
                        >                
                            <option value="1">En curso</option> {/* VER QUE VALORES LE DAMOS */}
                            <option value="2">Aprobado</option>
                            <option value="3">Suspenso</option>
                        </select>
                    </TableCell>
                </TableRow>
            ))}
        </TableBody>
    </Table>
</TableContainer>
    
  );
};


