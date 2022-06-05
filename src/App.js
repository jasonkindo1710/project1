import React from 'react'
import Login from './Components/Login'
import Register from './Components/Register'

import AdminHomePage from './AdminPages/AdminHomePage'
import PlayScreen from './UserPages/PlayScreen'
import FinalScore from './UserPages/FinalScore'
import Questions from './UserPages/Questions'
import {Routes, Route} from "react-router-dom" 
import AdminUserPage from './AdminPages/AdminUserPage'
import AdminQuestionPage from './AdminPages/AdminQuestionPage'


function App() {
  return (
    <Routes>
      <Route path='/' element={<Login />} />
      <Route path='register' element={<Register />} />
      <Route path='adminhome' element={<AdminHomePage />}>
        <Route path='adminuser' element={<AdminUserPage />} />
        <Route path='adminquestion' element={<AdminQuestionPage/>} />
      </Route>
      <Route path='playscreen' element = {<PlayScreen />} />
      <Route path='finalscore' element ={<FinalScore />} />
      <Route path='question' element = {<Questions />} />
    </Routes>
    
  )
}

export default App