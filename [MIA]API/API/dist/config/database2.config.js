"use strict";
var mysql = require('mysql');
const path = '';
var parametros = {
    host: 'localhost',
    user: 'root',
    database: 'GrandVirusEpicenter',
    password: '123c',
};
var connection = mysql.createConnection(parametros);
module.exports = connection;
