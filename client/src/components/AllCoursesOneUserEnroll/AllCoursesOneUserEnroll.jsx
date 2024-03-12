import React, { useContext, useEffect, useState } from 'react';
import { MasalaContext } from '../../Context/MasalaProvider';
import Carousel from 'react-bootstrap/Carousel';
import './allCoursesOneUserEnroll.scss';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Slide = ({ imagePath, title, caption, aref }) => (
  <div className="slide-container">
    <img src={imagePath} alt="foto curso" />
    <div className="caption-container">
      <h4 className='text-carousel'>{title}</h4>
      <p className='text-carousel'>Profesor: <br/>{caption}</p>
      <Link to={aref}>Abrir curso</Link>
    </div>
  </div>
);

export const AllCoursesOneUserEnroll = ({ refreshCourses }) => {
  const { user } = useContext(MasalaContext);
  const [allCoursesOneUser, setAllCoursesOneUser] = useState();
  const [allTeachers, setAllTeachers] = useState();
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  const updateDimensions = () => {
    setScreenWidth(window.innerWidth);
  };

  useEffect(() => {
    if (user) {
      axios
        .get(`http://localhost:3000/course/allCoursesOneUserEnroll/${user.user_id}`)
        .then((res) => {
          const { courses, teachers } = res.data;
          setAllCoursesOneUser(courses);
          setAllTeachers(teachers);
        })
        .catch(err => console.log(err));
    }

    window.addEventListener('resize', updateDimensions);

    return () => {
      window.removeEventListener('resize', updateDimensions);
    };
    
  }, [user, refreshCourses]);

  
  let itemsToShow = 1;

  if (screenWidth > 1500) {
    itemsToShow = 3;
  } else if (screenWidth > 1150) {
    itemsToShow = 2;
  }

  return (
    <div>
      <Carousel className="carousel-item-container">
        {allCoursesOneUser?.reduce((cursosAgrup, curso, index) => {
          const groupIndex = Math.floor(index / itemsToShow);
          if (!cursosAgrup[groupIndex]) {
            cursosAgrup[groupIndex] = [];
          }
          cursosAgrup[groupIndex].push(curso);
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
                aref={`/mycourse/${curso.course_id}`}
              />
            ))}
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};






