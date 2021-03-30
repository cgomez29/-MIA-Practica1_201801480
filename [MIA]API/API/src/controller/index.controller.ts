
import { Request,Response } from 'express'

class IndexController{

    public index (req:Request,res:Response){
        res.json({Sever:"Running 3001"})
    } 

}
export const indexController = new IndexController();