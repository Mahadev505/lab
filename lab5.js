const http = require('http');
const formidable = require('formidable');
const mysql = require('mysql');

console.log("5. Design a web page to register for an aspiring student to register for a program offered by the university using Node.js and MySQL database");
console.log("Server running at http://localhost:8090");
console.log("Open the browser and type the URL specified here to register the student");

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "student"
});

http.createServer(function (req, res) {
  if (req.url === '/register') {
    const form = new formidable.IncomingForm();
    form.parse(req, function (err, fields) {
      con.connect(function (err) {
        if (err) throw err;
        const sql = "INSERT INTO Student (USN, Name, Gender, Program, Course, Sem) VALUES (?, ?, ?, ?, ?, ?)";
        const values = [fields.txtusn, fields.txtname, fields.txtgender, fields.txtprogram, fields.txtcourse, fields.txtsem];

        con.query(sql, values, function (err, result) {
          if (err) throw err;
          res.writeHead(200, { 'Content-Type': 'text/html' });
          res.write("Registered Successfully" + "<a href='http://localhost:8090'> Click for new Registration </a>");
          res.end();
        });
      });
    });
  } else {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write("5. Design a web page to register for an aspiring student to register for a program offered by the university using Node.js and MySQL database<hr>");
    res.write('<form action="/register" method="post">');
    res.write('USN: <input type="text" name="txtusn"><br>');
    res.write('Name : <input type="text" name="txtname"><br>');
    res.write('Gender : <input type="text" name="txtgender"><br>');
    res.write('Program : <input type="text" name="txtprogram"><br>');
    res.write('Semester : <input type="text" name="txtsem"><br>');
    res.write('Course : <input type="text" name="txtcourse"><br>');
    res.write('<input type="submit">');
    res.write('</form>');
    res.end();
  }
}).listen(8090);
