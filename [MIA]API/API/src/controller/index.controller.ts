
import { Request,Response } from 'express'
import { connect } from '../config/database.config'


class IndexController{

    public index (req:Request,res:Response){
        res.json({Sever:"Running 3001"})
    }
    
    public async consulta1(req:Request,res:Response) : Promise<Response|void>{
        try {
            const conn = await connect();
            const posts = await conn.query('SELECT * FROM STATE');
            return res.json(posts[0]);
        } catch(e) {
            console.log(e);
        }
    }

}
export const indexController = new IndexController();