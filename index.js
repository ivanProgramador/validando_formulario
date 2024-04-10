var express = require('express');
var app = express();
var session = require("express-session");
var flash = require("express-flash");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");



app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());


app.use(cookieParser('jkdfllslkdfjdi'));

app.use(session({
    secret:'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie:{maxAge:60000}
}));

app.use(flash());


//rota para o formulario
app.get("/",(req,res)=>{
    res.render('index');
});

//rota para a validação

app.post("/form",(req,res)=>{

    var {email,nome,pontos} = req.body;

    var emailError;
    var nomeError;
    var pontosError;

    if(email == undefined || email =="" ){
        emailError = "email invalido"
    }
    if(nome == undefined || nome ==""){
        nomeError = "nome invalido"
    }
    if(pontos == undefined || pontos ==""){
        pontosError = "pontos insuficientes"
    }

    if(emailError != undefined || nomeError != undefined || pontosError != undefined){
      res.redirect("/");
    }else{
        res.send("form completo ");
    }




})

app.listen(7576,(req,res)=>{
    console.log('aplicação rodando ....')
});