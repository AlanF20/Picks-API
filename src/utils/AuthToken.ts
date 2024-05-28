import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken'

export function authenticateToken(req: Request, res: Response,next: NextFunction){
  const authHeader = req.headers['authorization']

  if(authHeader === null) return res.sendStatus(401)

  jwt.verify(authHeader as string, process.env.SECRET as string, async(err)=>{
    if(err) return res.sendStatus(403)
    next()
  })
}