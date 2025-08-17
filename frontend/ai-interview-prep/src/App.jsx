import React from 'react'
import {BrowserRouter as Router,Routes,Route}from 'react-router-dom';
import {Toaster} from 'react-hot-toast';


//import Login from "./pages/Auth/Login.jsx";
//import SignUp from "./pages/Auth/SignUp.jsx";
import LandingPage from "./pages/LandingPage.jsx";
import Dashboard from "./pages/Home/Dashboard.jsx";
import PrepGem from "./pages/PrepGem/PrepGem.jsx";

const App=()=>{
  return (
    <div >
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage/>}/> 

         
          <Route path="/dashboard" element={<Dashboard/>}/>
          <Route path="/prep-gem/:sessionId" element={<PrepGem/>}/>

        </Routes>
      </Router>

      <Toaster toastOptions={{
          className:"",
          style:{
            fontSize:"13px"
          },
      }}
      />
    </div>
  )
}
export default App