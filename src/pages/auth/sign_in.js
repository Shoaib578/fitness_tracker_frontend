import { useEffect,useState } from 'react';
import './style.css'
import {Link} from "react-router-dom";
import validator from 'validator';
import Axios from 'axios'
import base_url from '../../base_url';

export default function Signin(){
    const [alert,setAlert] = useState('')
    const [alert_color,setAlert_color] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')



    const isLoggedIn = ()=>{
        const user = localStorage.getItem('user');
        if(user){
            window.location = "/"
        }
    }

    const validate = ()=>{
        if(validator.isEmail(email) == false){
            setAlert('Invalid Email')
            setAlert_color('red')
            return false
        }

        if(password.length<4){
            setAlert('Password must be at least 4 characters')
            setAlert_color('red')
            return false
        }
        return true
    }

    const login = ()=>{
        let is_validated = validate()
        if(is_validated){
            
            Axios.post(base_url+'/apis/signin_user/',{
             
                "email":email,
                "password":password
             })
             .then(res=>{
                if(res.data.is_logged_in){
                    setAlert_color('green')
                    setAlert("Logged in Successfully")
                    localStorage.setItem('user',JSON.stringify(res.data.user))
                    window.location = "/"
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


    return <div className="login-container">
    <div className="login-box">
    {alert != ''?<div style={{backgroundColor:alert_color,width:'100%',padding:10,borderRadius:5,display:'flex',justifyContent:'center',alignItems:'center',marginBottom:15}}>
        <b style={{color:"white",textAlign:'center'}}>{alert}</b>
      </div>:<h1>Login</h1>}
      
        <div className="input-group">
          <label htmlFor="username">Email</label>
          <input
            type="email"
            onChange={(val)=>setEmail(val.target.value)}
            name="email"
            placeholder="Enter Email"
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={val=>setPassword(val.target.value)}
            name="password"
            placeholder="Enter Password"
          />
        </div>
        <button onClick={login} type="submit" className="btn">
          Login
        </button>
        <Link to="/signup" style={{color:"#1972e6"}} className="forgot-password">
            Dont have any account want to?Signup
        </Link>
     
    </div>
  </div>
  
  
    
  
}