"use strict";
var mysql = require('mysql');
var parameters = {
    host: 'localhost',
    user: 'root',
    password: '123c',
    database: 'GrandVirusEpicenter'
};
var connection = mysql.createConnection(parameters);
module.exports = connection;
