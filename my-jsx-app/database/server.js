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

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});