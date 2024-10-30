var express = require('express');
var router = express.Router();
const {check} = require('express-validator')

const {postJugador, getJugadores, getByIdJugador, updateByIdJugador, deleteByIdJugador} = require('../../../controllers/jugador');

const {existeFutbolistaPorId, existeContratoPorIdFutbolista} = require('../../../helpers/db_validations')

const {validarCampos} = require('../../../middleware/validar_campos')


router.post('/', postJugador)
router.get('/', getJugadores)
router.get('/:id', [check('id', 'No es un id de Mongo válido').isMongoId()] ,getByIdJugador)
router.put('/:id',[check('id', 'No es un id de Mongo válido').isMongoId()], updateByIdJugador)
router.delete('/:id', [check('id', 'No es un id de Mongo válido').isMongoId(), check('id').custom(existeFutbolistaPorId), check('id').custom(existeContratoPorIdFutbolista), validarCampos] ,deleteByIdJugador)

module.exports = router