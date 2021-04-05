"use strict";
var database = require('../config/database.config');
var data = {};
/*data.selectOne = function (callback) {
    if(database) {
        database.query('',
        function(error, results) {
            if(error) {
                throw error;
            } else {
                callback(results[0]);
            }
        });
    }
}*/
module.exports = data;
