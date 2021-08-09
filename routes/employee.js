const router = require('express').Router()
const EmployeeController = require('../controllers/EmployeeControllers')
const authentication = require('../helper/authentication')

router.post('/register',EmployeeController.register)
router.post('/login',EmployeeController.login)
router.put('/forgetpass',EmployeeController.forgetPassword)
router.post('/createemployee',EmployeeController.createEmployee)
router.get('/listemployee',EmployeeController.listEmployee)
router.get('/detailemployee/:employeeID',EmployeeController.getOneEmployee)
router.put('/updatedemployee/:employeeID',EmployeeController.updateEmployee)
router.delete('/deleteemployee/:employeeID',EmployeeController.deleteEmployee)

module.exports = router