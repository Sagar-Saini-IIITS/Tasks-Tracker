import React, { useContext, useState } from 'react'
import taskContext from '../context/tasks/taskContext';


const AddTask = (props) => {

  const context = useContext(taskContext);
  const { addTask } = context; 
    const [task, setTask] = useState({ title: "", description: "", tag: "TODO" })
  const onChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value }) 
  }

  const handleClick = (e) => {
    e.preventDefault(); 
    addTask(task.title, task.description, task.tag);
    setTask({ title: "", description: "", tag: "TODO" })
    props.showAlert("Task Added Successfully", "success");
  }

  return (
    <div className="mtext">
      <h1 className='addtasks'> Add Tasks </h1>
      <form>
        <div className="d-flex justify-content-start my-4">
          <div className="" style={{ width: "40%", marginRight: "2%" }}>
            <label htmlFor="title" className="form-label">Title</label>
            <input type="text" className="form-control" id="title" name="title" value={task.title} onChange={onChange} minLength={5} required />
          </div>
          <div className="" style={{ width: "40%" }}>
           
          <label htmlFor="tag" className="form-label ">Task Tag</label>
            <select className="form-select" id="tag" name="tag" value={task.tag} onChange={onChange}>
              <option value={"TODO"} >TODO</option>
              <option value={"PROG"} >In-Progress</option>
              <option value={"COMP"} >Completed</option>
            </select>
          </div>
        </div>
        <div className="mb-3" style={{ width: "82%" }}>
          <label htmlFor="description" className="form-label">Description</label>
          <textarea type="text" rows="3" className="form-control d-flex flex-wrap" id="description" name="description" value={task.description} onChange={onChange} minLength={5} required />
        </div>

        <button disabled={task.title.length < 5 || task.description.length < 5} type="submit" className="btn btn-primary" onClick={handleClick}>Add Task</button>
      </form>


    </div>
  )
}

export default AddTask