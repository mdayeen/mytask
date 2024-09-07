import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

function EditTask() {
  const navigate = useNavigate();
  const { state } = useLocation();
  console.log(state);

  const formatDateForInput = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    const hours = String(d.getHours()).padStart(2, "0");
    const minutes = String(d.getMinutes()).padStart(2, "0");
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  const [edittask, setEdittask] = useState({
    taskname: state.name,
    deadline: formatDateForInput(state.deadline),
    isCompleted: state.isCompleted,
  });

  const onChangeHandler = (e) => {
    const { name, value, type, checked } = e.target;
    setEdittask({
      ...edittask,
      [name]: type === "checkbox" ? checked : type === "radio" ? value === "true" : value, // Handle radio change
    });
  };

  async function onSubmitHandler(e) {
    e.preventDefault();
    try {
      console.log(edittask);
      let token = JSON.parse(localStorage.getItem("token")).token;
      let res = await axios.put(`/api/task/${state.e}`, edittask, {
        headers: {
          "auth-token": token,
        },
      });
      navigate("/dashboard");
    } catch (error) {
      if (error.response?.data?.errors) {
        let errorString = "";
        error.response.data.errors.forEach((element) => {
          errorString += element.msg;
        });
      }
    }
  }

  return (
    <div>
      <div style={{ margin: "0px" }}>
        <center>
          <h1 style={{ fontFamily: "cursive", color: "orange" }}>Edit Task</h1>
          <form style={{ margin: "0px" }} onSubmit={onSubmitHandler}>
            <input
              type="text"
              id="taskname"
              name="taskname"
              placeholder="Task Name"
              value={edittask.taskname}
              onChange={onChangeHandler}
              required
            />
            <br />

            <input
              type="datetime-local"
              id="deadline"
              name="deadline"
              placeholder="Deadline"
              value={edittask.deadline}
              onChange={onChangeHandler}
              required
            />
            <br />

            <br />
            <div className="radio-input">
              <label>
                <input
                  value="true"
                  name="isCompleted"
                  id="value-1"
                  type="radio"
                  checked={edittask.isCompleted === true}
                  onChange={onChangeHandler}
                />
                <span>Completed</span>
              </label> 
              <label>
                <input
                  value="false"
                  name="isCompleted"
                  id="value-2"
                  type="radio"
                  checked={edittask.isCompleted === false}
                  onChange={onChangeHandler}
                />
                <span>Incomplete</span>
              </label>
              <span className="selection" />
            </div>

            <input type="submit" value="Edit Task" />
          </form>
        </center>
      </div>
    </div>
  );
}

export default EditTask;
