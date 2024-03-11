import React, { useEffect, useState } from 'react'
import { CardCourses } from '../../components/Card-Courses/CardCourses'
import './AllCoursesProfile.scss'
import axios from 'axios'

export const AllCoursesProfile = () => {

  const [allCourses, setAllCourses] = useState([])
  const [refreshCourses, setRefreshCourses] = useState(false)


  const refresh = ()=>setRefreshCourses(!refreshCourses)
  

  useEffect(()=>{
    axios
        .get("http://localhost:3000/course/allCoursesProfile")
        .then((res)=>{
          setAllCourses(res.data)
          refresh()
      })
        .catch((err)=>console.log(err))

  },[])
  return (
    <div className='allCoursesProfile-ppal'>
      {allCourses.map((elem)=>

      <CardCourses key={elem.course_id} elem={elem}/>

      )}
      
    </div>
  )
}
