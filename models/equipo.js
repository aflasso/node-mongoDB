const {model, Schema, models} = require('mongoose')

const equipoSchema = new Schema({

    nombre_equipo: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        unique: true
    },

    pais: {
        type: String,
        required: [true, 'El pais es obligatorio'],
    }

},

{
    collection: 'equipos'
})

const Equipo = model('Equipo', equipoSchema)

module.exports = Equipo