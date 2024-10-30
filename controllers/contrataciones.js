const express = require('express');
const Contratacion = require('../models/contrataciones');  // Asegúrate de que la ruta sea correcta
const Equipo = require('../models/equipo')

const postContrat = async (req, res) => {
    try {
        const contratacion = new Contratacion(req.body);
        const contratacionGuardada = await contratacion.save();
        res.status(201).json(contratacionGuardada);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const getContrat = async (req, res) => {
    try {
        const contrataciones = await Contratacion.find().populate('idJugador idEquipo');

        res.json(contrataciones);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const getContratByName = async (req, res) => {
    try {
        // Primero encontramos el equipo con el nombre especificado
        const equipo = await Equipo.findOne({ nombre_equipo: req.params.nombreEquipo });
        if (!equipo) {
            return res.json({message: 'No existen contrataciones'}); // Si no se encuentra el equipo, devolvemos un array vacío
        }

        // Buscamos las contrataciones que coinciden con el idEquipo del equipo encontrado
        const contrataciones = await Contratacion.find({ idEquipo: equipo._id })
            .populate('idEquipo')  // Poblar el equipo
            .populate('idJugador')  // Poblar el jugador
            .exec();  // Ejecutamos la consulta

        return res.json(contrataciones);
    } catch (error) {
        console.error(error);
    }
}

const getByIdContrat = async (req, res) => {
    try {
        const contratacion = await Contratacion.findById(req.params.id).populate('idJugador idEquipo');
        if (!contratacion) return res.status(404).json({ message: 'Contratación no encontrada' });
        res.json(contratacion);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const updateByIdContrat = async (req, res) => {
    try {
        const contratacionActualizada = await Contratacion.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!contratacionActualizada) return res.status(404).json({ message: 'Contratación no encontrada' });
        res.json(contratacionActualizada);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const deleteByIdContrat = async (req, res) => {
    try {
        const contratacionEliminada = await Contratacion.findByIdAndDelete(req.params.id);
        if (!contratacionEliminada) return res.status(404).json({ message: 'Contratación no encontrada' });
        res.status(204).send(); // No hay contenido que devolver
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {postContrat, getContrat, getContratByName, getByIdContrat, updateByIdContrat, deleteByIdContrat}
