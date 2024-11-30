const express = require('express');
const cors = require('cors');
const sql = require('mssql');
const bodyParser = require('body-parser');
const CurrentUser = require('../singleton/account')
const app = express();
app.use(cors());

app.use(bodyParser.json());
const currentUser = CurrentUser.getInstance();

const config = {
  user: 'sa',
  password: 'Huy1022003',
  server: 'localhost',
  database: 'cnpm',
  options: {
    encrypt: true,
    trustServerCertificate: true
  }
};

app.get('/logout', async (req, res) => {
  try {
    console.log(currentUser.getUsername())
    if (currentUser.isLoggedIn == false){
      console.log("here");
    }
    console.log(currentUser.isLoggedIn())
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/login', async (req, res) => {
  try {
    const pool = await sql.connect(config);
    const result = await pool.request().query('SELECT * FROM Account;');
    res.json(result.recordset);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/login', async (req, res) => {
  try {
    let pool = await sql.connect(config);

    const { email, password } = req.body;
    let result = await pool.request()
            .input('username', sql.NVarChar, email)
            .input('password', sql.NVarChar, password)
            .query('SELECT * FROM Account WHERE user_name = @username AND password = @password');

    if (result.recordset.length > 0) {
      currentUser.setUsername(email);
      currentUser.setLoggedIn(true);
      res.status(200).json({ message: 'Login successful' });
    } else {
      res.status(401).json({ message: 'Login failed' });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Internal Server Error');
  }
});


app.post('/logout', async (req, res) => {
  try {
    currentUser.setLoggedIn(false);
    res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Internal Server Error');
  }
});

// API lấy danh sách máy in
app.get("/printers", async (req, res) => {
  try {
    // Kết nối đến SQL Server
    let pool = await sql.connect(config);

    // Query dữ liệu
    let result = await pool.request().query("SELECT * FROM Printer");
    
    // Trả về danh sách máy in
    res.json(result.recordset);

  } catch (err) {
    console.error("Error fetching printers:", err);
    res.status(500).send("Internal Server Error");
  }
});


app.get("/documents", async (req, res) => {
  try {
    if (currentUser.isLoggedIn == false) return;
    
    // Kết nối đến database
    let pool = await sql.connect(config);
    const user_name = currentUser.getUsername();
   
    // Truy vấn dữ liệu
    let result = await pool
      .request()
      .input("user_name", sql.NVarChar, user_name) // Truyền tham số cho hàm
      .query("SELECT * FROM dbo.GetDocumentsByUserName(@user_name)");

    // Trả về danh sách document
    res.status(200).json(result.recordset);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Lỗi khi lấy danh sách tài liệu");
  }
});

app.post("/documents", async (req, res) => {
  const { file_name, file_type, number_of_pages, file_path, student_ID } = req.body;
  // Kiểm tra dữ liệu đầu vào
  if (!file_name || !file_type || !number_of_pages || !file_path || !student_ID) {
    return res.status(400).send("Dữ liệu đầu vào không hợp lệ");
  }
  
  try {
    // Kết nối đến cơ sở dữ liệu
    let pool = await sql.connect(config);
    // Chèn tài liệu vào bảng Document
    let result = await pool
      .request()
      .input("file_name", sql.NVarChar, file_name)
      .input("file_type", sql.NVarChar, file_type)
      .input("number_of_pages", sql.Int, number_of_pages)
      .input("file_path", sql.NVarChar, file_path)
      .input("user_name", sql.NVarChar, currentUser.getUsername())
      .execute("InsertDocument"); // Gọi thủ tục InsertDocument

    // Trả về phản hồi thành công
    res.status(201).send("Tài liệu đã được lưu thành công");
  } catch (error) {
    console.error("Lỗi khi lưu tài liệu:", error.message);
    res.status(500).send("Lỗi khi lưu tài liệu");
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});