import React, { useEffect, useState } from 'react'
import Home from './pages/Home/Home.jsx'
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom'
import Login from './pages/Login/Login.jsx'
import Player from './pages/Player/Player.jsx'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './firebase.js'
import { ToastContainer, toast } from 'react-toastify';
import MyList from './pages/MyList/MyList.jsx'

const App = () => {

  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

    useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
      });

    return () => unsubscribe();
    }, []);

  if (loading) {
    return <p style={{ color: 'white' }}>Loading...</p>; // can swap with spinner
  }
  return (
    <div>
      <ToastContainer theme='dark'/>
      <Routes>
         <Route path='/login' element={ user ? <Navigate to= "/" /> : <Login />}/>
         <Route path='/' element={ user ? <Home /> :<Navigate to= "/login" /> }/>
         <Route path='/player/:id' element={ user ? <Player /> : <Navigate to= "/login" />}/>
         <Route path= '/mylist' element={ user ? <MyList /> : <Navigate to= "/login" />} />
      </Routes>
    </div>
  )
}

export default App
