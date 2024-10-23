const { model, Schema } = require('mongoose');

const contratacionSchema = new Schema({
    idJugador: {
        type: Schema.Types.ObjectId,
        ref: 'Jugador',  // Hace referencia al modelo Jugador
        required: true,
    },
    idEquipo: {
        type: Schema.Types.ObjectId,
        ref: 'Equipo',   // Hace referencia al modelo Equipo
        required: true,
    },
    fechaContratacion: {
        type: Date,
        default: Date.now,  // Fecha por defecto al momento de la creación
        required: true,
    },
    fechaFinalizacion: {
        type: Date,
        required: false,  // Puede ser opcional si es un contrato en curso
    },
}, {
    collection: 'contrataciones', // Nombre de la colección en MongoDB
});

const Contratacion = model('Contratacion', contratacionSchema);

module.exports = Contratacion;
