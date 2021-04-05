import {Router} from 'express';
import {indexController} from '../controller/index.controller'
class IndexRoute{   

    public router:Router = Router();

    constructor(){
        this.config();
    }

    config():void{
        this.router.get('/',indexController.index)
        this.router.get('/consulta1',indexController.consulta1)
    }

}

const indexRoute = new IndexRoute();
export default indexRoute.router;