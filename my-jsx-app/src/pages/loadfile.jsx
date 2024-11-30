import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import image from "../image/image.png";
import chuong from "../image/chuong.png";
import mess from "../image/mess.png";
import avar from "../image/avar.svg";
import "../css/loadfile.css";
import { Link } from "react-router-dom";
export const TaiFile = () => {
  // State lưu danh sách file đã tải lên
  const [files, setFiles] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 768);
  // State lưu file được chọn tạm thời
  const [selectedFile, setSelectedFile] = useState("");
  const [selectedFileFromList, setSelectedFileFromList] = useState(""); // Tên file được chọn từ danh sách
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const handleGoPrint = () => {
    navigate("/print", { state: { selectedFileFromList } }); // Chuyển sang trang Print với state
  };


  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    // Gọi API để lấy danh sách tài liệu
    const fetchDocuments = async () => {
      try {
        const response = await fetch("http://localhost:5000/documents");
        const data = await response.json();
        setDocuments(data); // Cập nhật danh sách tài liệu
      } catch (error) {
        console.error("Error fetching documents:", error);
      }
    };
  
    fetchDocuments();
  }, []); // Khi tham số [] bị bỏ, useEffect sẽ chạy mỗi khi component render lại
  

  // const handleGoPrint = () => {
  //   window.close(); // Đóng cửa sổ/tab hiện tại
  // };
  // Hàm xử lý khi chọn file
  const handleFileChange = (e) => {
    
    const file = e.target.files[0]; // Lấy file đầu tiên từ danh sách

    if (file) {
      setSelectedFile(file.name); // Lưu file được chọn
    }
    console.log(selectedFile)
  };

  function getFileExtension(fileName) {
    const lastDotIndex = fileName.lastIndexOf(".");
    if (lastDotIndex === -1) {
      return ""; // Trả về chuỗi rỗng nếu không có dấu chấm
    }
    return fileName.substring(lastDotIndex + 1); // Lấy phần mở rộng của tệp
  }
  
  // Hàm xử lý khi nhấn nút "Xác nhận"
  const handleConfirm = async (e) => {
    e.preventDefault();
    if (selectedFile){
      try {

        const response = await fetch("http://localhost:5000/documents", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            file_name: selectedFile, // Tên file
            file_type: getFileExtension(selectedFile), // Lấy phần mở rộng của file
            number_of_pages: 11,
            file_path: 'uploads/' + selectedFile, // Đường dẫn file
            student_ID: 1,
          }),
        });
  
        if (response.ok) {
          setMessage("Tài liệu đã được lưu thành công!");
          setSelectedFile(null);
        } else {
          const errorText = await response.text();
          setMessage(`Lỗi: ${errorText}`);
        }
      } catch (err) {
        console.error(err.message);
        setMessage("Lỗi khi gửi yêu cầu");
      }
      
    }
    
  };
  const handleSelectFileFromList = (fileName) => {
    setSelectedFileFromList(fileName); // Lưu tên file
  };
  useEffect(() => {
    // Gọi handleGoPrint ngay sau khi selectedFileFromList thay đổi
    if (selectedFileFromList) {
      handleGoPrint(); // Gọi handleGoPrint ngay lập tức
    }
  }, [selectedFileFromList]); // chuyển trang khi chọn

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
      {/* Header chứa logo và thanh điều hướng */}
      <header className="header">
        <img src={image} alt="Logo" className="logo" />
        <nav className="navbar">
          {isMobileView ? (
            <button className="menu-button" onClick={togglePopup}>
              ☰
            </button>
          ) : (
            <nav className="navbar">
              <Link to="/" className="trangchu-bot">
                Trang chủ
              </Link>
              <Link to="/print" className="in-bot active">
                In
              </Link>
              <Link to="/history" className="xem-bot">
                Xem lịch sử in ấn
              </Link>
            </nav>
          )}
        </nav>
        <img src={chuong} alt="Tbao" className="Tbao" /> {/* CHuong*/}
        <img src={mess} alt="tnhan" className="tnhan" /> {/* hop thoại */}
        <button className="setting"></button>
        <img src={avar} alt="hAnh" className="hAnh" /> {/* avarta */}
      </header>
      {/* Nội dung */}
      <div className="content">
        {/* Danh sách file, này phải có database nên thêm vài cái demo */}
        <div className="list-file">
          <label className="list-label">Danh sách file</label>
          <table className="file-table">
          <thead>
          <tr>
            <th>Tên file</th>
            <th>Loại file</th>
            <th>Số trang giấy</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {documents.map((doc) => (
            <tr key={doc.document_ID}>
              <td>{doc.file_name}</td>
              <td>{doc.file_type}</td>
              <td>{doc.number_of_pages}</td>
              <td>
                <button
                  onClick={() => handleSelectFileFromList(doc.file_name)}
                  className="select-btn"
                >
                  Chọn
                </button>
              </td>
            </tr>
          ))}
              {/* Danh sách file người dùng tải lên */}
              {files.map((file, index) => (
                <tr key={index}>
                  <td>{file.name}</td>
                  <td>{file.size}</td>
                  <td>{file.date}</td>
                  <td>
                    <button
                      onClick={() => handleSelectFileFromList(file.name)}
                      className="select-btn"
                    >
                      Chọn
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* <div className="selected-file-display">
            <h3 className="tieude">File đã chọn:</h3>
            <label className="selected-file-label">
              {selectedFileFromList || "Chưa chọn file nào"}
            </label>
          </div> */}
          {/* <button className="corfirm-bot" onClick={handleGoPrint}>
            Chọn
          </button> */}
        </div>
        {/* Upload file */}
        <div className="file-upload">
          <label className="file-label">Tải file lên tài khoản</label>
          <textarea
            className="file-preview"
            value={selectedFile ? selectedFile.name : ""}
            readOnly
            placeholder="Chưa chọn file nào"
          ></textarea>
          <input
            type="file"
            className="file-input"
            onChange={handleFileChange}
          />
          {/* Footer */}
          <div className="file-footer">
            <label className="file-name-label">Tên file:</label>
            <input
              type="text"
              className="file-name-input"
              value={selectedFile ? selectedFile.name : ""}
              readOnly
            />
            <div className="buttons">
              <button className="open-bot" onClick={handleConfirm}>
                Xác nhận
              </button>
              <button className="btn cancel" onClick={handleGoPrint}>
                Thoát
              </button>
            </div>
          </div>
        </div>
      </div>
      {isPopupOpen && isMobileView && (
        <div className="popup">
          <ul>
            <Link to="/" onClick={togglePopup}>
              <li>Trang Chủ</li>
            </Link>
            <Link to="/print" onClick={togglePopup}>
              <li>In</li>
            </Link>
            <Link to="/history" onClick={togglePopup}>
              <li>Xem lịch sử in ấn</li>
            </Link>
          </ul>
        </div>
      )}
    </div>
  );
};
