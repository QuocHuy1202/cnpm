// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {Login} from "./pages/login.jsx"
import { TaiFile } from "./pages/loadfile.jsx"
import {PrintPage} from "./pages/printsetting.jsx"
import {Print} from "./pages/print.jsx"
import {Homen} from "./pages/home.jsx"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  return (
    
      <Router>
        
          <Routes>
            <Route path="/" element={<Homen />} />
            <Route path="/login" element={<Login />} />
            <Route path="/printsetting" element={<PrintPage />} />
            <Route path="/loadfile" element={<TaiFile />} />
            <Route path="/print" element={<Print />} />
            
          </Routes>
      </Router>
    
  );
}

export default App;
