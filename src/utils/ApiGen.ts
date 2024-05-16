import { Router } from "express";
import { ServiceGen } from "./ServiceGen";
import { SuccessResponse } from "./SuccessResponse";

export class ApiGen {
  endpoint: string
  model: string
  router: Router
  service: ServiceGen
  constructor(endpoint: string, model: string, router: Router) {
    this.endpoint = endpoint
    this.model = model
    this.service = new ServiceGen(this.model)
    this.router = router
      .get(this.endpoint, async (req, res, next) => {
        try {
          res.json(await this.service.getItems())
        } catch (err) {
          next(err)
        }
      })
      .get(`${this.endpoint}/:id`, async (req, res, next) => {
        try {
          const { id } = req.params
          res.json(await this.service.getItemById(Number(id)))
        } catch (err) {
          next(err)
        }
      })
      .post(this.endpoint, async (req, res, next) => {
        try {
          const item = req.body
          await this.service.postItem(item)
          res.json(JSON.stringify(new SuccessResponse(201, 'Añadido correctamente')))
        } catch (err) {
          next(err)
        }
      })
      .put(`${this.endpoint}/:id`, async (req, res, next) => {
        try {
          const { id } = req.params
          const itemNewData = req.body
          await this.service.editItem(Number(id), itemNewData)
          res.json(JSON.stringify(new SuccessResponse(201, 'Edicion correcta')))
        } catch (err) {
          next(err)
        }
      })
      .delete(`${this.endpoint}/:id`, async(req,res, next) => {
        try{
         const {id} = req.params
          await this.service.deleteItem(Number(id))
          res.json(JSON.stringify(new SuccessResponse(201, 'Eliminacion correcta.')))
        }catch(err){
          next(err)
        }
      })
  }
}