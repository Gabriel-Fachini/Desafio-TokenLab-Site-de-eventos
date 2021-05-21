//Incluindo as modulos instaladas
const express = require('express');
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express(); //Inicializando a aplicação
const routes = require('./routes/routes');
const path = require('path');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport')
require('./config/auth')(passport)
//Configurações
    //Sessão
    app.use(session({
        secret: "calendarsecret",
        resave: true,
        saveUninitialized: true
    }))
    //Configurando o passport (necessariamente embaixo da sessão)
    app.use(passport.initialize())
    app.use(passport.session())

    //Configurando o flash (Necessariamente abaixo da config da sessão)
    app.use(flash());

    //Middleware
    //Declarando variáveis globais
    /*app.use((req, res, next) => {
        res.locals.success_msg = req.flash("sucess_msg");
        res.locals.error_msg = req.flash("error_msg");
        next();
    });*/

    //Configurando o body-parser
    app.use(bodyParser.urlencoded({ extended: true}));
    app.use(bodyParser.json());

    //Handle-bars
    app.engine('handlebars', handlebars({defaultLayout: 'main'}));
    app.set('view engine', 'handlebars');

    //Mongoose
    mongoose.Promise = global.Promise;
    mongoose.connect("mongodb://localhost/calendar", {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        console.log('Conectado ao mongo!')
    }).catch((err)=>{
        console.log('Houve um erro ao conectar-se ao mongodb: '+ err);
    })

    //Linkando a pasta public (onde estão os arquivos css e js)
    app.use(express.static(path.join(__dirname, '/public')));

//Rotas
//Utilizando o arquivo de rotas que foi definido
app.use('/', routes); // Daria para adicionar um prefixo a todas essas rotas contidas em 'routes'

//Outros
const PORT = 3000;
app.listen(PORT, () => {
    console.log("Servidor rodando!");
});
