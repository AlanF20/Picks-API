import { AppError } from "../../utils/AppError"
import { User } from '@prisma/client'
import bcrypt from 'bcryptjs'
import { singlePrisma } from "../../utils/ServiceGen"

export async function RegisterUser(userInfo: User) {
  try {
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(userInfo.password, salt)
    userInfo.password = hashedPassword
    await singlePrisma.user.create({
      data: userInfo
    })
  } catch (err) {
    throw new AppError(404, "Error al crear usuario")
  }
}