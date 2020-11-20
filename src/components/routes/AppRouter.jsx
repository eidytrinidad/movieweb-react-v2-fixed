import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Admin } from "../Admin/Admin";
import { Login } from "../Admin/Login";
import { login } from "../../actions/auth";
import { Home } from "../Home";
import {firebase}from '../../firebase/config'
import { PublicRoute } from "./PublicRoute";
import { PrivateRoute } from "./PrivateRoute";

function AppRouter() {

  const dispatch = useDispatch();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(async(user) => {
      if (user?.uid) {
        dispatch(login(user.uid, user.displayName));
        setIsLoggedIn(true);

      }else{
        setIsLoggedIn(false);
      }

    });
  }, [dispatch,setIsLoggedIn]);

  return (
    <Router>
      <Switch>
{/*         
        <Route path="/login" component={Login}/> */}
       
        <PrivateRoute 
                path="/admin" 
                component={Admin}
                isLoggedIn={isLoggedIn}/>

          <PublicRoute 
                exact
                path="/login" 
                component={Login}
                isLoggedIn={isLoggedIn}
                />
            
        <Route path="/" component={Home} />
        
      
     
      </Switch>
    </Router>
  );
}

export default AppRouter;
