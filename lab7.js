const http = require("http");
const mysql = require("mysql");

console.log(
  "7. Create a web page to fetch data from the database and display all students of MCA 2nd semester who have chosen AWT Course using Node.js\n"
);
console.log("Server running at http://localhost:8090");
console.log(
  "Open the browser and type the URL specified here to fetch students who have opted for AWT Course"
);

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "student",
});

http
  .createServer(function (req, res) {
    con.connect(function (err) {
      if (err) throw err;

      con.query(
        "SELECT * FROM Student WHERE Course ='AWT' AND Program = 'MCA' AND Sem = '2'",
        function (err, result) {
          if (err) throw err;

          res.writeHead(200, { "Content-Type": "text/html" });
          res.write(
            "7. Create a web page to fetch data from the database and display all students of MCA 2nd semester who have chosen AWT Course using Node.js\n"
          );
          res.write(
            "<table border='1'><tr><th>USN</th><th>Name</th><th>Gender</th><th>Program</th><th>Semester</th><th>Course</th></tr>"
          );

          for (var i = 0; i < result.length; i++) {
            res.write(
              "<tr><td>" +
                result[i].USN +
                "</td><td>" +
                result[i].Name +
                "</td><td>" +
                result[i].Gender +
                "</td><td>" +
                result[i].Program +
                "</td><td>" +
                result[i].Sem +
                "</td><td>" +
                result[i].Course +
                "</td></tr>"
            );
          }

          res.write("</table>");
          res.end();
        }
      );
    });
  })
  .listen(2000);
