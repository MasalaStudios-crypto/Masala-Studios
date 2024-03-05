import React, { useContext } from 'react'
import { Routes, Route } from 'react-router-dom'
import {Container} from 'react-bootstrap'
import { Register } from '../pages/Auth/Register/Register'
import { Login } from '../pages/Auth/Login/Login'
import { TravelContext } from '../Context/TravelsProvider'
import { NavBarApp } from '../components/NavBarApp/NavBarApp'
import { Home } from '../pages/Home/Home'


export const AppRoutes = () => {

  const {user}=useContext(TravelContext) 
  return (
  
    <>
      <header>
        <nav>
          <NavBarApp />
        </nav>
      </header> 
      <Container fluid>
        <main>
          <Routes>
            <Route path='/' element={<Home />}/>
            <Route path='/about' element={<h1>ABOUT</h1>} />
            <Route path='/service' element={<h1>SERVICE</h1>} />
            <Route path="*" element={<h1>TRAMPOSO</h1>}/>

            {!user && <>
            <Route path='/register' element={<Register/>} />
            <Route path='/login' element={<Login/>} />
            </>}

          </Routes>
        </main>
        <footer>

        </footer>
      </Container>
    </>  

  )
}
