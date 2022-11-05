import React from 'react'
import { Link, useNavigate } from "react-router-dom"

function Navbar() {
  // let navigate=useNavigate()
  function ontick(){
    localStorage.removeItem("token");
    
    
  }
  return (
    <>
      <header className='navbar'>

        <Link to="/login" id="logo" className='navbar_title '>my-tasky</Link>
        <div>
          <Link to="/login" onClick={ontick}> LOGOUT </Link>
          <Link to="/about"> ABOUT </Link>
          <Link to="/Login" > HOME </Link>
        </div>
      </header>
    </>

  )
}

export default Navbar


