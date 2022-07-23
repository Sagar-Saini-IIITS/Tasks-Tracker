import React, { useContext, useEffect,useState } from 'react';
import taskContext from '../context/tasks/taskContext';

import { useNavigate } from 'react-router-dom';
const About = () => {
  let navigate = useNavigate();
  const context = useContext(taskContext);
  const {getDetails,userDetails}=context;

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate("/login");
    }
    getDetails();
    
    // eslint-disable-next-line
  }, [])

  

  return (
    <div className='container'>
      <h2> User Details</h2>
      <ul class="list-group">
        <li class="list-group-item"><b> Name:</b> {userDetails.name} </li>
        <li class="list-group-item"><b> Email:</b> {userDetails.email}</li>
        
      </ul>
    </div>
  )
}

export default About;