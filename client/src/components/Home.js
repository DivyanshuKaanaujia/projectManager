import React from 'react'
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  function checkUser(){
    if(!localStorage.getItem("name")){
        navigate("/");
    }
  }
  checkUser();
  return (
    <div>Home</div>
  )
}

export default Home