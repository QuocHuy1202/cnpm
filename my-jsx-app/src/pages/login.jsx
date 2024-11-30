import React, { useState } from "react";
import image from "../image/image.png";
import { Link, Navigate } from "react-router-dom";
import "../css/login.css";

export const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");


    const handleLogin = async (e) => {
        e.preventDefault(); // Ngăn chặn hành động mặc định của form
      
        if (!username || !password) {
          setError("Vui lòng nhập tên đăng nhập và mật khẩu.");
        } else {
          setError(""); // Xóa thông báo lỗi nếu cả hai trường đều được nhập
      
          try {
            const response = await fetch('http://localhost:5000/login', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ username, password }),
            });
      
            if (response.ok) {
              // Xử lý khi đăng nhập thành công
              console.log('Login successful');
              Navigate()("/");
            } else {
              // Xử lý khi đăng nhập không thành công
              setError('Tên đăng nhập hoặc mật khẩu không đúng.');
            }
          } catch (error) {
            console.error('Error:', error);
          }
        }
      };
    

    return (
        <div className="login-container">
            {/* Header */}
            <header className="login-header">
                <div className="logo">
                    <img src={image} alt="Logo" />
                </div>
                <h1>Dịch vụ xác thực tập trung</h1>
            </header>

            {/* Main Section */}
            <main className="login-main">
                <div className="login-box">
                    <h2>Đăng Nhập</h2>
                    <form>
                        <div className="form-group">
                            <label htmlFor="username">Tên đăng nhập</label>
                            <input
                                id="username"
                                placeholder="Tên đăng nhập"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Mật khẩu</label>
                            <input
                                type="password"
                                id="password"
                                placeholder="Nhập mật khẩu"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        {error && <p className="error-message">{error}</p>}
                        <div className="button-group">
                            <li className="login-button" onClick={handleLogin}>
                                Đăng Nhập
                            </li>
                            <Link to="/" className="exit-button">Thoát</Link>

                        </div>
                    </form>
                </div>
            </main>
        </div>
    );
};
