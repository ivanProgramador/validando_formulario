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
    
    var emailError  = req.flash("emailError");
    var nomeError   = req.flash("nomeError");
    var pontosError = req.flash("pontosError");

     //a req.flash quando usada retorna um array 
    //então eu vou usar um oprador ternario pra dizer que se ela for vazia 
    //não vai retonar nada porque o cliente fez o preechimento certo 
    
    emailError = (emailError == undefined || emailError.length == 0) ? undefined: emailError;
    nomeError = (nomeError == undefined || nomeError.length == 0) ? undefined: nomeError;
    pontosError = (pontosError == undefined || pontosError.length == 0) ? undefined: pontosError;

    res.render('index',{emailError,nomeError,pontosError});
});

//rota para a validação

app.post("/form",(req,res)=>{

    var {email,nome,pontos} = req.body;

    var pontosError;
    var nomeError;
    var emailError; 


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
      /*
        As flash sessions são sessões que so duram uma requisição normlemente elas são usadas,
        para disparar mensagens de aviso digamos os cliente esqueceu de digitar a senha ela faz
        a requisição pra rota percebe o erro e retorna para o formulario com a mensagem de aviso,
        para o cliente saber que ele voltou para o formulario porque ele esqueceu de digitar a senha.

        A função flash recebe 2 parametros 1 o nome dela e 2 qqual ea varivel que el vai mostrar o valor 
        caso ela seja chamada 
       */

        req.flash("emailError", emailError);
        req.flash("pontosError", pontosError);
        req.flash("nomeError",nomeError);



      res.redirect("/");
    }else{
        res.send("form completo ");
    }




})

app.listen(7576,(req,res)=>{
    console.log('aplicação rodando ....')
});