import React from 'react';
import { Link, useLocation } from "react-router-dom";

const Navbar = (props) => {
    let location = useLocation();
  
    const logout = () => {
        localStorage.clear();
        props.showAlert(" Logged Out Successfully","success");
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">Task Tracker</Link>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                        {localStorage.getItem('token') &&   <Link className={`nav-link ${location.pathname === "/" ? "active" : ""}`} aria-current="page" to="/">Home</Link> }
                        </li>
                        <li className="nav-item">
                        {localStorage.getItem('token') && <Link className={`nav-link ${location.pathname === "/user" ? "active" : ""}`} aria-current="page" to="/user">User</Link> }
                        </li>
                    </ul>
                
                
                    {!localStorage.getItem('token') ? <form className="d-flex justify-content-end">
                        <Link className="btn btn-primary mx-2" to="/login" role="button">Login</Link>
                        <Link className="btn btn-primary mx-2" to="/signup" role="button">Sign up</Link>
                    </form> : <div>
                        <Link className="btn btn-primary mx-2" to="/login" role="button" onClick={logout}>Logout</Link> </div>}
                </div>
            </div>
        </nav>
    )
}

export default Navbar