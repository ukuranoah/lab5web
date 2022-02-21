const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    first: String,
    last: String,
    department: String,
    start: String,
    job: String,
    salary: {
        type:Number,
        required:true,
        min:0
    }
}, {
    strictQuery: false
});

let Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee
