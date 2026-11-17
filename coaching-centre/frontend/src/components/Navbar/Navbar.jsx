import React from 'react'
import { NavLink } from 'react-router-dom'
import "./Navbar.css"

const navLink =[
    {id:1, title:"Home",path: "/"},
    {id:2, title:"About",path: "/about"},
    {id:3, title:"Courses",path: "/courses"},
    {id:4, title:"Teachers",path: "/teachers"},
    {id:5, title:"Contact",path: "/contact"},
]

const Navbar = () => {
  return (
    <div className='navbar'>
        <div className="nav-logo">
            <h2>Code<span>Shala</span></h2>
        </div>
        <ul className="nav-menu">
            {navLink.map((link)=>(
                <li key={link.id}>
                    <NavLink to={link.path}>{link.title}</NavLink>
                    </li>    

            ))}
        </ul>
        <div className="nav-btn">
            <button className='login-btn'><NavLink to="/login">Login</NavLink></button>
            <button className='registor-btn'><NavLink to="/register">Register</NavLink></button>
        </div>
      
    </div>
  )
}

export default Navbar
