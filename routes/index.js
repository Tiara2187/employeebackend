const router = require('express').Router();
const employeeRoutes = require('./employee')
const errorHandlers = require('../helper/errorHandlers')

router.use('/employee', employeeRoutes)

router.use(errorHandlers)
module.exports = router