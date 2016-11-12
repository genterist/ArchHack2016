var express = require('express');
var app = express();
var mysql = require("mysql");
var watson = require('watson-developer-cloud');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
var path = require('path');
var globalPatientName = "Thomas";
var to_email = "";
var nodemailer = require('nodemailer');
app.use(express.static(__dirname + '/views'));

// Create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });

var toneAnalyzer = watson.tone_analyzer({
  url: 'https://gateway.watsonplatform.net/tone-analyzer/api/',
  username: '<username>',
  password: '<password>',
  version_date: '2016-05-19',
  version: 'v3'
});

// First you need to create a connection to the db
var con = mysql.createConnection({
  host: "<host>",
  user: "<username>",
  password: "<password>",
  database: "<database_name>"
});

// Connect to the db
MongoClient.connect("mongodb://localhost:27017/exampleDb", function(err, db) {
  if(!err) {
    console.log("Mongo is connected");
  }else{
    console.log("Mongo not connected");
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

app.get('/getPatientName', urlencodedParser, function(req, res, next) {
  res.send(JSON.stringify(globalPatientName));
});

app.get("/", function(req,res){
  res.sendFile('index.html');
});

app.get("/about", function(req,res){
  res.sendFile(__dirname + '/views' + '/about.html');
});

app.get("/sendTextEmail/:whytext", urlencodedParser, function(req, res, next){
  // console.log(req.params);
  var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'projectlola2k16@gmail.com',
            pass: '<password>'
        }
    });
  var text = 'Hello world from \n\n' + req.params.whytext;

  con.query('select * from primarycare where acctNum = (SELECT acctNum from patient WHERE name = \'' + globalPatientName + '\')', function(err, rows, fields) {
    if (!err && rows.length>0){
      to_email = rows[0].email;
      console.log(to_email);
      var mailOptions = {
          from: 'ProjectLola2k16<projectlola2k16@gmail.com>', // sender address
          to: to_email, // list of receivers
          subject: 'Patient Update', // Subject line
          text: text //, // plaintext body
          // html: '<b>Hello world ✔</b>' // You can choose to send an HTML body instead
      };
      transporter.sendMail(mailOptions, function(error, info){
          if(error){
              console.log(error);
              // res.json({yo: 'error'});
          }else{
              console.log('Message sent: ' + info.response);
              // res.json({yo: info.response});
          };
      });
    }
  });  


  res.send(JSON.stringify(globalPatientName));
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

app.get("/getPatientDetails/:name",function(req,res){
  globalPatientName = req.params.name;
	con.query('SELECT p.*,d.* from patient p,dosage d where name=\'' + req.params.name + '\' and p.acctNum=d.acctNum and dosage_date = DATE(NOW())', function(err, rows, fields) {
	  if (!err && rows.length>0){
      
      
      var arrayData = [];
      arrayData.push("Hello " + req.params.name);
      arrayData.push("Let me check your database...");
      for (var i = 0, len = rows.length; i < len; i++) {
        var mornDose = rows[i].mornDose;
        var evenDose = rows[i].evenDose;
        var mornDoseFlag = rows[i].mornDoseFlag;
        var evenDoseFlag = rows[i].evenDoseFlag;
        con.query('SELECT * from medicine where medID = ' + rows[i].medID, function(err, innerrows, fields) {
          if(!err && innerrows.length > 0){
            for (var j = 0; j < innerrows.length; j++) {
              var current_datetime = new Date();
              var mornDoseDateTime = new Date(mornDose);
              var evenDoseDateTime = new Date(evenDose);
              if(current_datetime > mornDoseDateTime && !mornDoseFlag){
                arrayData.push("You missed taking your "+ innerrows[j].name + " at " + mornDose); 
              } else {

              }
              if(current_datetime > evenDoseDateTime && !evenDoseFlag){
                arrayData.push("You missed taking your "+ innerrows[j].name + " at " + evenDose); 
              } else {

              }
            }
            arrayData.push("Take care "+ req.params.name + ".");
            res.send(JSON.stringify(arrayData));
          }
        });
      }
      
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
