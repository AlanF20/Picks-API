import { AppError } from "../../utils/AppError"
import { User } from '@prisma/client'
import bcrypt from 'bcryptjs'
import { singlePrisma } from "../../utils/ServiceGen"
import { GenerateToken } from "../../utils/GenAccessToken"

export async function RegisterUser(userInfo: User) {
  try {
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(userInfo.password, salt)
    userInfo.password = hashedPassword
    await singlePrisma.user.create({
      data: userInfo
    })
  } catch (err) {
    console.log(err)
    throw new AppError(404, "Error al crear usuario")
  }
}

export async function AuthenticateUser(user:User) {
  try{
    console.log(user)
    const userExist = await singlePrisma.user.findFirstOrThrow({
      where: {
        email: user.email
      }
    })
    console.log(userExist)
    if(!userExist) throw new AppError(404, "Usuario/Password incorrecto.")
    const validPassword = await bcrypt.compare(user.password, userExist.password)
    if(!validPassword) throw new AppError(404, "Usuario/Password incorrecto")
    return GenerateToken(userExist)
  }catch(err){
    console.log(err)
    throw new AppError(401, "No autorizado")
  }
  
}