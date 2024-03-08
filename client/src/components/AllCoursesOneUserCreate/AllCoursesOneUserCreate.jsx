import React, { useContext, useEffect, useState } from 'react'
import { MasalaContext } from '../../Context/MasalaProvider'
import Carousel from 'react-bootstrap/Carousel';
import './allCoursesOneUserCreate.scss';
import axios from 'axios';

const Slide = ({ imagePath, title, caption }) => (
  <div className="slide-container">
    <img src={imagePath} alt="foto curso" />
    <div className="caption-container">
      <h4 className='text-carousel'>{title}</h4>
      <p className='text-carousel'>Alumnos: <br/>{caption}</p>
    </div>
  </div>
);

export const AllCoursesOneUserCreate = () => {
  const {user} = useContext(MasalaContext);
  const [allCoursesOneUserCreate, setAllCoursesOneUserCreate] = useState();
  const [allStudents, setAllStudents] = useState();


  useEffect(() => {
    if(user){
      axios
    .get(`http://localhost:3000/course/allCoursesOneUserCreate/${user.user_id}`)
    .then((res) => {
      //console.log(res.data);
      const {courses, students} = res.data
      //console.log("cursos", courses);
      //console.log("estudientes", students);
      //setAllCoursesOneUserCreate(res.data);
      setAllCoursesOneUserCreate(courses)
      setAllStudents(students)
    })
    .catch(err => console.log(err));

    }
  }, [user])

  console.log("AQUIIIII", allCoursesOneUserCreate);
  console.log("AQUIIIII", allStudents);

return (
<div>
  <Carousel className="carousel-item-container">
    {allCoursesOneUserCreate?.reduce((cursosAgrup, curso, index) => {
      if (index % 3 === 0) {
        cursosAgrup.push([]);
      }
      cursosAgrup[cursosAgrup.length - 1].push(curso);
      return cursosAgrup;
    }, []).map((cursoGroup, groupIndex) => (
      <Carousel.Item key={groupIndex}>
        {cursoGroup.map((curso) => (
          <Slide
            key={curso.course_id}
            imagePath={curso.course_img
              ? `http://localhost:3000/images/course/${curso.course_img}`
              : "/images/course.png"
            }
            title={curso.name}
            caption={allStudents.map((student) => (
              <div key={student.user_id}>{student.name}</div>
            ))}
          />
        ))}
      </Carousel.Item>
    ))}
  </Carousel>
</div>

);

};




