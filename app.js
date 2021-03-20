const express = require("express");
const app = express();
const handlebars = require('express-handlebars');

//conexao com BD
const Sequelize = require('sequelize');
const sequelize = new Sequelize('test','root','123',{
    host:"localhost",
    dialect:"mysql"
});

//config
 //tamplate handle
 app.engine('handlebars',handlebars({defaultLayout: 'main'}));
 app.set('view engine', 'handlebars');


 //Rotas 

 app.get('/cad', function(req, res){
     res.render('formulario');
 });

 app.post('/add' , function(req, res){
     res.send("Enviado");
 })


//função de callback 
app.listen(8080, function(){
    console.log("Servidor Rodando na url http://localhost:8080")
});