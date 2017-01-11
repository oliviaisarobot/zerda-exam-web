'use strict';

var mysql = require('mysql');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var validate = require('./validator.js');

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
  if (validate.run(req.body.feedback, req.body.scale, req.body.email)) {
    con.query({
      sql: 'INSERT INTO `results` (`feedback`, `scale`, `email`) VALUES ("'+req.body.feedback+'", "'+req.body.scale+'", "'+req.body.eamil+'")',
    }, function(err, rows, fields) {
      if (err) throw err;
      res.json({"status": "ok"});
    });
  } else {
    res.status(400);
    var response = {"status": "error", "message": "thank you"};
    res.send(response);
  }
});

app.listen(3008, function(req, res) {
  console.log('Server is running on port 3008')
});
