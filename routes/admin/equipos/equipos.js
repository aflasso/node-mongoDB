var express = require('express');
var router = express.Router();

const {check} = require('express-validator')

const {existeEquipoPorId, existeFutbolistaPorIdEquipo, existecContratacionPorEquipoId} = require('../../../helpers/db_validations')

const {postEquipo, getEquipos, getByIdEquipo, updateByIdEquipo, deleteByIdEquipo} = require('../../../controllers/equipos')

const {validarCampos} = require('../../../middleware/validar_campos')

router.post('/', postEquipo)
router.get('/', getEquipos)
router.get('/:id', [check('id', 'No es un id de Mongo válido').isMongoId()], getByIdEquipo)
router.put('/:id',[check('id', 'No es un id de Mongo válido').isMongoId()], updateByIdEquipo)
router.delete('/:id', [check('id', 'No es un id de Mongo válido').isMongoId(), check('id').custom(existeEquipoPorId), check('id').custom( existeFutbolistaPorIdEquipo ), check('id').custom(existecContratacionPorEquipoId),validarCampos] ,deleteByIdEquipo)

module.exports = router