import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import image from "../image/image.png";
import chuong from "../image/chuong.png";
import mess from "../image/mess.png";
import avar from "../image/avar.svg";
import "../css/home.css";

export const Homen = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 768);

  // Xử lý thay đổi kích thước màn hình
  useEffect(() => {
    const handleResize = () => setIsMobileView(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  return (
    <div className="app">
      {/* Header chứa logo và điều hướng */}
      <header className="header">
        <img src={image} alt="Logo" className="logo" />
        <nav className="navbar">
          {isMobileView ? (
            <button className="menu-button" onClick={togglePopup}>
              ☰
            </button>
          ) : (
            <nav className="navbar">
              <Link to="/" className="trangchu">
                Trang chủ
              </Link>
              <Link to="/print" className="in">
                In
              </Link>
              <Link to="/history" className="xem">
                Xem lịch sử in ấn
              </Link>
            </nav>
          )}
        </nav>
        <Link to="/login" className="dangnhap">
          Đăng nhập
        </Link>
      </header>

      {/* Nội dung trang */}
      <div className="overlap-2">
        <div className="welcome-section">
          <h1>Dịch vụ in ấn thông minh dành cho sinh viên</h1>
          <p>(HCMUT-SPSS)</p>
        </div>
      </div>

      {/* Popup menu cho thiết bị di động */}
      {isPopupOpen && isMobileView && (
        <div className="popup">
          <ul>
            <li>
              <Link to="/" onClick={togglePopup}>
                Trang Chủ
              </Link>
            </li>
            <li>
              <Link to="/print" onClick={togglePopup}>
                In
              </Link>
            </li>
            <li>
              <Link to="/history" onClick={togglePopup}>
                Xem lịch sử in ấn
              </Link>
            </li>
            <li>
              <Link to="/login" onClick={togglePopup}>
                Đăng Nhập
              </Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};
