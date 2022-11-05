import React from 'react'
import giffi from "./assests/giffi.gif";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom"


function Login({ alert, showAlert }) {

  let navigate = useNavigate();

  const [userData, setUserData] = useState({
    email: "",
    password: "",
  })

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/dashboard");
    }
  }, [])

  const { email, password } = userData;

  const onChangeHandler = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value
    })
  }
  const onSubmitHandler = async (e) => {
    try {
      //Prevents Refreshing the Form
      e.preventDefault();
      console.log(userData);
      let res = await axios.post("/api/login", userData);
      console.log(res.data);
      localStorage.setItem("token", JSON.stringify({ token: res.data.token, role: res.data.role }));
      navigate("/dashboard");
      // }
      showAlert({
        type: "success",
        msg: res.data.success
      })
    } catch (error) {

      if (error.response.data.errors) {
        //Handling Express Validators
        let errorString = "";
        error.response.data.errors.forEach((ele) => {
          errorString += ele.msg
        })
        showAlert({
          type: "error",
          msg: errorString
        })
      } else {
        //Custom Errors
        showAlert({
          type: "error",
          msg: error.response.data.error
        })
      }
      // console.log("Catch")
      console.log(error.response.data.error);
    }
  }

  return (
    <>

      <div className='flex2-box' >

        <div>
          <form className='reg-form' onSubmit={onSubmitHandler}>

            <h1 style={{ color: "#006E7F", fontFamily: "cursive" }}>LOGIN</h1>
            {alert !== null && <h3 className={`alert-${alert.type}`}>{alert.msg}</h3>}

            <input type="email" id="email" name="email" placeholder='example@email.com' value={email} onChange={onChangeHandler} required /><br />
            <input type="password" id="password" name="password" placeholder='Password' value={password} onChange={onChangeHandler} required /><br />


            <input type="submit" value="LOGIN" /><br />
            <Link to="/Signup" id="redirect-to">Did'nt have an account? Signup</Link>

          </form>
        </div>
        <img className="giffi" src={giffi} alt="task" />
      </div>
    </>
  )
}

export default Login
