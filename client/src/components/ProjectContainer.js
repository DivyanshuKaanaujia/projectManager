import axios from 'axios'
import React from 'react'

const ProjectContainer = ({id,name,description,tasks}) => {
  async function updateTask(projectId,taskId,status){
    try {
        const res = await axios.post("http://localhost:3000/updateTask",{
            name:localStorage.getItem("name"),
            projectId:projectId,
            taskId:taskId,
            status:status
        })
        console.log("Response after updating: ",res);
    } catch (error) {
        console.log(error);
    }
  }
  return (
      <div className='projectContainer'>
      <div>{name}</div>
      <div>{description}</div>
      <div>{tasks.map((ele)=>{
        return <div key={ele._id}>
            <ul>
                <li>{ele.name}</li>
                Is Completed: <input type='checkbox' value={ele.completed} 
                onChange={()=>{updateTask(id,ele._id,!ele.completed)}}/>
            </ul>
        </div>
      })}</div>
      </div>
  )
}

export default ProjectContainer