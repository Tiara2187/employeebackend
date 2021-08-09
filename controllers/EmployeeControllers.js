const Employee = require('../models/Employee')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

class EmployeeController {
    static register(req, res, next) {
        const { username, password, email } = req.body
        Employee.create({ username, password, email })
            .then(employee => {
                res.status(200).json({ success: true, data: employee})
            })
            .catch(next)
    }

    static login(req, res, next) {
        const { email, password} = req.body
        Employee.findOne({ email: email })
        .then(employee => {
            if (employee && bcrypt.compareSync(password, employee.password)) {
                const token = jwt.sign({_id : employee._id}, 'SECRET_KEY')
                res.status(200).send({ success : true, employee, token})
            }
            else if(!employee) {next({name: 'NOT_FOUND'})}
            else next({name : 'LOGIN_FAILED'})
        })
        .catch(e => {next({name: 'NOT_FOUND'})})
    }

    static async forgetPassword(req, res, next){
        const { username, password, email} = req.body
        const employee = await Employee.findOne({ username: username, email: email})
        if (employee) {
            const salt = bcrypt.genSaltSync(10)
            const newData = { password }
            newData.password = bcrypt.hashSync(newData.password, salt)
            const updateEmployeePass = await Employee.findOneAndUpdate({ email : email }, newData, { new : true})
            res.status(200).json({success : true, data : updateEmployeePass})
        }
        else{ next({name: 'NOT_FOUND'})}
    }

    static async createEmployee(req, res, next) {
        const { username, firstName, lastName, email, birthDate, basicSalary, status, group, description} = req.body
        const employeeData = await Employee.findOne({
            username,
            firstName,
            lastName,
            email,
            birthDate,
            basicSalary,
            status,
            group,
            description

        })
        console.log(employeeData)
        if(employeeData) { next({name: 'EMPLOYEEEXIST'})}
        else{
            const employee = new Employee({
                username,
                firstName,
                lastName,
                email,
                birthDate,
                basicSalary,
                status,
                group,
                description

            });
            employee.save()
            ,then(data => {
                res.status(200).json({success: true, data})
            })
            .catch(err => {next({name : 'VALID'})})
        }
    }

    static async listEmployee(req, res,next){
        try{
            const employee = await Employee.find()
            res.status(200).json({success : true, data : employee})
        }
        catch (any) { next({name: 'NOT_FOUND'})}
    }

    static async getOneEmployee(req, res, next) {
        const { employeeID} = req.params
        try{
            const employee = await Employee.findById(employeeID)
            res.status(200).json({success : true, data : employee})
        }
        catch (any) { next({name: 'NOT_FOUND'})}
    }

    static async updateEmployee(req, res, next){
        const {employeeID} = req.params
        const {
            username,
            firstName,
            lastName,
            email,
            birthDate,
            basicSalary,
            status,
            group,
            description

        } = req.body
        try{
            const newData = {
                username,
                firstName,
                lastName,
                email,
                birthDate,
                basicSalary,
                status,
                group,
                description
            }
            for(let key in newData) if(!newData[key]) delete newData[key]
            const employee = await Employee.findByIdAndUpdate(employeeID,newData,{new:true})
            res.status(200).json({success : true, data : employee})
        }
        catch (e) { next({name: 'EMPLOYEENOTFOUND'})}
    }

    static async deleteEmployee(req,res,next) {
        const {employeeID} = req.params
        try{
            const employee = await Employee.findByIdAndDelete(employeeID)
            res.status(200).json({success: true, message : 'delete success'})
        }
        catch(e) { next({name: 'EMPLOYEENOTFOUND'})}
    }


}

module.exports = EmployeeController