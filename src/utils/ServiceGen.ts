import { PrismaClient } from "@prisma/client"
import { AppError } from "./AppError"

export const singlePrisma = new PrismaClient()

export class ServiceGen {
  model: string
  client: PrismaClient = singlePrisma
  constructor(model: string) {
    this.model = model
  }
  async getItems() {
    try {
      return await (this.client as any)[this.model].findMany()
    } catch (err) {
      console.log(err)
      throw new AppError(400, "Error al obtener los registros")
    }
  }
  async getItemById(id: number) {
    try {

      return await (this.client as any)[this.model].findUnique({
        where: {
          id: id
        }
      })
    } catch (err) {
      console.log(err)
      throw new AppError(400, "Error al obtener el registro")
    }
  }
  async postItem(itemData: any) {
    try {
      return await (this.client as any)[this.model].create({
        data: itemData
      })
    } catch (err) {
      console.log(err)
      throw new AppError(404, "Error al crear el item")
    }
  }
  async editItem(id: number, itemNewData: any) {
    try {
      return await (this.client as any)[this.model].update({
        where: {
          id: id
        },
        data: {
          ...itemNewData
        }
      })
    } catch (err) {
      console.log(err)
      throw new AppError(404, "Error al editar el item")
    }
  }
  async deleteItem(id: number) {
    try {
      return await (this.client as any)[this.model].update({
        where: {
          id: id
        },
        data: {
          isDeleted: true
        }
      })
    } catch (err) {
      console.log(err)
      throw new AppError(404, 'Error al eliminar el item')
    }
  }
}
