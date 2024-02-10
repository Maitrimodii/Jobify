import React from 'react'
import Header from './components/Header';
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import SignUp from './components/SignUp';
import Login from './components/Login';
import EmployeeProfile from './pages/EmployeeProfile';
import EmployerProfile from './pages/EmployerProfile';
import AddJob from './pages/AddJob';
import ViewJob from './pages/ViewJob';
import Application from './pages/Application';
import EmployeeApplications from './pages/EmployeeApplications';
import ChatDisplay from './components/ChatDisplay';
import Chat from './pages/Chat';
import UpdateJob from './pages/UpdateJob';

const App = () => {
  return (
    <BrowserRouter>
    <Header/>
    <Routes>
      <Route path = '/' element = {<HomePage/>}/>
      <Route path = '/signup' element = {<SignUp/>}/>
      <Route path = '/login' element = {<Login />}/>
      <Route path ='/employeeprofile' element = {<EmployeeProfile />}/>
      <Route path = '/employerprofile' element = {<EmployerProfile/>}/>
      <Route path = '/add-job' element = {<AddJob/>}/>
      <Route path = '/updateJob/:jobId' element = {<UpdateJob/>}/> 
      <Route path = '/view-jobs' element={<ViewJob/>}/>
      <Route path = '/view-applications' element = {<Application/>}/>
      <Route path = '/my-applications' element = {<EmployeeApplications/>}/>
      <Route path = '/chat' element = {<Chat />}/>
      <Route path= '/chatDisplay/:chatId/:receiverId/:name' element={<ChatDisplay />} />
    </Routes>
    </BrowserRouter>
  )
}

export default App