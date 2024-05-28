import { Router } from "express";
import { AuthenticateUser, RegisterUser } from "./auth.services";
import { SuccessResponse } from "../../utils/SuccessResponse";

const authRouter = Router()

authRouter
  .post('/login', async (req, res, next) => {
    try{
      const user = req.body
      const token = await AuthenticateUser(user)
      res.header('authorization', token).json({success: 'Autenticado'})
    }catch(err){
      next(err)
    }
  })
  .post('/register', async (req, res, next) => {
    try {
      const user = req.body
      console.log(user)
      await RegisterUser(user)
      res.json(JSON.stringify(new SuccessResponse(200, "Usuario creado exitosamente.")))
    } catch (err) {
      console.log(err)
      next(err)
    }
  })


export default authRouter