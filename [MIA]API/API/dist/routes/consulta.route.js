"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var ConsultaRoute = /** @class */ (function () {
    function ConsultaRoute() {
        this.router = express_1.Router();
    }
    return ConsultaRoute;
}());
var consultaRoute = new ConsultaRoute();
exports.default = consultaRoute.router;
