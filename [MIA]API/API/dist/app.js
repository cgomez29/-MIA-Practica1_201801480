"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
//import path from 'path'
const index_route_1 = __importDefault(require("./routes/index.route"));
const app = express_1.default();
app.set('port', process.env.PORT || 3001);
app.use(morgan_1.default('dev'));
app.use(cors_1.default());
//app.use(bodyParser.json());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
//routes
app.use('/', index_route_1.default);
exports.default = app;
