var express = require('express');
var app = express();
var mysql = require("mysql");
var watson = require('watson-developer-cloud');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
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

// Connect to the db
MongoClient.connect("mongodb://localhost:27017/exampleDb", function(err, db) {
  if(!err) {
    console.log("Mongo is  connected");
  }else{
    console.log("Mongo not   connected");
  }
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

app.get('/getHealthTip',function(req,res){
    var arrayData = ["stay hydrated! drink at least 8 cups of water a day",
        "eat less sugary desserts! try switching to fruits or nuts instead",
        "aim to take a 30 minute walk every day",
        "don't sit still for too long! get up and stretch periodically",
        "get enough sleep! a full eight hours a day can make all the difference",
        "eat a balanced diet! a good mix of carbohydrates, fats, and proteins is best for your health",
        "don't eat until you are stuffed. once you start feeling full, stop eating",
        "don't drink caffeine after dinner, it may affect how easily you get to sleep",
        "if you are stressed, take a break! do a quick five minute deep breathing exercise",
        "quit smoking! it benefits your health in countless ways, and you'll also save money",
        "make sure you brush your teeth twice a day, once in the morning and once in the evening",
        "make sure you spend enough time outside in the sun to get an appropriate level of vitamin d",
        "don't just exercise your body! exercise your brain too, learn something new today",
        "shop healthy! try to learn to buy fresh foods and cook your own meals",
        "remove excess sugar from your diet! drink your coffee black if you can handle it, and try to avoid soda",
        "start the day with a healthy breakfast! it will provide you energy for the rest of the day",
        "take the stairs! think of it as a free workout on the way to the next floor",
        "stretch every day! stretching can improve blood flow and prevent muscle injury",
        "don't be negative towards yourself! a positive mindset leads to a positive life",
        "have a set morning routine, a productive morning sets the tone for a productive day"];
    var randTip = arrayData[Math.floor(Math.random() * arrayData.length)];
    res.send(randTip);
});

//http://0.0.0.0:8081/mongoDB/getData

app.get('/mongoDB/getData',function(req,res){
        var arrayData = [];
        arrayData.push("Hello John");
        arrayData.push("Let me pull out your data base ....")
        MongoClient.connect("mongodb://localhost:27017/bot_mongo", function(err, db) {
          var collection = db.collection('userData');
          collection.find().toArray(function(err, items) {
            console.log("comming inside for loop")
            items.forEach(function (value) {
                arrayData.push("You have to take "+ value["Tablets"]+" at "+value["Time"]);
              if(value['Name'] == "John" && value["Status"] != ""){
                arrayData.push("You have to take "+ value["Tablets"]+" at "+value["Time"]);
                }
            });
            arrayData.push("Take care John.")
            res.send(arrayData);
          });

        });

});
app.get("/",function(req,res){
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