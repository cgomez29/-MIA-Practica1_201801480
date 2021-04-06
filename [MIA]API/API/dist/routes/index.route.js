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
        this.router.get('/consulta2', index_controller_1.indexController.consulta2);
        this.router.get('/consulta3', index_controller_1.indexController.consulta3);
        this.router.get('/consulta4', index_controller_1.indexController.consulta4);
        this.router.get('/consulta5', index_controller_1.indexController.consulta5);
        this.router.get('/consulta6', index_controller_1.indexController.consulta6);
        this.router.get('/consulta7', index_controller_1.indexController.consulta7);
        this.router.get('/consulta8', index_controller_1.indexController.consulta8);
        this.router.get('/consulta9', index_controller_1.indexController.consulta9);
        this.router.get('/consulta10', index_controller_1.indexController.consulta10);
        this.router.get('/eliminarTemporal', index_controller_1.indexController.eliminarTemporal);
        this.router.get('/eliminarModelo', index_controller_1.indexController.eliminarModelo);
        this.router.get('/cargarTemporal', index_controller_1.indexController.cargarTemporal);
        this.router.get('/cargarModelo', index_controller_1.indexController.cargarModelo);
    }
}
const indexRoute = new IndexRoute();
exports.default = indexRoute.router;
