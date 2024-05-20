import { User } from "@prisma/client";
import jwt from 'jsonwebtoken'

export function GenerateToken(user: User){
  return jwt.sign({
    id: user.id,
    name: user.name,
    password: user.password
  },process.env.SECRET as string )
}