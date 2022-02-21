require('../models/employee.model');

const mongoose = require('mongoose');
const Employee = mongoose.model('Employee');


module.exports.EmployeeController = {

    createEmployee: async (employee) => {
        let newEmployee = new Employee(employee);
        return await newEmployee.save();
    },
    deleteEmployee: async (search) => {
        return Employee.deleteOne(search);
    },
    findEmployeeById: async (id) => {
        return await Employee.findById(id).lean().exec();
    },
    getAllEmployees: async (search = {}) => {
        return await Employee.find(search).lean().exec();
    },
    updateEmployee: async (id, body) => {
        return await Employee.findByIdAndUpdate(id, body).exec();
    }
}

