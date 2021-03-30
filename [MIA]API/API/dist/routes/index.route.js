"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var index_controller_1 = require("../controller/index.controller");
var IndexRoute = /** @class */ (function () {
    function IndexRoute() {
        this.router = express_1.Router();
        this.config();
    }
    IndexRoute.prototype.config = function () {
        this.router.get('/', index_controller_1.indexController.index);
    };
    return IndexRoute;
}());
var indexRoute = new IndexRoute();
exports.default = indexRoute.router;
