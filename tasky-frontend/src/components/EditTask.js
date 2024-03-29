import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate, useLocation } from "react-router-dom";


function EditTask() {

    const navigate = useNavigate();

    const { state } = useLocation();
    // console.log(state.e);
    const [edittask, setEdittask] = useState({
        taskname: state.name,
        deadline: state.deadline,
        isCompleted:Boolean()
    })
    // console.log(edittask);

    const { taskname, deadline, isCompleted } = edittask

    const onChangeHandler = (e) => {
        setEdittask({
            ...edittask,
            [e.target.name]: e.target.value
        })
    }

    async function onSubmitHandler(e) {
        try {
            e.preventDefault();
            console.log(edittask);
            let token = JSON.parse(localStorage.getItem("token")).token
            let res = await axios.put(`/api/task/${state.e}`, edittask, {
                headers: {
                    "auth-token": token
                }
            });
            // console.log(res.data);
            navigate("/dashboard");
        } catch (error) {
            if (error.response.data.errors) {
                let errorString = "";
                error.response.data.errors.forEach(element => {
                    errorString += element.msg;
                });
            }
        }
    }

        return (
            <>
            <div style={{margin:'0px'}}><center>
                <h1 style={{fontFamily:"cursive",color:'orange'}}>Edit Task</h1>
                <form  style={{margin:'0px'}} onSubmit={onSubmitHandler}>
                    <input type="text" id="taskname" name="taskname" placeholder="Task Name" value={taskname} onChange={onChangeHandler} required /><br />

                    <input type="datetime-local" id="deadline" name="deadline" placeholder="DeadLine" value={deadline} onChange={onChangeHandler} required />

                    <input type="text" id="isCompleted" name="isCompleted" placeholder=" Is complited True/False" value={isCompleted} onChange={onChangeHandler} required /><br />

                    <input type="submit" value="Edit Task" />
                </form>
            </center>
            </div>
            </>
        )
    }

    export default EditTask;