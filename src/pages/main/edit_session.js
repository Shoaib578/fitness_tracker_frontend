import { useEffect, useState } from 'react';
import validator from 'validator';
import Axios from 'axios'
import './style.css'
import {Link, useParams} from "react-router-dom";

import base_url from '../../base_url';
const user = localStorage.getItem('user')
const parse = JSON.parse(user)


export default function EditSession(){
    const [alert,setAlert] = useState('')
    const [alert_color,setAlert_color] = useState('')
    const [strength,setStrength] = useState('')
    const [length,setLength] = useState('')
    const [type,setType] = useState('')
    const [session,setSession] = useState('')

    const params = useParams()

    const isLoggedIn = ()=>{
        if(!user){
            window.location = "/signin"
        }
    }
  const validate = ()=>{
        if(type.length<1){
            setAlert('Type is required')
            setAlert_color('red')
            return false
        }

        if(strength.length<1){
            setAlert('Strength field is required')
            setAlert_color('red')
            return false
        }

        if(length.length<1){
            setAlert('Length field is required')
            setAlert_color('red')
            return false
        }
        return true
    }


   const update_session = ()=>{
    let is_validated = validate()
        
    if(is_validated){
    setAlert('')
    
        Axios.post(base_url+'apis/update_session/',{
            "session_type":type,
            "strength":strength,
            "session_length":length,
            "id":params.id
         })
         .then(res=>{
            if(res.data.is_updated){
                setAlert_color('green')
                setAlert("Session Update Successfully")
                     
               
            }
           
         })
         .catch(err=>{
            console.log(err)
            setAlert_color('red')
            setAlert(err.message)
           

         })
    }
    }

   const get_session_by_id = ()=>{
       
    
    Axios.get(base_url+'/apis/get_session_by_id?id='+params.id)
    .then(res=>{
        
        setLength(res.data.data.workout_length)
        setType(res.data.data.workout_type)
        setStrength(res.data.data.strength)
    })
    }

  
    useEffect(()=>{
        isLoggedIn()
        get_session_by_id()
    },[])
    return  <div className="login-container">
    <div className="login-box">
      {alert != ''?<div style={{backgroundColor:alert_color,width:'100%',padding:10,borderRadius:5,display:'flex',justifyContent:'center',alignItems:'center',marginBottom:15}}>
        <b style={{color:"white",textAlign:'center'}}>{alert}</b>
      </div>:<h1>Edit Sessions</h1>}
      
      <div className="input-group">
                    <label htmlFor="username" style={{float:'left'}}>Type</label>
                    <input
                        type="text"
                        onChange={(val)=>setType(val.target.value)}
                        name="type"
                        value={type}
                        placeholder="Enter Type of workout"
                    />
                    </div>
                    <div className="input-group">
                    <label htmlFor="username" style={{float:'left'}}>Strength</label>
                    <input
                        type="number"
                        onChange={(val)=>setStrength(val.target.value)}

                        value={strength}
                        placeholder="Enter Strength(Weight lifted or number of repetitions)"
                    />
                    </div>


                    <div className="input-group">
                    <label htmlFor="username" style={{float:'left'}}>Length</label>
                    <input
                        type="number"
                        value={length}
                        onChange={(val)=>setLength(val.target.value)}
                       
                        placeholder="Enter duration in minutes"
                    />
                    </div>
        <button onClick={update_session} type="submit" className="btn">
          Update session
        </button>
        
    
    </div>
  </div>
  
    
  
}