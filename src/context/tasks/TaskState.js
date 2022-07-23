import TaskContext from "./taskContext";
import { useState } from "react";
import { waitForElementToBeRemoved } from "@testing-library/react";




const TaskState = (props) => {
  const host = "http://localhost:5000"
  const tasksInitial = [] 
  const [tasks, setTasks] = useState(tasksInitial);
   const [userDetails, setUserDetails] = useState({});

  // to get user details
  const getDetails = async () => {
    const response = await fetch(`${host}/api/auth/getuser`, {
      method: 'POST',
      headers: {
        "auth-token": localStorage.getItem('token'),
        'Content-Type': 'application/json'
      },
    });
    const json = await response.json();
    setUserDetails(json);
  }


 // to fetch tasks
  const getTask = async () => {
    const response = await fetch(`${host}/api/tasks/fetchalltasks`, {
      method: 'GET',
      headers: {
        "auth-token": localStorage.getItem('token'),
        'Content-Type': 'application/json'
      }
    });
    const json = await response.json();
    setTasks(json);

  }




  // Adding Tasks

  const addTask = async (title, description, tag) => {
    const response = await fetch(`${host}/api/tasks/addtasks`, {
      method: 'POST',
      headers: {
        "auth-token": localStorage.getItem('token'),
        'Content-Type': 'application/json'

      }, 
      body: JSON.stringify({ title, description, tag }) 
    });
    const task = await response.json(); 
    setTasks(tasks.concat(task));
  }




 // Deleting tasks
  const deleteTask = async (id) => {
    const response = await fetch(`${host}/api/tasks/deletetasks/${id}`, {
      method: 'DELETE',
      headers: {
        "auth-token": localStorage.getItem('token'),
        'Content-Type': 'application/json'
      }
    });
    const newTasks = tasks.filter((task) => { return task._id !== id });
    setTasks(newTasks);
  }




// Editing the tasks 
  const editTask = async (id, title, description, tag) => {
    const response = await fetch(`${host}/api/tasks/updatetasks/${id}`, {
      method: 'PUT',
      headers: {
        "auth-token": localStorage.getItem('token'),
        'Content-Type': 'application/json'

      },
      body: JSON.stringify({ title, description, tag })
    });
    const json = response.json();
    let newTask = JSON.parse(JSON.stringify(tasks)); for (let index = 0; index < newTask.length; index++) {
      const element = newTask[index];
      if (element._id === id) {
        newTask[index].title = title;
        newTask[index].description = description;
        newTask[index].tag = tag;
        break;
      }
    }
    setTasks(newTask);
  }

  return (
    <TaskContext.Provider value={{ tasks, addTask, deleteTask, editTask, getTask,userDetails,getDetails}}>
      {props.children}
    </TaskContext.Provider>
    )
}
export default TaskState;