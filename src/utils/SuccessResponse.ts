export class SuccessResponse {
  statusCode: Number;
  message: String;
  response: Object 
  constructor(status: number = 200, message: String = ""){
    this.message = message
    this.statusCode = status
    this.response = {
      "status": this.statusCode,
      "message": this.message
    } 
  }

}