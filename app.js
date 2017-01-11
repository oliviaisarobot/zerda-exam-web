'use strict';

var mysql = require('mysql');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "greenfox-js-exam"
});

con.connect();

app.use(bodyParser.json());

app.use(
  express.static(__dirname + '/client')
);

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/exam', function(req, res) {
  var response = {"status": "ok", "projects": []};
  con.query('SELECT * FROM projects', function(err, rows) {
      rows.forEach(function(e) {
        response.projects.push(e.project_name);
      });
      if (err) throw err;
      res.json(response);
    });
});

app.post('/exam', function(req, res) {
  con.query({
    sql: 'INSERT INTO `results` (`feedback`, `scale`, `email`) VALUES ("'+req.body.feedback+'", "'+req.body.scale+'", "'+req.body.eamil+'")',
  }, function(err, rows, fields) {
    if (err) throw err;
    res.send(rows);
  });
});

// app.post('/exam', function(req, res) {
//   // var response = {"status": ok, "projects": []};
//
//   con.query({
//     sql: 'INSERT INTO results VALUES("'+req.body.feedback+'", "'+parseInt(req.body.scale)+'", "'+req.body.email+'")',
//   }, function (err) {
//     if(!err) {
//     res.send(response);
//     }
//   });

  // con.query('SELECT * FROM projects', function(err, rows) {
  //     rows.forEach(function(e) {
  //       response.projects.push(e.project_name);
  //     });
  //     if (err) throw err;
  //     res.json(response);
  //   });
  //
  // if (scale > 10 || shift < 0) {
  //   res.status(400);
  //   response = {"status": "error", "message": "thank you"};
  //   res.send(response);
  // } else {
  //   con.query({
  //     sql: 'INSERT INTO results VALUES("'+req.body.feedback+'", "'+parseInt(req.body.scale)+'", "'+req.body.email+'")',
  //   }, function (err) {
  //     if(!err) {
  //     res.send(response);
  //     }
  //   });
  // }
// });



// app.get('/decode/all', function(req, res) {
//   var allPrevious = {"all": []};
//   con.query('SELECT * FROM decode', function(err, rows, fields) {
//     rows.forEach(function(e) {
//       allPrevious.all.push(e.text);
//     });
//     if (err) throw err;
//     res.json(allPrevious);
//   });
// });
//
// app.post('/decode', function(req, res) {
//   con.query({
//     sql: 'INSERT INTO `decode` (`shift`, `text`) VALUES ("'+req.body.shift+'", "'+req.body.text+'")',
//   }, function(err, rows, fields) {
//     if (err) throw err;
//     res.send(rows);
//   });
// });
//
// app.get('/decode', function(req, res) {
//   var current = [];
//   con.query('SELECT * FROM decode', function(err, rows, fields) {
//     current = rows[rows.length - 1];
//     var decoded = caesar.cipher(current.shift, current.text);
//     var response = {"status": "ok", "text": decoded};
//     if (err) throw err;
//     res.json(response);
//   });
// });

app.listen(3008, function(req, res) {
  console.log('Server is running on port 3008')
});
