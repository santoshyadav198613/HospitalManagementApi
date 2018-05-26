import * as express from "express";
import * as bodyParser from 'body-parser';
import { EmployeeApi } from "./api/employeeApi";
let app = express()

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:4200");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

EmployeeApi(app);
app.listen(3000, () => console.log('Example app listening on port 3000!'))