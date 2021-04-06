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
        this.router.get('/consulta2',indexController.consulta2)
        this.router.get('/consulta3',indexController.consulta3)
        this.router.get('/consulta4',indexController.consulta4)
        this.router.get('/consulta5',indexController.consulta5)
        this.router.get('/consulta6',indexController.consulta6)
        this.router.get('/consulta7',indexController.consulta7)
        this.router.get('/consulta8',indexController.consulta8)
        this.router.get('/consulta9',indexController.consulta9)
        this.router.get('/consulta10',indexController.consulta10)
        this.router.get('/eliminarTemporal',indexController.eliminarTemporal)
        this.router.get('/eliminarModelo',indexController.eliminarModelo)
        this.router.get('/cargarTemporal',indexController.cargarTemporal)
        this.router.get('/cargarModelo',indexController.cargarModelo)
    }

}

const indexRoute = new IndexRoute();
export default indexRoute.router;