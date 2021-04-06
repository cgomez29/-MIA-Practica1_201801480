"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const promise_mysql_1 = __importDefault(require("promise-mysql"));
const config_1 = __importDefault(require("./config"));
const pool = promise_mysql_1.default.createPool(config_1.default.DB);
pool.getConnection().then(connection => {
    pool.releaseConnection(connection);
    console.log('DB is connect');
});
exports.default = pool;
