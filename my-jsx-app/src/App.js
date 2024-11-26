// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { TrangChu } from "./pages/index.jsx";  // Import component TrangCh
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
            <Route path="/printsetting" element={<PrintPage />} />
          </Routes>
      </Router>
    
  );
}

export default App;
