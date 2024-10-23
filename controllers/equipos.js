const express = require('express');
const Equipo = require('../models/equipo');  // Asegúrate de que la ruta sea correcta


const postEquipo = async (req, res) => {
    try {
        const equipo = new Equipo(req.body);
        const equipoGuardado = await equipo.save();
        res.status(201).json(equipoGuardado);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const getEquipos = async (req, res) => {
    try {
        const equipos = await Equipo.find();
        res.status(200).json(equipos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const getByIdEquipo = async (req, res) => {
    try {
        const equipo = await Equipo.findById(req.params.id);
        if (!equipo) {
            return res.status(404).json({ message: 'Equipo no encontrado' });
        }
        res.status(200).json(equipo);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const updateByIdEquipo = async (req, res) => {
    try {
        const equipoActualizado = await Equipo.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        if (!equipoActualizado) {
            return res.status(404).json({ message: 'Equipo no encontrado' });
        }
        res.status(200).json(equipoActualizado);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const deleteByIdEquipo = async (req, res) => {
    try {
        const equipoEliminado = await Equipo.findByIdAndDelete(req.params.id);
        if (!equipoEliminado) {
            return res.status(404).json({ message: 'Equipo no encontrado' });
        }
        res.status(200).json({ message: 'Equipo eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {postEquipo, getEquipos, getByIdEquipo, updateByIdEquipo, deleteByIdEquipo}