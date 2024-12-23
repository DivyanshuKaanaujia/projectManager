import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const [projects, setProjects] = useState([]);
  const [isAssigned, setIsAssigned] = useState(new Map());
  const [score, setScore] = useState(new Map());
  const [completed, setCompleted] = useState(new Map());

  function logoutHelper(){
    localStorage.clear("name")
    navigate("/")
  }

  function checkUser() {
    if (!localStorage.getItem("name")) {
      navigate("/");
    }
  }

  function calScore(tasks) {
    let cnt = 0;
    for (let i = 0; i < tasks.length; i++) {
      if (tasks[i].completed) {
        cnt++;
      }
    }
    return (cnt / tasks.length) * 100;
  }

  async function acceptProject(projectId) {
    try {
      let proj = await axios.post("https://ty-7wif.onrender.com/acceptProject", {
        name: localStorage.getItem("name"),
        id: projectId,
      });
      let newAssigned = new Map(isAssigned);
      newAssigned.set(projectId, true);
      setIsAssigned(newAssigned);
      console.log("Response after acceptance: ", proj);
    } catch (error) {
      console.log("Error in accepting the project: ", error);
    }
  }

  async function updateTask(projectId, taskId, status) {
    try {
      const res = await axios.post("https://ty-7wif.onrender.com/updateTask", {
        name: localStorage.getItem("name"),
        projectId: projectId,
        taskId: taskId,
        status: status,
      });

      setCompleted((prevCompleted) => {
        const updatedCompleted = new Map(prevCompleted);
        const projectTasks = updatedCompleted.get(projectId) || {};
        projectTasks[taskId] = status;
        updatedCompleted.set(projectId, projectTasks);
        return updatedCompleted;
      });

      setProjects((prevProjects) =>
        prevProjects.map((project) => {
          if (project._id === projectId) {
            return {
              ...project,
              tasks: project.tasks.map((task) =>
                task._id === taskId ? { ...task, completed: status } : task
              ),
            };
          }
          return project;
        })
      );

      const updatedProject = projects.find((p) => p._id === projectId);
      if (updatedProject) {
        const nScore = calScore(
          updatedProject.tasks.map((task) =>
            task._id === taskId ? { ...task, completed: status } : task
          )
        );
        const updatedScore = new Map(score);
        updatedScore.set(projectId, nScore);
        setScore(updatedScore);
      }

      console.log("Task updated successfully.");
    } catch (error) {
      console.log("Error updating the task: ", error);
    }
  }

  useEffect(() => {
    async function getAllProjects() {
      try {
        const res = (await axios.get("https://ty-7wif.onrender.com/allProjects")).data
          .allProjects;
        const nC = await axios.post(`https://ty-7wif.onrender.com/getMyProjects`, {
          name: localStorage.getItem("name"),
        });

        const newAssigned = new Map();
        const scoreAssign = new Map();
        const completedAssign = new Map();
        const myProj = nC.data.allProj;

        for (let i = 0; i < res.length; i++) {
          newAssigned.set(res[i]._id, false);
          scoreAssign.set(res[i]._id, 0);
          if (myProj) {
            for (let j = 0; j < myProj.project.length; j++) {
              if (res[i]._id === myProj.project[j]._id) {
                newAssigned.set(res[i]._id, true);
                const nScore = calScore(myProj.project[j].tasks);
                scoreAssign.set(res[i]._id, nScore);

                const tasksMap = {};
                myProj.project[j].tasks.forEach((task) => {
                  tasksMap[task._id] = task.completed;
                });
                completedAssign.set(res[i]._id, tasksMap);
              }
            }
          }
        }

        setProjects(res);
        setIsAssigned(new Map(newAssigned));
        setScore(new Map(scoreAssign));
        setCompleted(new Map(completedAssign));
      } catch (error) {
        console.log(error);
      }
    }

    getAllProjects();
    checkUser();
  }, []);

  return (
    <div>
      <button onClick={logoutHelper} className="buttonRight">Logout</button>
      {projects.length > 0 &&
        projects.map((ele) => (
          <div key={ele._id} className="projectContainer">
            <div>
              <div>{ele.name}</div>
              {isAssigned.get(ele._id) ? (
                <div>
                  <p>Assigned</p>
                  <p>Score: {score.get(ele._id)}</p>
                </div>
              ) : (
                <button onClick={() => acceptProject(ele._id)}>Accept</button>
              )}
            </div>
            <div>{ele.description}</div>
            <div>
              {ele.tasks.map((task) => (
                <div key={task._id}>
                  <ul>
                    <li>{task.name}</li>
                    {isAssigned.get(ele._id) ? (
                      <div>
                        Is Completed:{" "}
                        <input
                          type="checkbox"
                          checked={
                            completed.get(ele._id)
                              ? completed.get(ele._id)[task._id] || false
                              : false
                          }
                          onChange={() =>
                            updateTask(ele._id, task._id, !task.completed)
                          }
                        />
                      </div>
                    ) : (
                      ""
                    )}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        ))}
    </div>
  );
};

export default Home;
