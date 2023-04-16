import { useEffect, useState } from 'react';
import validator from 'validator';
import Axios from 'axios'
import './style.css'
import {Link} from "react-router-dom";

import base_url from '../../base_url';
const user = localStorage.getItem('user');
const parse = JSON.parse(user)
export default function Profile(){
    const [username,setUsername] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [alert,setAlert] = useState('')
    const [alert_color,setAlert_color] = useState('')

    const isLoggedIn = ()=>{
        const user = localStorage.getItem('user');
        if(!user){
            window.location = "/signin"
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
    const update_profile = ()=>{
        
        let is_validate = validate()
        
        if(is_validate){
           
           

             Axios.post(base_url+'apis/update_user/',{
                "username":username,
                "email":email,
                "password":password,
                "id":parse.id
             })
             .then(res=>{
                if(res.data.is_updated){
                    setAlert_color('green')
                    setAlert("Updated Successfully")

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

    const get_user_by_id =()=>{
        Axios.get(base_url+'apis/get_user_by_id?id='+parse.id)
      .then(res=>{
        
        setUsername(res.data.data.user_name)
        setEmail(res.data.data.email)
        
      })
    }

    useEffect(()=>{
        isLoggedIn()
        get_user_by_id()
    },[])
    return  <div className="login-container">
    <div className="login-box">
      {alert != ''?<div style={{backgroundColor:alert_color,width:'100%',padding:10,borderRadius:5,display:'flex',justifyContent:'center',alignItems:'center',marginBottom:15}}>
        <b style={{color:"white",textAlign:'center'}}>{alert}</b>
      </div>:<h1>Profile</h1>}
      
      <div className="input-group">
          <label htmlFor="username" style={{float:'left'}}>Username</label>
          <input
            type="text"
            onChange={(val)=>setUsername(val.target.value)}
            name="username"
            value={username}
            placeholder="Enter Username"
          />    
        </div>

        <div className="input-group">
          <label htmlFor="email" style={{float:'left'}}>Email</label>
          <input
            type="email"
            onChange={(val)=>setEmail(val.target.value)}
            value={email}
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
        <button type="submit" onClick={update_profile} className="btn">
          Update Profile
        </button>
       
    
    </div>
  </div>
  
    
  
}