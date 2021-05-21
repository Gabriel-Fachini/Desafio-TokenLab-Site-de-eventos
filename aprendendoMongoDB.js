//Incluindo o package mongoose
const mongoose = require('mongoose');

//Realizando a configuração padrão para conexão ao banco de dados
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/teste", {
    useNewUrlParser: true
}).then(()=>{
    console.log("Conectado ao banco de dados com sucesso!");
}).catch((err) => {
    console.log("Houve um erro: " + err);
});

//Criando o Schema de usuario do calendar
const usuarioSchema = mongoose.Schema({
    name:{
        type: String,
        require: true,
    },
    surname:{
        type: String,
        require: true, 
    },
    email:{
        type: String,
        require: true,
    },
    password:{
        type: String,
        require: true,
    }
});

//Criando uma coleçao para o meus usuarios
mongoose.model('users', usuarioSchema);

//Adicionando um novo usuário a esse banco de dados
const gabriel = mongoose.model('users');

new gabriel({
    name: "Gabriel",
    surname: "Fachini",
    email: "gabriel_fachini@usp.br",
    password: "12345"
}).save().then(() => {
    console.log("Usuário cadastrado com sucesso");
}).catch((err)=>{
    console.log("Houve um erro no cadastro do usuario: " + err);
})

//Para acessar no banco de dados realize os seguintes comandos
/*
show dbs - show databases
use (baco de dados seu)
show collections
db.[coleção escolhida].find().pretty();
*/