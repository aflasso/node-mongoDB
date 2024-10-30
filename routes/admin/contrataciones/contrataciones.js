var express = require('express');
var router = express.Router();

const {check} = require('express-validator')

const {postContrat, getContrat, getContratByName,getByIdContrat, updateByIdContrat, deleteByIdContrat} = require('../../../controllers/contrataciones')

router.post('/', postContrat)
router.get('/', getContrat)
router.get('/:id', [check('id', 'No es un id de Mongo válido').isMongoId()],getByIdContrat)
router.get('/name/:nombreEquipo', getContratByName)
router.put('/:id', [check('id', 'No es un id de Mongo válido').isMongoId()], updateByIdContrat)
router.delete('/:id', [check('id', 'No es un id de Mongo válido').isMongoId()], deleteByIdContrat)

module.exports = router