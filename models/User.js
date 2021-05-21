//Importando a biblioteca do mongoDB
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Importando a biblioteca bcryptjs
//const bcrypt = require('bcryptjs');

//Definindo o Schema do usuário
const userSchema = new Schema({
    name: {
        type: String,
        require: true,
    },
    surname: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

//Aplicando a encriptação da senha
/*userSchema.pre('save', async function (next) {
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;

    next();
});*/

//Definindo o user e qual será seu schema
const User = mongoose.model('User', userSchema);

//Exportando o usuário
module.exports = User;
