var express = require('express');
var router = express.Router();

const {postEquipo, getEquipos, getByIdEquipo, updateByIdEquipo, deleteByIdEquipo} = require('../../../controllers/equipos')

router.post('/', postEquipo)
router.get('/', getEquipos)
router.get('/:id', getByIdEquipo)
router.put('/:id', updateByIdEquipo)
router.delete('/:id', deleteByIdEquipo)

module.exports = router