var express = require('express');
var app = express();
var mysql = require("mysql");
var watson = require('watson-developer-cloud');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
var path = require('path');
app.use(express.static(__dirname + '/views'));

// Create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });

var toneAnalyzer = watson.tone_analyzer({
  url: 'https://gateway.watsonplatform.net/tone-analyzer/api/',
  username: '40441681-14c3-4391-b7ba-12a6cdc5eea4',
  password: 'yFqXQ87EA1c0',
  version_date: '2016-05-19',
  version: 'v3'
});

// First you need to create a connection to the db
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "baburao@123",
  database: "nao-rest-db"
});

con.connect(function(err){
  if(err){
    console.log('Error connecting to Db');
    return;
  }
  console.log('Connection established');
});

app.post('/api/tone', urlencodedParser,function(req, res, next) {
  console.log(req);
  toneAnalyzer.tone(req.body, function(err, data) {
    if (err) {
      return next(err);
    }
    return res.json(data);
  });
});

app.get('/api/tone', urlencodedParser,function(req, res, next) {
  res.send("I am here. But yet too far.");
});

app.get("/", function(req,res){
  res.sendFile('index.html');
});

app.get("/about", function(req,res){
  res.sendFile(__dirname + '/views' + '/about.html');
});

app.get("/getPatientDetails",function(req,res){
	con.query('SELECT * from patient', function(err, rows, fields) {
	con.end();
	  if (!err){
	    console.log('The solution is: ', rows);
		res.send(rows);
	  } else
	    console.log('Error while performing Query.');
	  });

});

app.get('/demo', function (req, res) {
	con.query('SELECT * FROM patient',function(err,rows){
	  	for (var i = 0; i < rows.length; i++) {
	  		resp += rows[i].name;
	    };
	});
   res.send(resp);
});

var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Example app listening at http://%s:%s", host, port)
});