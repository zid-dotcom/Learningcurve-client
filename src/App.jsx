// import React, { useContext } from 'react'
// import AdminLogin from './pages/AdminLogin'
// import Landing from './pages/Landing'
// import { Routes,Route } from 'react-router-dom'
// import { ToastContainer, toast } from 'react-toastify';
// import AdminDashboard from './pages/AdminDashboard';
// import { AppContext } from './context/Appcontext';
// const App = () => {

//   const {atoken}=useContext(AppContext)
//   return (
//     <div>
//        <ToastContainer />
//       <Routes>
//         <Route path='/' element={<Landing/>}/>
//         <Route  path='/adminlogin' element={<AdminLogin/>} />
//         <Route path='/adminpanel'  element={<AdminDashboard/>}/>
        
//       </Routes>

      
//     </div>
//   )
// }

// export default App




import React, { useContext } from 'react'
import AdminLogin from './pages/AdminLogin'
import Landing from './pages/Landing'
import { Routes, Route, Navigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import AdminDashboard from './pages/AdminDashboard';
import { AppContext } from './context/Appcontext';

const App = () => {

  const { atoken } = useContext(AppContext);

  return (
    <div>
      <ToastContainer />

      <Routes>
        <Route path='/' element={<Landing />} />

        {/* 🔐 If already logged in → go to dashboard */}
        <Route 
          path='/adminlogin' 
          element={atoken ? <Navigate to="/adminpanel" replace /> : <AdminLogin />} 
        />

        {/* 🔐 Protect admin panel */}
        <Route 
          path='/adminpanel' 
          element={atoken ? <AdminDashboard /> : <Navigate to="/adminlogin" replace />} 
        />

      </Routes>
    </div>
  )
}

export default App;