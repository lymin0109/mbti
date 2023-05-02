// const express = require('express')
// const app = express()

// app.get('/', function(req,res){
//   res.sendFile(__dirname + "/index.html")
// })

// app.listen(3000, function() {
//   console.log("start! express server on prot 3000")
// })


var express = require('express');
var app = express();
var mysql = require('mysql')
var client = mysql.createConnection({
        user:'root',
        password:'qwerty12345',
        database:'mydb'
});

app.use(express.static(__dirname + '/public'));

app.get('/',function(req,res){
        res.render('index.html');
});

var server = app.listen(3000, function(){
        console.log("The server has started on port 80");
});

