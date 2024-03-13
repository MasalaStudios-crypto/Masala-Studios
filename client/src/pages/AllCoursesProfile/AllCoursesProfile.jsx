import React, { useContext, useEffect, useState } from 'react'
import { CardCourses } from '../../components/Card-Courses/CardCourses'
import './AllCoursesProfile.scss'
import axios from 'axios'
import { MasalaContext } from '../../Context/MasalaProvider'

export const AllCoursesProfile = () => {
  const {user} = useContext(MasalaContext)
  const [allCourses, setAllCourses] = useState([])
  const {token} = useContext(MasalaContext);
 
  

  useEffect(()=>{

    if(token){
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`

      if (user) {
        
        axios
        .get(`http://localhost:3000/course/allCoursesProfile/${user.user_id}`)
        .then((res)=>{
          setAllCourses(res.data)
          console.log(res.data)
          
        })
        .catch((err)=>console.log(err))
        
    }
    }else{
      [<h1>Acceso No autorizado</h1>]
    }
  },[user])

  return (
    <div className='allCoursesProfile-ppal'>
      
      {allCourses.map((elem)=>

      <CardCourses key={elem.course_id} elem={elem}/>

      )}
      
    </div>
  )
}
