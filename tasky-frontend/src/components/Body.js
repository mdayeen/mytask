import React from 'react'
import { Link } from "react-router-dom"
import giffi from "./assests/giffi.gif"


function Body(loading) {
    
    return (
        <div>  
                       <div className="content" style={{ backgroundColor: "#448fea" }}>
                <div className='flex-box'>
                    <h1 className='tag'>MANAGE YOUR TASKS FROM ANY WARE.<br/ >
                    <div className='tag-sub' style={{ }}>MY-TASKY is a cloud-based task management application.
                        It allows users to manage their tasks from a smartphone, tablet and computer.
                        And send reminders through  E-mails and SMS.</div></h1>
                    <img className='giffi' src={giffi} alt="task " />
                </div>
                <div />

                <div className='buttons'><Link to="/Signup"> <button>SIGN-UP</button></Link>   <Link to="/login"> <button>LOGIN</button></Link>
                </div>
            </div>
        </div>
    )   
}

export default Body;