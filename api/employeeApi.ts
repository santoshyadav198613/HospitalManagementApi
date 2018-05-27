import { Express } from 'express'
import { IEmployee } from './model/employee';
import { MongoClient } from "mongodb";
export function EmployeeApi(app: Express, db: MongoClient) {
    let employeeList: IEmployee[] = [
        { id: 1, name: 'Test1', email: 'abc@gmail.com', salary: 12000, dob: new Date('10-Nov-2012') },
        { id: 2, name: 'Test2', email: 'abc@gmail.com', salary: 24000, dob: new Date('10-Nov-1987') },
        { id: 3, name: 'Test3', email: 'abc@gmail.com', salary: 48000, dob: new Date('10-Nov-1986') },
        { id: 4, name: 'Test4', email: 'abc@gmail.com', salary: 120000, dob: new Date('10-Nov-1768') }
    ];

    app.get('/api/employee', (req, res) => {
        db.db().collection('employee').find({}).toArray((err, doc) => {
            db.close();
            res.send(doc);
        })
    })

    app.post('/api/employee', (req, res) => {
        try {
            if (req.body !== undefined && req.body.id !== undefined) {
                db.db().collection('employee').insertOne(req.body).then((response: any) => {
                    db.close();
                    res.send(response);
                }).catch((err: any) => {
                    db.close();
                    res.status(500).send(err);
                })
            }
            else {
                db.close();
                res.status(400).send('please provide employee data');
            }
        }
        catch {
            db.close();
            res.status(500).send('The request data is not correct');
        }
    });
}