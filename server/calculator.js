const express = require('express');
const bodyParser = require('body-parser');
const mysql = require("mysql2/promise");
const path = require('path');
const app = express();
const cors = require('cors');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/styles', express.static(path.join(__dirname, 'styles')));
// app.use('/scripts', express.static(path.join(__dirname, 'scripts')));


app.use(bodyParser.urlencoded({extended:false})) // ส่งผ่าน Form
app.use(bodyParser.json()) // ส่งด้วย Data JSON
app.use(cors());

const dbConn = mysql.createConnection({
   host: 'localhost',
   user: 'root', // <== ระบุให้ถูกต้อง
   password: '', // <== ระบุให้ถูกต้อง
   database: 'student_database',
   port: 3306 // <== ใส่ port ให้ถูกต้อง (default 3306, MAMP ใช้ 8889)
});

// app.get("/", (req, res) => {
//    //res.send("/index.html");
//    res.sendFile(__dirname + '/index.html');
// });

// app.post("/", (req, res) => {
//    var num1 = Number(req.body.num1);
//    var num2 = Number(req.body.num2);
//    var result = num1 + num2;
//    res.send("The calculation result is : " + result);
// });

app.get('/student', async (req, res) => {
   try {
      const connection = await dbConn;
      const rows = await connection.query('SELECT * from students');
      res.send(rows[0]);
      // res.sendFile(path.join(__dirname, 'student.html'));
   } catch (error) {
      res.sendFile(path.join(__dirname, 'error.html'));
   }
});

app.delete('/student/:id', async (req, res) => {
   const connection = await dbConn;
   const rows = await connection.query(`DELETE FROM students WHERE students.id = ${req.params.id}`);
   res.send(rows[0]);
   // res.sendFile(path.join(__dirname, 'student.html'));
});

app.post("/create-student", async (req, res)=>{
   const connection = await dbConn;
   const rows = await connection.query(`INSERT INTO students (name, age, phone, email) VALUES ('${req.body.name}', ${req.body.age}, '${req.body.phone}', '${req.body.email}')`);
   res.send(rows[0]);
});

app.get('/auth-login', async (req, res) => {
   try {
      const connection = await dbConn;
      const rows = await connection.query(`SELECT * from user where username = '${req.query.username}' and password = '${req.query.password}'`);
      res.send(rows[0]);
      // res.sendFile(path.join(__dirname, 'student.html'));
   } catch (error) {
      res.sendFile(path.join(__dirname, 'error.html'));
   }
});



app.listen(3307, () => {
   console.log("Server is running on port 3307");
});

app.use(async (request, response) => {
   response.status(404).sendFile(path.join(__dirname, 'error.html'))
});