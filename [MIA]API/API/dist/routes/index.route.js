"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const index_controller_1 = require("../controller/index.controller");
class IndexRoute {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', index_controller_1.indexController.index);
        this.router.get('/consulta1', index_controller_1.indexController.consulta1);
    }
}
const indexRoute = new IndexRoute();
exports.default = indexRoute.router;
