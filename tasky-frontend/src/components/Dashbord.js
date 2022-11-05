import React, { useState, useEffect } from 'react';
import clock from "./assests/clock.png";
import tick from "./assests/tick.png";
import Loading from "./assests/Loading1.gif";

import Footer from './Footer';
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from 'axios';

function Dashboard(loading) {

  const { state } = useLocation();

  let navigate = useNavigate();
  let [tasks, setTasks] = useState([])
  console.log(tasks)

  function navigating(e, name) {
    console.log(e)
    navigate('/edittask', { state: { e, name } });
  }

  useEffect(() => {
    async function verifyAuth() {
      try {
        let token = JSON.parse(localStorage.getItem("token")).token
        let { data } = await axios.get("/api/auth", {
          headers: {
            "auth-token": token
          }
        })
      } catch (error) {
        console.error(error.response.data)
        navigate("/login")
      }
    }
    verifyAuth();

    async function getalltasks() {
      try {
        let token = JSON.parse(localStorage.getItem("token")).token
        let { data } = await axios.get("/api/task/tasks", {
          headers: {
            "auth-token": token
          }
        })
        setTasks(data.alltasks.tasks);
        // console.log(tasks);

      } catch (error) {
        console.error(error.response.data)
      }
    } getalltasks();

  }, [])

  async function DeleteTask(id) {
    try {
      let token = JSON.parse(localStorage.getItem("token")).token
      setTasks(tasks.filter((ele) => ele._id !== id))
      let data = await axios.delete(`/api/task/${id}`, {
        headers: {
          "auth-token": token
        }
      })
      // window.location.reload();
    } catch (error) {
      console.error(error.response.data)
    }
  }


  return (
    <>

      {/* {loading && <Loading />} */}

      <center>
        <h1 style={{ display: "inline", margin: "230px", color: "orange" ,fontFamily:"fantasy"}}>Dashboard</h1> <Link to="/AddTask" className='button' style={{ background: "orange", padding: "5px", marginBottom: "4px", borderRadius: "5px", color: 'white', border: 'white 1px solid' }} >Add Task</Link>
        <table id="dashboard" >

          <thead >
            <tr>
              <th>DeadLine</th>
              <th>Task Name</th>
              <th>Is Completed</th>
              <th>Edit/Delete</th>
            </tr>
          </thead>
          <tbody>
            {

              tasks.map((task, i) => {
                // console.log(task.isCompleted)

                return (<tr key={i}>
                  <td>{(new Date(task.deadline)).toLocaleString()}</td>
                  <td>{task.taskname}</td>
                  <td>{task.isCompleted ? <img style={{ width: "35px" }} src={tick} alt="Loading.." /> : <img style={{ width: "35px" }} src={clock} alt="Loading.." />}</td>

                  <td><button style={{cursor:"pointer"}} type='button' onClick={() => navigating(task._id, task.taskname)}>Edit</button>
                    <button style={{cursor:"pointer"}} onClick={() => DeleteTask(task._id)}>Delete</button></td>
                </tr>)
              })
            }
          </tbody>
        </table>
      </center><br /><br />

      <Footer />
    </>
  )
}

export default Dashboard;

