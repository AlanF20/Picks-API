export class SuccessResponse {
  statusCode: Number;
  message: String;
  constructor(status: number = 200, message: String = ""){
    this.message = message
    this.statusCode = status
  }

}