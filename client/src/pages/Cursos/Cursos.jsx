import React, { useEffect, useState } from 'react'
import { Button, Card, Carousel } from 'react-bootstrap'
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

        
      <Carousel  className='Carousel-ppal'>

      {cursos.map((elem)=>(
        
      <Carousel.Item key={elem.course_id} className='Carousel-ppal'>

      <Card style={{backgroundColor:"rgba(255, 255, 255, 0.243)"}} className='serv-card'>
      <Card.Img  variant="top" src={`http://localhost:3000/images/course_img/${elem?.course_img}`} />
        <Card.Body>
        <Card.Title>{elem?.name}</Card.Title>
      <p>Descripción: {elem?.description}</p>
      <p>{elem?.duration}h.</p>
      <p>{elem?.price}€</p>
        
        <Button variant="primary">Ver más</Button>
        </Card.Body>
      </Card>

      </Carousel.Item>
        ))}
      </Carousel>
    
    </>
  )
}
