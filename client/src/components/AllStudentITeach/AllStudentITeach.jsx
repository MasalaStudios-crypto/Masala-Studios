import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import './allStudentITeach.scss'
import { useNavigate } from 'react-router-dom';

export const AllStudentITeach = ({ allStudents, courseId }) => {
  const [allStatus, setAllStatus] = useState({});
  const [exam, setExam]=useState()
  const navigate=useNavigate
  useEffect(() => {
    const fetchData = async () => {
      if (allStudents && allStudents.length > 0) {
        const tempStatus = {};

        for (const student of allStudents) {
          const { user_id } = student;

          try {
            const res = await axios.get(`http://localhost:3000/course/grades/${user_id}/${courseId}`);
            const { status, exam_path } = res.data[0];
            setExam(exam_path)
            tempStatus[user_id] = status;
          } catch (error) {
            console.error(error);
          }
        }

        setAllStatus(tempStatus);
        
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
    <div className='d-flex justify-content-around'>
      <div className='d-flex flex-column'>
        <span>Nombre</span>
        {allStudents.map((student) => (
          <span key={student.user_id} className='text-stud'>{student.name}</span>
        ))}
      </div>
      <div className='d-flex flex-column'>
        <span>Apellido</span>
        {allStudents.map((student) => (
          <span key={student.user_id} className='text-stud'>{student.lastname}</span>
        ))}
      </div>
      <div className='d-flex flex-column'>
        <span>Email</span>
        {allStudents.map((student) => (
          <span key={student.user_id} className='text-stud'>{student.email}</span>
        ))}
      </div>
      <div className='d-flex flex-column'>
        <span>Teléfono</span>
        {allStudents.map((student) => (
          <span key={student.user_id} className='text-stud'>{student.phone}</span>
        ))}
      </div>

      <div className='d-flex flex-column'>
        <span>Examen</span>
        {allStudents.map((student) => (
          <span key={student.user_id} className='text-stud'><a href={`http://localhost:3000/resource/${exam}`}>click</a></span>
        ))}
      </div>

      <div>
        <span>Estado</span>
        {Object.entries(allStatus).map(([user_id, status]) => (
          <div key={user_id}>
            <select
              className='text-stud'
              value={status}
              onChange={(e) => handleStatusChange(user_id, e.target.value)}
            >
              <option value="1">En curso</option> {/* VER QUE VALORES LE DAMOS */}
              <option value="2">Aprobado</option>
              <option value="3">Suspenso</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};


