const express = require("express");
const app = express();
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const Post = require( './models/Posts');


//config
 //tamplate handle
 app.engine('handlebars',handlebars({defaultLayout: 'main'}));
 app.set('view engine', 'handlebars');
 //body parser
 app.use(bodyParser.urlencoded({extended: false}));
 app.use(bodyParser.json());



 //Rotas 

app.get('/', function(req, res){
    res.render('telainicial')
})


app.get('/home',function(req, res){
    Post.findAll({order:[['id','DESC']]}).then(function(posts){
        res.render('home',{posts: posts})
    })
})

 app.get('/cad', function(req, res){
     
     res.render('formulario');
 });

 app.post('/add' , function(req, res){
     Post.create({
         titulo: req.body.titulo,
         conteudo: req.body.conteudo
     }).then(function(){
         res.redirect('/')
     }).catch(function(erro){
         res.send("Houve um erro "+erro)
     })
 });

 app.get('/delete/:id', function(req, res){
     Post.destroy({where:{'id':req.params.id}}).then(function(){
         res.send("Post deletado com sucesso")
     }).catch(function(erro){
        res.send("Esta Post Não existe! ")
     })
     
 })

 app.get('/update/:conteudo', function(req, res){
     Post.update({conteudo:req.body.conteudo},
        {where:{'id':req.params.id}}).then(function(){
            res.redirect('/cad')
        }).catch(function(erro){
            res.send("Erro Update");
        })
 })


//função de callback 
app.listen(8082, function(){
    console.log("Servidor Rodando na url http://localhost:8082")
});