import React, { useContext } from 'react'
import taskContext from '../context/tasks/taskContext';

const TaskItem = (props) => {
    const context = useContext(taskContext);
    const { deleteTask } = context;
    const { task, updateTask } = props;
    return (
        <div className=' col-md-4'>
            <div className="card my-3">
                <div className="card-body pb-5 taskitem">
                    <div className="d-flex align-items-center justify-content-between">
                    <h5 className="card-title">{task.title}</h5>
                    <div>
                    <i className="far fa-trash-alt mx-2" onClick={()=>{ deleteTask(task._id);
    props.showAlert("Deleted Successfully","success");}}></i>
                    <i className="far fa-edit mx-2" onClick={()=>{ updateTask(task); }}></i>
                    </div>
                    </div>
                    <p className="card-text">{task.description}</p>
                  
                </div>
            </div>

        </div>
    )
}

export default TaskItem