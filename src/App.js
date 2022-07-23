import './App.css';
import Home from './components/Home';
import React from "react";
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import Navbar from './components/Navbar';
import User from './components/User';
import Alert from './components/Alert';
import Login from './components/Login';
import Signup from './components/Signup';
import {useState} from 'react';

function App() {
  const [alert, setAlert] = useState(null);
  const showAlert =(message,type,time=2500)=>{
    setAlert({ msg: message,type: type,time: time});
    setTimeout(() => {setAlert(null)
    }, time);
  }
  return ( 
    <> 
      <Router>
        <Navbar showAlert={showAlert}/>
        <Alert alert={alert} showAlert={showAlert}/>
        <div className="container">
          <Routes>
            <Route exact path="/" element={<Home showAlert={showAlert}/>} />
            <Route exact path="/user" element={<User />} />
            <Route exact path="/login" element={<Login showAlert={showAlert}/>} />
            <Route exact path="/signup" element={<Signup showAlert={showAlert}/>} /> 
          </Routes>
          </div>
      </Router>
    </>
  );
}

export default App;
