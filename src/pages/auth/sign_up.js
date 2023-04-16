import { useEffect, useState } from 'react';
import validator from 'validator';
import Axios from 'axios'
import './style.css'
import {Link} from "react-router-dom";

import base_url from '../../base_url';
export default function Signup(){
    const [username,setUsername] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [alert,setAlert] = useState('')
    const [alert_color,setAlert_color] = useState('')

    const isLoggedIn = ()=>{
        const user = localStorage.getItem('user');
        if(user){
            window.location = "/"
        }
    }

    const validate = ()=>{
        if(username.length<4){
            setAlert_color('red')

            setAlert('Username must be at least 4 characters')
            return false
        }

        if(validator.isEmail(email) == false){
            setAlert_color('red')
            setAlert('Please enter a valid email')
            return false
        }

        if(password.length<4){
            setAlert_color('red')

            setAlert('Password must be at least 4 characters')
            return false
        }

        return true
    }
    const signup = ()=>{
        
        let is_validate = validate()
        
        if(is_validate){
           
           

             Axios.post(base_url+'/apis/signup_user/',{
                "username":username,
                "email":email,
                "password":password
             })
             .then(res=>{
                if(res.data.is_registered){
                    setAlert_color('green')
                    setAlert("Registered Successfully")

                }else{
                    setAlert_color('red')
                    setAlert(res.data.status)


                }
               
             })
             .catch(err=>{
                setAlert_color('red')
                setAlert(err.message)
             })
        }
    }

    useEffect(()=>{
        isLoggedIn()
    },[])
    return  <div className="login-container">
    <div className="login-box">
      {alert != ''?<div style={{backgroundColor:alert_color,width:'100%',padding:10,borderRadius:5,display:'flex',justifyContent:'center',alignItems:'center',marginBottom:15}}>
        <b style={{color:"white",textAlign:'center'}}>{alert}</b>
      </div>:<h1>Register</h1>}
      
      <div className="input-group">
          <label htmlFor="username" style={{float:'left'}}>Username</label>
          <input
            type="text"
            onChange={(val)=>setUsername(val.target.value)}
            name="username"
            placeholder="Enter Username"
          />    
        </div>

        <div className="input-group">
          <label htmlFor="email" style={{float:'left'}}>Email</label>
          <input
            type="email"
            onChange={(val)=>setEmail(val.target.value)}
           
            name="email"
            placeholder="Enter Email"
          />
        </div>
        <div className="input-group">
          <label htmlFor="password" style={{float:'left'}}>Password</label>
          <input
            type="password"
            onChange={(val)=>setPassword(val.target.value)}

            id="password"
            name="password"
            placeholder="Enter Password"
          />
        </div>
        <button type="submit" onClick={signup} className="btn">
          Signup
        </button>
        <Link to="/signin" style={{color:"#1972e6"}} className="forgot-password">
            Already have an account want to?Signin
        </Link>
    
    </div>
  </div>
  
    
  
}