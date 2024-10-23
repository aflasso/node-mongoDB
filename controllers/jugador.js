const { response, request, json } = require("express");

const Jugador = require('../models/jugadores')

const postJugador = async (req = request, res = response) => {

    try {
        const jugador = new Jugador(req.body);
        await jugador.save();
        res.status(201).json(jugador);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }

}

const getJugadores = async (req = request, res = response) => {

    try {
        const jugadores = await Jugador.find().populate('idEquipo');  // Usar populate para traer información del equipo
        res.status(200).json(jugadores);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }

}

const getByIdJugador = async (req, res) => {
    try {
        const jugador = await Jugador.findById(req.params.id).populate('idEquipo');
        if (!jugador) {
            return res.status(404).json({ message: 'Jugador no encontrado' });
        }
        res.status(200).json(jugador);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateByIdJugador = async (req, res) => {
    try {
        const jugador = await Jugador.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!jugador) {
            return res.status(404).json({ message: 'Jugador no encontrado' });
        }
        res.status(200).json(jugador);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const deleteByIdJugador = async (req, res) => {
    try {
        const jugador = await Jugador.findByIdAndDelete(req.params.id);
        if (!jugador) {
            return res.status(404).json({ message: 'Jugador no encontrado' });
        }
        res.status(200).json({ message: 'Jugador eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}



module.exports = {postJugador, getJugadores, getByIdJugador, updateByIdJugador, deleteByIdJugador}