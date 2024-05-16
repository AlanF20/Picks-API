import { Router } from "express";
import { RegisterUser } from "./auth.services";
import { SuccessResponse } from "../../utils/SuccessResponse";

const authRouter = Router()

authRouter
  .get('/login', async () => {

  })
  .post('/register', async (req, res, next) => {
    try {
      const user = req.body
      console.log(user)
      await RegisterUser(user)
      res.json(JSON.stringify(new SuccessResponse(200, "Usuario creado exitosamente.")))
    } catch (err) {
      next(err)
    }
  })


export default authRouter