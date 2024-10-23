var express = require('express');
var router = express.Router();

router.get("/", (req, res) => {

  res.render('index', { title: 'Admin' });
    
})

router.use('/users', require("./users/users"))
router.use('/equipos', require('./equipos/equipos'))
router.use('/jugadores', require('./jugadores/jugadores'))
router.use('/contrataciones', require('./contrataciones/contrataciones'))

module.exports = router