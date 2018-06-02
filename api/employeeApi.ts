import { Express } from 'express'
import { IEmployee } from './model/employee';
import { MongoClient } from "mongodb";
export function EmployeeApi(app: Express, db: MongoClient) {

    app.get('/api/employee', (req, res) => {
        console.log('request received');
        db.db().collection('employee').find({}).toArray((err, doc) => {
            res.send(doc);
        })
    });

    app.get('/api/employee/:id', (req, res) => {
        let employeeid = parseInt(req.params.id);
        db.db().collection('employee').findOne({ id: employeeid }).then((response) => {
            res.send(response);
        }).catch((err) => {
            res.status(500).send(err);
        })
    })

    app.post('/api/employee', (req, res) => {
        try {
            if (req.body !== undefined && req.body.id !== undefined) {
                db.db().collection('employee').insertOne(req.body).then((response: any) => {
                    res.send(response);
                }).catch((err: any) => {
                    res.status(500).send(err);
                })
            }
            else {
                res.status(400).send('please provide employee data');
            }
        }
        catch {
            res.status(500).send('The request data is not correct');
        }
    });

    app.put('/api/employee/:id', (req, res) => {
        let employeeid = parseInt(req.params.id);
        db.db().collection('employee').updateOne({ id: employeeid },
            {
                $set: {
                    id: employeeid,
                    name: 'Test Update',
                    email: 'test@update.com',
                    salary: 56999,
                    dob: new Date('12-Nov=1986')
                }
            }).then((response) => {
                res.send(response)
            }).catch((err) => res.status(500).send(err))
    });

    app.put('/api/employee', (req, res) => {
        db.db().collection('employee').findOneAndUpdate({ id: req.body.id },
            {
                id: req.body.id,
                name: req.body.name,
                email: req.body.email,
                salary: req.body.salary,
                dob: req.body.dob
            }).then((response) => {
                res.send(response)
            }).catch((err) => res.status(500).send(err))
    });

    
}