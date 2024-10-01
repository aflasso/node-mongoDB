var express = require('express');
var router = express.Router();

const {getAllUsers, getOneUserByEmail, postUser,updateUserByEmail, deleteUserByEmail} = require('../controllers/user')

/* GET users listing. */
router.get('/', getAllUsers);
router.get('/:email', getOneUserByEmail)
router.post('/new', postUser)
router.put('/update/:email', updateUserByEmail)
router.delete('/:email', deleteUserByEmail)

module.exports = router;
