import React, { useState } from "react";
import axios from "axios"
import {useNavigate} from "react-router-dom"

const Login = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  async function loginUser(event){
    event.preventDefault();
    try {
        const res = await axios.post("https://ty-7wif.onrender.com/",{
            name:name
        })
        localStorage.setItem("name",res.data.isInDb.name)
        navigate("/home")
        console.log(res)
        
    } catch (error) {
        console.log("Error while logging in",error)
    }
  }
  return (
    <div>
      <form onSubmit={loginUser}>
        <h1>Enter your name</h1>
        <input type="string" minLength={2} name="name" onChange={(e)=>{setName(e.target.value)}}/>
        <button type="submit">Go to Dashboard</button>
      </form>
    </div>
  );
};

export default Login;
