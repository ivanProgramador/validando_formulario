var express = require('express');
var app = express();
var session = require("express-session");
var flash = require("express-flash");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
const { emit } = require('nodemon');



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

    var emailError = req.flash("emailError");
    var pontosError = req.flash("pontosError");
    var nomeError = req.flash("nomeError");

    emailError = (emailError == undefined || emailError.length == 0)? undefined:emailError;

    res.render('index',{emailError,pontosError,nomeError,email: req.flash("email"), nome: req.flash("nome"),pontos: req.flash("pontos")});
});
app.post("/form",(req,res)=>{
    
    var {email,nome,pontos} = req.body;

    var emailError;
    var pontosError;
    var nomeError;

    if(email == undefined || email == ""){
        emailError = "O e-mail não pode ser vazio";
    }
    if(pontos == undefined || pontos < 20){
        pontosError = "Você não pode ter menos dde 20 pontos"
    }
    if(nome == undefined || nome == ""){
        nomeError = "O nome não pode ser vazio";
    }
    if(nome.length < 4){
        nomeError = "O nome não pode ter menos de 3 caracteres";

    }

    if(emailError != undefined || pontosError != undefined || nomeError != undefined){
        //aqui eu crio um req flash para cada erro de validação 
        req.flash("emailError",emailError);
        req.flash("pontosError", pontosError);
        req.flash("nomeError",nomeError); 
        
        req.flash("email",email);
        req.flash("nome",nome);
        req.flash("pontos",pontos);

        res.redirect("/");

    }else{
        res.send("Form preenchido")
    }
   
    

   


});



app.listen(7576,(req,res)=>{
    console.log('aplicação rodando ....')
});