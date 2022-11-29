const { Router } = require('express');
const countries = require('./countries');
const activities = require('./activities');
const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/', countries);
router.use('/', activities);

module.exports = router;
