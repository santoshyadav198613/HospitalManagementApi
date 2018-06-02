import * as express from "express";
import * as bodyParser from 'body-parser';
import { EmployeeApi } from "./api/employeeApi";
let app = express()
import { MongoClient } from "mongodb";
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:4200");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

  // if (req.headers.username === 'Admin' &&
  //   req.headers.password === 'Admin') {
    next();
  // }
  // else {
  //   res.status(401).send('invalid request');
  // }

});



// Connection URL
var url = 'mongodb://lipstest:test123@ds217970.mlab.com:17970/shoppingappdb';


app.listen(3000, () => {
  console.log('server started on port 3000');
  // Use connect method to connect to the server
  MongoClient.connect(url, function (err, db) {
    console.log("Connected successfully to server");
    EmployeeApi(app, db);
    // db.close();
  });
})