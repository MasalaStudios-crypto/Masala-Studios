import React, { useEffect, useState } from 'react'
import { Button, Carousel } from 'react-bootstrap'
import { CardCursos } from '../../components/Card-Cursos/CardCursos'
import './cursos.scss'
import axios from 'axios'

export const Cursos = () => {
  const [cursos, setCursos] = useState([])

  useEffect(()=>{
    axios
        .get("http://localhost:3000/course/allCourses")
        .then((res)=>{
        setCursos(res.data)
      })
        .catch((err)=>console.log(err))

  },[])

  return (
    <>
        <h2 style={{textAlign:"center"}}>Cursos</h2>
        
      <Carousel className='Carousel-ppal'>
        
      {cursos.map((elem)=>(
      <Carousel.Item className='Carousel-ppal'>

        <CardCursos key={elem.course_id} elem={elem}/>
      </Carousel.Item>
      ))}
      </Carousel>
    
    </>
  )
}
