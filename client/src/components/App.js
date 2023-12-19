import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { Switch, Route, Outlet} from "react-router-dom";


import Signup from "./Signup";
import Header from "./Header";
import HomePage from "./HomePage";

function App() {
  const [user, setUser] = useState(null)
  const [workouts, setWorkouts] = useState([])

  const getWorkouts = () => {
    fetch("/workouts")
    .then(resp => resp.json())
    .then((workoutsArray) => setWorkouts(workoutsArray))
  }
  useEffect(getWorkouts, [])

  useEffect(() => {
    fetch('/authorized')
    .then((resp) => {
      if (resp.ok) {
        resp.json().then((user) => setUser(user))
      } else{
        //handle what should happen if not logged in
        console.log('errors')
      }
    })
  }, [])

  function handleLogout() {
    fetch('/logout', {
      method: 'DELETE'
    }).then((resp) => {
      if (resp.ok) {
        //handle logout on frontend
        setUser(null)
        //navigate to another route
      }
    })
  }
  const context = {
    workouts,
    handleLogout,
    user,
  }

  if(!user) {
    return <Signup setUser={setUser} />
  }
  return <div>
    <Header/>
    <Button variant = "contained" onClick = {handleLogout}>Logout</Button>
    <Outlet context={context}/>
  </div>
}

export default App;
