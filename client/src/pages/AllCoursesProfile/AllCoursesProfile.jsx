import React, { useContext, useEffect, useState } from 'react'
import { CardCourses } from '../../components/Card-Courses/CardCourses'
import './AllCoursesProfile.scss'
import axios from 'axios'
import { MasalaContext } from '../../Context/MasalaProvider'

export const AllCoursesProfile = () => {
  const {user} = useContext(MasalaContext)
  const [allCourses, setAllCourses] = useState([])
 
  

  useEffect(()=>{
    if (user) {
      
      axios
      .get(`http://localhost:3000/course/allCoursesProfile/${user.user_id}`)
        .then((res)=>{
          setAllCourses(res.data)
          console.log(res.data)
          
        })
        .catch((err)=>console.log(err))
        
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
