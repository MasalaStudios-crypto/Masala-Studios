import React, { useContext, useEffect, useState } from 'react'
import { CardCourses } from '../../components/Card-Courses/CardCourses'
import './AllCoursesProfile.scss'
import axios from 'axios'
import { MasalaContext } from '../../Context/MasalaProvider'
import { useParams } from 'react-router-dom'

export const AllCoursesProfile = () => {
  const {user} = useContext(MasalaContext)
  const [allCourses, setAllCourses] = useState([])
  const {user_id} = useParams();

  console.log(user?.user_id);
  console.log(user_id);
 
  

  useEffect(()=>{

      if (user) {
        
        axios
        .get(`http://localhost:3000/course/allCoursesProfile/${user?.user_id}`)
        .then((res)=>{
          setAllCourses(res.data)
          console.log(res.data)
          
        })
        .catch((err)=>console.log("error axios",err))
        
    }

  },[user])

  return (
    <>
   {user?.user_id == user_id ?
    <>
    <div className='allCoursesProfile-ppal'>
    
    {allCourses.map((elem)=>

    <CardCourses key={elem.course_id} elem={elem}/>

    )}
    
    </div>
    </>
    :
    <>
    <h1>Acceso Denegado</h1>
    <h3>Compruebe que la direccion es correcta</h3>
    </>
    }
  </>

  )
}
