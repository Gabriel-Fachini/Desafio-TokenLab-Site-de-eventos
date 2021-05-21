//Importando o express
const express = require('express');

//Chamando o express
const router = express.Router();

//Importante o mongoose
const mongoose = require('mongoose');

const passport = require('passport')
require("../config/auth");

//Chamando o model criado para usuario
require('../models/User'); //Incluindo o arquivo onde está o model
const UserModel = mongoose.model('User');

//Importando o bcrypt
const bcrypt = require('bcryptjs');

//Rotas
router.get('/', (req, res) => {
    res.sendFile("C:/Users/usuario/Documents/GitHub/Desafio-TokenLab---Site-de-eventos/main.html");
})

router.get('/register', (req, res) => {
    res.sendFile("C:/Users/usuario/Documents/GitHub/Desafio-TokenLab---Site-de-eventos/pages/register.html");
})

router.get('/login', (req, res) => {
    res.sendFile("C:/Users/usuario/Documents/GitHub/Desafio-TokenLab---Site-de-eventos/pages/login.html");
})

//Enviando o formulario pra dentro do bd
router.post('/register/send', (req, res) => {

    //Variavel array para armazenar os erros
    var erros = [];

    //Verificando se os campos são vazios
    if(!req.body.name || !req.body.surname || !req.body.email || !req.body.password || !req.body.confirm){
        erros.push({text: "Nome inválido"});
    }

    console.log(req.body.name + req.body.surname + req.body.email + req.body.password + req.body.confirm);
        
    if(req.body.name.length < 2) {
        console.log("Nome muito pequeno");
        erros.push({text: "Nome muito pequeno"});
    }

    if(req.body.password != req.body.confirm){
        console.log("Senhas diferentes");
        erros.push({text: "Senhas diferentes"});
    }

    //Conferindo se há algum erro
    if(erros.length > 0) {
        //Renderizar o register enviando a var erros
        res.send("Foi encontrado um erro");
    } else {

        UserModel.findOne({email: req.body.email}).then((User) => {
            if(User){
                res.send("Já existe uma conta com esse email");
            } else {
                //Criando uma variável para armazenar os dados do formulario
                const newUser = new UserModel({
                    name: req.body.name,
                    surname: req.body.surname,
                    email: req.body.email,
                    password: req.body.password
                })

                bcrypt.genSalt(10, (erro, salt) => {
                    bcrypt.hash(newUser.password, salt, (erro, hash) => {
                        if(erro){
                            console.log("Erro no hash")
                        }

                        newUser.password = hash;

                        newUser.save().then(()=>{
                            res.send("Usuario criado com sucesso");
                            console.log("Usuario criado com sucesso");
                        }).catch((err)=>{
                            res.send("Ocorreu um erro na criação do usuario");
                            console.log("Ocorreu um erro na criação do usuario");
                        })
                    })
                })
            }
        })

        
        }
});

//Enviando o formulario de login para autenticação
router.post('/login/auth', (req, res, next)=>{

    passport.authenticate("local", {
        successRedirect: '/events',//Local para onde vai redirecionar se for feito com sucesso
        failureRedirect: '/erro', //Ir para o login
        failureFlash: true
    })(req, res, next)

})

router.get('/events', (req,res)=>{
    res.sendFile("C:/Users/usuario/Documents/GitHub/Desafio-TokenLab---Site-de-eventos/pages/events.html")
})

//Exportando meu arquivo
module.exports = router;