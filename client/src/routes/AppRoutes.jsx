import React, { useContext } from 'react'
import { Routes, Route } from 'react-router-dom'
import {Container} from 'react-bootstrap'
import { Register } from '../pages/Auth/Register/Register'
import { Login } from '../pages/Auth/Login/Login'
import { MasalaContext } from '../Context/MasalaProvider'
import { NavBarApp } from '../components/NavBarApp/NavBarApp'
import { Home } from '../pages/Home/Home'
import { Footer } from '../components/Footer/Footer'
import { Who } from '../pages/Who/Who'
import { Servicios } from '../pages/Servicios/Servicios'
import { UserProfile } from '../pages/UserProfile/UserProfile'
import { AdminUsers } from '../pages/Admin/Users/AdminUsers'
import { MyCourse } from '../pages/MyCourse/MyCourse'
import { AdminCourse } from '../pages/Admin/Course/AdminCourse'
import { AdminSubject } from '../pages/Admin/Subject/AdminSubject'



export const AppRoutes = () => {

  const {user}=useContext(MasalaContext) 
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
            <Route path='/who' element={<Who />}/>
            <Route path='/profile' element={<UserProfile />}/>
            <Route path='/about' element={<h1>ABOUT</h1>} />
            <Route path='/servicios' element={<Servicios/>} />
            <Route path='/allUsers' element={<AdminUsers/>} />
            <Route path='/allCourses' element={<AdminCourse/>} />
            <Route path='/subjects/:course_id' element={<AdminSubject/>} />

            <Route path="*" element={<h1>TRAMPOSO</h1>}/>
            <Route path="/mycourse/:course_id" element={<MyCourse />}/>

            {!user && <>
            <Route path='/register' element={<Register/>} />
            <Route path='/login' element={<Login/>} />
            </>}

          </Routes>
        </main>
        <footer>
              <Footer />
        </footer>
      </Container>
    </>  

  )
}
