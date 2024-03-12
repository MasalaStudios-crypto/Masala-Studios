import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { MasalaContext } from '../../../Context/MasalaProvider'

export const ListaCursosApuntados = ({user_id}) => {
  const [coursesSign, setCoursesSign]=useState()
  const {token}= useContext(MasalaContext)

useEffect(()=>{
  if(token){
    axios.defaults.headers.common["Authorization"]=`Bearer ${token}`
  let url=`http://localhost:3000/users/allRegCourse/${user_id}`
  axios
    .get(url)
    .then((res)=>{
      setCoursesSign(res.data)
    })
    .catch((err)=>console.log(err))
  }
},[token])

  return (
    <div>
      {coursesSign?.map((elem)=>(
        <h3>{elem.name}</h3>
      ))}
    </div>
  )
}
