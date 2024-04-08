var express = require('express');
var app = express();
var session = require("express-session");
var flash = require("express-flash");
var bodyParser = require("body-parser");

app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use(session({
    secret:'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie:{secure: true}
}));

app.use(flash());

app.get("/",(req,res)=>{
    console.log("Rota funcionando")
});

app.listen(7576,(req,res)=>{
    console.log('aplicação rodando ....')
});