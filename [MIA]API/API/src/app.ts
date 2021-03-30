import express, { NextFunction } from 'express'
import morgan from 'morgan'
import cors from 'cors'
//import path from 'path'
import indexRoute from './routes/index.route'

const app = express();

app.set('port',process.env.PORT || 3001);

app.use(morgan('dev'));
app.use(cors());
//app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({extended:false}));


//routes
app.use('/',indexRoute);


export default app;