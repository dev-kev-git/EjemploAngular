import {Request,Response, text } from 'express';

import pool from '../database';

class GamesController{

    public async list(req:Request,res:Response){
        const games = await pool.query('SELECT * FROM games');
        res.json(games);
        //res.json({text:'listing a game'});//
    } 

    public async getOne(req:Request,res:Response):Promise<any>{
        const { id } = req.params;
        const games = await pool.query('SELECT * FROM games WHERE id= ?' , [id]);
        //console.log(games);//
        if(games){
            return res.json(games[0]);
        }
        res.status(404).json({text:"The Game doesn't exists"});
        //res.json(games);//
        //res.json({text:"This a Game" + req.params.id});//
    }

    public async create (req:Request , res:Response): Promise<void>{
        await pool.query('INSERT INTO games set ?',[req.body]);
        res.json({message:'Game Saved'});
        
        //console.log(req.body);------> con esto veo por consola//

    }

    public async delete(req:Request , res:Response):Promise<void>{
        const { id } = req.params;
        await pool.query("DELETE FROM games WHERE id= ?",[id]);
        res.json({message:"The games was a deleted"})
       //res.json({text:"Deleting a game" + req.params.id});//
    }

    public async update(req:Request , res:Response):Promise<void>{
        const { id } = req.params;
        await pool.query('UPDATE games set ? WHERE id = ?',[req.body, id]);
        res.json({message:"The was Updated"});
        //res.json({text:"updating a game" + req.params.id});//
    }
}

export const gamesController = new GamesController();