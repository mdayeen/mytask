import React from 'react'

import Navbar from './components/Navbar';
import Body from './components/Body';

import './App.css';
import { Routes, Route } from "react-router-dom"
import { useState, useEffect } from 'react';
import axios from 'axios';
import PrivateRoutes from './components/PrivateRoutes';

import Signup from './components/Signup';
import Login from './components/Login';
import AddTask from './components/Addtask';
import EditTask from './components/EditTask';
import Dashboard from './components/Dashbord';
import About from './components/About';

function App() {

  const [alert, setAlert] = useState(null);
  const [taskData, settaskData] = useState([]);
  const [loading, setLoading] = useState(false);

  const showAlert = (data) => {
    setAlert({
      type: data.type,
      msg: data.msg
    })
    setTimeout(() => {
      setAlert(null);
    }, 4000)
  }
  return (
    <>
       <Navbar />
      <Routes>
      <Route path='/about' element={<About />} />
        <Route path="/" element={<Body taskData={taskData} loading={loading} />} />
        <Route path="/signup" element={<Signup alert={alert} showAlert={showAlert} />} />
        <Route path="/login" element={<Login alert={alert} showAlert={showAlert} />} />
        <Route element={<PrivateRoutes />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path='/addtask' element={<AddTask />} />
        <Route path='/edittask' element={<EditTask />} />
        </Route>
      </Routes>
    </>
  );      
}

export default App;