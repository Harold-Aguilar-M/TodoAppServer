import express, { json } from 'express';
import morgan from 'morgan';
import cors from 'cors';

import bcrypt from 'bcryptjs';
import { nanoid } from 'nanoid';

import { getTodos } from './models/todos.js';
import { insertUser } from './models/users.js';

const app = express();

app.use(morgan('tiny'));
app.use(cors());
app.use(json());

app.get('/', function (req, res) {
    res.send('Hello World!');
});

app.get('/todos', function (req, res) {
    res.send(nanoid());
});

app.get('/users', function (req, res) {
    getUsers(function(data) {
        res.status(200).json(data);
    });
});

app.post('/user', function (req, res) {

    let error = [];
    let data  = req.body;

    let size  = Object.keys(data).length;

    if (size > 0) {
        if (!(data.hasOwnProperty('username') && data.username.trim().length > 0)) {
            error.push('Username is required');
        }
        if (!(data.hasOwnProperty('name') && data.name.trim().length > 0)) {
            error.push('Name is required');
        }
        if (!(data.hasOwnProperty('password') && data.password.trim().length > 0) || !(data.hasOwnProperty('passwordConfirm') && data.passwordConfirm.trim().length > 0)) {
            error.push('Password and Password Confirm is required');
        } else {
            if (data.password != data.passwordConfirm) error.push('Password and Password Confirm are not equal');
        }
    } else {
        error.push('Data is required');
    }

    if (error.length > 0) {
        res.status(500).json({
            Message : error,
        });
    } else {

        let salt = bcrypt.genSaltSync(10);
        let hash = bcrypt.hashSync(req.body.password, salt);

        const dataUser = {
            ID : nanoid(),
            Username : req.body.username.trim(),
            Name : req.body.name.trim(),
            Password : hash,
        };

        insertUser(dataUser, function(code, data) {
            res.status(code).json(data);
        });
    }


});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});