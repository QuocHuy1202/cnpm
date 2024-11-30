// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { TrangChu } from "./pages/index.jsx";
import { SPSO } from "./pages/spso.jsx";  // Import component TrangCh
import {Login} from "./pages/login.jsx"
import {PrintPage} from "./pages/printsetting.jsx"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  return (
    
      <Router>
        
          <Routes>
            <Route path="/" element={<TrangChu />} />
            <Route path="/login" element={<Login />} />
            <Route path="/printseng" element={<PrintPage />} />
            <Route path="/spso" element={<SPSO />} /> 
          </Routes>
      </Router>
    
  );
}

export default App;
