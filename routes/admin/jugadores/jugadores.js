var express = require('express');
var router = express.Router();

const {postJugador, getJugadores, getByIdJugador, updateByIdJugador, deleteByIdJugador} = require('../../../controllers/jugador');


router.post('/', postJugador)
router.get('/', getJugadores)
router.get('/:id', getByIdJugador)
router.put('/:id', updateByIdJugador)
router.delete('/:id', deleteByIdJugador)

module.exports = router