const http = require('http');
const mysql = require('mysql');

console.log("6. Design a web page to fetch the profile of a student from a MySQL database using Node.js");
console.log("Server running at http://localhost:4000");
console.log("Open the browser and type the URL specified here to fetch the student's profile");

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "student"
});

http.createServer(function (req, res) {
  con.connect(function (err) {
    if (err) throw err;

    con.query("SELECT * FROM Student WHERE USN = '21DMMCA029'", function (err, result) {
      if (err) throw err;

      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.write("6. Design a web page to fetch the profile of a student from a MySQL database using Node.js");
      res.write("<br><br><table border=1 align=center width=50%>");
      res.write("<caption> Profile of: " + result[0].Name + "</caption>");
      res.write("<tr><td> USN </td><td>" + result[0].USN + "</td></tr>");
      res.write("<tr><td> Name </td><td>" + result[0].Name + "</td></tr>");
      res.write("<tr><td> Gender </td><td>" + result[0].Gender + "</td></tr>");
      res.write("<tr><td> Program </td><td>" + result[0].Program + "</td></tr>");
      res.write("<tr><td> Sem </td><td>" + result[0].Sem + "</td></tr>");
      res.write("</table>");
      res.end();
    });
  });
}).listen(4000);
