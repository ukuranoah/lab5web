const express = require('express');
const router = express.Router();
const { EmployeeController } = require('../../controllers/employee.controller');

router.route('/employees')
    .get(async (req, res) => {
        let query = Object.assign({}, req.query);
        delete query._sort;
        let employees = await EmployeeController.getAllEmployees(query);
        if (!employees) {
            res.status(500).send('Employees not found!');
        }
        if (req.query._sort) {
            let asc = req.query._sort.charAt(0) !== '-';
            if (!asc) {
                req.query._sort = req.query._sort.substring(1);
            }
            employees.sort((a, b) => {
                return a[req.query._sort] < b[req.query._sort] ? 1 : -1;
            });
            if(!asc) {
                employees.reverse();
            }
        }
        res.json(employees);
    })
    .post(async (req, res) => {
        let employee = await EmployeeController.createEmployee(req.body);
        if (employee) {
            res.json(employee);
        } else {
            res.status(500).send('Something went wrong');
        }
    });


// Expose the router to the application
module.exports = router;
