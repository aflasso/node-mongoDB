const mongoose = require('mongoose')


const usuarioScherma = new mongoose.Schema({
    
    name: String,
    email: String,
    password: String

})

const User = mongoose.connection.useDb('sample_mflix').model('User', usuarioScherma)

module.exports = User