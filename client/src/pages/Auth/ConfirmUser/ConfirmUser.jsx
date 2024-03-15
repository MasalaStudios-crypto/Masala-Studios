import axios from 'axios'
import React, { useContext, useEffect } from 'react'
import { MasalaContext } from '../../../Context/MasalaProvider'
import { useNavigate, useParams } from 'react-router-dom'

export const ConfirmUser = () => {

  const {token} = useContext(MasalaContext)
  const {tokenP} = useParams()
  const navigate = useNavigate()

  useEffect(()=>{
    if(token == tokenP){

      axios
      .get(`http://localhost:3000/user/confirmation/${token}`)
      .then((res)=>{
        navigate("/login")
      })
      .catch((err)=>console.log(err))
      
    }else{
      console.log("Error de verificacion")
    }
  },[token])


  return (
    <div>
      <div>
      <h1>Confirme su usuario en su correo electrónico</h1>
      </div>
    </div>
  )
}
