const {model, Schema} = require('mongoose')

const jugadorSchema = new Schema({

    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
    },
    apellidos: {
        type: String,
        required: [true, 'Los apellidos son obligatorios'],
    },
    edad: {
        type: Number,
        required: [true, 'El edad es obligatorio'],
    },
    internacional: {
        type: Boolean,
        default: true,
        required: true
    },

    idEquipo: {
        
        type: Schema.Types.ObjectId,
        ref: 'Equipo',
        required: false
    }

},
 {
    collection: 'jugadores'
 }
)

const Jugador = model('Jugador', jugadorSchema)

module.exports = Jugador