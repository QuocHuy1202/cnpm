// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { TrangChu } from "./pages/index.jsx";  // Import component TrangCh
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  return (
    
      <Router>
        
          <Routes>
            <Route path="/" element={<TrangChu />} />
          </Routes>
      </Router>
    
  );
}

export default App;
