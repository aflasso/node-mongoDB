const express = require('express');
const Contratacion = require('../models/contrataciones');  // Asegúrate de que la ruta sea correcta

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

module.exports = {postContrat, getContrat, getByIdContrat, updateByIdContrat, deleteByIdContrat}