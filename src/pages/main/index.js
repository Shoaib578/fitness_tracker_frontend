import { useEffect,useState } from "react";
import Charts from "../../components/chart";
import './style.css'
import Axios from 'axios'
import base_url from "../../base_url";
import { Levels } from "react-activity";
import "react-activity/dist/library.css";
import { Link } from "react-router-dom";


const user = localStorage.getItem('user');
const parse = JSON.parse(user)
export default function Home(){
    const [alert,setAlert] = useState('')
    const [alert_color,setAlert_color] = useState('')
    const [strength,setStrength] = useState('')
    const [length,setLength] = useState('')
    const [type,setType] = useState('')
    const [sessions,setSessions]= useState([])
    const [refresh_chart,setRefreshChart] = useState(false)
    
    const isLoggedIn = ()=>{
        if(!user){
            window.location = "/signin"
        }
    }

    const logout = ()=>{
        localStorage.removeItem('user')
        window.location = "/signin"
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


    const add_session = ()=>{
        let is_validated = validate()
        
        if(is_validated){
        setAlert('')
        setRefreshChart(true)

            Axios.post(base_url+'/apis/insert_session/',{
                "session_type":type,
                "stregth":strength,
                "session_length":length,
                "created_by":parse.id
             })
             .then(res=>{
                if(res.data.is_inserted){
                    setAlert_color('green')
                    setAlert("Session Added Successfully")
                    get_sessions()

                    setTimeout(()=>{
                        setRefreshChart(false)

                    },600)


                    setLength('')
                    setStrength('')

                    setType('')
                }
               
             })
             .catch(err=>{
                console.log(err)
                setAlert_color('red')
                setAlert(err.message)
                setTimeout(()=>{
                    setRefreshChart(false)

                },600)

             })
        }
    }

    const delete_session = (id)=>{
        setRefreshChart(true)

        Axios.delete(base_url+'/apis/delete_session_by_id?id='+id)
        .then(res=>{
            setTimeout(()=>{
                setRefreshChart(false)

            },600)

            get_sessions()


        })
        .catch(err=>{
            setTimeout(()=>{
                setRefreshChart(false)

            },600)
            alert(err.message)
        })
    }
    const get_sessions = ()=>{
        Axios.get(base_url+'/apis/get_sessions?created_by='+parse.id)
        .then(res=>{
            setSessions(res.data.data)
          
        })
        .catch(err=>{
            console.log(err)
        })
    }

   


    useEffect(()=>{
        isLoggedIn()
        get_sessions()
       

       
       
    },[])

    return (
        <>

       
        <center >
        <div className="jumbotron" style={{width:'90%',display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
        

        <Link  to={'/profile'}>
        <i className="fa fa-user-circle" style={{color:'#4b8bdf',fontSize:50,marginLeft:20,cursor:'pointer'}}></i>

        </Link>

        <i className="fa fa-sign-out" onClick={logout} style={{fontSize:40,color:'red',marginRight:20,cursor:'pointer'}}></i>

        </div>

        </center>

        <center style={{marginTop:50}} >
        {refresh_chart==false?<Charts sessions={sessions} />:
        <center style={{marginTop:100}}>
        <Levels size={160} color="skyblue"/>
        </center>
       }




        <table class="table table-striped" style={{width:'90%',marginTop:50}}>
        <thead>
        <tr>
            <th>Length</th>
            <th>Strength</th>
            <th>Type</th>
            <th>Delete</th>
            <th>Edit</th>

            <th>
            <i class="fa fa-plus" style={{fontSize:20,color:"#4b8bdf",cursor:'pointer'}} data-toggle="modal" data-target="#exampleModal"></i>

            </th>

        </tr>
        </thead>
        <tbody>
            {sessions.map((session,index)=>{
                return  <tr key={index}>
                <td>{session.workout_length}</td>
                <td>{session.strength}</td>
                <td>{session.workout_type}</td>
                <td>
                <i class="fa fa-trash" onClick={()=>delete_session(session.id)} style={{fontSize:20,color:"red",cursor:'pointer'}}></i>
                    
                </td>
                <td>
                    <Link style={{textDecoration:'none'}} to={'/edit_session/'+session.id}>
                    <i class="fa fa-pencil" style={{fontSize:20,color:"#4b8bdf"}}></i>
                    </Link>
                </td>
    
    
                <td></td>
    
            </tr>
            })}
       
        
        </tbody>
         </table>
        </center>


        {/* Modal */}
        <div
            className="modal fade"
            id="exampleModal"
            tabIndex={-1}
            role="dialog"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
        >
            <div className="modal-dialog" role="document">
            <div className="modal-content">
                <div className="modal-header">
                {alert != ''?<div style={{backgroundColor:alert_color,width:'100%',padding:10,borderRadius:5,display:'flex',justifyContent:'center',alignItems:'center',marginBottom:15}}>
                    <b style={{color:"white",textAlign:'center'}}>{alert}</b>
                </div>:<h5>Add Fitness Session</h5>}
                <button
                    type="button"
                    className="close"
                    data-dismiss="modal"
                    aria-label="Close"
                >
                    <span aria-hidden="true">×</span>
                </button>
                </div>
                <div className="modal-body">
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


                </div>
                <div className="modal-footer">
                <button
                    type="button"
                    className="btn btn-secondary"
                    data-dismiss="modal"
                >
                    Close
                </button>
                <button onClick={add_session} type="button" className="btn btn-primary">
                    Save changes
                </button>
                </div>
            </div>
            </div>
        </div>
        </>
    )
}