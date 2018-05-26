import { Express } from 'express'
import { IEmployee } from './model/employee';
export function EmployeeApi(app: Express) {
    let employeeList: IEmployee[] = [
        { id: 1, name: 'Test1', email: 'abc@gmail.com', salary: 12000, dob: new Date('10-Nov-2012') },
        { id: 2, name: 'Test2', email: 'abc@gmail.com', salary: 24000, dob: new Date('10-Nov-1987') },
        { id: 3, name: 'Test3', email: 'abc@gmail.com', salary: 48000, dob: new Date('10-Nov-1986') },
        { id: 4, name: 'Test4', email: 'abc@gmail.com', salary: 120000, dob: new Date('10-Nov-1768') }
    ];

    app.get('/api/employee', (req, res) => {
        res.send(employeeList);
    })
}