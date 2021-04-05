"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
class ConsultaRoute {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        //this.router.get('', );
    }
}
const consultaRoute = new ConsultaRoute();
exports.default = consultaRoute.router;
