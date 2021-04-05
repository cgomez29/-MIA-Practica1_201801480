"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.indexController = void 0;
const database_config_1 = require("../config/database.config");
class IndexController {
    index(req, res) {
        res.json({ Sever: "Running 3001" });
    }
    consulta1(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_config_1.connect();
                const posts = yield conn.query('SELECT * FROM STATE');
                return res.json(posts[0]);
            }
            catch (e) {
                console.log(e);
            }
        });
    }
}
exports.indexController = new IndexController();
