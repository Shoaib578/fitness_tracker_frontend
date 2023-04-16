import {
    BrowserRouter as Router,
    Routes as Switch,
    Route,
    Link,
    redirect
  } from "react-router-dom";
import Signin from "../pages/auth/sign_in";
import Signup from "../pages/auth/sign_up";
import Home from "../pages/main";
import EditSession from "../pages/main/edit_session";
import Profile from "../pages/main/profile";

export default function Routes(){
    return <Router>
    <Switch>
    <Route exact path='/' element={<Home />}/>
    <Route exact path='/edit_session/:id' element={<EditSession />}/>
   
      <Route exact path='/signin' element={<Signin />}/>
      <Route exact path='/signup' element={<Signup />}/>

      <Route exact path='/profile' element={<Profile />}/>
   

    </Switch>
  </Router>
}