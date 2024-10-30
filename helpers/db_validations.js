const Equipo = require('../models/equipo');
const Jugador = require('../models/jugadores');
const Contratacion = require('../models/contrataciones');

const existeEquipoPorId = async (id) => {
    const existeEquipo = await Equipo.findById(id);
    if (!existeEquipo) {
        throw new Error(`El id del Equipo no existe ${id}`);
    }
};

const existeFutbolistaPorId = async (id) => {
    const existeFutbolista = await Jugador.findById(id);
    if (!existeFutbolista) {
        throw new Error(`El id del futbolista no existe mi papacho ${id}`);
    }
};

const existeFutbolistaPorIdEquipo = async (id) => {
    const [total, equipos] = await Promise.all([
        Jugador.countDocuments({idEquipo:id}),
        Jugador.find({idEquipo:id})]);
    if (total>0) {
        throw new Error(`No se puede borrar el equipo, el equipo tiene ${total} jugadores activos`);
    }
};

const existeContratoPorIdFutbolista = async (id) => {
        const [total, futbolistas] = await Promise.all([
            Contratacion.countDocuments({ idJugador: id }),
            Contratacion.find({ idJugador: id })
        ]);

        if (total > 0) {
            throw new Error(`No se puede borrar el jugador, el jugador tiene contrato activo`);
        }
};

const existecContratacionPorEquipoId = async (id) => {
    const total = await Contratacion.countDocuments({idEquipo: id});

    if (total > 0) {
        throw new Error(`No se puede borrar el equipo, el equipo tiene contrato activo`);
    }
};




module.exports = {
    existeEquipoPorId, existeFutbolistaPorId, existeFutbolistaPorIdEquipo, existeContratoPorIdFutbolista, existecContratacionPorEquipoId
};