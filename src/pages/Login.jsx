import React, { useState } from 'react'
import "./Register.scss";
import { useNavigate } from "react-router-dom";
import {signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../config';

const Login = () => {
  const navigate = useNavigate();
  const [email,setEmail] = useState("");
  const [pass,setPass] = useState("");

  const handleSubmit = async(e)=>{
    e.preventDefault();
    try{
      let res = await signInWithEmailAndPassword(auth , email , pass);
      navigate('/')
    }
    catch(err){
      console.log(err);
    }
  }
  return (
    <div className="register">
      <div className="main">
        <h3>Login</h3>
        <form  action="">
          <input type="email" placeholder="email..." onChange={(e)=> setEmail(e.target.value)}/>
          <input type="password" placeholder="password..." onChange={(e)=> setPass(e.target.value)} />
          <button onClick={handleSubmit} type="Submit" className="btn btn-primary">
            Login
          </button>
        </form>
        <p>
          Already Registered? click to
          <a onClick={() => navigate("/Register")}> Register</a>
        </p>
      </div>
    </div>
  )
}

export default Login
