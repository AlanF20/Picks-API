import { Router } from "express"
import { ApiGen } from "../../utils/ApiGen"

const guitarRoter = Router()
export const guitarApi = new ApiGen('/api/guitar', "guitar", guitarRoter)
