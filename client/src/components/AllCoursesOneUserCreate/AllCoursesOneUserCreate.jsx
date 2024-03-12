import React, { useContext, useLayoutEffect, useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { MasalaContext } from '../../Context/MasalaProvider';
import { ModalBasico } from '../ModalBasico/ModalBasico';
import { AllStudentITeach } from '../AllStudentITeach/AllStudentITeach';
import './allCoursesOneUserCreate.scss';

const Slide = ({ imagePath, title, onClick }) => (
  <div className="slide-container">
    <img src={imagePath} alt="foto curso" />
    <div className="caption-container">
      <h4 className='text-carousel'>{title}</h4>
      <Link onClick={onClick}>Ver alumnos</Link>
    </div>
  </div>
);

const chunkArray = (arr, chunkSize) => {
  const chunkedArray = [];
  for (let i = 0; i < arr.length; i += chunkSize) {
    chunkedArray.push(arr.slice(i, i + chunkSize));
  }
  return chunkedArray;
};

export const AllCoursesOneUserCreate = ({ refreshCourses }) => {
  const { user } = useContext(MasalaContext);
  const [show, setShow] = useState(false);
  const [courseId, setCourseId] = useState();
  const [coursesArray, setCoursesArray] = useState([]);
  const [lastFetchTime, setLastFetchTime] = useState(0);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useLayoutEffect(() => {
    const handleResize = () => {
      const now = Date.now();
      if (now - lastFetchTime > 1000) {
        // Evitar nuevas peticiones al backend dentro de un intervalo de 1000 milisegundos (1 segundo)
        setLastFetchTime(now);
        setScreenWidth(window.innerWidth);
        updateDimensions();
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [lastFetchTime]);

  useLayoutEffect(() => {
    const updateDimensions = async () => {
      if (user) {
        try {
          const res = await axios.get(`http://localhost:3000/course/allCoursesOneUserCreate/${user.user_id}`);
          const coursesArray = Object.values(res.data);
          setCoursesArray(chunkArray(coursesArray, getItemsToShow(screenWidth)));
        } catch (err) {
          console.log(err);
        }
      }
    };

    updateDimensions();
  }, [user, screenWidth]);

  const getItemsToShow = (width) => {
    if (width > 1500) {
      return 3;
    } else if (width > 1150) {
      return 2;
    }
    return 1;
  };

  const showModal = () => {
    setShow(!show);
  };

  return (
    <div>
      <Carousel className="carousel-item-container">
        {coursesArray.map((group, index) => (
          <Carousel.Item key={index}>
            {group.map(({ course }) => (
              <Slide
                key={course.course_id}
                imagePath={
                  course.course_img
                    ? `http://localhost:3000/images/course/${course.course_img}`
                    : "/images/course.png"
                }
                title={course.name}
                onClick={() => {
                  showModal();
                  setCourseId(course.course_id);
                }}
              />
            ))}
          </Carousel.Item>
        ))}
      </Carousel>
      {/* show students */}
      <ModalBasico show={show} handleClose={showModal} title="Alumnos del curso">
        {courseId && (
          <AllStudentITeach
            handleClose={showModal}
            allStudents={
              coursesArray
                .flat()
                .find(({ course }) => course.course_id === courseId)?.students || []
            }
            courseId={courseId}
          />
        )}
      </ModalBasico>
    </div>
  );
};





