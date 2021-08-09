const jwt = require('jsonwebtoken')
const Employeed = require('../models/Employee')

const employeeAuth = (req, res, next) => {
    const token = req.header('Authorization').replace('Bearer ', '')
    if(token){
        jwt.verify(token, 'SECRET_KEY',(err,decoded) => {
            if(err) next({name: 'INVALID_TOKEN'})
            else{
                req._employeeId = decoded._id;
                next()
            }
        })
    }else next({name: 'MISSING_TOKEN'})
}
module.exports = employeeAuth