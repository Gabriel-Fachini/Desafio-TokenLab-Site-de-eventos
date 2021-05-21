const localStrategy = require('passport-local').Strategy
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

//Model de usuário
require('../models/User')
const User = mongoose.model('User');

//Configurando sistema de autenticação
module.exports = function(passport){

    passport.use(new localStrategy({usernameField: 'email', passwordField: 'password'}, (email, password, done) => {
        User.findOne({email: email}).then((user)=>{
            if(!user){
                console.log("essa conta não existe")
                return done(null, false, {message: "Essa conta não existe"})
            }

            console.log("entrou aqui na verificação")
            console.log(password)
            console.log(user)
            console.log(user.password)
            console.log(user.email);
            bcrypt.compare(password, user.password, (erro, batem)=>{

                if(batem){
                    console.log("logado com sucesso");
                    return done(null, user)
                } else {
                    console.log("senha incorreta")
                    return done(null, false, {message: "Senha incorreta"})
                }

            })
        })
    }))

    //Passando o id do usuario para uma sessão
    passport.serializeUser((user, done)=>{
        console.log("entrou aqui")
        done(null, user.id)
    })

    passport.deserializeUser((id, done)=>{
        console.log("entrou aqui")
        User.findById(id, (err, user) =>{
            done(err, user)
        })
    })

}