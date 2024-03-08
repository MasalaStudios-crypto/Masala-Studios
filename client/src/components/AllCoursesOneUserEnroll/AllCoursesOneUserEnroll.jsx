import React, { useContext, useEffect, useState } from 'react'
import { MasalaContext } from '../../Context/MasalaProvider'
import Carousel from 'react-bootstrap/Carousel';
import './allCoursesOneUserEnroll.scss';
import axios from 'axios';

const Slide = ({ imagePath, title, caption }) => (
  <div className="slide-container">
    <img src={imagePath} alt="foto curso" />
    <div className="caption-container">
      <h4 className='text-carousel'>{title}</h4>
      <p className='text-carousel'>Profesor: <br/>{caption}</p>
    </div>
  </div>
);

export const AllCoursesOneUserEnroll = () => {
  const {user} = useContext(MasalaContext);
  const [allCoursesOneUser, setAllCoursesOneUser] = useState();
  const [allTeachers, setAllTeachers] = useState();


  useEffect(() => {
    if(user){
      axios
    .get(`http://localhost:3000/course/allCoursesOneUserEnroll/${user.user_id}`)
    .then((res) => {
      //console.log(res.data);
      const {courses, teachers} = res.data
      //console.log("cursos", courses);
      //console.log("profes", teachers);
      //setAllCoursesOneUser(res.data);
      setAllCoursesOneUser(courses)
      setAllTeachers(teachers)
    })
    .catch(err => console.log(err));

    }
  }, [user])

  //console.log("AQUIIIII", allCoursesOneUser);
  //console.log("AQUIIIII", allTeachers);

return (
<div>
  <Carousel className="carousel-item-container">
    {allCoursesOneUser?.reduce((cursosAgrup, curso, index) => {
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
            caption={allTeachers.find((teacher) => teacher.user_id === curso.creator_user_id)?.name}
          />
        ))}
      </Carousel.Item>
    ))}
  </Carousel>
</div>

);

};




