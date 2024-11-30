// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
<<<<<<< HEAD
import { TrangChu } from "./pages/index.jsx";
import { SPSO } from "./pages/spso.jsx";  // Import component TrangCh
=======
>>>>>>> 151a2760fa6ca3ecedbf7f212ecc098992158af5
import {Login} from "./pages/login.jsx"
import { TaiFile } from "./pages/loadfile.jsx"
import {PrintPage} from "./pages/printsetting.jsx"
import {Print} from "./pages/print.jsx"
import {Homen} from "./pages/home.jsx"
import {PrintHistory} from "./pages/printhistory.jsx"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  return (
    
      <Router>
        
          <Routes>
            <Route path="/" element={<Homen />} />
            <Route path="/login" element={<Login />} />
<<<<<<< HEAD
            <Route path="/printseng" element={<PrintPage />} />
            <Route path="/spso" element={<SPSO />} /> 
=======
            <Route path="/printsetting" element={<PrintPage />} />
            <Route path="/loadfile" element={<TaiFile />} />
            <Route path="/print" element={<Print />} />
            <Route path="/history" element={<PrintHistory />} />
>>>>>>> 151a2760fa6ca3ecedbf7f212ecc098992158af5
          </Routes>
      </Router>
    
  );
}

export default App;
