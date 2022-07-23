import React, { useContext, useEffect, useRef, useState } from 'react'
import taskContext from '../context/tasks/taskContext';
import TaskItem from './TaskItem';
import AddTask from './AddTask';
import { useNavigate } from 'react-router-dom';

const Tasks = (props) => {
  const context = useContext(taskContext); // getting values from contest
  const { tasks, getTask, editTask } = context; // destructing the state and fn
  const [task, setTask] = useState({ id: "", etitle: "", edescription: "", etag: "default" }) // maintaining dummy note state which will useful in  updating notes

  let navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem('token')) {
      getTask();
    }
    else {
      navigate("/login");
    }
    // eslint-disable-next-line
  }, [])
  const ref = useRef(null);
  const refClose = useRef(null);

  // filling value of data fields in editing mode as their original value
  const updateTask = (currentTask) => {
    ref.current.click();
    setTask({ id: currentTask._id, etitle: currentTask.title, edescription: currentTask.description, etag: currentTask.tag });

  }

  // changing value of note as we type
  const onChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value })
  }

  // Editing Notes after we click Update Notes
  const handleClick = (e) => {
    editTask(task.id, task.etitle, task.edescription, task.etag);
    refClose.current.click();
    props.showAlert("Task Updated Successfully", "success");
  }

  return (
    <>
      <AddTask showAlert={props.showAlert} />
      <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>

      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Edit Task</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">Title</label>
                  <input type="text" className="form-control" id="etitle" name="etitle" value={task.etitle} aria-describedby="emailHelp" onChange={onChange} minLength={5} required />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">Description</label>
                  <input type="text" className="form-control" id="edeescription" name="edescription" value={task.edescription} onChange={onChange} minLength={5} required />
                </div>
                <div className="mb-3">
                  <label htmlFor="tag" className="form-label ">Task Tag</label>
                  <select className="form-select" id="etag" name="etag" value={task.etag} onChange={onChange}>
                    <option value={"TODO"} >TODO</option>
                    <option value={"PROG"} >In-Progress</option>
                    <option value={"COMP"} >Completed</option>
                  </select>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" ref={refClose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button disabled={task.etitle.length < 5 || task.edescription.length < 5} type="button" onClick={handleClick} className="btn btn-primary">Update Tasks</button>
            </div>
          </div>
        </div>
      </div>
      <div className='my-5'>
        <h2 className='tasks'> To-Do Tasks</h2>
        <div className="row my-4">
          {tasks.length === 0 && 'No Tasks added'}
          {tasks.map((tasks) => { // mapping over all the notes of a user
            if (tasks.tag == "TODO") {
              return <TaskItem key={tasks._id} showAlert={props.showAlert} updateTask={updateTask} task={tasks} />
            }
          })}

        </div>
      </div>
      <div className='my-5'>
        <h2 className='tasks'> In-Progress Tasks</h2>
        <div className="row my-4">
          {tasks.length === 0 && 'No Tasks added'}
          {tasks.map((tasks) => { // mapping over all the notes of a user
            if (tasks.tag == "PROG") {
              return <TaskItem key={tasks._id} showAlert={props.showAlert} updateTask={updateTask} task={tasks} />
            }
          })}

        </div>
      </div>
      <div className='my-5'>
        <h2 className='tasks'> Completed Tasks</h2>
        <div className="row my-4">
          {tasks.length === 0 && 'No Tasks added'}
          {tasks.map((tasks) => { 
            if (tasks.tag == "COMP") {
              return <TaskItem key={tasks._id} showAlert={props.showAlert} updateTask={updateTask} task={tasks} />
            }
          })}

        </div>
      </div>
    </>
  )
}

export default Tasks