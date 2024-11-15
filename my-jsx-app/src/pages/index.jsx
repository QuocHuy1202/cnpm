import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import image from "../image/image.png";
import "../css/style.css";

export const TrangChu = () => {
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
    <div className="trang-ch">
      <div className="div">
        <div className="overlap-group">
          <img className="image" alt="Image" src={image} />

          {/* Nút menu popup cho màn hình nhỏ */}
          {isMobileView && (
            <>
              <button className="menu-button" onClick={togglePopup}>
                ☰
              </button>
              <nav className="nav-bar">
                <ul>
                  <li><Link to="/login">Đăng Nhập</Link></li>
                </ul>
              </nav>
            </>
          )}


          {/* Điều hướng chính */}
          {!isMobileView && (
            <nav className="nav-bar">
              <ul>
                <li>
                  <Link to="/" className="home-link">Trang Chủ</Link>
                  <div className="home-rectangle"></div>
                </li>
                <li><Link to="/print">In</Link></li>
                <li><Link to="#">Xem lịch sử in ấn</Link></li>
                <li><Link to="/login">Đăng Nhập</Link></li>
              </ul>
            </nav>
          )}

          {/* Popup menu */}
          {isPopupOpen && isMobileView && (
            <div className="popup">
              <ul>
                <li><Link to="/" onClick={togglePopup}>Trang Chủ</Link></li>
                <li><Link to="/print" onClick={togglePopup}>In</Link></li>
                <li><Link to="#" onClick={togglePopup}>Xem lịch sử in ấn</Link></li>
              </ul>
            </div>
          )}
        </div>

        <div className="overlap-2">
          <div className="rectangle" />
          <p className="d-ch-v-in-n-th-ng">
            Dịch vụ in ấn thông minh dành cho sinh viên
            <br />
            (HCMUT-SPSS)
          </p>
        </div>
      </div>
    </div>
  );
};
