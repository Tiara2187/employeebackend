const mongoose = require('mongoose')
require('mongoose-double')(mongoose);
const bcrypt = require('bcryptjs')

const SchemaTypes = mongoose.Schema.Types;

const employeeSchema = new mongoose.Schema ({
    username: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique:true, partialFilterExpression: {email: {$exists:true }},
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    birthDate: {
        type: String,
        required: true
    },
    basicSalary: {
        type: SchemaTypes.Double,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    group: {
        type: String,
        required: true
    },
    description: {
        type: Date,
        default: Date.now,
        required: true
    }

},
    {
        timestamps: true
    })

    employeeSchema.pre('save', function (next) {
        Employee.findOne({ username : this.username, email: this.email})
        .then((employee) => {
            if (employee) {
                next({ name: "EMAIL_ALREADY_EXISTS"});
            } else {
                this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(10))
                next()
            }
        })
        .catch((any) => next('MONGOOSE_ERROR'))
    })

    const Employee = mongoose.model('Employee', employeeSchema)
    module.exports = Employee

